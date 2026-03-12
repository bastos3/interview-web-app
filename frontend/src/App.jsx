import React, { useState, useEffect, useCallback } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { api } from './services/api';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0 });
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [globalError, setGlobalError] = useState('');

  const loadTasks = useCallback(async (activeFilter) => {
    setLoading(true);
    setGlobalError('');
    try {
      const data = await api.getTasks(activeFilter);
      setTasks(data.tasks);
      setStats({ total: data.total, active: data.active, completed: data.completed });
    } catch (err) {
      setGlobalError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks(filter);
  }, [filter, loadTasks]);

  async function handleAdd(payload) {
    const newTask = await api.createTask(payload);
    // Optimistically add and refresh stats
    setTasks((prev) => [newTask, ...prev.filter((t) => !(filter === 'completed'))]);
    setStats((s) => ({ ...s, total: s.total + 1, active: s.active + 1 }));
    // Reload to get accurate ordering
    loadTasks(filter);
  }

  async function handleToggle(id, completed) {
    await api.updateTask(id, { completed });
    loadTasks(filter);
  }

  async function handleDelete(id) {
    await api.deleteTask(id);
    loadTasks(filter);
  }

  async function handleClearCompleted() {
    await api.clearCompleted();
    loadTasks(filter);
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <h1 style={styles.title}>Task Manager</h1>
          <span style={styles.subtitle}>Full-Stack Interview Exercise</span>
        </div>
      </header>

      <main style={styles.main}>
        {globalError && (
          <div style={styles.globalError}>
            {globalError}
            <button style={styles.retryBtn} onClick={() => loadTasks(filter)}>
              Retry
            </button>
          </div>
        )}

        <TaskForm onAdd={handleAdd} />

        <TaskList
          tasks={tasks}
          stats={stats}
          filter={filter}
          onFilterChange={setFilter}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onClearCompleted={handleClearCompleted}
          loading={loading}
        />
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'var(--bg)',
  },
  header: {
    background: 'var(--surface)',
    borderBottom: '1px solid var(--border)',
    padding: '0 24px',
    boxShadow: 'var(--shadow)',
  },
  headerInner: {
    maxWidth: '680px',
    margin: '0 auto',
    padding: '18px 0',
    display: 'flex',
    alignItems: 'baseline',
    gap: '12px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 700,
    color: 'var(--text)',
  },
  subtitle: {
    fontSize: '13px',
    color: 'var(--text-muted)',
  },
  main: {
    maxWidth: '680px',
    margin: '0 auto',
    padding: '32px 24px',
  },
  globalError: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: 'var(--danger)',
    padding: '12px 16px',
    borderRadius: 'var(--radius)',
    marginBottom: '16px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  retryBtn: {
    background: 'var(--danger)',
    color: '#fff',
    border: 'none',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '13px',
    cursor: 'pointer',
  },
};
