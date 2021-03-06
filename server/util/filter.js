/**
 * cookie相关操作
**/

const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const settings = require('../models/db/settings');

//用户表
const User = require('../models/User');

function gen_session (user, res){
	const auth_token = user._id + '$$$'; 	//将信息用$$$分开，便于查看
	console.log('auth_token:',auth_token)
 	res.cookie(settings.auth_cookie_name, auth_token,
        {path: '/', maxAge: 1000 * 60 * 5, signed: true, httpOnly: true}); //cookie 有效期5分钟
}

exports.gen_session = gen_session;

exports.authUser = (req, res, next) =>{
	if ( settings.debug && req.cookies['mock_user'] ) {
		const mockUser = JSON.parse(req.cookies['mock_user']);
		req.session.user = new UserModel(mockUser);
		return next();
	}

	if ( req.session.user ) {
		console.log('filter--->req.session.user');
		next();
	} else{
		var auth_token = req.signedCookies[settings.auth_cookie_name];
        if (!auth_token) {
            return next();
        }else{
            var auth = auth_token.split('$$$$');
            var user_id = auth[0];
            console.log('filter.user_id:',user_id);
            return next();
        }
	}
}