---
title: "El mensaje era la parte fácil"
description: "Qué hizo falta para convertir una sesión de WhatsApp Web en una API que n8n pudiera reintentar sin duplicar acciones."
date: 2026-08-04
author: Nicolas Del Rosario
language: es
alternate: /en/blog/whatsapp-n8n-server/
published: true
---

Enviar un mensaje de WhatsApp desde [n8n](https://n8n.io/) requiere una petición HTTP. La primera vez que funciona, el proyecto parece terminado. Después el workflow reintenta, la sesión todavía no está lista o el proceso se reinicia después de crear un broadcast. En ese momento, el mensaje deja de ser lo interesante.

Construí [WhatsApp n8n Server](https://github.com/nicolasdelrosario/whatsapp-n8n-server) para convertir una sesión de WhatsApp Web en una interfaz que un workflow pudiera consultar y reintentar. No intenta esconder la fragilidad de la sesión: la convierte en estados, contratos y límites explícitos.

## WhatsApp no siempre está listo

El servidor usa `whatsapp-web.js`. En el primer arranque muestra un QR que hay que escanear desde el teléfono; después conserva la sesión localmente o en PostgreSQL con `RemoteAuth`. Si se borra el volumen de sesión de Docker, hay que autenticar otra vez. Ese detalle ya separa una demo de un servicio que alguien puede operar.

También obligó a separar dos preguntas que parecen iguales, pero no lo son: si el proceso responde y si WhatsApp puede enviar mensajes. El endpoint de liveness responde a la primera. El de readiness solo devuelve éxito cuando la sesión está preparada. n8n no necesita adivinar si puede continuar: puede consultar el estado antes de ejecutar una operación.

La API está protegida con `x-api-key`, pero el punto no es añadir una barrera por defecto. Es dar a n8n una interfaz HTTP normal mientras el servidor se hace cargo del navegador, la sesión y sus transiciones.

## n8n reintenta

Los reintentos son una buena idea hasta que repiten una acción que no debía repetirse. Un workflow puede volver a enviar una notificación, crear un segundo broadcast o ejecutar dos veces una operación asociada a un pedido.

Por eso los `POST` protegidos aceptan `Idempotency-Key`. Si n8n repite la misma petición con la misma clave y el mismo cuerpo, recibe la respuesta original. Si reutiliza la clave con otro cuerpo, recibe `409 Conflict`. La clave puede derivarse de un ID de ejecución de n8n o de una operación de negocio: algo estable que el workflow conserve entre intentos.

No es una solución universal. La caché de idempotencia vive en memoria, conserva claves durante 24 horas y desaparece cuando el proceso se reinicia. Tampoco se comparte entre réplicas. El proyecto no pretende presentar eso como infraestructura distribuida; deja claro cuándo haría falta sustituirla.

## Un broadcast necesita tiempo

Mandar un mensaje a cien destinatarios no debería dejar una petición HTTP abierta hasta el último envío. `POST /broadcast-message` crea un trabajo y devuelve un `jobId`. El workflow puede guardar ese identificador, continuar y consultar el resultado más tarde.

La cola procesa los destinatarios secuencialmente, elimina duplicados después de normalizar los números y respeta un retraso configurable. De nuevo, el límite importa: la cola actual vive en memoria. Si el proceso cae, los trabajos se pierden. Para una automatización pequeña esa decisión reduce complejidad; para un sistema con réplicas o requisitos de entrega duradera, habría que usar una cola persistente.

## Un webhook necesita prueba

La integración también recibe mensajes. Cuando llega uno, el servidor puede enviarlo a un webhook de n8n. Pero una URL privada no demuestra de dónde salió el evento.

Cada entrega lleva una firma HMAC SHA-256 calculada sobre el cuerpo JSON original con un secreto del operador. El receptor debe verificarla antes de procesar el contenido. Los errores transitorios se reintentan, pero verificar autenticidad sigue siendo responsabilidad de quien consume el webhook.

Esa frontera era más importante que añadir otra capacidad. Sin ella, un endpoint que reacciona a mensajes entrantes no sabe distinguir un evento legítimo de una petición fabricada.

## Lo que no resuelve

WhatsApp Web no es una API oficial de WhatsApp. Este proyecto depende de su disponibilidad y comportamiento. Solo cubre mensajes de texto, broadcasts y webhooks; no incluye media, plantillas ni múltiples sesiones. La persistencia de sesión puede usar PostgreSQL, pero los broadcasts y las claves de idempotencia aún no son durables.

Eso no convierte al servidor en una solución incompleta por accidente. Define su alcance. El trabajo no consistía en hacer que un mensaje saliera una vez. Consistía en que el siguiente fallo fuera observable, que el siguiente retry no duplicara una acción y que el siguiente límite no quedara escondido detrás de un workflow.

[Ver WhatsApp n8n Server en GitHub](https://github.com/nicolasdelrosario/whatsapp-n8n-server)
