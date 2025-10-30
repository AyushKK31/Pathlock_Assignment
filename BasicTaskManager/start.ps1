# Quick Start Script for Task Manager

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Task Manager - Quick Start" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .NET is installed
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
$dotnetVersion = dotnet --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: .NET SDK not found. Please install .NET 8 SDK." -ForegroundColor Red
    Write-Host "Download from: https://dotnet.microsoft.com/download/dotnet/8.0" -ForegroundColor Yellow
    exit 1
}
Write-Host "✓ .NET SDK $dotnetVersion found" -ForegroundColor Green

# Check if Node.js is installed
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Node.js not found. Please install Node.js." -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}
Write-Host "✓ Node.js $nodeVersion found" -ForegroundColor Green

Write-Host ""
Write-Host "Starting Backend API..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\BasicTaskManager\Backend'; Write-Host 'Starting Backend on http://localhost:5294' -ForegroundColor Cyan; dotnet run"

Write-Host "Waiting 5 seconds for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "Starting Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\BasicTaskManager\Frontend'; Write-Host 'Starting Frontend on http://localhost:5173' -ForegroundColor Cyan; npm run dev"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   Application Started Successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend API: http://localhost:5294" -ForegroundColor Cyan
Write-Host "Frontend UI: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to open the app in your browser..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Start-Process "http://localhost:5173"
