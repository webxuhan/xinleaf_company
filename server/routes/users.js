var express = require('express');
var router = express.Router();
var url = require('url');

const validator = require('validator');

//数据库操作对象
const Dbopt = require('../models/Dbopt');
//加密类
const crypto = require('crypto');
//状态校验
const filter = require('../util/filter');
//站点配置
const settings = require('../models/db/settings');
//用户对象
const User = require('../models/User');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.json('respond with a resource');
// });

const returnUserRouter = (io) =>{
// 	检查是否登录
	function isLogined(req){
		return req.session.logined;
	}
//	用户登录提交请求
	router.post('/doLogin',function(req,res,next){
		const name = req.body.name;
		const password = req.body.password;
		let errors;
		const newPsd = Dbopt.encrypt(password,settings.encrypt_key);
		if( !validator.isPsd(password) || !validator.isLength(password,6,20) ) {
			errors = '密码6-20个字符';
		}
		if( !validator.isLength(name,3,10) ) {
			errors = '用户名3-10个字符';
		}
		if( errors ) {
			res.json(errors);
		} else {
			console.log(name,password);
			// console.log(User.findOne({name:name,password:password}));
			User.findOne({name:name,password:password},function(err,user){
				if( user ) {
					res.json('success');
					console.log('登录的用户:',user);
				} else {
					res.json('用户名或密码错误！');
					console.log(err);
				}
			})
		}
	});

//	用户注册
	router.post('/doReg',function(req,res,next){
		let errors;
		const name = req.body.name;
		const password = req.body.password;
		const phoneNum = req.body.phoneNum;
		if( errors ) {
			res.json(errors);
		} else {
			const query = User.find({name : name});
			query.exec(function(err,user){
				if( user.length > 0 ) {
					errors = '用户名已存在！';
					res.json(errors);
				} else {
					Dbopt.addOne(User,req, res);
					console.log('添加成功');
				}
			})
		}

	});
}


//自定义校验扩展
validator.extend('isPsd', function (str) {
    return /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5,}/.test(str);
});


module.exports = router;