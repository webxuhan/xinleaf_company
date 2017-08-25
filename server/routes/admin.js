/**
 * 后台管理系统接口
**/

const express = require('express');
const router = express.Router();
router.caseSensitive = true;
const url = require('url');

//管理员对象
const AdminUser = require('../models/AdminUser');
//数据校验
const validator = require('validator');
//短id
const shortid = require('shortid');
//站点配置
const settings = require('../models/db/settings');
//加密类
const crypto = require('crypto');
//数据库操作对象
const DbOpt = require('../models/Dbopt');

//后台登录接口
router.post('/login',(req,res,next) =>{
	const username = req.body.username;
	const password = req.body.password;
	console.log(username,password);
	AdminUser.findOne({'userName':username,'password':password}).exec((err,user)=>{
		console.log('err存在:',err);
		console.log('user存在:',user);
		if( err ) {
			console.log('err:',err);
			res.json({success:false,error:true,msg:err});
		}
		if( user ) {
			req.session.adminlogined = true;
			req.session.adminUserInfo = user;
			res.json({success:true,error:false,msg:'登录成功',data:{userName:user.userName}});
		} else{
			res.json({success:false,error:true,msg:'用户名或密码错误'});
		}
	})
});

//添加员工信息
router.post('/addStaff',(req,res,next) =>{
	var errors;
	const userName = req.body.userName;
	const phone = req.body.phoneNum;
	AdminUser.find({userName:userName,phone:phone}).exec((err,user) => {
		if( user.length > 0 ) {
			errors = '该员工信息已添加';
			res.json({success:false,error:true,msg:errors});
		} else {
			DbOpt.addOne(AdminUser,req,res);
			console.log('员工信息添加成功');
		}
	})
})


module.exports = router;
