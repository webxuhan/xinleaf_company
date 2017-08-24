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
router.post('/login',(req,res) =>{
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
})

module.exports = router;
