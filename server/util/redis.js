/**
 * redis client
 **/
'use strict';

const settings = require('../models/db/settings');
const redis = require('redis');
const client = redis.creatClient(settings.redis_port,settings.redis_host);
client.auth(settings.redis_psd);

module.exports = client;