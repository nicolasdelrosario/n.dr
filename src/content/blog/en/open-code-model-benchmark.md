---
title: "One Model per Task: How I Controlled the Cost of Working with AI"
description: "How I assigned free models to exploration and review while reserving higher-capability models for implementation and architecture in an AI workflow."
date: 2026-08-09
author: Nicolas Del Rosario
language: en
alternate: /blog/open-code-model-benchmark/
---

There is no single best model. The model that helps locate a dependency is not necessarily the one to use for reviewing a change or making an architectural decision. In a real workflow, the important question is what work each model should do and how costly it is when it gets that work wrong.

## The question was not which model was most powerful

My OpenCode stack divides work by responsibility. `explorer` understands the repository before anything is changed; `reviewer` looks for problems and evidence; `implementer` edits files; and `architect` analyzes decisions with broader consequences. Luna coordinates the workflow, while Terra is available for architecture problems that need deeper analysis.

That separation changes how a model should be evaluated. For exploration, it matters whether the model can follow call paths and find relevant files without inventing context. For review, it matters whether it can distinguish a real defect from a remote possibility. Implementation also requires scope control and reliable tool calling. Specialization is not a way to make the stack more complicated; it is a way to assign the right level of trust to each task.

## The test

I compared four free models available for the stack: **Big Pickle**, **DeepSeek V4 Flash Free**, **North Mini Code Free**, and **Nemotron Ultra Free**. I was not trying to turn the exercise into an abstract competition. I used the models for tasks that resemble real maintenance work: reading a structure, tracing a flow, and reviewing an existing implementation.

Model selection and availability can change, so the [OpenCode models documentation](https://opencode.ai/docs/models/) and the [Models.dev](https://models.dev/) catalogue are the right places to check before reproducing the setup.

## What we measured

I looked at five things:

- **Accuracy:** whether the conclusions matched what was actually in the repository.
- **File-level evidence:** whether the model cited verifiable paths, symbols, and snippets instead of making general claims.
- **Problem detection:** whether it found defects or risks worth investigating.
- **False positives:** whether it described valid behavior or unsupported possibilities as problems.
- **Tool-calling stability:** whether it chose valid tools, used them in the necessary order, and recovered context without drifting.

I did not assign a numerical score. For this kind of work, a concrete observation tied to a path or a well-bounded review is more useful than a number that implies a level of precision the test cannot support.

## Real tasks

The tasks used public repositories and a public stack configuration, without including credentials, customer information, or private data.

First, I asked the models to explore this blog’s flow: locate the bilingual content, understand how the articles relate to one another, and check which part of the site generates its metadata. Then I traced the wishlist flow in **Prince Club de Libros**, a public book catalogue with authentication, stock, offers, and WhatsApp contact. The task was to follow the behavior from the interface through related routes and services, not to modify the product.

Finally, I reviewed localized routes and JSON-LD. The goal was to check that a Spanish page and its English alternative kept a coherent relationship and that the `Article` schema represented the right content. Every run used equivalent prompts and read-only permissions.

## What we found

**DeepSeek V4 Flash Free** was the most consistent model for exploration and review. It found relevant context, supported its conclusions with concrete files, and more reliably distinguished a confirmed issue from a recommendation.

**Big Pickle** was a solid baseline. It completed the tasks with reasonable behavior and produced useful observations, although it was less consistent in the depth of its investigation.

**North Mini Code Free** produced false positives during review and made an initial attempt to use an invalid tool. That does not make it useless, but it increases supervision cost in roles where evidence and precision matter.

**Nemotron Ultra Free** explored the repository well, but one response was interrupted by streaming. The visible reasoning was useful; the interruption introduced operational uncertainty that should not be ignored.

## The chosen configuration

The configuration I kept was:

- **DeepSeek V4 Flash Free** for `explorer` and `reviewer`, because it offered the best observed combination of repository traversal, evidence, and problem detection.
- **Luna** for `implementer`, because editing files requires keeping scope under control, following persistent instructions, and verifying the result—not merely generating a plausible proposal.
- **Terra** for `architect`, because critical decisions should use a model selected for capability and judgment, not simply because it is available at no cost.

I did not put a free model in charge of editing or critical architecture decisions. The reason is not that a free model cannot produce valid code. The relevant cost also includes reviewing changes, finding omissions, and correcting decisions that are difficult to undo. For those roles, I prefer to pay for more stable capability and reserve free models for bounded, read-only tasks that are easy to verify.

## What this test does not prove

This was not a scientific benchmark or a universal ranking. It was a small sample of read-only tasks against specific repositories and workflows. Results can change with another model version, provider, context, or task.

The CLI also does not allow subagents to be selected directly. For that reason, the tests compared models with equivalent prompts and read-only permissions and instructions, rather than running the final role configuration exactly as it exists inside the CLI. That limitation matters: the test helps guide a practical assignment; it does not prove that one model will win in every workflow.

## Choose with evidence

The conclusion was not that a free model can replace the entire stack. It was that a free model can occupy a specific role when its behavior is observed and its boundary is clear.

Choosing models for OpenCode means balancing evidence, role, and cost. Hype can suggest what to test; it should not decide which model gets permission to explore, review, edit, or influence architecture. A useful configuration makes that decision explicit and keeps verification on the human side.
