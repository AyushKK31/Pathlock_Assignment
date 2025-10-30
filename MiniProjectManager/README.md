# Mini Project Manager

A full-stack project management system with user authentication, projects, and tasks.

## Features

### Backend (C# .NET 8)
- ✅ JWT Authentication (Register/Login)
- ✅ User Management with secure password hashing
- ✅ Project Management (Create, Read, Delete)
- ✅ Task Management (Create, Update, Delete, Toggle Completion)
- ✅ Entity Framework Core with SQLite
- ✅ Data validation using DataAnnotations
- ✅ Clean architecture with DTOs, Services, and Controllers
- ✅ Swagger documentation

### Frontend (React + TypeScript)
- ✅ User Registration and Login
- ✅ Protected Routes
- ✅ Dashboard with project list
- ✅ Create and delete projects
- ✅ Project detail view with tasks
- ✅ Add, edit, delete, and toggle tasks
- ✅ Form validation
- ✅ Modern, responsive UI
- ✅ React Router for navigation

## Tech Stack

**Backend:**
- .NET 8 Web API
- Entity Framework Core
- SQLite Database
- JWT Authentication
- Swagger/OpenAPI

**Frontend:**
- React 18
- TypeScript
- React Router v6
- Vite
- CSS3

## Prerequisites

- .NET 8 SDK
- Node.js 18+ and npm

## Getting Started

### Option 1: Using PowerShell Script (Recommended)

```powershell
cd MiniProjectManager
.\start.ps1
```

This script will:
1. Install backend dependencies and run the API on http://localhost:5000
2. Install frontend dependencies and run the UI on http://localhost:5173

### Option 2: Manual Setup

#### Backend Setup

```powershell
cd MiniProjectManager/Backend
dotnet restore
dotnet run
```

The API will be available at: http://localhost:5000
Swagger documentation: http://localhost:5000/swagger

#### Frontend Setup

In a new terminal:

```powershell
cd MiniProjectManager/Frontend
npm install
npm run dev
```

The frontend will be available at: http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Projects (Requires Authentication)
- `GET /api/projects` - Get all projects for the authenticated user
- `POST /api/projects` - Create a new project
- `GET /api/projects/{id}` - Get project details with tasks
- `DELETE /api/projects/{id}` - Delete a project

### Tasks (Requires Authentication)
- `POST /api/projects/{projectId}/tasks` - Create a new task
- `PUT /api/tasks/{taskId}` - Update a task
- `DELETE /api/tasks/{taskId}` - Delete a task

## Usage

1. **Register:** Create a new account with username, email, and password
2. **Login:** Sign in with your credentials
3. **Dashboard:** View all your projects
4. **Create Project:** Click "+ New Project" to create a project
5. **View Project:** Click on a project title to see its tasks
6. **Manage Tasks:** 
   - Add tasks with "+ Add Task"
   - Check/uncheck to mark as complete
   - Double-click task title to edit
   - Click × to delete tasks
7. **Delete Project:** Click × on a project card to delete it

## Project Structure

```
MiniProjectManager/
├── Backend/
│   ├── Controllers/        # API Controllers
│   ├── Models/            # Entity Models
│   ├── DTOs/              # Data Transfer Objects
│   ├── Services/          # Business Logic
│   ├── Data/              # DbContext
│   └── Program.cs         # Application entry point
├── Frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context (Auth)
│   │   ├── services/      # API service
│   │   ├── types/         # TypeScript types
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   ├── index.html
│   └── package.json
└── README.md
```

## Security Features

- Passwords are hashed using SHA256
- JWT tokens expire after 7 days
- Protected API endpoints require valid JWT
- Frontend routes are protected
- User can only access their own data

## Development Notes

- The backend uses an in-memory SQLite database
- Database is created automatically on first run
- All CORS is configured for local development
- Form validation on both frontend and backend

## Troubleshooting

**Port already in use:**
- Backend: Change port in `Properties/launchSettings.json`
- Frontend: Change port in `vite.config.ts`

**Database issues:**
- Delete `projectmanager.db` file and restart the backend

**JWT errors:**
- Clear browser localStorage and login again

## Future Enhancements

- Project update functionality
- Task filtering and search
- Due date notifications
- Project sharing/collaboration
- File attachments
- Activity timeline
- Export to PDF/CSV

## License

This project was created for educational purposes.
