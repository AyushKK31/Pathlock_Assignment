# Basic Task Manager

A full-stack Task Management application built with C# .NET 8 for the backend and React with TypeScript for the frontend.

## 🎯 Quick Links

- 🚀 **[Quick Start Guide](QUICKSTART.md)** - Get running in 2 minutes!
- � **[Build Summary](BUILD_SUMMARY.md)** - Complete project overview
- �📋 **[Problem Statement](problem_statement.txt)** - Original requirements

## 📋 Features- ✅ View a list of all tasks
- ➕ Add new tasks with descriptions
- ✔️ Mark tasks as completed or uncompleted
- 🗑️ Delete tasks
- 💾 In-memory data storage (no database required)
- 🎨 Clean and responsive UI

## 🛠️ Tech Stack

### Backend
- **.NET 8** - C# Web API
- **ASP.NET Core** - RESTful API framework
- **In-Memory Storage** - Simple list-based data storage

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls

## 📁 Project Structure

```
pathlock_assgn1/
├── BasicTaskManager/
│   ├── Backend/
│   │   ├── Controllers/
│   │   │   └── TasksController.cs
│   │   ├── Models/
│   │   │   └── TaskItem.cs
│   │   ├── Properties/
│   │   │   └── launchSettings.json
│   │   ├── Program.cs
│   │   ├── TaskManager.Api.csproj
│   │   └── appsettings.json
│   │
│   └── Frontend/
│       ├── src/
│       │   ├── App.tsx
│       │   ├── App.css
│       │   ├── main.tsx
│       │   ├── index.css
│       │   └── types.ts
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18 or higher)
- A code editor (VS Code recommended)

### Backend Setup

1. Navigate to the Backend directory:
```powershell
cd BasicTaskManager\Backend
```

2. Restore dependencies:
```powershell
dotnet restore
```

3. Run the backend API:
```powershell
dotnet run
```

The API will start on **http://localhost:5294**

### Frontend Setup

1. Open a new terminal and navigate to the Frontend directory:
```powershell
cd BasicTaskManager\Frontend
```

2. Install dependencies:
```powershell
npm install
```

3. Start the development server:
```powershell
npm run dev
```

The frontend will start on **http://localhost:5173**

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/{id}` | Update a task |
| DELETE | `/api/tasks/{id}` | Delete a task |

### Task Model

```csharp
{
  "id": "guid",
  "description": "string",
  "isCompleted": "boolean"
}
```

## 🎯 Usage

1. Make sure both the backend and frontend are running
2. Open your browser to **http://localhost:5173**
3. Add tasks using the input field
4. Click the checkbox to toggle task completion
5. Click "Delete" to remove tasks

## 🔧 Configuration

### Backend Port
The backend runs on port **5294** by default. You can change this in `Properties/launchSettings.json`:

```json
"applicationUrl": "http://localhost:5294"
```

### Frontend API URL
The frontend is configured to connect to the backend at `http://localhost:5294`. If you change the backend port, update the `API_URL` in `Frontend/src/App.tsx`:

```typescript
const API_URL = 'http://localhost:5294/api/tasks';
```

### CORS Configuration
CORS is configured in `Backend/Program.cs` to allow requests from `http://localhost:5173`. If you change the frontend port, update the CORS policy:

```csharp
policy.WithOrigins("http://localhost:5173")
```

## 🧪 Testing the API

You can test the API using tools like:
- **Postman**
- **cURL**
- **Thunder Client** (VS Code extension)

Example cURL commands:

```bash
# Get all tasks
curl http://localhost:5294/api/tasks

# Add a new task
curl -X POST http://localhost:5294/api/tasks -H "Content-Type: application/json" -d "{\"description\":\"New Task\",\"isCompleted\":false}"

# Update a task
curl -X PUT http://localhost:5294/api/tasks/{id} -H "Content-Type: application/json" -d "{\"id\":\"{id}\",\"description\":\"Updated Task\",\"isCompleted\":true}"

# Delete a task
curl -X DELETE http://localhost:5294/api/tasks/{id}
```

## 📝 Development Notes

- The backend uses **in-memory storage**, so all data will be lost when the API is restarted
- The application comes with 2 sample tasks pre-loaded for testing
- CORS is enabled to allow cross-origin requests from the frontend
- Both projects use hot-reload for development


## 👨‍💻 Author

Created by Ayush Kumar Kashyap as part of the Pathlock Assignment

---

**Happy Task Managing! 📝✨**
