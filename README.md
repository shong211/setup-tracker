# Setup Tracker

A personal checklist for setting up a new Macbook for tech work and "vibe coding". My first Next.js project — built to track the rest of my own setup, then iterated on as a way to learn TypeScript, Tailwind, and the Cursor + AI workflow.

## Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- localStorage for persistence (no backend)

## Run locally
```bash
pnpm install
pnpm dev
```
Open http://localhost:3000.

## Edit the checklist
Add or remove items in `src/lib/checklist-data.ts`. Categories and items are plain TypeScript — no DB, no API.

## Built with
- [Cursor](https://cursor.com) — AI-first IDE
- [Claude](https://claude.ai) — pair programmer through the whole setup
