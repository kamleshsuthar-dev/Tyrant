import { createClient } from "redis";

export const redis = createClient({
  socket: {
    host: '127.0.0.1',
    port: 6379,
  },
});

redis.on('connect', () => {
  console.log('✅ Connected to Redis');
});

redis.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

await redis.connect();