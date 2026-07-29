---
title: "My OpenCode Setup for Building with AI Without Losing Judgment"
description: "How I used OpenCode, Spec Kit, and persistent memory to build Prince Club de Libros with AI, from the initial idea to a functional product in production."
date: 2026-07-28
language: en
alternate: /blog/opencode-setup/
---

The problem with building with AI is usually not generating code. It is keeping context, boundaries, and judgment intact when execution speeds up. My OpenCode setup grew out of that tension, and I tested it on a project that could not remain a demo: [Prince Club de Libros](https://prince-club-de-libros.nicolasdelrosario.com/).

## A real case, not a demo

Prince Club de Libros is a functional book catalogue for discovering books, checking stock and offers, saving a wishlist, and getting in touch through WhatsApp. It also needed authentication, an admin panel, and images. The idea was simple; turning it into a coherent, usable, deployed product required many small decisions without losing the thread.

That is where Spec Kit came in. I did not use it as an extra ceremony, but as the way to turn the idea into a specification, a design, concrete tasks, and validations. The plan ended up with 86 tasks. That number is not a productivity metric on its own: it made the scope visible and let me move through pieces that could be reviewed.

## A setup built around specific problems

Each part has a clear responsibility:

- **CodeGraph** lets me understand symbols, dependencies, and call paths before editing. It solves the problem of touching a file without seeing who depends on it.
- **Context7** retrieves current documentation for libraries and frameworks. That means I do not have to rely on a generic answer or an API that has changed.
- **Engram** preserves decisions, lessons, and summaries between sessions. Useful context does not disappear when I close the conversation.
- **Ponytail** keeps the scope and solution small: first question whether something needs to exist, then look for the smallest change that works.
- **Routing and subagents** separate exploration, implementation, and debugging. Not every problem deserves the same reasoning budget or the same kind of agent.

Persistent instructions in `AGENTS.md` connect these pieces: they define how to explore, when to edit, which role to use, and how to verify. The goal is not to automate judgment, but to make the workflow apply it consistently.

## Where integration tested the workflow

After the MVP was generated, problems appeared at the edges: authentication recovery did not behave as expected, image policies blocked valid cases, some errors were not handled well, and offer selection was not deterministic.

AI helped locate and propose fixes, but it did not replace verification. Reviewing the full flow, checking the documentation, and testing those cases is what fixed them. The setup proved useful precisely there: decisions were bounded, context could be recovered, and every adjustment had a clear validation.

## The result

The project took approximately 3 days, with 40 commits, 86 Spec Kit tasks, 10 migrations, and a functional product in production. I am not presenting these figures as absolute causation or as a promise of speed; they describe the result of using this workflow in this case.

Without it, it would have been easier to lose decisions, repeat exploration, mix in changes with unclear boundaries, and end up less confident in the product’s edges. With it, the work had external memory, visible limits, and concrete verification points.

AI accelerates execution, but judgment remains human. Context, boundaries, memory, and verification are what turn that speed into reliable software.
