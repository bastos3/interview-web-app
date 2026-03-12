import React, { useState } from 'react';

const PRIORITY_COLOR = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#6b7280',
};

const PRIORITY_BG = {
  high: '#fef2f2',
  medium: '#fffbeb',
  low: '#f9fafb',
};

export default function TaskItem({ task, onToggle, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState(false);

  async function handleToggle() {
    setToggling(true);
    try {
      await onToggle(task.id, !task.completed);
    } finally {
      setToggling(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await onDelete(task.id);
    } finally {
      setDeleting(false);
    }
  }

  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <li style={{ ...styles.item, opacity: deleting ? 0.5 : 1 }}>
      <button
        style={{
          ...styles.checkbox,
          background: task.completed ? 'var(--success)' : 'transparent',
          borderColor: task.completed ? 'var(--success)' : 'var(--border)',
        }}
        onClick={handleToggle}
        disabled={toggling || deleting}
        title={task.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {task.completed && <CheckIcon />}
      </button>

      <div style={styles.body}>
        <span
          style={{
            ...styles.title,
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? 'var(--text-muted)' : 'var(--text)',
          }}
        >
          {task.title}
        </span>
        {task.description && (
          <span style={styles.description}>{task.description}</span>
        )}
        <div style={styles.meta}>
          <span
            style={{
              ...styles.badge,
              color: PRIORITY_COLOR[task.priority],
              background: PRIORITY_BG[task.priority],
            }}
          >
            {task.priority}
          </span>
          <span style={styles.date}>{formattedDate}</span>
        </div>
      </div>

      <button
        style={styles.deleteBtn}
        onClick={handleDelete}
        disabled={deleting || toggling}
        title="Delete task"
      >
        <TrashIcon />
      </button>
    </li>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  );
}

const styles = {
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '14px 16px',
    borderBottom: '1px solid var(--border)',
    transition: 'background 0.1s',
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
    transition: 'all 0.15s',
    cursor: 'pointer',
  },
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    minWidth: 0,
  },
  title: {
    fontSize: '15px',
    fontWeight: 500,
    wordBreak: 'break-word',
    transition: 'color 0.15s',
  },
  description: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    wordBreak: 'break-word',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '4px',
  },
  badge: {
    fontSize: '11px',
    fontWeight: 600,
    padding: '1px 7px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  date: {
    fontSize: '11px',
    color: 'var(--text-muted)',
  },
  deleteBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    padding: '4px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.15s',
    marginTop: '1px',
  },
};
