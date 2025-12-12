const redis = require('redis');


const redisclient = redis.createClient({
    username: 'default',
    password: 'HLd9Fn3b5n9PsJE8AD0i8p1xBhijTBw3',
    socket: {
        host: 'redis-14666.c263.us-east-1-2.ec2.cloud.redislabs.com',
        port: 14666
    }
});

module.exports = redisclient;

