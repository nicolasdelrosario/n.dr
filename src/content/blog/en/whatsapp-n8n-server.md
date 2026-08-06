---
title: "The Message Was the Easy Part"
description: "What it took to turn a WhatsApp Web session into an API that n8n could safely retry."
date: 2026-08-04
author: Nicolas Del Rosario
language: en
alternate: /blog/whatsapp-n8n-server/
published: true
---

Sending a WhatsApp message from [n8n](https://n8n.io/) takes one HTTP request. The first time it works, the project looks finished. Then the workflow retries, the session is not ready yet, or the process restarts after queuing a broadcast. At that point, the message is no longer the interesting part.

I built [WhatsApp n8n Server](https://github.com/nicolasdelrosario/whatsapp-n8n-server) to turn a WhatsApp Web session into an interface a workflow could query and retry. It does not hide the fragility of that session. It turns it into explicit states, contracts, and limits.

## WhatsApp is not always ready

The server uses `whatsapp-web.js`. On first startup, it displays a QR code that must be scanned from a phone; after that, it keeps the session locally or in PostgreSQL through `RemoteAuth`. Delete the Docker session volume and you have to authenticate again. That one detail already separates a demo from something a person can operate.

It also meant separating two questions that sound alike but are not: is the process responding, and can WhatsApp send a message? The liveness endpoint answers the first. The readiness endpoint only succeeds when the session can handle traffic. n8n does not have to guess whether it can proceed: it can check state before running an operation.

The API uses `x-api-key`, but the point is not to add a barrier by default. It gives n8n a conventional HTTP interface while the server handles the browser, the session, and their transitions.

## n8n retries

Retries are a good idea until they repeat something that should only happen once. A workflow can send a notification again, create a second broadcast, or repeat an operation tied to an order.

Protected `POST` requests therefore accept `Idempotency-Key`. If n8n repeats the same request with the same key and body, it gets the original response. Reusing that key with a different body returns `409 Conflict`. The key can come from an n8n execution ID or a business operation: something stable that survives an attempt.

This is not a universal solution. The idempotency cache lives in process memory, keeps keys for 24 hours, and disappears when the process restarts. It is not shared between replicas either. The project does not present that as distributed infrastructure; it makes clear when it would need to be replaced.

## A broadcast takes time

Sending a message to one hundred recipients should not leave an HTTP request open until the final delivery. `POST /broadcast-message` creates a job and returns a `jobId`. The workflow can save that identifier, move on, and query the result later.

The queue processes recipients sequentially, removes duplicates after normalizing numbers, and observes a configurable delay. Again, the boundary matters: the queue is in memory. If the process crashes, jobs are lost. For a small automation that keeps complexity down; for replicas or durable delivery, it calls for a persistent queue.

## A webhook needs proof

The integration works in the other direction as well. When a message arrives, the server can send it to an n8n webhook. But a private URL does not prove where an event came from.

Every delivery carries an HMAC SHA-256 signature calculated from the original JSON body using an operator-provided secret. The receiver must verify it before processing the content. Transient errors are retried, but authenticity remains the consumer's responsibility.

That boundary mattered more than another feature. Without it, an endpoint that responds to incoming messages cannot distinguish a real event from a fabricated request.

## What it does not solve

WhatsApp Web is not an official WhatsApp API. This project depends on its availability and behaviour. It covers text messages, broadcasts, and webhooks, but not media, templates, or multiple sessions. Session storage can use PostgreSQL, while broadcasts and idempotency keys are still not durable.

That does not make the server accidentally incomplete. It defines its scope. The work was not making one message leave once. It was making the next failure observable, the next retry non-duplicating, and the next limit visible instead of buried inside a workflow.

[View WhatsApp n8n Server on GitHub](https://github.com/nicolasdelrosario/whatsapp-n8n-server)
