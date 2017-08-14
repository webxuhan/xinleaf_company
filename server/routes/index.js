const express = require('express');
const router = express.Router();

//数据库操作对象
const Dbopt = require('../models/Dbopt');
//校验
const validator = require("validator");
//商品分类对象
const Category = require('../models/Category');
//商品对象
const Goods = require('../models/Goods');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log('成功');
});

//自定义校验扩展
// validator.extend('isUserName', function (str) {
//     return /^[a-zA-Z][a-zA-Z0-9_]{4,11}$/.test(str);
// });

// validator.extend('isGBKName', function (str) {
//     return /[\u4e00-\u9fa5]/.test(str);
// });

// validator.extend('isPsd', function (str) {
//     return /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5,}/.test(str);
// });

// validator.extend('isQQ', function (str) {
//     return RegExp(/^[1-9][0-9]{4,9}$/).test(str);
// });

// //只能是英文
// validator.extend('isEn', function (str) {
//     return /^\S+[a-z A-Z]$/.test(str);
// });

module.exports = router;
