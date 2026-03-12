# Task Manager — Full-Stack Pair Programming Interview

**Duration:** ~90 minutes
**Stack:** Node.js + Express (backend) · React + Vite (frontend)
**Level:** Mid / Senior Full-Stack Engineer

---

## Running the Solved Application

```bash
# Terminal 1 — Backend (port 3001)
cd backend
npm install
npm start

# Terminal 2 — Frontend (port 5173)
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

---

## Interview Structure

| Phase | Time | Focus |
|---|---|---|
| Intro & problem walkthrough | 5 min | Alignment |
| Backend implementation | 35 min | API design, REST, Express |
| Frontend implementation | 35 min | React, state, data fetching |
| Refactor & discussion | 10 min | Trade-offs, improvements |
| Questions | 5 min | Candidate asks interviewer |

---

## Problem Statement (read aloud to candidate)

> "We're building a simple Task Manager. Users need to create tasks, mark them complete, delete them, and filter the list. You'll build a REST API in Express and a React frontend that consumes it. We'll start with the backend, then move to the UI."

---

## Part 1 — Backend (35 min)

### Requirements

Build an Express server at **port 3001** that manages a list of tasks stored in memory (no database needed).

Each task has:
- `id` — unique identifier (auto-generated)
- `title` — required string
- `description` — optional string
- `completed` — boolean, defaults to `false`
- `priority` — `"low"` | `"medium"` | `"high"`, defaults to `"medium"`
- `createdAt` — ISO timestamp, set at creation

### Endpoints to implement

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/tasks` | Return all tasks. Optional `?status=active\|completed` filter. |
| `GET` | `/api/tasks/:id` | Return a single task or 404. |
| `POST` | `/api/tasks` | Create a task. Validate that `title` is present. |
| `PATCH` | `/api/tasks/:id` | Partially update a task (toggle `completed`, change `title`, etc.). |
| `DELETE` | `/api/tasks/:id` | Delete a task. |
| `DELETE` | `/api/tasks` | Delete all completed tasks. |

### Response shape for GET /api/tasks

```json
{
  "tasks": [...],
  "total": 4,
  "active": 2,
  "completed": 2
}
```

### Interviewer hints (use only if stuck)

- "What npm package would you reach for to create a REST API?"
- "How would you generate unique IDs without a database?"
- "What HTTP status code should a successful POST return?"
- "How can you let the client filter by status without adding a database query?"
- "What does a 204 response mean? When would you use it?"

### What to look for in the candidate

- [ ] Correct HTTP verbs and status codes (201 for create, 204 for no-content delete)
- [ ] Input validation and meaningful error messages
- [ ] Clean route separation / organisation
- [ ] Understands stateless vs. stateful storage trade-offs
- [ ] Mentions CORS before being asked (or knows why it's needed)

---

## Part 2 — Frontend (35 min)

### Requirements

Build a React app that:

1. **Displays** the task list fetched from `GET /api/tasks`
2. **Creates** a task via a form (title required, description optional, priority selector)
3. **Toggles** completion by clicking a checkbox / button → calls `PATCH /api/tasks/:id`
4. **Deletes** a task → calls `DELETE /api/tasks/:id`
5. **Filters** the list by All / Active / Completed (use the `?status` query param)
6. **Shows a summary** of how many tasks are active vs. completed
7. **Handles loading and error states**

### Interviewer hints (use only if stuck)

- "Where should you put the API calls — inside the component or extracted somewhere?"
- "How would you handle the case where the network request fails?"
- "What React hook would you use to fetch data when the component mounts?"
- "How would you avoid a stale closure in your `useEffect`?"
- "If you needed to share task state across many components, what would you consider?"

### What to look for in the candidate

- [ ] Clean component decomposition (form, list, item)
- [ ] Data fetching in `useEffect` with proper cleanup / deps
- [ ] Error and loading states handled visibly
- [ ] No unnecessary re-renders (or candidate mentions them)
- [ ] API calls centralised in a service layer, not scattered in components
- [ ] Knows the difference between controlled and uncontrolled inputs

---

## Part 3 — Refactor & Discussion (10 min)

Use these prompts to explore depth:

1. **Persistence**: "Right now data lives in memory and resets on server restart. What are our options to persist it?"
   - *Good answers*: SQLite / Postgres, file-based JSON, Redis. Candidate should consider trade-offs.

2. **Scalability**: "What breaks if we run two instances of this server?"
   - *Good answers*: In-memory state is per-process → shared store needed (DB, Redis).

3. **Auth**: "How would you add authentication so each user sees only their own tasks?"
   - *Good answers*: JWT, session cookies, middleware, task ownership field.

4. **Testing**: "What would you test first and how?"
   - *Good answers*: API integration tests (supertest), React component tests (React Testing Library), at least the happy path + validation error.

5. **Performance**: "The list grows to 100,000 tasks. What changes?"
   - *Good answers*: Pagination or cursor-based navigation, virtual scrolling in UI, DB indexes.

---

## Solution Walkthrough

The full solution is already implemented in this repository. Use it as a reference or to demo the finished product to the candidate after the interview.

### Architecture decisions made in the solution

**Backend (`backend/server.js`)**
- `uuid` package for IDs — avoids collision without a DB sequence
- Validation extracted to a helper function — single responsibility
- Sort applied at query time (incomplete first, newest first) — keeps data storage simple
- `DELETE /api/tasks` (bulk) uses a filter, not splice in a loop — safer mutation

**Frontend**
- `src/services/api.js` — all fetch logic in one place; components stay clean
- `App.jsx` owns all state and passes callbacks down — simple unidirectional data flow
- `useCallback` on `loadTasks` — stable reference prevents infinite `useEffect` loops
- Optimistic UI on create + full reload for accuracy — balance between perceived speed and correctness
- Inline styles used intentionally to keep the project self-contained (no CSS toolchain)

### File structure

```
.
├── README.md
├── backend/
│   ├── package.json
│   └── server.js          # Express server, all routes
└── frontend/
    ├── package.json
    ├── vite.config.js      # Dev proxy: /api → localhost:3001
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx         # Root component, owns state
        ├── index.css
        ├── components/
        │   ├── TaskForm.jsx   # Add-task form
        │   ├── TaskList.jsx   # Filter tabs + list container
        │   └── TaskItem.jsx   # Individual task row
        └── services/
            └── api.js         # Centralised fetch helpers
```

### API quick reference (curl examples)

```bash
# List all tasks
curl http://localhost:3001/api/tasks

# List active tasks only
curl http://localhost:3001/api/tasks?status=active

# Create a task
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries","description":"Milk, eggs, bread","priority":"high"}'

# Toggle complete (replace <id> with a real ID from the list)
curl -X PATCH http://localhost:3001/api/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete a task
curl -X DELETE http://localhost:3001/api/tasks/<id>

# Clear all completed
curl -X DELETE http://localhost:3001/api/tasks
```

---

## Scoring Guide

| Area | Weight | Criteria |
|---|---|---|
| API correctness | 25% | Correct verbs, status codes, validation, filter |
| Code quality | 20% | Readability, naming, separation of concerns |
| React fundamentals | 20% | Hooks, state, effects, component design |
| Error handling | 15% | Backend validation + frontend feedback |
| Communication | 10% | Explains decisions clearly, asks clarifying questions |
| Trade-off awareness | 10% | Discusses persistence, testing, scaling |

**Strong hire**: Implements most features independently, discusses trade-offs proactively, asks good clarifying questions, writes clean readable code.
**Hire**: Needs occasional hints but gets there; code works; can discuss at least 2-3 trade-offs.
**No hire**: Needs constant guidance, misses basic HTTP semantics, cannot explain their own code.
