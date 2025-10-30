import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProjectDetail, Task, CreateTask, UpdateTask } from '../types';
import api from '../services/api';
import './ProjectDetail.css';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState<CreateTask>({ title: '', dueDate: '' });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const data = await api.getProject(Number(id));
      setProject(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;

    try {
      const created = await api.createTask(project.id, newTask);
      setProject({
        ...project,
        tasks: [...project.tasks, created],
      });
      setNewTask({ title: '', dueDate: '' });
      setShowModal(false);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    }
  };

  const handleToggleTask = async (task: Task) => {
    try {
      const updated = await api.updateTask(task.id, { isCompleted: !task.isCompleted });
      if (project) {
        setProject({
          ...project,
          tasks: project.tasks.map((t) => (t.id === updated.id ? updated : t)),
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const handleUpdateTask = async (task: Task, updates: UpdateTask) => {
    try {
      const updated = await api.updateTask(task.id, updates);
      if (project) {
        setProject({
          ...project,
          tasks: project.tasks.map((t) => (t.id === updated.id ? updated : t)),
        });
      }
      setEditingTask(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await api.deleteTask(taskId);
      if (project) {
        setProject({
          ...project,
          tasks: project.tasks.filter((t) => t.id !== taskId),
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  if (loading) {
    return <div className="loading">Loading project...</div>;
  }

  if (!project) {
    return <div className="error">Project not found</div>;
  }

  const completedTasks = project.tasks.filter((t) => t.isCompleted).length;
  const totalTasks = project.tasks.length;

  return (
    <div className="project-detail-container">
      <div className="app-container">
        <header className="project-header">
        <button onClick={() => navigate('/dashboard')} className="btn-back">
          ← Back
        </button>
        <div className="project-info">
          <h1>{project.title}</h1>
          <p className="project-description">{project.description || 'No description'}</p>
          <div className="project-stats">
            <span>
              {completedTasks} / {totalTasks} tasks completed
            </span>
            <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </header>

      <main className="project-main">
        <div className="tasks-header">
          <h2>Tasks</h2>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            + Add Task
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {project.tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet. Add your first task to get started!</p>
          </div>
        ) : (
          <div className="tasks-list">
            {project.tasks.map((task) => (
              <div key={task.id} className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleToggleTask(task)}
                  className="task-checkbox"
                />
                <div className="task-content">
                  {editingTask?.id === task.id ? (
                    <input
                      type="text"
                      value={editingTask.title}
                      onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                      onBlur={() => handleUpdateTask(task, { title: editingTask.title })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleUpdateTask(task, { title: editingTask.title });
                        } else if (e.key === 'Escape') {
                          setEditingTask(null);
                        }
                      }}
                      className="task-edit-input"
                      autoFocus
                    />
                  ) : (
                    <span
                      className="task-title"
                      onDoubleClick={() => setEditingTask(task)}
                      title="Double-click to edit"
                    >
                      {task.title}
                    </span>
                  )}
                  {task.dueDate && (
                    <span className="task-due-date">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="btn-delete-task"
                  title="Delete task"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Task</h2>
            <form onSubmit={handleCreateTask}>
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  required
                  maxLength={200}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <input
                  type="date"
                  id="dueDate"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
