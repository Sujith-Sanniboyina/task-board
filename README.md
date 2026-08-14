# Task Board

A Kanban-style task management app built with React and Supabase, inspired by the clean, focused layouts of tools like Linear and Asana. Tasks move across four columns — **To Do**, **In Progress**, **In Review**, and **Done** — with drag-and-drop status updates, guest accounts, and a live board summary.

**Live app:** [task-board-ten-sigma.vercel.app](https://task-board-ten-sigma.vercel.app/)

---

## Overview

The goal of this project was to keep the codebase small and readable while still feeling like a real, professional product rather than a generic to-do list. That meant paying as much attention to loading states, visual hierarchy, and perceived performance as to the core drag-and-drop functionality.

## Features

- **Drag-and-drop status updates** — move tasks between columns with optimistic UI updates, so a card moves instantly instead of waiting on a network round-trip.
- **Guest accounts** — anonymous sign-in with per-user data isolation enforced at the database layer (not just the client).
- **Priority & due-date indicators** — each card shows priority level and a due date that shifts color based on urgency (grey → yellow → red as a task approaches or passes its deadline).
- **Search & filtering** — real-time title search plus a priority filter (low/normal/high), both applied live across all columns.
- **Live board summary** — a stats bar showing total, completed, and overdue task counts, computed from the full task list independent of active filters.
- **Skeleton loading & error states** — a skeleton board renders while data loads instead of a blank screen, so the app feels responsive from the first paint.

## Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React (Vite), JavaScript, Tailwind CSS |
| Drag & Drop | [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) |
| Backend / DB | Supabase (Postgres, Auth, Row Level Security) |
| Deployment | Vercel |

## Security: Row Level Security (RLS)

Guest accounts are isolated at the database layer using Supabase's Row Level Security, rather than relying on client-side checks. Every table policy is enforced server-side against `auth.uid()`, so even a compromised or modified client can't read or write another user's tasks. This is the piece of the project I'd point to first — it's easy to fake per-user isolation in the UI, and much easier to get subtly wrong. Enforcing it as a Postgres policy closes that gap entirely.

## Database Schema

```sql
create table tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status text not null default 'todo'
    check (status in ('todo', 'in_progress', 'in_review', 'done')),
  priority text default 'normal'
    check (priority in ('low', 'normal', 'high')),
  due_date date,
  user_id uuid not null default auth.uid(),
  created_at timestamptz not null default now()
);

alter table tasks enable row level security;

create policy "Users can view their own tasks"
on tasks for select
using (auth.uid() = user_id);

create policy "Users can insert their own tasks"
on tasks for insert
with check (auth.uid() = user_id);

create policy "Users can update their own tasks"
on tasks for update
using (auth.uid() = user_id);

create policy "Users can delete their own tasks"
on tasks for delete
using (auth.uid() = user_id);
```

## Getting Started

```bash
git clone https://github.com/Sujith-Sanniboyina/task-board.git
cd task-board
npm install
```

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Then run the dev server:

```bash
npm run dev
# open http://localhost:5173
```

## Known Limitations & Next Steps

Being upfront about what's not here yet:

- **No intra-column reordering.** Drag-and-drop currently moves tasks between columns (changing status) but doesn't persist custom ordering within a column. Adding this would require a `position`/rank field to preserve order across refreshes.
- **Tasks can't be edited or deleted after creation.** This is the next feature I'd build — full CRUD instead of create-only.
- **No collaboration features yet** — team member assignment, comments, and an activity log were part of the original feature set but were deprioritized in favor of search/filtering and the live board summary, since those build directly on data that already exists rather than requiring new schema and multi-user logic.
- **Error handling is basic.** Currently a full-page error state; the next iteration would use per-action toasts with more specific, actionable error messages.

## License

MIT
