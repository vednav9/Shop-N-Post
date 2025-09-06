const express = require('express');
const { body } = require('express-validator');
const { auth, adminAuth } = require('../middleware/auth');
const {
  getAllPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getCategories,
  getTags,
  getFeaturedPosts,
  getRecentPosts,
} = require('../controllers/blogController');

const router = express.Router();

// @route   GET /api/blog/posts
// @desc    Get all blog posts
// @access  Public
router.get('/posts', getAllPosts);

// @route   GET /api/blog/featured
// @desc    Get featured blog posts
// @access  Public
router.get('/featured', getFeaturedPosts);

// @route   GET /api/blog/recent
// @desc    Get recent blog posts
// @access  Public
router.get('/recent', getRecentPosts);

// @route   GET /api/blog/categories
// @desc    Get all blog categories
// @access  Public
router.get('/categories', getCategories);

// @route   GET /api/blog/tags
// @desc    Get all blog tags
// @access  Public
router.get('/tags', getTags);

// @route   GET /api/blog/posts/slug/:slug
// @desc    Get blog post by slug
// @access  Public
router.get('/posts/slug/:slug', getPostBySlug);

// @route   GET /api/blog/posts/:id
// @desc    Get blog post by ID
// @access  Public
router.get('/posts/:id', getPostById);

// @route   POST /api/blog/posts
// @desc    Create new blog post
// @access  Private (Admin only)
router.post(
  '/posts',
  auth,
  adminAuth,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('excerpt').notEmpty().withMessage('Excerpt is required'),
    body('category').notEmpty().withMessage('Category is required'),
  ],
  createPost
);

// @route   PUT /api/blog/posts/:id
// @desc    Update blog post
// @access  Private (Admin only)
router.put(
  '/posts/:id',
  auth,
  adminAuth,
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().notEmpty().withMessage('Content cannot be empty'),
    body('excerpt').optional().notEmpty().withMessage('Excerpt cannot be empty'),
    body('category').optional().notEmpty().withMessage('Category cannot be empty'),
  ],
  updatePost
);

// @route   DELETE /api/blog/posts/:id
// @desc    Delete blog post
// @access  Private (Admin only)
router.delete('/posts/:id', auth, adminAuth, deletePost);

module.exports = router;
