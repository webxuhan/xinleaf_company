/**
 * 商品分类表
**/

const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
	_id : {
		type : String,
		unqiue : true,
		'defualt' : shortid.genrate
	},
	category_name : String,		//商品分类名称
	parent_id : { type : String, defualt : '0' }, 	//父id,默认为0，0为最高级
	is_show : { type : Boolean, defualt : false }, 	//是否显示,默认不显示
	sort_order : { type: String, default: "0" } 	//分类排序,默认为0,0为升序，1为降序
	
});

const Category = mongoose.model("Category",CategorySchema);

module.exports = Category;