---
title: "Mi setup de OpenCode para construir con IA sin perder el criterio"
description: "Cómo usé OpenCode, Spec Kit y memoria persistente para construir Prince Club de Libros con IA, desde la idea inicial hasta un producto funcional en producción."
date: 2026-07-28
language: es
alternate: /en/blog/opencode-setup/
---

El problema de construir con IA no suele ser generar código. Es conservar el contexto, los límites y el criterio cuando la ejecución se acelera. Mi setup de OpenCode nació de esa tensión y lo probé en un proyecto que no podía quedarse en una demo: [Prince Club de Libros](https://prince-club-de-libros.nicolasdelrosario.com/).

## Un caso real, no una demo

Prince Club de Libros es un catálogo editorial funcional para descubrir libros, consultar stock y ofertas, guardar una wishlist y contactar por WhatsApp. También necesitaba autenticación, un panel de administración e imágenes. La idea era sencilla; convertirla en un producto coherente, usable y desplegado exigía tomar muchas decisiones pequeñas sin perder el hilo.

Ahí entró Spec Kit. No lo usé como una ceremonia adicional, sino como la forma de convertir la idea en una especificación, un diseño, tareas concretas y validaciones. La planificación terminó en 86 tareas. Ese número no es una métrica de productividad por sí mismo: hizo visible el alcance y permitió avanzar por piezas que se podían revisar.

## El setup responde a problemas concretos

Cada parte tiene una responsabilidad clara:

- **CodeGraph** me permite entender símbolos, dependencias y rutas de llamada antes de editar. Resuelve el problema de tocar un archivo sin ver quién depende de él.
- **Context7** recupera documentación actual de librerías y frameworks. Así no tengo que confiar en una respuesta genérica o en una API que cambió.
- **Engram** conserva decisiones, aprendizajes y resúmenes entre sesiones. Evita que el contexto útil desaparezca cuando cierro la conversación.
- **Ponytail** mantiene el alcance y la solución pequeños: primero cuestiona si algo necesita existir y luego busca el cambio mínimo que funciona.
- **Routing y subagents** separan exploración, implementación y debugging. No todo problema merece el mismo nivel de razonamiento ni el mismo tipo de agente.

Las instrucciones persistentes de `AGENTS.md` conectan estas piezas: indican cómo explorar, cuándo editar, qué rol usar y cómo verificar. El objetivo no es automatizar el criterio, sino hacer que el flujo lo aplique de forma consistente.

## Donde la integración puso a prueba el flujo

Después de generar el MVP aparecieron problemas en los bordes: la recuperación de autenticación no se comportaba como esperaba, las políticas de imágenes bloqueaban casos válidos, algunos errores no se manejaban bien y la selección de ofertas no era determinista.

La IA ayudó a localizar y proponer correcciones, pero no sustituyó la verificación. Revisar el flujo completo, contrastar la documentación y probar esos casos fue lo que permitió corregirlos. El valor del setup apareció precisamente ahí: las decisiones estaban acotadas, el contexto se podía recuperar y cada ajuste tenía una validación clara.

## El resultado

El proyecto tomó aproximadamente 3 días, con 40 commits, 86 tareas de Spec Kit, 10 migraciones y un producto funcional en producción. No presento estas cifras como una causalidad absoluta ni como una promesa de velocidad; describen el resultado de trabajar con ese flujo en este caso.

Sin él, habría sido más fácil perder decisiones, repetir exploración, mezclar cambios poco acotados y terminar con menos confianza en los bordes del producto. Con él, el trabajo tuvo una memoria externa, límites visibles y puntos concretos de verificación.

La IA acelera la ejecución, pero el criterio sigue siendo humano. El contexto, los límites, la memoria y la verificación son lo que convierte esa velocidad en software confiable.
