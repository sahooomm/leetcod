const redis = require('redis');


const redisclient = redis.createClient({
    username: 'default',
    password: process.env.Redis_password,
    socket: {
        host: 'redis-14666.c263.us-east-1-2.ec2.cloud.redislabs.com',
        port: 14666
    }
});

module.exports = redisclient;

