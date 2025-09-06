@echo off
title Shop-N-Post Backend Setup
color 0A

echo.
echo ======================================
echo   Shop-N-Post Backend Setup Script
echo ======================================
echo.

echo [1/6] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found! Please install Node.js v18+ from https://nodejs.org/
    echo.
    pause
    exit /b 1
) else (
    echo ✅ Node.js found
    node --version
)

echo.
echo [2/6] Checking MongoDB...
mongod --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  MongoDB not found! Please install MongoDB Community Edition
    echo    Download from: https://www.mongodb.com/try/download/community
    echo.
) else (
    echo ✅ MongoDB found
)

echo.
echo [3/6] Checking Redis...
redis-cli ping >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Redis not responding! Please install and start Redis
    echo    Windows: https://github.com/MicrosoftArchive/redis/releases
    echo.
) else (
    echo ✅ Redis found and running
)

echo.
echo [4/6] Installing backend dependencies...
cd /d "%~dp0"
npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
) else (
    echo ✅ Dependencies installed successfully
)

echo.
echo [5/6] Checking environment file...
if not exist ".env" (
    echo 📝 Creating .env file from template...
    copy ".env.example" ".env" >nul
    echo ✅ .env file created
    echo.
    echo ⚠️  IMPORTANT: Please edit .env file and update:
    echo    - JWT_SECRET: Change to a long random string
    echo    - JWT_REFRESH_SECRET: Change to another long random string
    echo    - Payment gateway keys (Stripe/Razorpay)
    echo    - OAuth credentials (Google)
    echo.
) else (
    echo ✅ .env file exists
)

echo.
echo [6/6] Setup complete! 🎉
echo.
echo Next steps:
echo 1. Edit .env file with your configuration
echo 2. Make sure MongoDB and Redis are running
echo 3. Run: npm run dev (to start development server)
echo.
echo Useful commands:
echo - npm run dev      (Start development server)
echo - npm start        (Start production server)
echo - npm test         (Run tests)
echo.

pause
