const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ---------------------------------------------------------------------------
// In-memory data store
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
// Validation helper
// ---------------------------------------------------------------------------
function validateTask(body) {
  const errors = [];
  if (!body.title || typeof body.title !== 'string' || body.title.trim() === '') {
    errors.push('title is required and must be a non-empty string');
  }
  if (body.priority && !['low', 'medium', 'high'].includes(body.priority)) {
    errors.push('priority must be one of: low, medium, high');
  }
  return errors;
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// GET /api/tasks — list all tasks, optional ?status=active|completed
app.get('/api/tasks', (req, res) => {
  const { status } = req.query;
  let result = tasks;

  if (status === 'active') {
    result = tasks.filter((t) => !t.completed);
  } else if (status === 'completed') {
    result = tasks.filter((t) => t.completed);
  }

  // Sort: incomplete first, then by creation date descending
  result = [...result].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  res.json({
    tasks: result,
    total: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  });
});

// GET /api/tasks/:id — get a single task
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// POST /api/tasks — create a new task
app.post('/api/tasks', (req, res) => {
  const errors = validateTask(req.body);
  if (errors.length) return res.status(400).json({ errors });

  const task = {
    id: uuidv4(),
    title: req.body.title.trim(),
    description: (req.body.description || '').trim(),
    completed: false,
    priority: req.body.priority || 'medium',
    createdAt: new Date().toISOString(),
  };

  tasks.unshift(task);
  res.status(201).json(task);
});

// PATCH /api/tasks/:id — update a task (toggle completed, edit title/description/priority)
app.patch('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  const { title, description, completed, priority } = req.body;
  const task = tasks[index];

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ errors: ['title must be a non-empty string'] });
    }
    task.title = title.trim();
  }
  if (description !== undefined) task.description = description.trim();
  if (completed !== undefined) task.completed = Boolean(completed);
  if (priority !== undefined) {
    if (!['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({ errors: ['priority must be one of: low, medium, high'] });
    }
    task.priority = priority;
  }

  tasks[index] = task;
  res.json(task);
});

// DELETE /api/tasks/:id — delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  tasks.splice(index, 1);
  res.status(204).send();
});

// DELETE /api/tasks — clear all completed tasks
app.delete('/api/tasks', (req, res) => {
  const before = tasks.length;
  tasks = tasks.filter((t) => !t.completed);
  res.json({ deleted: before - tasks.length });
});

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Task Manager API running on http://localhost:${PORT}`);
});

module.exports = app;
