/**
 * 用户表
**/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const UserSchema = new Schema({
	_id : {
		type : String,
		unique : true,
		'default' : shortid.generate
	},
	name : String, 	//用户名
	password : String, 	//密码
	phoneNum : Number, 	//联系电话
	retrieve_time : {type: Number} // 用户发送激活请求的时间
});

const User = mongoose.model("User",UserSchema);

module.exports = User;