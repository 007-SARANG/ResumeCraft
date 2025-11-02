@echo off
echo ====================================
echo ResumeCraft Setup
echo ====================================
echo.

echo Step 1: Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies!
    pause
    exit /b %errorlevel%
)
echo Backend dependencies installed successfully!
echo.

echo Step 2: Installing frontend dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies!
    pause
    exit /b %errorlevel%
)
cd ..
echo Frontend dependencies installed successfully!
echo.

echo Step 3: Setting up environment variables...
if not exist .env (
    copy .env.example .env
    echo .env file created! Please add your OpenAI API key.
) else (
    echo .env file already exists.
)
echo.

echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo Next steps:
echo 1. Add your OpenAI API key to the .env file
echo 2. Run 'npm run dev' to start the development server
echo.
pause
