import React, { useState } from 'react';

const PRIORITY_OPTIONS = ['low', 'medium', 'high'];

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    setError('');
    try {
      await onAdd({ title: title.trim(), description: description.trim(), priority });
      setTitle('');
      setDescription('');
      setPriority('medium');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Add a task</h2>

      {error && <p style={styles.error}>{error}</p>}

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
        <button style={styles.btn} type="submit" disabled={loading || !title.trim()}>
          {loading ? '...' : 'Add'}
        </button>
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
  heading: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '12px',
    color: 'var(--text)',
  },
  row: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px',
  },
  input: {
    flex: 1,
    padding: '9px 12px',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s',
  },
  select: {
    padding: '9px 10px',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    fontSize: '14px',
    background: 'var(--surface)',
    cursor: 'pointer',
  },
  btn: {
    padding: '9px 20px',
    background: 'var(--primary)',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--radius)',
    fontSize: '14px',
    fontWeight: 600,
    transition: 'background 0.15s',
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
  error: {
    color: 'var(--danger)',
    fontSize: '13px',
    marginBottom: '8px',
  },
};
