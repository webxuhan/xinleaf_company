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

//后台用户登录
router.post('/login',(req,res,next) =>{
	const username = req.body.username;
	const password = req.body.password;
	console.log(username,password);
	console.log('用户登录:',req.cookies);
	console.log('用户登录body:',req.body);
	console.log('用户登录sess:',req.session);
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
			// console.log('test11111111111111:',req.session.adminUserInfo);
			// console.log('req.session.adminlogined:',req.session.adminlogined);
			// console.log('req.session:',req.session);
			res.json({success:true,error:false,msg:'登录成功',data:{userName:user.userName}});
		} else{
			res.json({success:false,error:true,msg:'用户名或密码错误'});
		}
	})
});

//后台用户退出
router.post('/signout',(req,res) => {
	console.log('退出前检查:',req.session);
	req.session.adminlogined = false;
    req.session.adminUserInfo = '';
    res.json({success:true,error:false,msg:'退出成功'});
});

//添加员工信息
router.post('/addStaff',(req,res,next) =>{
	var errors;
	const userName = req.body.userName;
	const phoneNum = req.body.phoneNum;
	// console.log('用户已登录:',req.cookies);
	// console.log('用户登录body:',req.body);
	// console.log('用户已登录sess:',req.session);
	// console.log('当前登录用户:',req.session.adminUserInfo);
	AdminUser.find({userName:userName,phoneNum:phoneNum}).exec((err,user) => {
		if( user.length > 0 ) {
			errors = '该员工信息已添加';
			res.json({success:false,error:true,msg:errors});
		} else {
			DbOpt.addOne(AdminUser,req,res);
			console.log('员工信息添加成功');
		}
	})
});

//员工信息列表展示
router.post('/getStaffList',(req,res,next) => {
	// const page = req.body.page || 1;
	AdminUser.aggregate([
		{
			$match : {role :{$ne: 0}}
		},
		{
		    $project: {
		        'register_time': {
		            // 将register_time字段加上8*60*60*1000毫秒后,再格式化时间
		            $dateToString: {format: "%Y-%m-%d %H:%M:%S", date: {$add:['$register_time',28800000] } }
		        },
		        '_id': '$_id',
		        'userName': '$userName',
		        'phoneNum': '$phoneNum',
		        'email': '$email',
		        'role' : '$role'
		    }
		}
	]).exec((err,user) =>{
			if( !err ) {
				// console.log(user);
				res.json({success:true,error:false,data:[user]})
			} else {
				console.log('展示信息失败：',err);
			}
		})
});

//编辑员工信息
router.post('/editStaff',(req,res) =>{
	const uid = req.body._id;
	const username = req.body.userName;
	const phoneNum = req.body.phoneNum;
	console.log('编辑员工')
	console.log('uid:',uid);
	console.log('username:',username);
	AdminUser.findOne({userName:username,phoneNum:phoneNum,_id:{$ne:uid}}).exec((err,user)=>{
		if( !err && !user) {
			DbOpt.updateByID(AdminUser,req,res);
		} else {
			res.json({success:false,error:true,msg:'员工信息已存在'})
		}
	});
});

//根据id删除员工信息
router.post('/delStaffById',(req,res,next) =>{
	// const _id = req.body._id;
	DbOpt.del(AdminUser,req,res);
});

module.exports = router;
// {
// 	_id: user._id,
// 	register_time: user.register_time,
// 	userName: user.userName,
// 	phoneNum: user.phoneNum,
// 	email: user.email,
// 	role: user.role
// }
// select('_id register_time userName phoneNum email role')