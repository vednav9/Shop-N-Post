# Shop-N-Post

A modern e-commerce platform with integrated product scraping and blogging capabilities.

## 🚀 Features

- **E-commerce Platform**: Complete shopping experience with product catalog, cart, and checkout
- **Product Scraping**: Automated data aggregation from competitor sites
- **Blog Integration**: SEO-optimized content management system
- **Secure Authentication**: JWT + OAuth integration
- **Payment Processing**: Stripe/Razorpay integration
- **Admin Dashboard**: Comprehensive management interface
- **Real-time Caching**: Redis for improved performance

## 🏗️ Architecture

### Frontend
- **React.js** with **Tailwind CSS**
- Component-based architecture
- Responsive design
- State management with Context API

### Backend
- **Node.js** with **Express.js**
- MVC architecture pattern
- RESTful API design
- JWT authentication

### Database
- **MongoDB** for data persistence
- **Redis** for caching and session management

### Scraping Service
- **Python** with **BeautifulSoup**
- Asynchronous scraping with multithreading
- Automated data pipeline with cron jobs

## 📁 Project Structure

```
shop-n-post/
├── frontend/              # React.js frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── context/       # React context providers
│   └── public/            # Static assets
├── backend/               # Node.js backend
│   └── src/
│       ├── controllers/   # Route controllers
│       ├── models/        # Database models
│       ├── routes/        # API routes
│       ├── middleware/    # Custom middleware
│       ├── services/      # Business logic
│       ├── utils/         # Helper functions
│       └── config/        # Configuration files
├── scraper/               # Python scraping service
│   ├── src/
│   │   ├── scrapers/      # Site-specific scrapers
│   │   ├── utils/         # Scraping utilities
│   │   └── config/        # Scraper configuration
│   └── data/              # Scraped data storage
└── shared/                # Shared utilities and types
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.8+)
- MongoDB
- Redis

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd shop-n-post
```

2. Install dependencies for all services
```bash
# Install root dependencies
npm install

# Install all dependencies at once
npm run install:all
```

3. Set up environment variables
```bash
# Copy and configure environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp scraper/.env.example scraper/.env
```

4. Start MongoDB and Redis services locally
```bash
# Make sure MongoDB is running on localhost:27017
# Make sure Redis is running on localhost:6379
```

5. Start development servers
```bash
# Start all services at once
npm run dev

# Or start services individually:
# Backend API
npm run dev:backend

# Frontend App  
npm run dev:frontend

# Python Scraper
cd scraper && python main.py
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
- `PORT`: Server port
- `MONGODB_URI`: MongoDB connection string
- `REDIS_URL`: Redis connection URL
- `JWT_SECRET`: JWT signing secret
- `STRIPE_SECRET_KEY`: Stripe secret key
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth secret

#### Frontend (.env)
- `REACT_APP_API_URL`: Backend API URL
- `REACT_APP_STRIPE_PUBLIC_KEY`: Stripe publishable key
- `REACT_APP_GOOGLE_CLIENT_ID`: Google OAuth client ID

#### Scraper (.env)
- `MONGODB_URI`: MongoDB connection string
- `REDIS_URL`: Redis connection URL
- `SCRAPER_DELAY`: Delay between requests
- `MAX_CONCURRENT_REQUESTS`: Maximum concurrent requests

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart Endpoints
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove` - Remove item from cart

### Order Endpoints
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID

### Blog Endpoints
- `GET /api/blog/posts` - Get all blog posts
- `GET /api/blog/posts/:id` - Get blog post by ID
- `POST /api/blog/posts` - Create new blog post (Admin)
- `PUT /api/blog/posts/:id` - Update blog post (Admin)

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Scraper tests
cd scraper
python -m pytest
```

## 🚀 Deployment

### Production Build
```bash
# Frontend build
cd frontend
npm run build

# Backend preparation
cd backend
npm run build

# Scraper setup
cd scraper
pip install -r requirements.txt
```

### Deployment Platforms
- **Frontend**: Vercel/Netlify
- **Backend**: Render/Heroku/Railway
- **Database**: MongoDB Atlas
- **Cache**: Redis Cloud/Upstash
- **Scraper**: AWS Lambda/Railway/Render

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React.js team for the amazing frontend framework
- Express.js team for the robust backend framework
- BeautifulSoup for powerful web scraping capabilities
- Tailwind CSS for beautiful styling utilities
