const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ---------------------------------------------------------------------------
// In-memory data store — do not modify
// ---------------------------------------------------------------------------
let tasks = [
  {
    id: uuidv4(),
    title: 'Read the project requirements',
    description: 'Go through the README and understand what needs to be built.',
    completed: true,
    priority: 'high',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Set up the Express server',
    description: 'Initialize the Node.js backend with Express and define routes.',
    completed: true,
    priority: 'high',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Build the React frontend',
    description: 'Create components for the task list, task form, and filters.',
    completed: false,
    priority: 'medium',
    createdAt: new Date(Date.now() - 600000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Write unit tests',
    description: 'Add tests for the API routes and React components.',
    completed: false,
    priority: 'low',
    createdAt: new Date().toISOString(),
  },
];

// ---------------------------------------------------------------------------
// TODO 1 — Validation helper
// Write a function `validateTask(body)` that returns an array of error strings.
// Rules:
//   - `title` is required, must be a non-empty string
//   - `priority`, if present, must be one of: 'low', 'medium', 'high'
// ---------------------------------------------------------------------------
function validateTask(body) {
  const errors = [];
  // TODO: implement validation
  return errors;
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// TODO 2 — GET /api/tasks
// Return all tasks. Support an optional query param ?status=active|completed
// to filter the list. Response shape:
// { tasks: [...], total: N, active: N, completed: N }
// Sort: incomplete tasks first, then by createdAt descending.
app.get('/api/tasks', (req, res) => {
  // TODO: implement
});

// TODO 3 — GET /api/tasks/:id
// Return the task with the matching id, or 404 if not found.
app.get('/api/tasks/:id', (req, res) => {
  // TODO: implement
});

// TODO 4 — POST /api/tasks
// Create a new task. Validate the body using validateTask().
// A new task has: id (uuid), title, description (''), completed (false),
// priority ('medium'), createdAt (now).
// Return 201 with the created task, or 400 with { errors: [...] }.
app.post('/api/tasks', (req, res) => {
  // TODO: implement
});

// TODO 5 — PATCH /api/tasks/:id
// Partially update a task. Any of these fields may be present in the body:
//   title (string, non-empty), description (string), completed (boolean), priority (string)
// Return 404 if the task doesn't exist. Return 400 for invalid values.
app.patch('/api/tasks/:id', (req, res) => {
  // TODO: implement
});

// TODO 6 — DELETE /api/tasks/:id
// Delete the task with the matching id. Return 204 on success, 404 if not found.
app.delete('/api/tasks/:id', (req, res) => {
  // TODO: implement
});

// TODO 7 — DELETE /api/tasks
// Remove all completed tasks from the list.
// Return { deleted: N } with the count of tasks removed.
app.delete('/api/tasks', (req, res) => {
  // TODO: implement
});

// Health check — already implemented
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Task Manager API running on http://localhost:${PORT}`);
});

module.exports = app;
