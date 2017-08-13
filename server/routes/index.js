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
  // res.render('index', { title: 'Express' });
  console.log('成功');
});
//	用户注册
router.post('/doReg',function(req,res,next){
	const name = req.body.name;
	const password = req.body.password;
	console.log(name,password);
	console.log(req.hostname);
	console.log('注册');
	res.json({name:'aaa',password:'123'});
	// if(errors){
	// 	res.end(errors);
	// }else{
	// 	res.json({name:'aaa',password:'123'});
	// }
});

module.exports = router;
