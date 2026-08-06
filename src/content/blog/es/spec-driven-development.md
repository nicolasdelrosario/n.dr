---
title: "Spec-Driven Development: convertir procesos complejos en software verificable"
description: "Cómo convertir procesos B2B complejos en software verificable mediante OpenSpec, IA y validación continua, con claridad para el negocio y menos riesgo en cada cambio."
date: 2026-08-03
author: Nicolas Del Rosario
language: es
alternate: /en/blog/spec-driven-development/
published: false
---

Construir rápido puede parecer una ventaja hasta que el equipo descubre que ha construido el sistema equivocado. En procesos B2B, el coste de corregir esa dirección no está solo en el código: también aparece en las decisiones comerciales, la operación y la confianza de las personas que dependen del sistema.

## El problema no era solo técnico

El caso era un sistema B2B para telecomunicaciones. Debía ayudar a transformar información empresarial, crediticia, geográfica y de cobertura técnica en decisiones operativas: determinar si una oportunidad podía avanzar, acompañar su gestión comercial y coordinar una instalación.

La dificultad no estaba en una pantalla aislada. Estaba en conectar reglas, estados, actores y fuentes de información sin perder el significado de cada paso. Una solicitud podía necesitar precalificación, seguimiento comercial, validaciones adicionales, programación y evidencias. Cada transición tenía consecuencias para la siguiente persona y para la información que el negocio podía considerar confiable.

Por eso, empezar directamente por formularios, endpoints o tablas habría dejado demasiadas decisiones implícitas. El reto era convertir la intención del negocio en un sistema que pudiera revisarse antes de implementarse y comprobarse después.

## De la intención al cambio revisable

Para este proyecto usamos [OpenSpec](https://openspec.dev/) junto con OpenCode. OpenSpec no consiste en escribir documentación por escribirla ni en producir un documento estático que se abandona cuando comienza el desarrollo. Es una forma de organizar cada cambio como una unidad revisable: una propuesta explica qué se quiere cambiar y por qué; el diseño aclara cómo encaja; las tareas hacen explícito el trabajo; y los deltas de especificación muestran qué requisitos se añaden, modifican o eliminan.

Ese flujo permite discutir una decisión antes de que quede escondida en una implementación. También deja un contexto vivo junto al código: las specs evolucionan con el producto y ayudan a entender no solo qué hace el sistema, sino qué intención de negocio sostiene ese comportamiento.

OpenSpec no debe confundirse con Spec Kit. Son herramientas y enfoques distintos. En este caso, la herramienta utilizada para estructurar cambios, diseños, tareas y deltas fue OpenSpec.

OpenCode aportó apoyo durante la exploración del problema, la implementación, la revisión y la verificación. La IA pudo ayudar a recorrer el código, proponer cambios y detectar casos que merecían atención, pero la especificación y la validación mantuvieron el criterio del negocio visible.

## Un sistema dividido por responsabilidades

Separar el sistema por responsabilidades ayudó a evitar que una sola interfaz intentara resolver todo el proceso. El diseño se organizó alrededor de tres áreas conectadas:

- **Precalificación:** reúne la información necesaria para evaluar una oportunidad, aplica las validaciones correspondientes y deja claro por qué puede avanzar o necesita atención.
- **CRM comercial:** da seguimiento a la oportunidad, sus responsables, estados y próximas acciones, manteniendo continuidad entre la evaluación y la gestión comercial.
- **Instalaciones:** coordina la ejecución en campo, la capacidad disponible, la programación, las reprogramaciones y las evidencias necesarias para cerrar el trabajo.

No se trata de crear tres sistemas desconectados. Se trata de asignar una responsabilidad principal a cada parte y definir con precisión cómo se relacionan. Así, un cambio en una etapa puede revisarse por su impacto en las demás, en lugar de aparecer como una sorpresa durante la operación.

## El stack ejecuta la especificación

La especificación se convirtió en software mediante un stack compuesto por **CallAPI**, **Node-RED**, **HTML**, **CSS**, **Bootstrap**, **JavaScript** y **PostgreSQL**. Cada tecnología cumple una función dentro del flujo: integrar y exponer capacidades, orquestar procesos, construir interfaces, aplicar estilos, manejar interacción y persistir el estado del negocio.

El stack no reemplaza la especificación. La ejecuta. OpenCode e IA sirven como apoyo para entender el contexto, implementar tareas acotadas, revisar coherencia y verificar que el resultado siga los escenarios acordados. Cuando aparece una ambigüedad, la respuesta no debería ser inventar una regla en el código: debería volver a la intención, decidirla y actualizar el cambio revisable.

El sistema también integra un flujo de gestión de documentos y evidencias. Lo importante es que esas evidencias formen parte del proceso y de sus validaciones, sin convertir su gestión en una suposición oculta para quienes usan el sistema.

## Lo importante está en los bordes

Los flujos principales suelen ser fáciles de describir. La confiabilidad se decide en los casos que interrumpen ese camino. Por eso, las especificaciones y validaciones prestaron especial atención a:

- estados válidos y transiciones que no deben permitirse;
- roles, permisos y responsabilidades en cada etapa;
- errores de integración y respuestas incompletas;
- reintentos seguros y prevención de duplicados;
- capacidad disponible antes de confirmar una actividad;
- reprogramaciones sin perder el historial ni el contexto;
- evidencias necesarias para demostrar qué ocurrió.

Pensar estos bordes antes y durante la implementación reduce decisiones improvisadas. También hace que una revisión sea concreta: en lugar de preguntar si el sistema “parece funcionar”, se puede comprobar qué ocurre cuando una respuesta falla, una actividad cambia de fecha o dos personas intentan registrar el mismo avance.

## Qué gana el cliente

El beneficio principal no es tener más documentos. Es tener más claridad sobre lo que se está construyendo y por qué.

- **Claridad:** la intención del proceso se convierte en escenarios y responsabilidades comprensibles.
- **Trazabilidad:** cada cambio puede relacionarse con una decisión, una tarea y una validación.
- **Mantenibilidad:** las specs permanecen como contexto vivo para entender el comportamiento cuando el sistema evoluciona.
- **Menor riesgo:** las ambigüedades aparecen antes, cuando todavía es más barato discutirlas que corregirlas en producción.

Esto también mejora la conversación entre negocio y tecnología. No obliga a que una persona de negocio lea código ni a que una persona técnica adivine reglas comerciales. Crea un punto de encuentro revisable para ambas partes.

## La IA acelera; la especificación conserva el criterio

Spec-Driven Development no es añadir burocracia a un proyecto de software. Es hacer explícita la intención que, de otro modo, quedaría repartida entre conversaciones, tickets y decisiones invisibles en el código.

La IA puede acelerar la exploración y la implementación. OpenCode puede ayudar a convertir tareas en cambios verificables. Pero la especificación conserva el criterio: qué significa una decisión, qué casos importan, qué límites tiene el proceso y cómo se sabe que el resultado es correcto.

Cuando el proceso B2B es complejo, esa combinación permite avanzar con velocidad sin confundir velocidad con dirección. El objetivo no es construir más rápido cualquier sistema, sino construir el sistema correcto y poder explicar, revisar y mantener cada cambio.
