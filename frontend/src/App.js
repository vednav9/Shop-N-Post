import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page Components
import { 
  HomePage, 
  LoginPage, 
  RegisterPage, 
  ProductsPage, 
  ProductDetailPage, 
  CartPage 
} from './pages';

// Components
import ScrollToTop from './components/common/ScrollToTop';
import LoadingSpinner from './components/common/LoadingSpinner';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App min-h-screen flex flex-col">
            <Helmet>
              <title>Shop-N-Post - Modern E-commerce Platform</title>
              <meta
                name="description"
                content="Discover amazing products with our advanced scraping technology and engaging blog content"
              />
              <meta name="keywords" content="ecommerce, shopping, products, deals, blog, technology" />
              <link rel="canonical" href={process.env.REACT_APP_URL || 'http://localhost:3000'} />
            </Helmet>

            <ScrollToTop />
            
            <Header />
            
            <main className="flex-grow">
              <React.Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/blog" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl">Blog Page - Coming Soon</h1></div>} />
                  <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl">404 - Page Not Found</h1></div>} />
                </Routes>
              </React.Suspense>
            </main>
            
            <Footer />
            
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  theme: {
                    primary: '#4aed88',
                  },
                },
              }}
            />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
