/**
 * 管理员用户对象
**/

const mongoose = require("mongoose");
const shortid = require("shortid");
const Schema = mongoose.Schema;
// console moment = require('moment');

const AdminGroup = require("./AdminGroup");

const AdminUserSchema = new Schema({
	_id : {
		type : String,
		unique : true,
		'default' : shortid.generate
	},
	role : {type : Number,default: 1}, //角色，0为超级管理员【添加后台管理员】，1为普通管理员【增删改查】，2为后台游客【查】
	userName : String, //后台用户名
	password : String, 
	phoneNum : String,
	email : String,
	register_time : { type: Date,default: Date.now}, //注册时间
	group : {
		type : String,
		ref : 'AdminGroup'
	}
});

AdminUserSchema.statics = {
	
}

const AdminUser = mongoose.model("AdminUser",AdminUserSchema);

//初始化插入超级管理员数据
AdminUser.find({userName:'admin',phoneNum:'13187163245'}).exec((err,user) =>{
	if( user.length > 0 ) {
		console.log('超级管理员已添加');
	} else{
		AdminUser.create({
			userName: 'admin',
			password: 'admin123',
			phoneNum:'13187163245',
			role:0,
			email: 'xuha_715@163.com'
		},function(err,user){
			if(!err){
				console.log('AdminUser saved!');
				console.log('AdminUser:',user);
			}
		});
	}
})

module.exports = AdminUser;
