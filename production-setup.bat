@echo off
echo 🚀 Shop-N-Post Production Setup
echo ===============================

echo.
echo 📋 Setting up production environment...
echo.

REM Install backend dependencies
echo 🔧 Installing backend dependencies...
cd backend
call npm install --production

REM Install frontend dependencies and build
echo 🎨 Building frontend for production...
cd ..\frontend
call npm install
call npm run build

REM Install scraper dependencies
echo 🐍 Installing scraper dependencies...
cd ..\scraper
pip install -r requirements.txt

REM Return to root
cd ..

echo.
echo ✅ Production setup complete!
echo.
echo 📝 Next steps:
echo 1. Set up your environment variables in .env files
echo 2. Set up MongoDB and Redis
echo 3. Run the database seeding script
echo 4. Deploy your application
echo.
echo 🚀 Your Shop-N-Post application is ready for production!
echo.
pause
