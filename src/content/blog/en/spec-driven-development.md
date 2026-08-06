---
title: "Spec-Driven Development: Turning Complex Processes into Verifiable Software"
description: "How to turn complex B2B processes into verifiable software with OpenSpec, AI, and continuous validation, giving clients more clarity and less risk with every change."
date: 2026-08-03
author: Nicolas Del Rosario
language: en
alternate: /blog/spec-driven-development/
published: false
---

Building quickly can look like an advantage until a team realizes it has built the wrong system. In B2B processes, the cost of correcting that direction is not limited to code. It also affects commercial decisions, operations, and the confidence of the people who rely on the system.

## The problem was not only technical

The case was a B2B system for telecommunications. It needed to turn business, credit, geographic, and technical coverage information into operational decisions: determine whether an opportunity could move forward, support its commercial management, and coordinate an installation.

The difficulty was not an isolated screen. It was connecting rules, states, actors, and information sources without losing the meaning of each step. A request might require prequalification, commercial follow-up, additional checks, scheduling, and evidence. Every transition affected the next person and the information the business could treat as reliable.

That is why starting with forms, endpoints, or tables would have left too many decisions implicit. The challenge was to turn business intent into a system that could be reviewed before implementation and checked afterwards.

## From intent to a reviewable change

For this project, we used [OpenSpec](https://openspec.dev/) together with OpenCode. OpenSpec is not about writing documentation for its own sake or producing a static document that gets abandoned once development begins. It organizes each change as a reviewable unit: a proposal explains what should change and why; a design clarifies how it fits; tasks make the work explicit; and specification deltas show which requirements are being added, modified, or removed.

This makes it possible to discuss a decision before it is hidden inside an implementation. It also keeps specs as living context alongside the code: they evolve with the product and help explain not only what the system does, but which business intent supports that behavior.

OpenSpec should not be confused with Spec Kit. They are different tools and approaches. In this project, OpenSpec was the tool used to structure changes, designs, tasks, and specification deltas.

OpenCode supported problem exploration, implementation, review, and verification. AI helped navigate the code, propose changes, and identify cases that deserved attention, but the specification and validation kept business judgment visible.

## A system divided by responsibility

Separating the system by responsibility helped avoid forcing the entire process into one interface. The design centered on three connected areas:

- **Prequalification:** gathers the information needed to assess an opportunity, applies the relevant validations, and makes clear why it can proceed or needs attention.
- **Commercial CRM:** follows the opportunity, its owners, states, and next actions, preserving continuity between assessment and commercial management.
- **Installations:** coordinates field execution, available capacity, scheduling, rescheduling, and the evidence needed to close the work.

These are not three disconnected systems. Each part has a primary responsibility, and the relationships between them are defined precisely. As a result, a change in one stage can be reviewed for its impact on the others instead of surfacing as an operational surprise.

## The stack executes the specification

The specification became software through a stack made up of **CallAPI**, **Node-RED**, **HTML**, **CSS**, **Bootstrap**, **JavaScript**, and **PostgreSQL**. Each technology has a role in the flow: integrating and exposing capabilities, orchestrating processes, building interfaces, applying styles, handling interaction, and persisting business state.

The stack does not replace the specification. It executes it. OpenCode and AI support context discovery, focused implementation, consistency review, and verification against the agreed scenarios. When an ambiguity appears, the answer should not be to invent a rule in code. It should be to return to the intent, decide it, and update the reviewable change.

The system also integrates a document and evidence management flow. The important point is that evidence is part of the process and its validations, without making hidden assumptions about how it is managed.

## The important details are at the edges

The happy path is usually easy to describe. Reliability is decided by the cases that interrupt it. That is why the specifications and validations paid close attention to:

- valid states and transitions that must not be allowed;
- roles, permissions, and responsibilities at each stage;
- integration errors and incomplete responses;
- safe retries and duplicate prevention;
- available capacity before confirming an activity;
- rescheduling without losing history or context;
- the evidence needed to demonstrate what happened.

Thinking through these edges before and during implementation reduces improvised decisions. It also makes review concrete: instead of asking whether the system “seems to work,” the team can verify what happens when a response fails, an activity changes date, or two people try to record the same progress.

## What the client gains

The main benefit is not having more documents. It is having more clarity about what is being built and why.

- **Clarity:** process intent becomes understandable scenarios and responsibilities.
- **Traceability:** each change can be connected to a decision, a task, and a validation.
- **Maintainability:** specs remain living context for understanding behavior as the system evolves.
- **Lower risk:** ambiguities surface earlier, when discussing them is still cheaper than correcting them in production.

This also improves the conversation between business and technology. Business stakeholders do not need to read code, and technical teams do not need to guess commercial rules. Both sides get a reviewable point of reference.

## AI accelerates; the specification preserves judgment

Spec-Driven Development is not bureaucracy added to a software project. It makes explicit the intent that would otherwise be scattered across conversations, tickets, and decisions hidden in code.

AI can accelerate exploration and implementation. OpenCode can help turn tasks into verifiable changes. But the specification preserves judgment: what a decision means, which cases matter, what limits the process has, and how correctness will be established.

When a B2B process is complex, this combination makes it possible to move quickly without confusing speed with direction. The goal is not to build any system faster, but to build the right system and make every change explainable, reviewable, and maintainable.
