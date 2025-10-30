# 🚀 Quick Start Guide

This guide will help you get the Task Manager application up and running in just a few minutes!

## ⚡ Super Quick Start (Using Script)

If you have both .NET 8 SDK and Node.js installed, simply run:

```powershell
.\start.ps1
```

This script will automatically:
- Check prerequisites
- Start the backend API
- Start the frontend development server
- Open the app in your browser

## 📋 Manual Setup

### Prerequisites Check

Before starting, ensure you have:

1. **.NET 8 SDK** - Check by running:
   ```powershell
   dotnet --version
   ```
   Should show version 8.x.x. If not installed, download from: https://dotnet.microsoft.com/download/dotnet/8.0

2. **Node.js (v18+)** - Check by running:
   ```powershell
   node --version
   ```
   Should show v18.x.x or higher. If not installed, download from: https://nodejs.org/

### Step 1: Start the Backend

Open a PowerShell terminal and run:

```powershell
cd BasicTaskManager\Backend
dotnet restore
dotnet run
```

You should see:
```
Now listening on: http://localhost:5294
```

**Keep this terminal open!**

### Step 2: Start the Frontend

Open a **NEW** PowerShell terminal and run:

```powershell
cd BasicTaskManager\Frontend
npm install
npm run dev
```

You should see:
```
VITE ready in X ms

➜  Local:   http://localhost:5173/
```

**Keep this terminal open too!**

### Step 3: Open the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 🎉 You're Done!

You should now see the Task Manager interface where you can:
- Add new tasks
- Mark tasks as complete
- Delete tasks

## ⚠️ Troubleshooting

### Backend Issues

**Problem:** Port 5294 is already in use
```powershell
# Solution: Find and kill the process using the port
netstat -ano | findstr :5294
taskkill /PID <PID> /F
```

**Problem:** CORS errors in browser console
- Check that backend is running on port 5294
- Check that frontend is running on port 5173
- Restart both applications

### Frontend Issues

**Problem:** Port 5173 is already in use
- Change the port in `Frontend/vite.config.ts`
- Update the CORS policy in `Backend/Program.cs` to match the new port

**Problem:** Cannot connect to backend
- Verify backend is running: `http://localhost:5294/api/tasks` should return JSON
- Check the `API_URL` in `Frontend/src/App.tsx`

**Problem:** npm install fails
```powershell
# Solution: Clear cache and reinstall
npm cache clean --force
Remove-Item node_modules -Recurse -Force
npm install
```

## 🔄 Development Workflow

### Making Changes

Both the backend and frontend support hot-reload:

- **Backend**: Save any `.cs` file → API automatically restarts
- **Frontend**: Save any `.tsx` file → Browser automatically refreshes

### Testing the API

You can test the API directly using PowerShell:

```powershell
# Get all tasks
Invoke-RestMethod -Uri "http://localhost:5294/api/tasks" -Method Get

# Add a new task
$body = @{
    description = "Test Task"
    isCompleted = $false
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5294/api/tasks" -Method Post -Body $body -ContentType "application/json"
```

Or use tools like:
- **Postman**
- **Thunder Client** (VS Code extension)
- **curl** (in Git Bash or WSL)

## 🛑 Stopping the Application

To stop the application:
1. Go to each terminal window
2. Press `Ctrl + C`
3. Confirm with `Y` if prompted

## 📚 Next Steps

Once everything is running, check out:
- [README.md](README.md) - Full documentation
- [problem_statement.txt](problem_statement.txt) - Original requirements
- API endpoints at `http://localhost:5294/api/tasks`

## 💡 Tips

1. **Use two monitors**: One for code, one for the app
2. **Open DevTools** (F12) to see API calls
3. **Check both terminal windows** for error messages
4. **Save files often** to see changes instantly

---

Happy coding! 🎈
