import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BuildingStorefrontIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-primary-600 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-primary-100">
                Subscribe to our newsletter for the latest deals and updates
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white min-w-0 flex-1 md:w-80"
              />
              <button className="bg-accent-500 hover:bg-accent-600 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <BuildingStorefrontIcon className="h-8 w-8 text-primary-400" />
              <span className="text-2xl font-bold">Shop-N-Post</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your premier destination for quality products and insightful content. 
              We combine cutting-edge technology with exceptional service to deliver 
              an unmatched shopping experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <YouTubeIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-primary-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Special Deals
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-gray-300 hover:text-primary-400 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/bestsellers" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    123 Commerce Street<br />
                    Business District<br />
                    City, State 12345
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <p className="text-gray-300">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <p className="text-gray-300">support@shopnpost.com</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="font-medium mb-3">Business Hours</h5>
              <div className="text-sm text-gray-300 space-y-1">
                <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                <p>Saturday: 10:00 AM - 6:00 PM</p>
                <p>Sunday: 12:00 PM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Shop-N-Post. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-primary-400 transition-colors">
                Cookie Policy
              </Link>
              <Link to="/accessibility" className="text-gray-400 hover:text-primary-400 transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
