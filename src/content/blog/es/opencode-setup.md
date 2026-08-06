---
title: "Mi setup de OpenCode para construir con IA sin perder el criterio"
description: "Cómo trabajo con OpenCode e IA para convertir una idea en un producto real: el caso de Prince Club de Libros y un flujo con contexto, criterio y verificación."
date: 2026-07-28
author: Nicolas Del Rosario
language: es
alternate: /en/blog/opencode-setup/
published: true
---

Construir con IA no consiste en pedir código y aceptar el resultado. Consiste en conservar el contexto, los límites y el criterio cuando la ejecución se acelera. Ese es el enfoque que aplico con OpenCode y que probé en un proyecto real: [Prince Club de Libros](https://prince-club-de-libros.nicolasdelrosario.com/).

## Un caso real, no una demo

Prince Club de Libros es un catálogo editorial para descubrir libros, consultar stock y ofertas, guardar una wishlist y contactar por WhatsApp. También necesitaba autenticación, un panel de administración e imágenes. Su stack actual es Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, shadcn/ui, Supabase para PostgreSQL, Auth, Storage y RLS, Resend SMTP y Vercel.

La idea era sencilla; convertirla en un producto coherente, usable y desplegado exigía tomar muchas decisiones pequeñas sin perder el hilo.

Ahí entró Spec Kit. No lo usé como una ceremonia adicional, sino como la forma de convertir la idea en una especificación, un diseño, tareas concretas y validaciones. La planificación terminó en 86 tareas. Ese número no es una métrica de productividad por sí mismo: hizo visible el alcance y permitió avanzar por piezas que se podían revisar.

## Un flujo de trabajo, no una caja negra

Cada parte del stack de OpenCode tiene una responsabilidad concreta:

- **Luna** orquesta el trabajo. Según la tarea, uso **explorer** para entender el código, **reviewer** para revisarlo, **implementer** para cambiarlo y **architect** para los problemas que requieren más análisis.
- **Ponytail** mantiene el alcance y la solución pequeños: primero cuestiona si algo necesita existir y luego busca el cambio mínimo que funciona.
- **Engram** conserva decisiones, aprendizajes y resúmenes entre sesiones, para que el contexto útil no desaparezca al cerrar una conversación.
- **CodeGraph** permite entender símbolos, dependencias y rutas de llamada antes de editar cuando el proyecto tiene un índice disponible; sin ese índice, uso la exploración normal del repositorio.
- **Context7** recupera documentación actual de librerías y frameworks, mientras **RTK** reduce el ruido de los comandos de terminal.
- Los plugins locales y la configuración portable que mantengo en mis dotfiles hacen que este flujo sea reproducible entre proyectos y equipos.

Las instrucciones persistentes de `AGENTS.md` conectan estas piezas: indican cómo explorar, cuándo editar, qué rol usar y cómo verificar. El objetivo no es automatizar el criterio ni afirmar que la IA hizo todo sola, sino hacer que el trabajo sea más trazable y consistente.

## Donde la integración puso a prueba el flujo

Después de generar el MVP aparecieron problemas en los bordes: la recuperación de autenticación no se comportaba como esperaba, las políticas de imágenes bloqueaban casos válidos, algunos errores no se manejaban bien y la selección de ofertas no era determinista.

La IA ayudó a localizar y proponer correcciones, pero no sustituyó la verificación. Revisar el flujo completo, contrastar la documentación y probar esos casos fue lo que permitió corregirlos. El valor del setup apareció precisamente ahí: las decisiones estaban acotadas, el contexto se podía recuperar y cada ajuste tenía una validación clara.

## El resultado

El resultado fue un producto funcional en producción, con 40 commits, 86 tareas de Spec Kit y 13 migraciones. No presento estas cifras como una causalidad absoluta ni como una promesa de velocidad; describen el resultado de trabajar con ese flujo en este caso.

Sin él, habría sido más fácil perder decisiones, repetir exploración, mezclar cambios poco acotados y terminar con menos confianza en los bordes del producto. Con él, el trabajo tuvo una memoria externa, límites visibles y puntos concretos de verificación.

La IA acelera la ejecución, pero el criterio sigue siendo humano. El contexto, los límites, la memoria y la verificación son lo que convierte esa velocidad en software confiable.
