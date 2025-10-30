export interface User {
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface Project {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
  taskCount: number;
}

export interface ProjectDetail {
  id: number;
  title: string;
  description?: string;
  createdAt: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  title: string;
  dueDate?: string;
  isCompleted: boolean;
  createdAt: string;
  projectId: number;
  estimatedHours: number;
  dependencies: string[];
}

export interface CreateProject {
  title: string;
  description?: string;
}

export interface CreateTask {
  title: string;
  dueDate?: string;
  estimatedHours?: number;
  dependencies?: string[];
}

export interface UpdateTask {
  title?: string;
  dueDate?: string;
  isCompleted?: boolean;
  estimatedHours?: number;
  dependencies?: string[];
}

export interface ScheduleRequest {
  tasks: TaskScheduleDto[];
}

export interface TaskScheduleDto {
  title: string;
  estimatedHours: number;
  dueDate?: string;
  dependencies: string[];
}

export interface ScheduleResponse {
  recommendedOrder: string[];
}
