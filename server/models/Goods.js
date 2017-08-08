/**
 * 商品表
**/

const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const AdminUser = require('./AdminUser');
const Category = require('./Category');

const GoodsSchema = new Schema({
	_id : {
		type : String,
		unqiue : true,
		'default' : shortid.generate
	},
	goods_name : String,	//商品名称
	click_count : Number,	//点击次数
	goods_brief : String,	//商品描述
	goods_desc : String,	//商品详情
	goods_img : { type: String, default: "/upload/images/defaultlogo.png" },	//商品图片
	add_time : { type: Date, default: Date.now },	//添加时间
	sort_order : { type: String, default: "0" },		//商品排序，0为升序,1为降序
	last_time : { type: Date, default Date.now },	//最新更新时间
	suppliers_id : {
		type : String,
		ref : 'AdminUser'
	}, 		//发表人
	belong_to : {
		type : String,
		ref : 'Category'
	} 	//属于,当前商品属于的分类
});

const Goods = mongoose.model("Goods",GoodsSchema);

module.exports = Goods;
