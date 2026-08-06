---
title: "No quería otro bot: construí una API de WhatsApp para n8n"
description: "La historia técnica detrás de WhatsApp n8n Server: una API REST protegida para automatizar WhatsApp, conectar workflows de n8n y mantener el sistema operable."
date: 2026-08-16
author: Nicolas Del Rosario
language: es
alternate: /en/blog/whatsapp-n8n-server/
---

Hay una diferencia entre automatizar un mensaje y construir una integración que alguien pueda operar todos los días. El primer caso puede resolverse con una llamada HTTP. El segundo necesita autenticación, reintentos, trazabilidad, límites y una forma clara de saber si WhatsApp está realmente listo.

Ese fue el problema detrás de [WhatsApp n8n Server](https://github.com/nicolasdelrosario/whatsapp-n8n-server): una API REST para conectar WhatsApp Web con [n8n](https://n8n.io/) sin esconder las partes difíciles detrás de un workflow frágil.

Al momento de escribir esto, el repositorio tiene 26 estrellas en GitHub. La cifra es una señal pequeña pero valiosa: hay interés en una pieza que nació como una necesidad concreta y terminó convirtiéndose en un proyecto open source con una arquitectura más completa de lo que parecía al principio.

## El problema no era enviar un mensaje

Enviar un texto es la parte sencilla. Lo complicado empieza cuando el mensaje forma parte de un proceso real:

- El workflow puede reintentarse y no debería duplicar una operación.
- WhatsApp puede estar autenticándose, desconectado o todavía no listo.
- Un broadcast necesita ejecutarse sin bloquear la petición HTTP.
- Un evento entrante debe llegar a n8n y poder verificarse.
- Una integración necesita saber qué está ocurriendo cuando algo falla.

Por eso el proyecto expone una API protegida con una clave, healthchecks de liveness y readiness, documentación OpenAPI y una interfaz Scalar. La idea es que n8n consuma una interfaz HTTP normal, mientras el servidor se encarga de la sesión y de la comunicación con WhatsApp Web.

## Una sesión de WhatsApp detrás de una API

El servidor utiliza `whatsapp-web.js` para comunicarse con WhatsApp Web. En el primer arranque genera un código QR que se escanea desde el teléfono. A partir de ese momento, la sesión puede conservarse localmente o en PostgreSQL mediante `RemoteAuth`.

Docker hace que el arranque sea reproducible e incluye el entorno necesario para Chromium. El volumen de sesión es importante: si se elimina, hay que volver a escanear el QR. Parece un detalle operativo menor, pero es exactamente el tipo de detalle que convierte una demo funcional en un servicio que alguien puede mantener.

La API separa el estado de WhatsApp de las operaciones que n8n necesita ejecutar:

- `GET /status` informa el estado de conexión.
- `GET /qr-code` devuelve el estado actual del QR.
- `POST /send-message` envía un mensaje individual.
- `POST /reply-message` responde a un mensaje existente.
- `POST /broadcast-message` crea un trabajo de envío masivo.
- `GET /broadcasts/:id` permite consultar el resultado del trabajo.

Todos los endpoints protegidos requieren `x-api-key`. La documentación interactiva está disponible en `/api/v1/docs` y el contrato OpenAPI en `/api/v1/openapi.json`.

## Broadcasts sin bloquear el workflow

Un envío a varios destinatarios no debería mantener abierta una petición mientras se entrega cada mensaje. El servidor crea un job y devuelve un identificador:

```json
{
  "status": "queued",
  "jobId": "95d8baf4-5b45-4af4-8a9b-2e9d7e8fbe7b"
}
```

n8n puede guardar ese `jobId` y consultar su estado posteriormente. La cola procesa los destinatarios de forma secuencial, elimina duplicados después de normalizar los números y respeta un retraso configurable entre entregas.

Esta solución es deliberadamente sencilla. La cola vive en memoria, por lo que los jobs se pierden si el proceso se reinicia y no se comparten entre réplicas. No pretende ser todavía un sistema distribuido; ofrece una base clara para automatizaciones pequeñas y deja visible el punto exacto que habría que sustituir por una cola persistente cuando el volumen lo exija.

## Reintentos sin duplicar acciones

Los workflows automatizados suelen reintentarse. Si una petición crea un pedido, una notificación o un broadcast, repetirla sin control puede tener consecuencias reales.

Por eso las peticiones `POST` protegidas aceptan `Idempotency-Key`. Si n8n repite una solicitud con la misma clave y el mismo cuerpo, recibe la respuesta original. Si reutiliza la clave con un cuerpo diferente, el servidor responde con `409 Conflict`.

La idempotencia también es local al proceso y tiene una retención de 24 horas. Es suficiente para el caso actual, pero el README lo deja explícito: no se comparte entre réplicas ni sobrevive a un reinicio. Documentar ese límite es más útil que fingir que una caché en memoria resuelve todos los escenarios.

## Mensajes entrantes y confianza

La integración también funciona en sentido contrario. Cuando llega un mensaje, el servidor puede enviarlo a un webhook de n8n con un payload que incluye el evento, el identificador del mensaje, el remitente, el chat y el contenido.

Cada webhook se firma con HMAC SHA-256 usando un secreto configurado por el operador. n8n o el receptor debe verificar la firma sobre el cuerpo JSON original antes de procesarlo. Las entregas con errores transitorios se reintentan, pero la validación de autenticidad sigue siendo responsabilidad del consumidor.

Esta frontera importa. Un webhook no es confiable solo porque provenga de una URL privada. El receptor debe poder demostrar que el evento fue generado por el servidor esperado y que el cuerpo no fue alterado durante el transporte.

## Operabilidad antes que magia

Además de las operaciones de WhatsApp, el servidor incorpora controles que suelen aparecer demasiado tarde:

- Rate limiting por clave de API.
- `X-Request-Id` para correlacionar peticiones.
- Contadores básicos compatibles con Prometheus.
- Endpoints separados para saber si el proceso vive y si está listo para recibir tráfico.
- Validación de entradas con esquemas y errores HTTP consistentes.
- Pruebas para dominio, controladores, HTTP, reintentos, webhooks, persistencia y cola.

El proyecto está organizado siguiendo una separación entre dominio, casos de uso e infraestructura. No es una arquitectura ornamental: permite probar reglas como la normalización de números o la idempotencia sin tener que levantar Chromium en cada prueba.

## Lo que aprendí construyéndolo

La decisión más importante fue tratar los límites como parte del diseño. WhatsApp Web no equivale a una API oficial, una cola en memoria no equivale a infraestructura distribuida y un healthcheck HTTP no garantiza por sí solo que una cuenta esté lista para enviar mensajes.

También confirmé que una integración útil no necesita empezar con todos los casos posibles. El proyecto se centra actualmente en mensajes de texto, broadcasts y webhooks. No incluye todavía media, plantillas ni múltiples sesiones. Mantener el alcance visible permite que la API sea comprensible y que las siguientes decisiones respondan a necesidades reales, no a escenarios imaginarios.

WhatsApp n8n Server empezó con una idea simple: hacer posible una automatización desde n8n. Terminó siendo un ejercicio más interesante: convertir una sesión de WhatsApp Web en un servicio con contrato, seguridad básica, observabilidad y un camino claro para crecer.

Las 26 estrellas no son la conclusión del proyecto. Son la señal de que vale la pena seguir construyendo sobre él.

[Ver WhatsApp n8n Server en GitHub](https://github.com/nicolasdelrosario/whatsapp-n8n-server)
