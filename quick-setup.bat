@echo off
echo 🚀 Setting up Shop-N-Post...

echo [1/5] Installing root dependencies...
npm install

echo [2/5] Setting up Backend...
cd backend
if not exist .env copy .env.example .env
npm install
cd ..

echo [3/5] Setting up Frontend...
cd frontend
if not exist .env copy .env.example .env
npm install
cd ..

echo [4/5] Setting up Python Scraper...
cd scraper
if not exist .env copy .env.example .env
if not exist venv python -m venv venv
call venv\Scripts\activate.bat
pip install -r requirements.txt
call venv\Scripts\deactivate.bat
cd ..

echo [5/5] Setup completed! ✅

echo.
echo 📋 Next steps:
echo 1. Configure your .env files
echo 2. Start the services:
echo    npm run dev
echo.
echo 🌐 Access your app at: http://localhost:3000
pause
