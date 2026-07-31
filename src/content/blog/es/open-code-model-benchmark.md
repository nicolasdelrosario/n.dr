---
title: "Un modelo para cada tarea: cómo controlé el costo de trabajar con IA"
description: "Cómo asigné modelos gratuitos a exploración y revisión, reservando modelos de mayor capacidad para implementación y arquitectura en un flujo de trabajo con IA."
date: 2026-08-09
author: Nicolas Del Rosario
language: es
alternate: /en/blog/open-code-model-benchmark/
---

No existe un mejor modelo universal. El modelo que ayuda a encontrar una dependencia no tiene por qué ser el que conviene para revisar un cambio o tomar una decisión de arquitectura. En un flujo real, la pregunta importante es qué trabajo debe hacer cada modelo y qué riesgo tiene equivocarse.

## La pregunta correcta no era cuál es el modelo más potente

Mi stack de OpenCode divide el trabajo por responsabilidades. `explorer` entiende el repositorio antes de tocarlo; `reviewer` busca problemas y evidencia; `implementer` modifica archivos; y `architect` analiza decisiones con consecuencias más amplias. Luna coordina el flujo y Terra queda disponible para los problemas de arquitectura que requieren más profundidad.

Esa separación cambia la forma de evaluar un modelo. Para explorar, importa que siga rutas de llamada y encuentre archivos relevantes sin inventar contexto. Para revisar, importa que distinga un defecto real de una posibilidad remota. Para implementar, además, hacen falta control del alcance y un tool calling fiable. La especialización no es una forma de complicar el stack: es una forma de asignar el nivel de confianza adecuado a cada tarea.

## La prueba

Comparé cuatro modelos gratuitos disponibles para el stack: **Big Pickle**, **DeepSeek V4 Flash Free**, **North Mini Code Free** y **Nemotron Ultra Free**. No intenté convertir la prueba en una competición abstracta. Usé los modelos para tareas que se parecen a las que realmente aparecen al mantener un producto: leer una estructura, seguir un flujo y revisar una implementación existente.

La selección y disponibilidad de modelos puede cambiar, por lo que conviene consultar la [documentación de modelos de OpenCode](https://opencode.ai/docs/models/) y el catálogo de [Models.dev](https://models.dev/) antes de reproducir la configuración.

## Qué medimos

Observé cinco aspectos:

- **Exactitud:** si las conclusiones coincidían con lo que realmente había en el repositorio.
- **Evidencia en archivos:** si citaba rutas, símbolos y fragmentos verificables en vez de responder con generalidades.
- **Detección de problemas:** si encontraba defectos o riesgos que merecían atención.
- **Falsos positivos:** si presentaba como problema un comportamiento válido o una posibilidad sin respaldo.
- **Estabilidad del tool calling:** si elegía herramientas válidas, las usaba en el orden necesario y recuperaba el contexto sin desviarse.

No asigné una puntuación numérica. Para este tipo de trabajo, una observación concreta sobre una ruta o una revisión bien delimitada es más útil que un número que sugiera una precisión que la prueba no puede sostener.

## Tareas reales

Las tareas se apoyaron en repositorios públicos y en una configuración pública del stack, sin incluir credenciales, información de clientes ni datos privados.

Primero pedí explorar el flujo de este blog: localizar el contenido bilingüe, entender cómo se relacionan los artículos y comprobar qué parte del sitio genera sus metadatos. Después rastreé la wishlist de **Prince Club de Libros**, un catálogo editorial público con autenticación, stock, ofertas y contacto por WhatsApp. La tarea consistía en seguir el comportamiento desde la interfaz hasta las rutas y servicios relacionados, no en modificar el producto.

Por último revisé rutas localizadas y JSON-LD. El objetivo era comprobar que una página en español y su alternativa en inglés conservaran una relación coherente y que el schema `Article` reflejara el contenido correcto. Todas las ejecuciones usaron prompts equivalentes y permisos de solo lectura.

## Lo que encontramos

**DeepSeek V4 Flash Free** fue el más consistente en exploración y revisión. Encontró contexto relevante, apoyó sus conclusiones en archivos concretos y mantuvo mejor la diferencia entre un problema confirmado y una recomendación.

**Big Pickle** fue una línea base sólida. Completó las tareas con un comportamiento razonable y produjo observaciones útiles, aunque con menos consistencia en la profundidad del recorrido.

**North Mini Code Free** produjo falsos positivos en la revisión y tuvo un intento inicial de herramienta inválida. Ese tipo de comportamiento no lo convierte en un modelo inútil, pero sí aumenta el coste de supervisión en roles donde la evidencia y la precisión importan.

**Nemotron Ultra Free** exploró bien el repositorio, pero una respuesta quedó interrumpida por streaming. La capacidad de razonamiento visible era útil; la interrupción, en cambio, introduce una incertidumbre operativa que no conviene ignorar.

## La configuración elegida

La configuración que mantuve fue:

- **DeepSeek V4 Flash Free** para `explorer` y `reviewer`, porque ofreció la mejor combinación observada de recorrido, evidencia y detección de problemas.
- **Luna** para `implementer`, porque editar archivos requiere mantener el alcance, respetar las instrucciones persistentes y verificar el resultado, no solo generar una propuesta plausible.
- **Terra** para `architect`, porque las decisiones críticas necesitan un modelo elegido por capacidad y criterio, no únicamente por estar disponible sin coste.

No puse un modelo gratuito a editar ni a tomar decisiones de arquitectura crítica. El motivo no es que un modelo gratuito no pueda producir código válido. Es que el coste relevante incluye revisar cambios, detectar omisiones y corregir decisiones difíciles de deshacer. En esos roles prefiero pagar por una capacidad más estable y reservar los modelos gratuitos para tareas acotadas, read-only y fáciles de contrastar.

## Lo que esta prueba no demuestra

Esto no es un benchmark científico ni un ranking universal. Fue una muestra pequeña, con tareas read-only, sobre repositorios y flujos concretos. Los resultados pueden cambiar con otra versión del modelo, otro proveedor, otro contexto o una tarea distinta.

Además, la CLI no permite seleccionar directamente subagentes. Por eso las pruebas compararon modelos con prompts equivalentes y con permisos e instrucciones de solo lectura, en lugar de ejecutar exactamente la configuración final de roles dentro de la CLI. Esa limitación es importante: la prueba sirve para orientar una asignación práctica, no para demostrar que un modelo ganará en cualquier flujo.

## Elegir con evidencia

La conclusión no fue que un modelo gratuito sustituya a todo el stack. Fue que puede ocupar un rol concreto si se observa su comportamiento y se define un límite claro.

Elegir modelos para OpenCode consiste en combinar evidencia, rol y coste. El hype puede orientar qué probar; no debería decidir qué modelo tiene permiso para explorar, revisar, editar o influir en una arquitectura. La configuración útil es la que hace explícita esa decisión y deja la verificación del lado humano.
