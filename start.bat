@echo off
echo ========================================================
echo Launching ZENTHLYR Spatial Computing System
echo ========================================================

echo [1/2] Starting ZENTHLYR Backend Core (FastAPI Python)...
start "Zenthlyr-Backend" cmd /k "cd /d %~dp0backend && python main.py"

echo Waiting 5 seconds for backend initialization...
timeout /t 5 >nul

echo [2/2] Starting ZENTHLYR Frontend Interface (Vite React)...
start "Zenthlyr-Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo Waiting 5 seconds before opening browser...
timeout /t 5 >nul

echo Opening ZENTHLYR Spatial Interface in browser...
start http://localhost:5173
