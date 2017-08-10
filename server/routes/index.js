const express = require('express');
const router = express.Router();

//数据库操作对象
const Dbopt = require('../models/Dbopt');
//商品分类对象
const Category = require('../models/Category');
//商品对象
const Goods = require('../models/Goods');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
