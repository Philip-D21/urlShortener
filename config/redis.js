const Redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

const REDIS_USERNAME = process.env.REDIS_USERNAME || 'default';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || null;

class Cache {
  constructor() {
    this.redis = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.redis = Redis.createClient({
        url: `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
      });

      this.redis.on('connect', () => {
        console.log('Redis connected');
        resolve();
      });

      this.redis.on('error', (error) => {
        console.error('Redis connection error:', error);
        reject(error);
      });
    });
  }
}

const instance = new Cache();

module.exports = instance;
