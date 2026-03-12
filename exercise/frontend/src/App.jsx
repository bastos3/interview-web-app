import React, { useState, useEffect, useCallback } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { api } from './services/api';

export default function App() {
  // TODO 1 — Declare state for:
  //   - tasks: array of task objects (initial: [])
  //   - stats: object with { total, active, completed } (initial: zeros)
  //   - filter: 'all' | 'active' | 'completed' (initial: 'all')
  //   - loading: boolean (initial: true)
  //   - globalError: string (initial: '')

  // TODO 2 — Write a `loadTasks(activeFilter)` function (use useCallback) that:
  //   - Sets loading to true and clears the error
  //   - Calls api.getTasks(activeFilter)
  //   - Updates tasks and stats from the response
  //   - Catches errors and sets globalError
  //   - Sets loading to false when done

  // TODO 3 — Add a useEffect that calls loadTasks whenever `filter` changes.

  // TODO 4 — Write `handleAdd(payload)`:
  //   - Calls api.createTask(payload)
  //   - Reloads the task list

  // TODO 5 — Write `handleToggle(id, completed)`:
  //   - Calls api.updateTask(id, { completed })
  //   - Reloads the task list

  // TODO 6 — Write `handleDelete(id)`:
  //   - Calls api.deleteTask(id)
  //   - Reloads the task list

  // TODO 7 — Write `handleClearCompleted()`:
  //   - Calls api.clearCompleted()
  //   - Reloads the task list

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <h1 style={styles.title}>Task Manager</h1>
          <span style={styles.subtitle}>Full-Stack Interview Exercise</span>
        </div>
      </header>

      <main style={styles.main}>
        {/* TODO 8 — If globalError is set, render an error banner with a Retry button */}

        {/* TODO 9 — Render <TaskForm> and pass handleAdd as the onAdd prop */}

        {/* TODO 10 — Render <TaskList> and pass all required props:
              tasks, stats, filter, onFilterChange (setFilter), onToggle,
              onDelete, onClearCompleted, loading */}
      </main>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: 'var(--bg)' },
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
  title: { fontSize: '22px', fontWeight: 700, color: 'var(--text)' },
  subtitle: { fontSize: '13px', color: 'var(--text-muted)' },
  main: { maxWidth: '680px', margin: '0 auto', padding: '32px 24px' },
};
