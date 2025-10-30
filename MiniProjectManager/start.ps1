# PowerShell script to start both Backend and Frontend

Write-Host "🚀 Starting Mini Project Manager..." -ForegroundColor Cyan
Write-Host ""

# Start Backend
Write-Host "📦 Starting Backend (.NET 8 API)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Backend; Write-Host '🔧 Restoring packages...' -ForegroundColor Green; dotnet restore; Write-Host '▶️  Starting API on http://localhost:5000' -ForegroundColor Green; Write-Host '📚 Swagger available at http://localhost:5000/swagger' -ForegroundColor Green; dotnet run"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "🎨 Starting Frontend (React + Vite)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Frontend; Write-Host '📦 Installing dependencies...' -ForegroundColor Green; npm install; Write-Host '▶️  Starting frontend on http://localhost:5173' -ForegroundColor Green; npm run dev"

Write-Host ""
Write-Host "✅ Both services are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "Backend API: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Swagger Docs: http://localhost:5000/swagger" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
