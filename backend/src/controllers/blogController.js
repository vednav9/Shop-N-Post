const { validationResult } = require('express-validator');
const BlogPost = require('../models/BlogPost');

// @desc    Get all blog posts
// @route   GET /api/blog/posts
// @access  Public
const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const category = req.query.category;
    const tag = req.query.tag;
    const search = req.query.search;
    const featured = req.query.featured;

    // Build query
    let query = { published: true };

    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
      ];
    }

    if (featured === 'true') {
      query.featured = true;
    }

    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content'); // Exclude full content for list view

    const total = await BlogPost.countDocuments(query);

    res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get all posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts',
      error: error.message,
    });
  }
};

// @desc    Get single blog post
// @route   GET /api/blog/posts/:id
// @access  Public
const getPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    // Check if post is published (unless user is admin)
    if (!post.published && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    // Increment view count
    post.views = (post.views || 0) + 1;
    await post.save();

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Get post by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post',
      error: error.message,
    });
  }
};

// @desc    Get blog post by slug
// @route   GET /api/blog/posts/slug/:slug
// @access  Public
const getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    // Check if post is published (unless user is admin)
    if (!post.published && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    // Increment view count
    post.views = (post.views || 0) + 1;
    await post.save();

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error('Get post by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post',
      error: error.message,
    });
  }
};

// @desc    Create new blog post
// @route   POST /api/blog/posts
// @access  Private/Admin
const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { title, content, excerpt, category, tags, featuredImage, featured, published } = req.body;

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug already exists
    const existingPost = await BlogPost.findOne({ slug });
    if (existingPost) {
      return res.status(400).json({
        success: false,
        message: 'A post with this title already exists',
      });
    }

    const post = new BlogPost({
      title,
      content,
      excerpt,
      author: req.user.name,
      category,
      tags: tags || [],
      featuredImage,
      featured: featured || false,
      published: published !== undefined ? published : true,
      slug,
    });

    const savedPost = await post.save();

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: savedPost,
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create blog post',
      error: error.message,
    });
  }
};

// @desc    Update blog post
// @route   PUT /api/blog/posts/:id
// @access  Private/Admin
const updatePost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    const { title, content, excerpt, category, tags, featuredImage, featured, published } = req.body;

    // If title is being updated, regenerate slug
    let slug = post.slug;
    if (title && title !== post.title) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Check if new slug already exists
      const existingPost = await BlogPost.findOne({ slug, _id: { $ne: req.params.id } });
      if (existingPost) {
        return res.status(400).json({
          success: false,
          message: 'A post with this title already exists',
        });
      }
    }

    // Update fields
    post.title = title || post.title;
    post.content = content || post.content;
    post.excerpt = excerpt || post.excerpt;
    post.category = category || post.category;
    post.tags = tags !== undefined ? tags : post.tags;
    post.featuredImage = featuredImage || post.featuredImage;
    post.featured = featured !== undefined ? featured : post.featured;
    post.published = published !== undefined ? published : post.published;
    post.slug = slug;
    post.updatedAt = Date.now();

    const updatedPost = await post.save();

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: updatedPost,
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update blog post',
      error: error.message,
    });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/posts/:id
// @access  Private/Admin
const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
    }

    await BlogPost.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog post',
      error: error.message,
    });
  }
};

// @desc    Get blog categories
// @route   GET /api/blog/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await BlogPost.distinct('category', { published: true });
    
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message,
    });
  }
};

// @desc    Get blog tags
// @route   GET /api/blog/tags
// @access  Public
const getTags = async (req, res) => {
  try {
    const tags = await BlogPost.distinct('tags', { published: true });
    
    res.json({
      success: true,
      data: tags,
    });
  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tags',
      error: error.message,
    });
  }
};

// @desc    Get featured posts
// @route   GET /api/blog/featured
// @access  Public
const getFeaturedPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const posts = await BlogPost.find({ published: true, featured: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('-content');

    res.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error('Get featured posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured posts',
      error: error.message,
    });
  }
};

// @desc    Get recent posts
// @route   GET /api/blog/recent
// @access  Public
const getRecentPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const posts = await BlogPost.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('title excerpt featuredImage slug createdAt category');

    res.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error('Get recent posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent posts',
      error: error.message,
    });
  }
};

module.exports = {
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
};
