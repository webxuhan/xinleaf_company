/**
 * 管理员用户对象
**/

const mongoose = require("mongoose");
const shortid = require("shortid");
const Schema = mongoose.Schema;

const AdminGroup = require("./AdminGroup");

const AdminUserSchema = new Schema({
	_id : {
		type : String,
		unique : true,
		'default' : shortid.generate
	},
	name : String,
	userName : String,
	password : String,
	phone : Number,
	email : String,
	register_time : { type: Date,default: Date.now},
	group : {
		type : String,
		ref : 'AdminGroup'
	}
});

const AdminUser = mongoose.model("AdminUser",AdminUserSchema);

module.exports = AdminUser;
