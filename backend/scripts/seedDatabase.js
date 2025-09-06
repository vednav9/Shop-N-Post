const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shop-n-post');
    console.log('📊 Connected to MongoDB for seeding...');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { type: String, required: true },
  images: [String],
  stock: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  tags: [String],
  rating: { type: Number, default: 4.5 },
  reviews: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Blog Post Schema
const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  featuredImage: String,
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  slug: String,
  createdAt: { type: Date, default: Date.now }
});

// Create models
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Sample data
const sampleUsers = [
  {
    name: "Admin User",
    email: "admin@shopnpost.com",
    password: "admin123", // Will be hashed
    role: "admin",
    isVerified: true
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // Will be hashed
    role: "customer",
    isVerified: true
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123", // Will be hashed
    role: "customer",
    isVerified: true
  }
];

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 99.99,
    originalPrice: 129.99,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop"
    ],
    stock: 50,
    featured: true,
    tags: ["bluetooth", "wireless", "headphones", "audio", "noise-cancelling"],
    rating: 4.8,
    reviews: 127
  },
  {
    name: "Smart Fitness Watch",
    description: "Advanced smartwatch with health monitoring, GPS tracking, and 7-day battery life. Track your fitness goals with precision.",
    price: 199.99,
    originalPrice: 249.99,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&h=500&fit=crop"
    ],
    stock: 30,
    featured: true,
    tags: ["smartwatch", "fitness", "health", "GPS", "heart-rate"],
    rating: 4.6,
    reviews: 89
  },
  {
    name: "Premium Coffee Beans",
    description: "Organic, fair-trade coffee beans from the mountains of Colombia. Rich, smooth flavor with notes of chocolate and caramel.",
    price: 24.99,
    category: "Food & Beverages",
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop"
    ],
    stock: 100,
    featured: false,
    tags: ["coffee", "organic", "fair-trade", "colombia", "beans"],
    rating: 4.9,
    reviews: 203
  },
  {
    name: "Wireless Gaming Mouse",
    description: "High-precision gaming mouse with RGB lighting and programmable buttons. 16000 DPI sensor for competitive gaming.",
    price: 79.99,
    originalPrice: 99.99,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop"
    ],
    stock: 25,
    featured: true,
    tags: ["gaming", "mouse", "RGB", "wireless", "precision"],
    rating: 4.7,
    reviews: 156
  },
  {
    name: "Eco-Friendly Water Bottle",
    description: "Sustainable stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof.",
    price: 29.99,
    category: "Home & Garden",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop"
    ],
    stock: 75,
    featured: false,
    tags: ["water-bottle", "eco-friendly", "stainless-steel", "insulated"],
    rating: 4.5,
    reviews: 92
  },
  {
    name: "Designer Sunglasses",
    description: "Stylish polarized sunglasses with UV400 protection. Classic design that complements any outfit.",
    price: 149.99,
    originalPrice: 199.99,
    category: "Fashion",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop"
    ],
    stock: 40,
    featured: true,
    tags: ["sunglasses", "fashion", "polarized", "UV-protection", "designer"],
    rating: 4.4,
    reviews: 78
  }
];

const sampleBlogPosts = [
  {
    title: "Top 10 Tech Gadgets for 2025",
    content: "Discover the most innovative technology products that are revolutionizing our daily lives. From AI-powered devices to sustainable tech solutions, 2025 is bringing unprecedented innovation...",
    excerpt: "Explore the latest tech innovations that are changing the way we live and work in 2025.",
    author: "Tech Team",
    category: "Technology",
    tags: ["technology", "gadgets", "innovation", "2025", "AI"],
    featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
    featured: true,
    published: true,
    slug: "top-10-tech-gadgets-2025"
  },
  {
    title: "The Ultimate Coffee Brewing Guide",
    content: "Learn the secrets of brewing the perfect cup of coffee at home. From bean selection to brewing techniques, master the art of coffee making...",
    excerpt: "Master the art of brewing perfect coffee at home with our comprehensive guide.",
    author: "Coffee Expert",
    category: "Food & Lifestyle",
    tags: ["coffee", "brewing", "guide", "beans", "lifestyle"],
    featuredImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=400&fit=crop",
    featured: false,
    published: true,
    slug: "ultimate-coffee-brewing-guide"
  },
  {
    title: "Sustainable Living: Small Changes, Big Impact",
    content: "Discover how small changes in your daily routine can make a significant impact on the environment. From eco-friendly products to sustainable practices...",
    excerpt: "Learn how simple lifestyle changes can contribute to a more sustainable future.",
    author: "Eco Team",
    category: "Lifestyle",
    tags: ["sustainability", "eco-friendly", "environment", "lifestyle", "green"],
    featuredImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop",
    featured: true,
    published: true,
    slug: "sustainable-living-small-changes-big-impact"
  }
];

// Hash passwords
const hashPasswords = async (users) => {
  for (let user of users) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  return users;
};

// Generate slugs for blog posts
const generateSlugs = (posts) => {
  return posts.map(post => {
    if (!post.slug) {
      post.slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    return post;
  });
};

// Main seeding function
const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️ Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await BlogPost.deleteMany({});

    console.log('🔐 Hashing passwords...');
    const hashedUsers = await hashPasswords(sampleUsers);

    console.log('📝 Generating blog slugs...');
    const processedPosts = generateSlugs(sampleBlogPosts);

    console.log('👥 Inserting sample users...');
    await User.insertMany(hashedUsers);

    console.log('📦 Inserting sample products...');
    await Product.insertMany(sampleProducts);

    console.log('📰 Inserting sample blog posts...');
    await BlogPost.insertMany(processedPosts);

    console.log('✅ Database seeded successfully!');
    
    // Show summary
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    const blogCount = await BlogPost.countDocuments();

    console.log(`
📊 Database Summary:
👥 Users: ${userCount}
📦 Products: ${productCount}
📰 Blog Posts: ${blogCount}

🔑 Admin Credentials:
📧 Email: admin@shopnpost.com
🔒 Password: admin123

🛒 Sample Customer Accounts:
📧 john@example.com (password: password123)
📧 jane@example.com (password: password123)
    `);

    console.log('🎉 Your Shop-N-Post database is ready!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed.');
    process.exit(0);
  }
};

// Run the seeding
console.log('🚀 Starting database seeding...');
seedDatabase();
