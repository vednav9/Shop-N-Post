import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCartIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartItemsCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const mainNavItems = [
    { name: 'Home', href: '/', current: true },
    { name: 'Products', href: '/products', current: false },
    { name: 'Categories', href: '/categories', current: false },
    { name: 'Blog', href: '/blog', current: false },
    { name: 'About', href: '/about', current: false },
  ];

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <p className="hidden md:block">Free shipping on orders over $50!</p>
            <div className="flex items-center space-x-4">
              <Link to="/help" className="hover:text-primary-200 transition-colors">
                Help & Support
              </Link>
              <span className="text-primary-200">|</span>
              <Link to="/track-order" className="hover:text-primary-200 transition-colors">
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BuildingStorefrontIcon className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">Shop-N-Post</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {mainNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search Icon - Mobile */}
            <button
              onClick={toggleSearch}
              className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-2 text-gray-700 hover:text-primary-600 transition-colors relative"
            >
              <HeartIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 text-gray-700 hover:text-primary-600 transition-colors relative"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-gray-700 hover:text-primary-600 transition-colors">
                  <UserIcon className="h-6 w-6" />
                  <span className="hidden md:block">{user.name}</span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/wishlist"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Wishlist
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="space-y-4">
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-gray-700 hover:text-primary-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!user && (
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    to="/login"
                    className="block text-gray-700 hover:text-primary-600 transition-colors font-medium mb-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
