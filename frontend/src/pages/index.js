export { default as HomePage } from './HomePage';
export { default as LoginPage } from './LoginPage';
export { default as RegisterPage } from './RegisterPage';
export { default as ProductsPage } from './ProductsPage';
export { default as ProductDetailPage } from './ProductDetailPage';
export { default as CartPage } from './CartPage';

// Placeholder for other page components
import React from 'react';

export const CheckoutPage = () => <div className="p-8"><h1>Checkout Page - Coming Soon</h1></div>;
export const ProfilePage = () => <div className="p-8"><h1>Profile Page - Coming Soon</h1></div>;
export const BlogPage = () => <div className="p-8"><h1>Blog Page - Coming Soon</h1></div>;
export const BlogPostPage = () => <div className="p-8"><h1>Blog Post Page - Coming Soon</h1></div>;

// Admin pages
export const AdminDashboard = () => <div className="p-8"><h1>Admin Dashboard - Coming Soon</h1></div>;
export const AdminProducts = () => <div className="p-8"><h1>Admin Products - Coming Soon</h1></div>;
export const AdminOrders = () => <div className="p-8"><h1>Admin Orders - Coming Soon</h1></div>;
export const AdminUsers = () => <div className="p-8"><h1>Admin Users - Coming Soon</h1></div>;
export const AdminBlog = () => <div className="p-8"><h1>Admin Blog - Coming Soon</h1></div>;
export const NotFoundPage = () => <div className="p-8"><h1>404 - Page Not Found</h1></div>;

export default {
  ProductsPage,
  ProductDetailPage,
  CartPage,
  CheckoutPage,
  ProfilePage,
  BlogPage,
  BlogPostPage,
  NotFoundPage,
};
