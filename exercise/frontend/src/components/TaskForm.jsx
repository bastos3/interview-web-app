import React, { useState } from 'react';

const PRIORITY_OPTIONS = ['low', 'medium', 'high'];

// Props: onAdd(payload) — async function that creates a task
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // TODO 1 — Implement handleSubmit:
  //   - Prevent default form submission
  //   - Guard: return early if title is empty
  //   - Set loading = true, clear error
  //   - Call onAdd({ title, description, priority })
  //   - On success: reset title, description, priority to defaults
  //   - On failure: set error to err.message
  //   - Always set loading = false when done
  async function handleSubmit(e) {
    e.preventDefault();
    // TODO: implement
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Add a task</h2>

      {/* TODO 2 — Render the error message when `error` is set */}

      <div style={styles.row}>
        <input
          style={styles.input}
          type="text"
          placeholder="Task title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          maxLength={120}
        />
        <select
          style={styles.select}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={loading}
        >
          {PRIORITY_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </option>
          ))}
        </select>
        {/* TODO 3 — Add a submit button. Disable it when loading or title is empty.
            Show '...' text while loading, 'Add' otherwise. */}
      </div>

      <textarea
        style={styles.textarea}
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
        rows={2}
        maxLength={500}
      />
    </form>
  );
}

const styles = {
  form: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '20px',
    boxShadow: 'var(--shadow)',
    marginBottom: '24px',
  },
  heading: { fontSize: '16px', fontWeight: 600, marginBottom: '12px' },
  row: { display: 'flex', gap: '8px', marginBottom: '8px' },
  input: {
    flex: 1,
    padding: '9px 12px',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    fontSize: '14px',
    outline: 'none',
  },
  select: {
    padding: '9px 10px',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    fontSize: '14px',
    background: 'var(--surface)',
  },
  textarea: {
    width: '100%',
    padding: '9px 12px',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    fontSize: '14px',
    resize: 'vertical',
    outline: 'none',
  },
  error: { color: 'var(--danger)', fontSize: '13px', marginBottom: '8px' },
};
