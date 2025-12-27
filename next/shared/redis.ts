import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379/0';

const redis = new Redis(REDIS_URL);

export default redis;
