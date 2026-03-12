import React, { useState } from 'react';

const PRIORITY_COLOR = { high: '#ef4444', medium: '#f59e0b', low: '#6b7280' };
const PRIORITY_BG    = { high: '#fef2f2', medium: '#fffbeb', low: '#f9fafb' };

// Props:
//   task     — task object { id, title, description, completed, priority, createdAt }
//   onToggle — fn(id, newCompletedValue)
//   onDelete — fn(id)
export default function TaskItem({ task, onToggle, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState(false);

  // TODO 1 — Implement handleToggle:
  //   - Set toggling = true
  //   - Call onToggle(task.id, !task.completed)
  //   - Set toggling = false when done (use finally)
  async function handleToggle() {
    // TODO: implement
  }

  // TODO 2 — Implement handleDelete:
  //   - Set deleting = true
  //   - Call onDelete(task.id)
  //   - Set deleting = false when done (use finally)
  async function handleDelete() {
    // TODO: implement
  }

  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  return (
    <li style={{ ...styles.item, opacity: deleting ? 0.5 : 1 }}>
      {/* TODO 3 — Render a circular checkbox button.
          - When task.completed: filled green background with a checkmark icon
          - When not completed: transparent with a grey border
          - onClick calls handleToggle; disabled when toggling or deleting */}

      <div style={styles.body}>
        {/* TODO 4 — Render the task title.
            - Apply line-through + muted color when task.completed */}
        <span style={styles.title}>{task.title}</span>

        {/* TODO 5 — Render task.description only if it exists */}

        <div style={styles.meta}>
          {/* TODO 6 — Render a priority badge using PRIORITY_COLOR and PRIORITY_BG */}
          <span style={styles.date}>{formattedDate}</span>
        </div>
      </div>

      {/* TODO 7 — Render a delete button (trash icon or text) that calls handleDelete.
          Disable when deleting or toggling. */}
    </li>
  );
}

const styles = {
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '14px 16px',
    borderBottom: '1px solid var(--border)',
  },
  checkbox: {
    width: '22px',
    height: '22px',
    minWidth: '22px',
    borderRadius: '50%',
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2px',
    cursor: 'pointer',
    background: 'transparent',
  },
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    minWidth: 0,
  },
  title: { fontSize: '15px', fontWeight: 500, wordBreak: 'break-word' },
  description: { fontSize: '13px', color: 'var(--text-muted)', wordBreak: 'break-word' },
  meta: { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' },
  badge: {
    fontSize: '11px',
    fontWeight: 600,
    padding: '1px 7px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  date: { fontSize: '11px', color: 'var(--text-muted)' },
  deleteBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    padding: '4px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '1px',
    cursor: 'pointer',
  },
};
