# Vamsi's AI Notes

A small full-stack prototype: a note-taking app built with **Next.js + TypeScript + Tailwind CSS**, using **Supabase (Postgres)** for data persistence. Optional AI summarization is available via the OpenAI API.

Live demo: *(add your Vercel URL after deployment)*

## Tech stack
- Frontend: Next.js (Pages Router), React, TypeScript, Tailwind CSS  
- Backend: Next.js API routes (`pages/api/*`)  
- Database: Supabase (Postgres)  
- Optional: OpenAI (server-side) for note summarization  
- Deployment: Vercel

## Features
- Create and list notes (title + content)  
- Persist notes in Supabase (Postgres)  
- Optional: Generate short AI summary stored on the note (server-side OpenAI call)

## Local setup
1. Clone:
```bash
git clone https://github.com/vamsi-sys/ai-notes.git
cd ai-notes
