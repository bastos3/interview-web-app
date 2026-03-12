import React from 'react';
import TaskItem from './TaskItem';

const FILTERS = ['all', 'active', 'completed'];

// Props:
//   tasks          — array of task objects
//   stats          — { total, active, completed }
//   filter         — current filter string
//   onFilterChange — fn(newFilter)
//   onToggle       — fn(id, completed)
//   onDelete       — fn(id)
//   onClearCompleted — fn()
//   loading        — boolean
export default function TaskList({
  tasks,
  stats,
  filter,
  onFilterChange,
  onToggle,
  onDelete,
  onClearCompleted,
  loading,
}) {
  return (
    <div style={styles.container}>
      {/* Header: stats + filter tabs */}
      <div style={styles.header}>
        {/* TODO 1 — Render task stats (total / active / completed counts) */}

        {/* TODO 2 — Render filter buttons for each value in FILTERS.
            The active filter button should look visually selected.
            Clicking a button calls onFilterChange(filter). */}
        <div style={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f}
              style={styles.filterBtn}  // TODO: apply active style when f === filter
              onClick={() => onFilterChange(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Task list */}
      <div style={styles.listWrapper}>
        {/* TODO 3 — Handle three display states:
            1. loading === true  → show "Loading..."
            2. tasks.length === 0 → show an appropriate empty state message
            3. otherwise → render a <ul> with a <TaskItem> for each task,
               passing onToggle and onDelete as props */}
      </div>

      {/* TODO 4 — When stats.completed > 0, render a footer with a
          "Clear N completed tasks" button that calls onClearCompleted. */}
    </div>
  );
}

const styles = {
  container: {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow)',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    borderBottom: '1px solid var(--border)',
    flexWrap: 'wrap',
    gap: '12px',
  },
  filters: { display: 'flex', gap: '4px' },
  filterBtn: {
    padding: '5px 12px',
    border: '1px solid var(--border)',
    borderRadius: '20px',
    background: 'transparent',
    fontSize: '13px',
    color: 'var(--text-muted)',
    cursor: 'pointer',
  },
  filterBtnActive: {
    background: 'var(--primary)',
    borderColor: 'var(--primary)',
    color: '#fff',
    fontWeight: 600,
  },
  listWrapper: { minHeight: '80px' },
  list: { listStyle: 'none' },
  empty: {
    textAlign: 'center',
    padding: '40px 20px',
    color: 'var(--text-muted)',
    fontSize: '14px',
  },
  footer: {
    padding: '12px 16px',
    borderTop: '1px solid var(--border)',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  clearBtn: {
    background: 'transparent',
    border: '1px solid var(--danger)',
    color: 'var(--danger)',
    padding: '6px 14px',
    borderRadius: 'var(--radius)',
    fontSize: '13px',
    cursor: 'pointer',
  },
};
