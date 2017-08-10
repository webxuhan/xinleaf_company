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
	//查找指定对象所有记录
	findAll : function( obj,req,res,logMsg ) {
		obj.find({}, function (err,result) {
			if ( err ) {
				res.next(err);
			}
		})
	}
}