import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Project, CreateProject } from '../types';
import api from '../services/api';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState<CreateProject>({ title: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await api.getProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newProject.title.length < 3) {
      setError('Title must be at least 3 characters');
      return;
    }

    try {
      const created = await api.createProject(newProject);
      setProjects([created, ...projects]);
      setNewProject({ title: '', description: '' });
      setShowModal(false);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await api.deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="app-container">
        <header className="dashboard-header">
          <h1>Project Manager</h1>
          <div className="user-info">
            <span>Welcome, {user?.username}!</span>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </header>

        <main className="dashboard-main">
        <div className="dashboard-actions">
          <h2>My Projects</h2>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            + New Project
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <p>No projects yet. Create your first project to get started!</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <h3 onClick={() => navigate(`/projects/${project.id}`)}>{project.title}</h3>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="btn-delete"
                    title="Delete project"
                  >
                    ×
                  </button>
                </div>
                <p className="project-description">{project.description || 'No description'}</p>
                <div className="project-footer">
                  <span className="task-count">{project.taskCount} tasks</span>
                  <span className="project-date">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Project</h2>
            <form onSubmit={handleCreateProject}>
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  required
                  minLength={3}
                  maxLength={100}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  maxLength={500}
                  rows={4}
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Project
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

export default Dashboard;
