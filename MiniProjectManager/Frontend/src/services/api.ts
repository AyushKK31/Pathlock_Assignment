import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  Project,
  ProjectDetail,
  CreateProject,
  Task,
  CreateTask,
  UpdateTask,
} from '../types';

const API_URL = 'http://localhost:5000/api';

class ApiService {
  private getAuthHeader(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `Error: ${response.status}`);
    }
    return response.json();
  }

  // Auth endpoints
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return this.handleResponse<AuthResponse>(response);
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return this.handleResponse<AuthResponse>(response);
  }

  // Project endpoints
  async getProjects(): Promise<Project[]> {
    const response = await fetch(`${API_URL}/projects`, {
      headers: this.getAuthHeader(),
    });
    return this.handleResponse<Project[]>(response);
  }

  async getProject(id: number): Promise<ProjectDetail> {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      headers: this.getAuthHeader(),
    });
    return this.handleResponse<ProjectDetail>(response);
  }

  async createProject(project: CreateProject): Promise<Project> {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: this.getAuthHeader(),
      body: JSON.stringify(project),
    });
    return this.handleResponse<Project>(response);
  }

  async deleteProject(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeader(),
    });
    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
  }

  // Task endpoints
  async createTask(projectId: number, task: CreateTask): Promise<Task> {
    const response = await fetch(`${API_URL}/projects/${projectId}/tasks`, {
      method: 'POST',
      headers: this.getAuthHeader(),
      body: JSON.stringify(task),
    });
    return this.handleResponse<Task>(response);
  }

  async updateTask(taskId: number, task: UpdateTask): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: this.getAuthHeader(),
      body: JSON.stringify(task),
    });
    return this.handleResponse<Task>(response);
  }

  async deleteTask(taskId: number): Promise<void> {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: this.getAuthHeader(),
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  }
}

export default new ApiService();
