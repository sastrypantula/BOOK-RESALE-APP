
const createClient=require('redis').createClient;

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: process.env.REDIS_HOST||'redis-15951.c239.us-east-1-2.ec2.cloud.redislabs.com',
        port: process.env.REDIS_PORT || 15951
    }
});

module.exports = redisClient;