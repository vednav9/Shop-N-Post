import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      
      // Return error message from server
      return Promise.reject(new Error(data.message || 'Server error'));
    } else if (error.request) {
      // Network error
      return Promise.reject(new Error('Network error - please check your connection'));
    } else {
      // Other error
      return Promise.reject(new Error(error.message || 'An unexpected error occurred'));
    }
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
  googleAuth: (tokenData) => api.post('/auth/google', tokenData),
};

export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getByCategory: (category, params) => api.get(`/products/category/${category}`, { params }),
  search: (query, params) => api.get('/products/search', { params: { q: query, ...params } }),
  getFeatured: () => api.get('/products/featured'),
  getRecommended: (productId) => api.get(`/products/${productId}/recommended`),
};

export const cartService = {
  getCart: () => api.get('/cart'),
  addToCart: (productId, quantity, variant) => 
    api.post('/cart/add', { productId, quantity, variant }),
  updateCartItem: (productId, quantity) => 
    api.put('/cart/update', { productId, quantity }),
  removeFromCart: (productId) => api.delete(`/cart/remove/${productId}`),
  clearCart: () => api.delete('/cart/clear'),
};

export const orderAPI = {
  create: (orderData) => api.post('/orders', orderData),
  getAll: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
};

export const blogAPI = {
  getPosts: (params) => api.get('/blog/posts', { params }),
  getPostById: (id) => api.get(`/blog/posts/${id}`),
  getPostBySlug: (slug) => api.get(`/blog/posts/slug/${slug}`),
  getCategories: () => api.get('/blog/categories'),
  getPostsByCategory: (category, params) => api.get(`/blog/posts/category/${category}`, { params }),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (userData) => api.put('/user/profile', userData),
  getWishlist: () => api.get('/user/wishlist'),
  addToWishlist: (productId) => api.post('/user/wishlist', { productId }),
  removeFromWishlist: (productId) => api.delete(`/user/wishlist/${productId}`),
  getAddresses: () => api.get('/user/addresses'),
  addAddress: (address) => api.post('/user/addresses', address),
  updateAddress: (id, address) => api.put(`/user/addresses/${id}`, address),
  deleteAddress: (id) => api.delete(`/user/addresses/${id}`),
};

export default api;
