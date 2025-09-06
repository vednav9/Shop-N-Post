const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
    maxlength: [200, 'Product name cannot be more than 200 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    min: [0, 'Price cannot be negative'],
  },
  originalPrice: {
    type: Number,
    default: null,
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot be more than 100%'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: [
      'Electronics',
      'Clothing',
      'Home & Garden',
      'Books',
      'Sports',
      'Toys',
      'Beauty',
      'Automotive',
      'Health',
      'Food',
      'Other',
    ],
  },
  subcategory: {
    type: String,
    required: [true, 'Please provide a subcategory'],
  },
  brand: {
    type: String,
    required: [true, 'Please provide a brand'],
  },
  sku: {
    type: String,
    unique: true,
    required: [true, 'Please provide a SKU'],
  },
  images: [{
    url: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
  }],
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: [0, 'Stock cannot be negative'],
  },
  isInStock: {
    type: Boolean,
    default: true,
  },
  specifications: {
    type: Map,
    of: String,
  },
  features: [String],
  tags: [String],
  weight: {
    type: Number,
    default: null,
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ['cm', 'inch'],
      default: 'cm',
    },
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      maxlength: [500, 'Review comment cannot be more than 500 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isScraped: {
    type: Boolean,
    default: false,
  },
  sourceUrl: {
    type: String,
    default: null,
  },
  sourceWebsite: {
    type: String,
    default: null,
  },
  affiliateLink: {
    type: String,
    default: null,
  },
  lastScraped: {
    type: Date,
    default: null,
  },
  seoTitle: {
    type: String,
    maxlength: [60, 'SEO title cannot be more than 60 characters'],
  },
  seoDescription: {
    type: String,
    maxlength: [160, 'SEO description cannot be more than 160 characters'],
  },
}, {
  timestamps: true,
});

// Indexes for performance
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ averageRating: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ isActive: 1, isInStock: 1 });
productSchema.index({ seller: 1 });
productSchema.index({ sku: 1 });

// Virtual for discount amount
productSchema.virtual('discountAmount').get(function() {
  if (this.originalPrice && this.discountPercentage > 0) {
    return this.originalPrice * (this.discountPercentage / 100);
  }
  return 0;
});

// Virtual for savings
productSchema.virtual('savings').get(function() {
  if (this.originalPrice) {
    return this.originalPrice - this.price;
  }
  return 0;
});

// Update average rating and total reviews
productSchema.methods.updateRatingStats = function() {
  if (this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = Number((totalRating / this.reviews.length).toFixed(1));
    this.totalReviews = this.reviews.length;
  } else {
    this.averageRating = 0;
    this.totalReviews = 0;
  }
};

// Pre-save middleware to update stock status
productSchema.pre('save', function(next) {
  this.isInStock = this.stock > 0;
  
  // Auto-generate SEO fields if not provided
  if (!this.seoTitle) {
    this.seoTitle = this.name.substring(0, 57) + '...';
  }
  
  if (!this.seoDescription) {
    this.seoDescription = this.description.substring(0, 157) + '...';
  }
  
  next();
});

// Pre-remove middleware to clean up related data
productSchema.pre('remove', async function(next) {
  // Remove from all carts
  await mongoose.model('Cart').updateMany(
    {},
    { $pull: { items: { product: this._id } } }
  );
  
  next();
});

module.exports = mongoose.model('Product', productSchema);
