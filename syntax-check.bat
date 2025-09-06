@echo off
echo ========================================
echo   SHOP-N-POST SYNTAX VERIFICATION
echo ========================================
echo.

echo Checking Backend Syntax...
cd /d "d:\Vedant Navthale\Codes\Projects\shop-n-post\backend"

echo - Checking server.js...
node -c server.js
if %errorlevel% neq 0 (
    echo ERROR: server.js has syntax errors!
    pause
    exit /b 1
)

echo - Checking app.js...
node -c src/app.js
if %errorlevel% neq 0 (
    echo ERROR: app.js has syntax errors!
    pause
    exit /b 1
)

echo - Checking middleware/auth.js...
node -c src/middleware/auth.js
if %errorlevel% neq 0 (
    echo ERROR: auth.js has syntax errors!
    pause
    exit /b 1
)

echo - Checking routes/blog.js...
node -c src/routes/blog.js
if %errorlevel% neq 0 (
    echo ERROR: blog.js has syntax errors!
    pause
    exit /b 1
)

echo - Checking routes/order.js...
node -c src/routes/order.js
if %errorlevel% neq 0 (
    echo ERROR: order.js has syntax errors!
    pause
    exit /b 1
)

echo - Checking all routes...
for %%f in (src\routes\*.js) do (
    node -c "%%f"
    if !errorlevel! neq 0 (
        echo ERROR: %%f has syntax errors!
        pause
        exit /b 1
    )
)

echo - Checking all controllers...
for %%f in (src\controllers\*.js) do (
    node -c "%%f"
    if !errorlevel! neq 0 (
        echo ERROR: %%f has syntax errors!
        pause
        exit /b 1
    )
)

echo.
echo Checking Frontend Syntax...
cd /d "d:\Vedant Navthale\Codes\Projects\shop-n-post\frontend"

echo - Checking CartContext.js...
node -c src/context/CartContext.js
if %errorlevel% neq 0 (
    echo ERROR: CartContext.js has syntax errors!
    pause
    exit /b 1
)

echo - Checking AuthContext.js...
node -c src/context/AuthContext.js
if %errorlevel% neq 0 (
    echo ERROR: AuthContext.js has syntax errors!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ALL SYNTAX CHECKS PASSED! ✅
echo ========================================
echo.
echo Your Shop-N-Post application is ready to run!
echo.
echo To start the application:
echo 1. Backend: cd backend ^&^& npm run dev
echo 2. Frontend: cd frontend ^&^& npm start
echo.
pause
