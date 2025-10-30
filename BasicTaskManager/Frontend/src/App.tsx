import { useState, useEffect } from 'react';
import axios from 'axios';
import { TaskItem } from './types';
import './App.css';

// Backend API URL - Make sure this matches your backend port
const API_URL = 'http://localhost:5294/api/tasks';

function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tasks from the backend
  const fetchTasks = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await axios.get<TaskItem[]>(API_URL);
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load tasks. Make sure the backend is running on port 5294.");
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskDescription.trim()) return;

    const newTask = {
      description: newTaskDescription,
      isCompleted: false,
    };

    try {
      const response = await axios.post<TaskItem>(API_URL, newTask);
      setTasks(prevTasks => [...prevTasks, response.data]);
      setNewTaskDescription('');
      setError(null);
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Failed to add task. Please try again.");
    }
  };

  // Toggle task completion status
  const handleToggleCompletion = async (task: TaskItem) => {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    try {
      await axios.put(`${API_URL}/${task.id}`, updatedTask);
      
      // Update state locally for instant UI feedback
      setTasks(prevTasks => 
        prevTasks.map(t => (t.id === task.id ? updatedTask : t))
      );
      setError(null);
    } catch (err) {
      console.error("Error toggling task completion:", err);
      setError("Failed to update task. Please try again.");
    }
  };

  // Delete a task
  const handleDeleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      
      // Update state locally by filtering out the deleted task
      setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
      setError(null);
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete task. Please try again.");
    }
  };

  // Load tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1>📝 Basic Task Manager</h1>
      
      {/* Error Message */}
      {error && <div className="error-message">⚠️ {error}</div>}
      
      {/* Add Task Form */}
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Enter a new task..."
          required
        />
        <button type="submit" className="add-btn">Add Task</button>
      </form>

      {/* Task List */}
      {isLoading ? (
        <div className="loading">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <p className="empty-state">
          No tasks yet. Add your first task above!
        </p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleToggleCompletion(task)}
                  aria-label={`Mark "${task.description}" as ${task.isCompleted ? 'incomplete' : 'complete'}`}
                />

                <span className={`task-description ${task.isCompleted ? 'completed' : ''}`}>
                  {task.description}
                </span>

                <button 
                  onClick={() => handleDeleteTask(task.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default App;
