@echo off
echo ========================================================
echo Launching ZENTHLYR Spatial Computing System
echo ========================================================

echo [1/2] Starting ZENTHLYR Core Backend (FastAPI Python)...
start "Zenthlyr-Core" cmd /k "cd /d %~dp0core && python main.py"

echo Waiting 5 seconds for backend initialization...
timeout /t 5 >nul

echo [2/2] Starting ZENTHLYR Spatial Interface (Vite React)...
start "Zenthlyr-Interface" cmd /k "cd /d %~dp0interface && npm run dev"

echo Waiting 5 seconds before opening browser...
timeout /t 5 >nul

echo Opening ZENTHLYR Spatial Interface in browser...
start http://localhost:5173
