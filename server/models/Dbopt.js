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
	
    del : function(obj,req,res,logMsg){
        const targetId = req.body._id;
        console.log('targetId:',targetId);
        if(shortid.isValid(targetId)){
            obj.remove({_id : req.body._id},function(err,result){
                if(err){
                	console.log(0)
                    res.json({success:false,error:true,msg:err});
                }else{
                	console.log(1)
                    console.log(result+" success!");
                    res.json({success:true,error:false,msg:'删除成功'});
                }
            })
        }else{
        	console.log(2)
            res.json({success:false,error:true,msg:settings.system_illegal_param});
        }

    },
	findAll : function( obj,req,res,logMsg ) { 	//查找指定对象所有记录
		console.log('obj:',obj);
		obj.find({}, function (err,result) {
			if ( err ) {
				res.next(err);
				console.log('查询err:',err);
			} else {
				console.log(result+' success!');
				res.json({result:result});
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
					console.log(result+' success');
					return res.json(result);
				}
			})
		} else {
			res.json(settings.system_illegal_param);
		}
	},
	updateByID : function( obj,req,res,logMsg ) {
		const targetId = req.body._id;
		console.log('targetId:',targetId)
		if( shortid.isValid(targetId) ) {
			const conditions = {_id : targetId};
			req.body.updateDate = new Date();
			const update = {$set : req.body};
			obj.update(conditions, update, function(err,result) {
				if( err ) {
					console.log('dberr:',err);
					res.json({success:false,error:true,msg:err});
				} else {
					console.log(logMsg+' success!'+result);
					console.log(result);
					res.json({success:true,error:false,msg:'信息修改成功'});
				}
			})
		} else {
			res.json({success:false,error:true,msg:settings.system_illegal_param});
			// res.json(settings.system_illegal_param);
		}
	},
	addOne : function( obj,req,res ) {  //单个添加
		console.log('obj:',obj);
		console.log('req.body==>',req.body);
		const newObj = new obj(req.body);
		console.log('newObj==>',newObj);
		newObj.save(function( err ) {
			if( err ) {
				res.json({success:false,error:true,msg:err});
				console.log(01);
				console.log(err);
			} else {
				res.json({success:true,error:false,msg:'信息添加成功'});
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



