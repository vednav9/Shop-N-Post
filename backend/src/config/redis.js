const redis = require('redis');

let redisClient;

const connectRedis = async () => {
  try {
    redisClient = redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      password: process.env.REDIS_PASSWORD || undefined,
      socket: {
        reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
      },
    });

    redisClient.on('connect', () => {
      console.log('🔴 Redis Client Connected');
    });

    redisClient.on('ready', () => {
      console.log('⚡ Redis Client Ready');
    });

    redisClient.on('error', (err) => {
      console.error('❌ Redis Client Error:', err);
    });

    redisClient.on('end', () => {
      console.log('📴 Redis Client Disconnected');
    });

    await redisClient.connect();

    // Test the connection
    await redisClient.ping();
    console.log('🏓 Redis connection test successful');

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await redisClient.quit();
      console.log('🔐 Redis connection closed through app termination');
    });

  } catch (error) {
    console.error('❌ Redis connection error:', error);
    // Continue without Redis if it's not available
    console.warn('⚠️  Continuing without Redis cache');
  }
};

const getRedisClient = () => {
  return redisClient;
};

// Cache helper functions
const cacheGet = async (key) => {
  if (!redisClient) return null;
  try {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Redis GET error:', error);
    return null;
  }
};

const cacheSet = async (key, value, ttl = 3600) => {
  if (!redisClient) return false;
  try {
    await redisClient.setEx(key, ttl, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Redis SET error:', error);
    return false;
  }
};

const cacheDel = async (key) => {
  if (!redisClient) return false;
  try {
    await redisClient.del(key);
    return true;
  } catch (error) {
    console.error('Redis DEL error:', error);
    return false;
  }
};

const cacheFlushPattern = async (pattern) => {
  if (!redisClient) return false;
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
    return true;
  } catch (error) {
    console.error('Redis FLUSH PATTERN error:', error);
    return false;
  }
};

module.exports = {
  connectRedis,
  getRedisClient,
  cacheGet,
  cacheSet,
  cacheDel,
  cacheFlushPattern,
};
