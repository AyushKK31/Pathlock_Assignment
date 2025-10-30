# Quick Start Guide

## Start the Application

### Option 1: Automatic (Recommended)
```powershell
cd MiniProjectManager
.\start.ps1
```

### Option 2: Manual

**Terminal 1 - Backend:**
```powershell
cd MiniProjectManager/Backend
dotnet restore
dotnet run
```

**Terminal 2 - Frontend:**
```powershell
cd MiniProjectManager/Frontend
npm install
npm run dev
```

## Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Swagger Docs:** http://localhost:5000/swagger

## First Steps

1. Open http://localhost:5173
2. Click "Register here" to create an account
3. Fill in username, email, and password
4. After registration, you'll be automatically logged in
5. Create your first project
6. Click on the project to add tasks
7. Manage your tasks (add, complete, edit, delete)

## Test User

You can create any user you want. Example:
- Username: `john`
- Email: `john@example.com`
- Password: `password123`

## Features to Try

✅ Register new account
✅ Login with credentials
✅ Create multiple projects
✅ View project list
✅ Delete projects
✅ Open project details
✅ Add tasks to projects
✅ Toggle task completion
✅ Edit task titles (double-click)
✅ Delete tasks
✅ Logout and login again

## Troubleshooting

**Backend won't start:**
- Make sure .NET 8 SDK is installed: `dotnet --version`
- Check if port 5000 is available

**Frontend won't start:**
- Make sure Node.js is installed: `node --version`
- Check if port 5173 is available
- Try: `cd Frontend; rm -r node_modules; npm install`

**Can't login:**
- Check that backend is running on port 5000
- Check browser console for errors
- Try clearing browser localStorage

**Database errors:**
- Delete the `projectmanager.db` file in Backend folder
- Restart the backend

## API Testing with Swagger

1. Go to http://localhost:5000/swagger
2. Test `/api/auth/register` endpoint
3. Copy the JWT token from response
4. Click "Authorize" button (🔒)
5. Enter: `Bearer YOUR_TOKEN_HERE`
6. Now you can test authenticated endpoints

## Development Tips

- Backend auto-reloads on code changes
- Frontend hot-reloads on save
- Check browser DevTools Console for frontend errors
- Check terminal for backend errors
- Database is SQLite (file: `projectmanager.db`)

## Tech Stack

- Backend: .NET 8, Entity Framework Core, SQLite, JWT
- Frontend: React 18, TypeScript, React Router, Vite
