@echo off
title Parv Sharma - Engineering Portfolio
echo ========================================================
echo   Launching Parv Sharma's Engineering Portfolio
echo   SRM Institute of Science and Technology - ECE
echo ========================================================
echo.

where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo Starting local web server via Python...
    python start_server.py
    goto end
)

if exist "C:\msys64\ucrt64\bin\python.exe" (
    echo Starting local web server via MSYS2 Python...
    "C:\msys64\ucrt64\bin\python.exe" start_server.py
    goto end
)

echo Python not found on standard PATH.
echo Opening index.html directly in your default browser...
start "" "%~dp0index.html"

:end
