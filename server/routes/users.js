var express = require('express');
var router = express.Router();

//数据库操作对象
const Dbopt = require('../models/Dbopt');
//用户对象
const User = require('../models/User');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//	用户注册
router.post('/doReg',function(req,res,next){
	var errors;
	const name = req.body.name;
	const password = req.body.password;
	const phoneNum = req.body.phoneNum;
	if( errors ) {
		res.json(errors);
		console.log(1);
	} else {
		console.log(2);
		const query = User.find({name : name});
		query.exec(function(err,user){
			console.log(3);
			if( user.length > 0 ) {
				console.log(4);
				errors = '用户名已存在！';
				res.json(errors);
			} else {
				Dbopt.addOne(User,req, res);
				console.log('添加成功');
			}
		})
	}

});


module.exports = router;