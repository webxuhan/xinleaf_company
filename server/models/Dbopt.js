/**
 * 数据库相关操作
**/

const url = require('url');

const crypto = require('crypto'); 	//加密类
const mongoose = require('mongoose');
const shortid = require('shortid');

const AdminGroup = require('./AdminGroup');
const AdminUser = require('./AdminUser');
const Category = require('../models/Category');
const Goods = require('../models/Goods');
const User = require('../models/User');

//站点配置
const settings = require('../models/db/settings');
const db = mongoose.connect(settings.URL);
console.log("数据库连接成功!");
// mongoose.connect('mongodb://'+settings.USERNAME+':'+settings.PASSWORD+'@'+settings.HOST+':'+settings.PORT+'/'+settings.DB+'');

//数据库相关操作

const DbOpt = {
	//信息删除操作
	del : function( ) {

	},
	findAll : function( obj,req,res,logMsg ) { 	//查找指定对象所有记录
		obj.find({}, function (err,result) {
			if ( err ) {
				res.next(err);
			} else {
				console.log(logMsg+' success!');
				return res.json(result);
			}
		})
	},
	findOne : function( obj,req,res,logMsg) { 	//根据ID查找单条记录
		const params = url.parse(req.url,true);
		const targetId = params.query.uid; 
		if( shortid.isValid(targetId) ) {
			obj.findOne({_id : targetId}, function (err,result) {
				if( err) {
					res.next(err);
				} else {
					console.log(logMsg+' success');
					return res.json(result);
				}
			})
		} else {
			res.json(settings.system_illegal_param);
		}
	},
	updateByID : function( obj,req,res,logMsg ) {
		const params = url.parse(req.url,true);
		const targetId = params.query.uid;

		if( shortid.isValid(targetId) ) {
			const conditions = {_id : targetId};
			req.body.updateDate = new Date();
			const update = {$set : req.body};
			obj.update(conditions, update, function(err,result) {
				if( err ) {
					res.json(err);
				} else {
					console.log(logMsg+' success!');
					res.json('success');
				}
			})
		} else {
			res.end(settings.system_illegal_param);
		}
	},
	addOne : function( obj,req,res ) {  //单个添加
		const newObj = new obj(req.body);
		console.log(newObj);
		newObj.save(function( err ) {
			if( err ) {
				res.json(err);
				console.log(01);
			} else {
				res.json('success');
				console.log(02);
			}
		});
	},
	encrypt : function( data,key ) { 	//密码加密
		let cipher = crypto.createCipher('bf',key);
		let newPsd = "";
		newPsd += cipher.update(data,"utf8","hex");
		newPsd += cipher.final("hex");
		return newPsd;
	},
	decrypt : function( data,key ) { 	//密码解密
		let decipher = crypto.createDecipher('bf',key);
		let oldPsd = "";
		oldPsd += decipher.update(data,"hex","utf8");
		oldPsd += decipher.final("utf8");
		return oldPsd;
	}
}

module.exports = DbOpt;