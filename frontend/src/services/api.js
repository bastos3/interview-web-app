const BASE = '/api';

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
  getTasks: (status) =>
    request(`/tasks${status && status !== 'all' ? `?status=${status}` : ''}`),

  createTask: (payload) =>
    request('/tasks', { method: 'POST', body: JSON.stringify(payload) }),

  updateTask: (id, payload) =>
    request(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),

  deleteTask: (id) =>
    request(`/tasks/${id}`, { method: 'DELETE' }),

  clearCompleted: () =>
    request('/tasks', { method: 'DELETE' }),
};
