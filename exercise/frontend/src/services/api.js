const BASE = '/api';

// Helper — do not modify
async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (res.status === 204) return null;

  const data = await res.json();

  if (!res.ok) {
    const message = data.errors ? data.errors.join(', ') : data.error || 'Request failed';
    throw new Error(message);
  }

  return data;
}

export const api = {
  // TODO 1 — Fetch all tasks.
  // Accepts an optional `status` string ('all', 'active', 'completed').
  // When status is 'all' or absent, hit GET /api/tasks.
  // Otherwise append ?status=<status> to the URL.
  getTasks: (status) => {
    // TODO: implement
  },

  // TODO 2 — Create a new task.
  // POST /api/tasks with the payload as JSON body.
  createTask: (payload) => {
    // TODO: implement
  },

  // TODO 3 — Partially update a task by id.
  // PATCH /api/tasks/:id with the payload as JSON body.
  updateTask: (id, payload) => {
    // TODO: implement
  },

  // TODO 4 — Delete a single task by id.
  // DELETE /api/tasks/:id
  deleteTask: (id) => {
    // TODO: implement
  },

  // TODO 5 — Delete all completed tasks.
  // DELETE /api/tasks
  clearCompleted: () => {
    // TODO: implement
  },
};
