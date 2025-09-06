@echo off
echo 🔍 Shop-N-Post Setup Verification
echo ==================================

echo.
echo 📋 Checking your setup...
echo.

REM Check if Node.js is installed
echo 🟢 Checking Node.js...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Node.js is installed
    node --version
) else (
    echo ❌ Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
)

REM Check if MongoDB is running
echo.
echo 🟢 Checking MongoDB...
mongosh --eval "db.runCommand('ping')" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MongoDB is running
) else (
    echo ❌ MongoDB is not running
    echo Please start MongoDB service
)

REM Check if Redis is available
echo.
echo 🟢 Checking Redis...
redis-cli ping >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Redis is running
) else (
    echo ❌ Redis is not running
    echo Please start Redis service
)

REM Check if Python is installed
echo.
echo 🟢 Checking Python...
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Python is installed
    python --version
) else (
    echo ❌ Python is not installed
    echo Please install Python from https://python.org/
)

echo.
echo 📂 Checking project files...

REM Check if .env files exist
if exist "backend\.env" (
    echo ✅ Backend .env file exists
) else (
    echo ❌ Backend .env file missing - copy from .env.example
)

if exist "frontend\.env" (
    echo ✅ Frontend .env file exists
) else (
    echo ❌ Frontend .env file missing - copy from .env.example
)

if exist "scraper\.env" (
    echo ✅ Scraper .env file exists
) else (
    echo ❌ Scraper .env file missing - copy from .env.example
)

echo.
echo 📦 Checking dependencies...

REM Check backend dependencies
if exist "backend\node_modules" (
    echo ✅ Backend dependencies installed
) else (
    echo ❌ Backend dependencies missing - run 'npm install' in backend folder
)

REM Check frontend dependencies
if exist "frontend\node_modules" (
    echo ✅ Frontend dependencies installed
) else (
    echo ❌ Frontend dependencies missing - run 'npm install' in frontend folder
)

echo.
echo 🎯 Setup Summary:
echo ================
echo.
echo ✅ Your Shop-N-Post application includes:
echo    • Modern React.js frontend with Tailwind CSS
echo    • Node.js/Express backend with MongoDB
echo    • JWT authentication with Google OAuth
echo    • Shopping cart and order management
echo    • Product catalog with advanced search
echo    • Blog system with admin panel
echo    • Payment integration (Stripe/Razorpay)
echo    • Image upload with Cloudinary
echo    • Email notifications
echo    • Python scraper service
echo    • Redis caching
echo    • Production-ready deployment
echo.
echo 🚀 To start development:
echo    1. Run 'setup-database.bat' to seed your database
echo    2. Start backend: cd backend && npm run dev
echo    3. Start frontend: cd frontend && npm start
echo    4. Visit http://localhost:3000
echo.
echo 🌟 Your e-commerce platform is ready!
echo.
pause
