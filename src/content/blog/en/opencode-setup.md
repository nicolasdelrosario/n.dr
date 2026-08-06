---
title: "My OpenCode Stack for Building with AI Without Losing Judgment"
description: "How I organize exploration, implementation, review, memory, documentation, and design when working with AI."
date: 2026-07-28
author: Nicolas Del Rosario
language: en
alternate: /blog/opencode-setup/
published: true
---

I do not want an agent writing code before it understands what is changing. I also do not want to repeat repository exploration every time I return to a task. My OpenCode stack exists to solve those two problems: separate the work, retain decisions, and leave a concrete way to verify the result.

It is not a recipe for building faster at any cost. It is the set of boundaries I use so that AI does not turn a small change into a large answer that is difficult to review.

## I start by understanding, not editing

The first step is not opening a file and asking for a solution. It is locating the affected flow: which components use it, where information enters, which rules are shared by different paths, and which parts should not be touched.

For that, I use OpenCode's exploration role. When a project has an available index, CodeGraph helps trace symbols and call paths; without one, normal repository exploration does the same job. The tool changes, but the rule does not: before editing a function, understand who depends on it.

If a decision depends on a library, an API, or an external service, I check its current documentation through Context7. I do not use documentation to decorate an answer. I use it to test a hypothesis before turning it into code.

## Each role has one responsibility

OpenCode lets me separate exploration, implementation, review, and decisions with broader consequences. That division matters more than the name of any model.

- **Explorer** traverses the project and gathers evidence before a change exists.
- **Implementer** changes files and runs the necessary verification.
- **Reviewer** looks for regressions, risks, and cases a change may have missed.
- **Architect** is reserved for architecture, security, performance, or complex debugging decisions.

Luna coordinates implementation work. Terra is reserved for analysis that genuinely needs more depth. I do not assign a model by prestige or ask every model to do everything: each role has a scope that can be reviewed.

## Memory does not replace the repository

Engram saves decisions, discoveries, and summaries between sessions. It is useful when a fix depends on a previous conversation or when I need to remember why an alternative was rejected. Code and tests remain the source of truth; memory keeps useful context from disappearing when a session ends.

My [persistent OpenCode instructions](https://github.com/nicolasdelrosario/dotfiles/blob/main/opencode/AGENTS.md) connect the flow: they specify how to explore, when to check documentation, which kind of change to delegate, and how to verify it. The goal is not to write rules for every possible case. It is to reduce the decisions I would otherwise need to explain from scratch.

## The smallest solution still needs review

Ponytail acts as a brake on default complexity. Before adding a new layer, it asks whether the problem already has a solution in the repository, the standard library, or the platform. Its value is not writing fewer lines for its own sake; it is avoiding changes that no one can justify later.

RTK makes terminal commands easier to read. It is a small part of the stack, but useful when verification is part of daily work rather than a step remembered at the end.

## Design is reviewed too

Hallmark comes in when a change affects an interface. It does not decide the product or replace an accessibility review. It helps prevent a generic visual outcome: it preserves a site's tokens and visual language, reviews structure, and requires checking mobile behaviour.

On this portfolio, Hallmark does not mean replacing every page with a new aesthetic. It means preserving the existing side rail, typography, and palette while fixing concrete problems, such as navigation that did not fit on mobile. Design is treated as code: it has constraints, states, and possible regressions.

## Where it was tested

I tested this flow while building [Prince Club de Libros](https://prince-club-de-libros.nicolasdelrosario.com/), a catalogue with stock, offers, a wishlist, authentication, images, WhatsApp contact, and administration.

The problems appeared at the edges. Authentication recovery did not behave as expected, some image policies blocked valid cases, errors were not handled consistently, and offer selection was not deterministic. None of those could be solved by reading one file or accepting a model's first proposal.

The stack was useful because it gave the investigation an order: trace the flow, check what a service promised, change the correct point, review the change, and test the case that motivated it. It did not prevent errors. It made it harder to hide them behind a convincing answer.

That is what I want from working with AI: not a code factory, but a process that makes clear what changed, why it changed, and how I know it did not break something else.
