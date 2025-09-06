const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'shop-n-post',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      { width: 1000, height: 1000, crop: 'limit' },
      { quality: 'auto' }
    ],
  },
});

// Configure multer with Cloudinary storage
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Please upload only image files'), false);
    }
  },
});

class UploadService {
  // Single file upload
  static uploadSingle(fieldName) {
    return upload.single(fieldName);
  }

  // Multiple files upload
  static uploadMultiple(fieldName, maxCount = 5) {
    return upload.array(fieldName, maxCount);
  }

  // Upload image from buffer/base64
  static async uploadFromBuffer(buffer, options = {}) {
    try {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'shop-n-post',
            ...options,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(buffer);
      });
    } catch (error) {
      console.error('Upload from buffer error:', error);
      throw error;
    }
  }

  // Upload image from URL
  static async uploadFromUrl(url, options = {}) {
    try {
      const result = await cloudinary.uploader.upload(url, {
        folder: 'shop-n-post',
        ...options,
      });
      return result;
    } catch (error) {
      console.error('Upload from URL error:', error);
      throw error;
    }
  }

  // Delete image from Cloudinary
  static async deleteImage(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      console.error('Delete image error:', error);
      throw error;
    }
  }

  // Delete multiple images
  static async deleteMultipleImages(publicIds) {
    try {
      const result = await cloudinary.api.delete_resources(publicIds);
      return result;
    } catch (error) {
      console.error('Delete multiple images error:', error);
      throw error;
    }
  }

  // Get image info
  static async getImageInfo(publicId) {
    try {
      const result = await cloudinary.api.resource(publicId);
      return result;
    } catch (error) {
      console.error('Get image info error:', error);
      throw error;
    }
  }

  // Generate optimized image URL
  static generateOptimizedUrl(publicId, transformations = {}) {
    try {
      return cloudinary.url(publicId, {
        fetch_format: 'auto',
        quality: 'auto',
        ...transformations,
      });
    } catch (error) {
      console.error('Generate optimized URL error:', error);
      throw error;
    }
  }

  // Create image transformations
  static createTransformations(options) {
    const transformations = [];

    if (options.width || options.height) {
      transformations.push({
        width: options.width,
        height: options.height,
        crop: options.crop || 'fill',
      });
    }

    if (options.quality) {
      transformations.push({ quality: options.quality });
    }

    if (options.format) {
      transformations.push({ fetch_format: options.format });
    }

    if (options.blur) {
      transformations.push({ effect: `blur:${options.blur}` });
    }

    if (options.grayscale) {
      transformations.push({ effect: 'grayscale' });
    }

    return transformations;
  }

  // Resize image
  static async resizeImage(publicId, width, height, crop = 'fill') {
    try {
      const result = await cloudinary.uploader.explicit(publicId, {
        type: 'upload',
        eager: [
          {
            width: width,
            height: height,
            crop: crop,
          }
        ],
      });
      return result;
    } catch (error) {
      console.error('Resize image error:', error);
      throw error;
    }
  }

  // Generate thumbnail
  static generateThumbnail(publicId, size = 150) {
    return cloudinary.url(publicId, {
      width: size,
      height: size,
      crop: 'fill',
      fetch_format: 'auto',
      quality: 'auto',
    });
  }

  // Extract public ID from Cloudinary URL
  static extractPublicId(cloudinaryUrl) {
    try {
      const matches = cloudinaryUrl.match(/\/v\d+\/(.+)\.\w+$/);
      return matches ? matches[1] : null;
    } catch (error) {
      console.error('Extract public ID error:', error);
      return null;
    }
  }

  // Validate image file
  static validateImageFile(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.');
    }

    if (file.size > maxSize) {
      throw new Error(`File too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`);
    }

    return true;
  }
}

module.exports = UploadService;
