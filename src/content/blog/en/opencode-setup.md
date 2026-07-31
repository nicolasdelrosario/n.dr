---
title: "My OpenCode Setup for Building with AI Without Losing Judgment"
description: "How I work with OpenCode and AI to turn an idea into a real product: the Prince Club de Libros case and a workflow built around context, judgment, and verification."
date: 2026-07-28
author: Nicolas Del Rosario
language: en
alternate: /blog/opencode-setup/
---

Building with AI is not about asking for code and accepting the result. It is about keeping context, boundaries, and judgment intact when execution speeds up. That is the approach I use with OpenCode, tested on a real project: [Prince Club de Libros](https://prince-club-de-libros.nicolasdelrosario.com/).

## A real case, not a demo

Prince Club de Libros is a book catalogue for discovering books, checking stock and offers, saving a wishlist, and getting in touch through WhatsApp. It also needed authentication, an admin panel, and images. Its current stack is Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, shadcn/ui, Supabase for PostgreSQL, Auth, Storage, and RLS, Resend SMTP, and Vercel.

The idea was simple; turning it into a coherent, usable, deployed product required many small decisions without losing the thread.

That is where Spec Kit came in. I did not use it as an extra ceremony, but as the way to turn the idea into a specification, a design, concrete tasks, and validations. The plan ended up with 86 tasks. That number is not a productivity metric on its own: it made the scope visible and let me move through pieces that could be reviewed.

## A workflow, not a black box

Each part of the OpenCode stack has a specific responsibility:

- **Luna** orchestrates the work. Depending on the task, I use **explorer** to understand the code, **reviewer** to review it, **implementer** to change it, and **architect** for problems that need deeper analysis.
- **Ponytail** keeps the scope and solution small: first question whether something needs to exist, then look for the smallest change that works.
- **Engram** preserves decisions, lessons, and summaries between sessions, so useful context does not disappear when I close a conversation.
- **CodeGraph** helps me understand symbols, dependencies, and call paths before editing when the project has an index available; without one, I use the repository's normal exploration tools.
- **Context7** retrieves current documentation for libraries and frameworks, while **RTK** reduces terminal command noise.
- Local plugins and portable configuration maintained in my dotfiles make the workflow reproducible across projects and machines.

Persistent instructions in `AGENTS.md` connect these pieces: they define how to explore, when to edit, which role to use, and how to verify. The goal is not to automate judgment or claim that AI did everything alone, but to make the work more traceable and consistent.

## Where integration tested the workflow

After the MVP was generated, problems appeared at the edges: authentication recovery did not behave as expected, image policies blocked valid cases, some errors were not handled well, and offer selection was not deterministic.

AI helped locate and propose fixes, but it did not replace verification. Reviewing the full flow, checking the documentation, and testing those cases is what fixed them. The setup proved useful precisely there: decisions were bounded, context could be recovered, and every adjustment had a clear validation.

## The result

The result was a functional product in production, with 40 commits, 86 Spec Kit tasks, and 13 migrations. I am not presenting these figures as absolute causation or as a promise of speed; they describe the result of using this workflow in this case.

Without it, it would have been easier to lose decisions, repeat exploration, mix in changes with unclear boundaries, and end up less confident in the product’s edges. With it, the work had external memory, visible limits, and concrete verification points.

AI accelerates execution, but judgment remains human. Context, boundaries, memory, and verification are what turn that speed into reliable software.
