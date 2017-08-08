/**
 * 商品表
**/

const mongoose = require('mongoose');
const shortid = require('shortid');
const Schema = mongoose.Schema;

const GoodsSchema = new Schema({
	_id : {
		type : String,
		unqiue : true,
		'default' : shortid.generate
	},
	c
}) 