const express = require('express');
const { query } = require('express-validator');
const productController = require('../controllers/productController');
const { auth, adminAuth, sellerAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with filtering, sorting, and pagination
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Minimum price must be a positive number'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Maximum price must be a positive number'),
  query('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
], productController.getProducts);

// @route   GET /api/products/search
// @desc    Search products
// @access  Public
router.get('/search', [
  query('q').notEmpty().withMessage('Search query is required'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
], productController.searchProducts);

// @route   GET /api/products/categories
// @desc    Get all product categories
// @access  Public
router.get('/categories', productController.getCategories);

// @route   GET /api/products/featured
// @desc    Get featured products
// @access  Public
router.get('/featured', productController.getFeaturedProducts);

// @route   GET /api/products/trending
// @desc    Get trending products
// @access  Public
router.get('/trending', productController.getTrendingProducts);

// @route   GET /api/products/recommendations/:userId
// @desc    Get product recommendations for a user
// @access  Private
router.get('/recommendations/:userId', auth, productController.getRecommendations);

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', productController.getProduct);

// @route   POST /api/products
// @desc    Create a new product
// @access  Private (Seller/Admin)
router.post('/', sellerAuth, productController.createProduct);

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private (Seller/Admin - own products only, Admin - all products)
router.put('/:id', sellerAuth, productController.updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private (Seller/Admin - own products only, Admin - all products)
router.delete('/:id', sellerAuth, productController.deleteProduct);

// @route   POST /api/products/:id/reviews
// @desc    Add a product review
// @access  Private
router.post('/:id/reviews', auth, productController.addReview);

// @route   PUT /api/products/:id/reviews/:reviewId
// @desc    Update a product review
// @access  Private (Review author only)
router.put('/:id/reviews/:reviewId', auth, productController.updateReview);

// @route   DELETE /api/products/:id/reviews/:reviewId
// @desc    Delete a product review
// @access  Private (Review author or Admin)
router.delete('/:id/reviews/:reviewId', auth, productController.deleteReview);

// @route   POST /api/products/:id/images
// @desc    Upload product images
// @access  Private (Seller/Admin)
router.post('/:id/images', sellerAuth, productController.uploadImages);

// @route   DELETE /api/products/:id/images/:imageId
// @desc    Delete product image
// @access  Private (Seller/Admin)
router.delete('/:id/images/:imageId', sellerAuth, productController.deleteImage);

// @route   PUT /api/products/:id/stock
// @desc    Update product stock
// @access  Private (Seller/Admin)
router.put('/:id/stock', sellerAuth, productController.updateStock);

// @route   POST /api/products/:id/view
// @desc    Increment product view count
// @access  Public
router.post('/:id/view', productController.incrementViewCount);

module.exports = router;
