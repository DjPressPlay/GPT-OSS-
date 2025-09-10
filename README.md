# GPT OSS Cloud API

This is a lightweight Node.js wrapper for running a local GPT model via llama-cpp (or similar) and exposing it as a web API.

## Quick Start

```bash
npm install
node server.js
```

## Endpoint

POST /chat

```json
{
  "prompt": "What is Zetsumetsu Corp?"
}
```

## Render Deployment

- Use this repo on Render.com
- Choose "Web Service" → Node environment
- Port: 3000
