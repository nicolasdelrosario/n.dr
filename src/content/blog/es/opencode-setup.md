---
title: "Mi stack de OpenCode para construir con IA sin perder el criterio"
description: "Cómo organizo exploración, implementación, revisión, memoria, documentación y diseño al trabajar con IA."
date: 2026-07-28
author: Nicolas Del Rosario
language: es
alternate: /en/blog/opencode-setup/
published: true
---

No quiero que un agente escriba código antes de entender qué está cambiando. Tampoco quiero repetir la exploración de un repositorio cada vez que retomo una tarea. Mi stack de OpenCode existe para resolver esas dos cosas: separar el trabajo, conservar las decisiones y dejar una forma concreta de comprobar el resultado.

No es una receta para construir más rápido a cualquier precio. Es el conjunto de límites que uso para que la IA no convierta un cambio pequeño en una respuesta grande y difícil de revisar.

## Empiezo por entender, no por editar

El primer paso no es abrir un archivo y pedir una solución. Es ubicar el flujo afectado: qué componentes lo usan, dónde entra la información, qué reglas comparten los distintos caminos y qué partes no conviene tocar.

Para eso uso el rol de exploración de OpenCode. Cuando un proyecto tiene un índice disponible, CodeGraph ayuda a seguir símbolos y rutas de llamada; si no lo tiene, la exploración normal del repositorio cumple el mismo trabajo. La herramienta cambia, pero la regla no: antes de editar una función hay que entender quién depende de ella.

Si una decisión depende de una librería, una API o un servicio externo, consulto su documentación actual con Context7. No uso la documentación para decorar una respuesta: la uso para contrastar una hipótesis antes de convertirla en código.

## Cada rol tiene una responsabilidad

OpenCode me permite separar exploración, implementación, revisión y decisiones de mayor alcance. Esa división es más importante que el nombre de cada modelo.

- **Explorer** recorre el proyecto y reúne evidencia antes de que exista un cambio.
- **Implementer** modifica los archivos y ejecuta la verificación necesaria.
- **Reviewer** busca regresiones, riesgos y casos que el cambio pudo dejar fuera.
- **Architect** queda para decisiones de arquitectura, seguridad, rendimiento o depuración compleja.

Luna coordina el trabajo de implementación. Terra queda reservado para análisis que realmente necesitan más profundidad. No asigno un modelo por prestigio ni intento que todos hagan de todo: cada rol tiene un alcance que se puede revisar.

## La memoria no reemplaza el repositorio

Engram guarda decisiones, descubrimientos y resúmenes entre sesiones. Es útil cuando un arreglo depende de una conversación previa o cuando necesito recordar por qué una alternativa se descartó. El código y las pruebas siguen siendo la fuente de verdad; la memoria evita que el contexto útil desaparezca al cerrar la sesión.

Mis [instrucciones persistentes de OpenCode](https://github.com/nicolasdelrosario/dotfiles/blob/main/opencode/AGENTS.md) conectan el flujo: indican cómo explorar, cuándo consultar documentación, qué tipo de cambio delegar y cómo verificarlo. El objetivo no es escribir reglas para cada caso posible. Es reducir las decisiones que tendría que volver a explicar desde cero.

## La solución más pequeña también necesita revisión

Ponytail funciona como un freno contra la complejidad por defecto. Antes de añadir una capa nueva, obliga a preguntar si el problema ya tiene una solución en el repositorio, en la librería estándar o en la plataforma. Su valor no está en escribir menos líneas por deporte; está en evitar cambios que después nadie puede justificar.

RTK mantiene los comandos de terminal más legibles. Es una pieza pequeña, pero útil cuando la verificación forma parte del trabajo diario y no un paso que se recuerda al final.

## El diseño también se revisa

Hallmark entra cuando el cambio afecta una interfaz. No decide el producto ni sustituye una revisión de accesibilidad. Me ayuda a evitar una salida visual genérica: conserva los tokens y el lenguaje del sitio, revisa la estructura y obliga a comprobar la respuesta en móvil.

En este portfolio, por ejemplo, el criterio Hallmark no significa reemplazar cada página por una estética nueva. Significa preservar el side-rail, la tipografía y la paleta existentes mientras se corrigen problemas concretos, como una navegación que no cabía en móvil. El diseño se trata como código: tiene restricciones, estados y regresiones posibles.

## Dónde se puso a prueba

Probé este flujo al construir [Prince Club de Libros](https://prince-club-de-libros.nicolasdelrosario.com/), un catálogo con stock, ofertas, wishlist, autenticación, imágenes, contacto por WhatsApp y administración.

Los problemas aparecieron en los bordes. La recuperación de autenticación no se comportaba como esperaba, algunas políticas de imágenes bloqueaban casos válidos, había errores que no estaban manejados de forma consistente y la selección de ofertas no era determinista. Ninguno se resolvía mirando un archivo aislado o aceptando la primera propuesta de un modelo.

El stack fue útil porque daba un orden para investigar: recorrer el flujo, contrastar lo que el servicio prometía, modificar el punto correcto, revisar el cambio y probar el caso que lo había motivado. No evitó los errores. Hizo más difícil esconderlos detrás de una respuesta convincente.

Eso es lo que busco al trabajar con IA: no una fábrica de código, sino un proceso que deje claro qué se cambió, por qué se cambió y cómo sé que no rompió otra cosa.
