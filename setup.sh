#!/bin/bash

# Shop-N-Post Development Setup Script
# This script sets up the development environment for all services

echo "🚀 Setting up Shop-N-Post Development Environment"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check if Python is installed
if ! command -v python &> /dev/null && ! command -v python3 &> /dev/null; then
    print_error "Python is not installed. Please install Python 3.8+ and try again."
    exit 1
fi

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    print_warning "MongoDB is not installed. Please install MongoDB Community Edition."
    print_warning "Download from: https://www.mongodb.com/try/download/community"
fi

# Check if Redis is installed
if ! command -v redis-server &> /dev/null; then
    print_warning "Redis is not installed. Please install Redis."
    print_warning "Download from: https://redis.io/download"
fi

print_status "Installing root dependencies..."
npm install

print_status "Setting up Backend..."
cd backend
if [ ! -f .env ]; then
    cp .env.example .env
    print_success "Created backend/.env from example"
fi
npm install
cd ..

print_status "Setting up Frontend..."
cd frontend
if [ ! -f .env ]; then
    cp .env.example .env
    print_success "Created frontend/.env from example"
fi
npm install
cd ..

print_status "Setting up Python Scraper..."
cd scraper
if [ ! -f .env ]; then
    cp .env.example .env
    print_success "Created scraper/.env from example"
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    print_status "Creating Python virtual environment..."
    python3 -m venv venv
    print_success "Created Python virtual environment"
fi

# Activate virtual environment and install dependencies
print_status "Installing Python dependencies..."
source venv/bin/activate
pip install -r requirements.txt
deactivate
cd ..

print_success "Setup completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "=============="
echo "1. Configure your environment variables in the .env files"
echo "2. Start MongoDB and Redis services"
echo "3. Run the development servers:"
echo ""
echo "   ${BLUE}# Start all services:${NC}"
echo "   npm run dev"
echo ""
echo "   ${BLUE}# Or start services individually:${NC}"
echo "   npm run dev:backend    # Backend API (port 5000)"
echo "   npm run dev:frontend   # Frontend App (port 3000)"
echo "   npm run dev:scraper    # Python Scraper"
echo ""
echo "4. Visit http://localhost:3000 to see the application"
echo ""
echo "📚 Documentation:"
echo "================="
echo "- API Documentation: http://localhost:5000/api"
echo "- MongoDB: Connect to mongodb://localhost:27017"
echo "- Redis: Connect to redis://localhost:6379"
echo ""
print_success "Happy coding! 🎉"
