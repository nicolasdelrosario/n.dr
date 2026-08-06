---
title: "I Did Not Want Another Bot: I Built a WhatsApp API for n8n"
description: "The technical story behind WhatsApp n8n Server: a protected REST API for automating WhatsApp, connecting n8n workflows, and keeping the system operable."
date: 2026-08-04
author: Nicolas Del Rosario
language: en
alternate: /blog/whatsapp-n8n-server/
published: true
---

There is a difference between automating a message and building an integration that someone can operate every day. The first case may only need an HTTP request. The second needs authentication, retries, traceability, limits, and a clear way to know whether WhatsApp is actually ready.

That was the problem behind [WhatsApp n8n Server](https://github.com/nicolasdelrosario/whatsapp-n8n-server): a REST API that connects WhatsApp Web to [n8n](https://n8n.io/) without hiding the difficult parts behind a fragile workflow.

At the time of writing, the repository has 26 stars on GitHub. That number is a small but useful signal: there is interest in a piece of software that started as a concrete need and became an open-source project with a more complete architecture than it initially seemed to require.

## The problem was not sending a message

Sending a text is the easy part. Things become more complicated when the message belongs to a real process:

- A workflow may retry and should not duplicate an operation.
- WhatsApp may be authenticating, disconnected, or not ready yet.
- A broadcast should run without blocking the HTTP request.
- An incoming event must reach n8n and be verifiable.
- An integration needs to show what is happening when something fails.

That is why the project exposes a protected API with an API key, liveness and readiness healthchecks, OpenAPI documentation, and a Scalar interface. n8n consumes a normal HTTP interface while the server manages the session and the communication with WhatsApp Web.

## A WhatsApp session behind an API

The server uses `whatsapp-web.js` to communicate with WhatsApp Web. On the first startup it generates a QR code that is scanned from the phone. The session can then be kept locally or stored in PostgreSQL through `RemoteAuth`.

Docker makes startup reproducible and includes the environment required by Chromium. The session volume matters: deleting it means scanning the QR code again. It may sound like a minor operational detail, but this is exactly the kind of detail that turns a working demo into a service someone can maintain.

The API separates WhatsApp state from the operations n8n needs to perform:

- `GET /status` reports the connection state.
- `GET /qr-code` returns the current QR state.
- `POST /send-message` sends an individual message.
- `POST /reply-message` replies to an existing message.
- `POST /broadcast-message` creates a broadcast job.
- `GET /broadcasts/:id` returns the job result.

All protected endpoints require `x-api-key`. Interactive documentation is available at `/api/v1/docs`, and the OpenAPI contract is available at `/api/v1/openapi.json`.

## Broadcasts without blocking the workflow

A message sent to several recipients should not keep a request open while every delivery takes place. The server creates a job and returns an identifier:

```json
{
  "status": "queued",
  "jobId": "95d8baf4-5b45-4af4-8a9b-2e9d7e8fbe7b"
}
```

n8n can store that `jobId` and check its status later. The queue processes recipients sequentially, removes duplicates after normalizing phone numbers, and respects a configurable delay between deliveries.

This solution is intentionally simple. The queue lives in memory, so jobs are lost when the process restarts and are not shared between replicas. It is not trying to be a distributed system yet. It provides a clear foundation for smaller automations and leaves the exact point visible where a persistent queue would be needed as volume grows.

## Retrying without duplicating actions

Automated workflows often retry. If a request creates an order, notification, or broadcast, repeating it without control can have real consequences.

That is why protected `POST` requests accept an `Idempotency-Key`. When n8n repeats a request with the same key and body, it receives the original response. If it reuses the key with a different body, the server responds with `409 Conflict`.

Idempotency is also local to the process and retained for 24 hours. That is enough for the current use case, but the README makes the limit explicit: keys are not shared between replicas and do not survive a restart. Documenting that boundary is more useful than pretending an in-memory cache solves every scenario.

## Incoming messages and trust

The integration also works in the other direction. When a message arrives, the server can send it to an n8n webhook with a payload containing the event, message ID, sender, chat, and content.

Each webhook is signed with HMAC SHA-256 using a secret configured by the operator. n8n or the receiving service must verify the signature against the original JSON body before processing it. Transient failures are retried, but authenticity validation remains the consumer's responsibility.

That boundary matters. A webhook is not trustworthy merely because it comes from a private URL. The receiver must be able to prove that the event came from the expected server and that its body was not changed in transit.

## Operability before magic

Besides WhatsApp operations, the server includes controls that often appear too late:

- Rate limiting per API key.
- `X-Request-Id` for request correlation.
- Basic Prometheus-compatible counters.
- Separate endpoints to tell whether the process is alive and ready for traffic.
- Input validation with schemas and consistent HTTP errors.
- Tests for the domain, controllers, HTTP layer, retries, webhooks, persistence, and the queue.

The project is organized around a separation between domain, use cases, and infrastructure. This is not decorative architecture: it makes rules such as phone-number normalization and idempotency testable without starting Chromium for every test.

## What I learned building it

The most important decision was treating limits as part of the design. WhatsApp Web is not the same as an official API, an in-memory queue is not distributed infrastructure, and an HTTP healthcheck alone does not guarantee that an account is ready to send messages.

I also confirmed that a useful integration does not need to begin with every possible feature. The project currently focuses on text messages, broadcasts, and webhooks. Media, templates, and multiple sessions are not included yet. Keeping the scope visible makes the API easier to understand and ensures future decisions respond to real needs instead of imaginary scenarios.

WhatsApp n8n Server started with a simple idea: make an n8n automation possible. It became a more interesting exercise: turning a WhatsApp Web session into a service with a contract, basic security, observability, and a clear path to grow.

The 26 stars are not the project's conclusion. They are a signal that it is worth continuing to build on it.

[View WhatsApp n8n Server on GitHub](https://github.com/nicolasdelrosario/whatsapp-n8n-server)
