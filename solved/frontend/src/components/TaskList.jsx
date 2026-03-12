import React from 'react';
import TaskItem from './TaskItem';

const FILTERS = ['all', 'active', 'completed'];

export default function TaskList({ tasks, stats, filter, onFilterChange, onToggle, onDelete, onClearCompleted, loading }) {
  return (
    <div style={styles.container}>
      {/* Header / Stats */}
      <div style={styles.header}>
        <div style={styles.stats}>
          <span style={styles.statItem}>
            <strong>{stats.total}</strong> total
          </span>
          <span style={styles.dot}>·</span>
          <span style={styles.statItem}>
            <strong style={{ color: 'var(--primary)' }}>{stats.active}</strong> active
          </span>
          <span style={styles.dot}>·</span>
          <span style={styles.statItem}>
            <strong style={{ color: 'var(--success)' }}>{stats.completed}</strong> done
          </span>
        </div>

        {/* Filter tabs */}
        <div style={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f}
              style={{
                ...styles.filterBtn,
                ...(filter === f ? styles.filterBtnActive : {}),
              }}
              onClick={() => onFilterChange(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Task list */}
      <div style={styles.listWrapper}>
        {loading ? (
          <p style={styles.empty}>Loading...</p>
        ) : tasks.length === 0 ? (
          <p style={styles.empty}>
            {filter === 'completed'
              ? 'No completed tasks yet.'
              : filter === 'active'
              ? 'No active tasks — all done!'
              : 'No tasks yet. Add one above.'}
          </p>
        ) : (
          <ul style={styles.list}>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      {stats.completed > 0 && (
        <div style={styles.footer}>
          <button style={styles.clearBtn} onClick={onClearCompleted}>
            Clear {stats.completed} completed {stats.completed === 1 ? 'task' : 'tasks'}
          </button>
        </div>
      )}
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
  stats: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: 'var(--text-muted)',
  },
  statItem: {
    whiteSpace: 'nowrap',
  },
  dot: {
    color: 'var(--border)',
  },
  filters: {
    display: 'flex',
    gap: '4px',
  },
  filterBtn: {
    padding: '5px 12px',
    border: '1px solid var(--border)',
    borderRadius: '20px',
    background: 'transparent',
    fontSize: '13px',
    color: 'var(--text-muted)',
    transition: 'all 0.15s',
    cursor: 'pointer',
  },
  filterBtnActive: {
    background: 'var(--primary)',
    borderColor: 'var(--primary)',
    color: '#fff',
    fontWeight: 600,
  },
  listWrapper: {
    minHeight: '80px',
  },
  list: {
    listStyle: 'none',
  },
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
    transition: 'all 0.15s',
  },
};
