import dotenv from 'dotenv';
dotenv.config();
import { createClient } from 'redis';
import logger from './logger';

export const redis = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
});

redis.on('connect', () => {
  logger.info('✅ Connected to the redis database instance');
});

redis.on('error', (error) => {
  logger.error(error, '❌ Redis connection error:');
});

(async () => {
  try {
    await redis.connect();
  } catch (error) {
    logger.error(error, '❌ Failed to connect to Redis:');
  }
})();