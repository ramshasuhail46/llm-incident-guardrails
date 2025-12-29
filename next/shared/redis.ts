import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL;

let redisInstance: Redis | null = null;

const getRedisClient = () => {
    if (!redisInstance) {
        if (!REDIS_URL) {
            if (process.env.NODE_ENV === 'production') {
                console.warn('REDIS_URL is not set. Redis features will be disabled.');
            }
            // Return a dummy object if Redis is missing to prevent build-time crashes
            return new Proxy({} as any, {
                get: () => () => {
                    console.warn('Redis is not available (REDIS_URL missing)');
                    return Promise.resolve(null);
                }
            });
        }

        redisInstance = new Redis(REDIS_URL, {
            maxRetriesPerRequest: 0,
            connectTimeout: 5000,
            lazyConnect: true, // Only connect when used
        });

        redisInstance.on('error', (err) => {
            // Only log errors if we're not in a environment where we expect it to fail (like local-only redis during build)
            if (err.message.includes('ECONNREFUSED') && !REDIS_URL.includes('127.0.0.1')) {
                console.error('Redis error:', err);
            } else {
                console.warn('Redis connection issue:', err.message);
            }
        });
    }
    return redisInstance;
};

// Export a proxy so existing imports like `import redis from '...'` still work
// but only create the client when a method is called.
const redisProxy = new Proxy({} as Redis, {
    get: (target, prop) => {
        const client = getRedisClient();
        const value = (client as any)[prop];
        if (typeof value === 'function') {
            return value.bind(client);
        }
        return value;
    }
});

export default redisProxy;
