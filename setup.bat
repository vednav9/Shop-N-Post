@echo off
echo 🚀 Setting up Shop-N-Post Development Environment
echo ==================================================

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ and try again.
    exit /b 1
)

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Python is not installed. Please install Python 3.8+ and try again.
)

echo [INFO] Installing root dependencies...
call npm install

echo [INFO] Setting up Backend...
cd backend
if not exist .env (
    copy .env.example .env
    echo [SUCCESS] Created backend/.env from example
)
call npm install
cd ..

echo [INFO] Setting up Frontend...
cd frontend
if not exist .env (
    copy .env.example .env
    echo [SUCCESS] Created frontend/.env from example
)
call npm install
cd ..

echo [INFO] Setting up Python Scraper...
cd scraper
if not exist .env (
    copy .env.example .env
    echo [SUCCESS] Created scraper/.env from example
)

:: Create virtual environment if it doesn't exist
if not exist venv (
    echo [INFO] Creating Python virtual environment...
    python -m venv venv
    echo [SUCCESS] Created Python virtual environment
)

:: Activate virtual environment and install dependencies
echo [INFO] Installing Python dependencies...
call venv\Scripts\activate.bat
pip install -r requirements.txt
call venv\Scripts\deactivate.bat
cd ..

echo [SUCCESS] Setup completed successfully!
echo.
echo 📋 Next Steps:
echo ==============
echo 1. Configure your environment variables in the .env files
echo 2. Start MongoDB and Redis services
echo 3. Run the development servers:
echo.
echo    # Start all services:
echo    npm run dev
echo.
echo    # Or start services individually:
echo    npm run dev:backend    # Backend API (port 5000)
echo    npm run dev:frontend   # Frontend App (port 3000)
echo    npm run dev:scraper    # Python Scraper
echo.
echo 4. Visit http://localhost:3000 to see the application
echo.
echo 📚 Documentation:
echo =================
echo - API Documentation: http://localhost:5000/api
echo - MongoDB: Connect to mongodb://localhost:27017
echo - Redis: Connect to redis://localhost:6379
echo.
echo [SUCCESS] Happy coding! 🎉
pause
