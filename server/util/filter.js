/**
 * cookie相关操作
**/

const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const settings = require('../models/db/settings');

//用户表
const User = require('../models/User');

const gen_session = (user, res) =>{
	const auth_token = user._id + '$$$'; 	//将信息用$$$分开，便于查看
 	res.cookie(settings.auth_cookie_name, auth_token,
        {path: '/', maxAge: 1000 * 60 * 60 * 24 * 30, signed: true, httpOnly: true}); //cookie 有效期30天
}

exports.gen_session = gen_session;

exports.authUser = (req, res, next) =>{
	if ( settings.debug && req.cookies['mock_user'] ) {
		const mockUser = JSON.parse(req.cookies['mock_user']);
		req.session.user = new UserModel(mockUser);
		return next();
	}

	if ( req.session.user ) {
		
	}
}