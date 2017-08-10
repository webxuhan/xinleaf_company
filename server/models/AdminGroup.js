/**
 * 管理员用户组对象 
**/
const mongoose = require('mongoose');
const shortid = require("shortid");
const Schema = mongoose.Schema;

const AdminGroupSchema = new Schema({
	_id : {
		type : String,
		unique : true,
		'default' : shortid.generate 
	},
	name : String,
	power : String,
	date : { type: Date,default: Date.now}
});

const AdminGroup = mongoose.model('AdminGroup',AdminGroupSchema);

module.exports = AdminGroup;