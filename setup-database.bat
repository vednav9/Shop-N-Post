@echo off
echo 🚀 Shop-N-Post Database Setup
echo ===============================

echo.
echo 📋 Step 1: Installing required packages...
cd backend
call npm install mongoose bcryptjs dotenv

echo.
echo 📊 Step 2: Creating sample database...
echo 🔧 Make sure MongoDB is running first!
echo.

pause

node scripts/seedDatabase.js

echo.
echo ✅ Database setup complete!
echo 🌐 You can now start your backend server with: npm start
echo.
pause
