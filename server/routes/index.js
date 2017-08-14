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
//	用户注册
router.post('/doReg',function(req,res,next){
	var errors;
	const name = req.body.name;
	const password = req.body.password;
	const phoneNum = req.body.phoneNum;
	// if( errors ){
	// 	console.log(1);
	// 	res.json(errors);
	// } else{
	// 	console.log(2);
	// 	const query = User.find().or([{name : name}]);
	// 	console.log(query);
	// }
	if( errors ) {
		res.json(errors);
		console.log(1);
	} else {
		// 用户名是否唯一
		// const query = User.find({name : name});
		// res.json({name: 1223});
		DbOpt.addOne(User,req, res);
		console.log('添加成功');
	}
	// 	query.exec(function(err,user){
	// 		if( user.length > 0 ) {
	// 			errors = '用户名已存在！';
	// 			res.json(errors);
	// 		} else {
				// DbOpt.addOne(User,req, res);
				// console.log('添加成功');
	// 		}
	// 	})
	// }
	
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
