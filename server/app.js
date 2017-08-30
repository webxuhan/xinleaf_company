const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors'); 	//引入cors包
// const io = require('socket.io')();
// const ejs = require('ejs');
//数据库连接
const Dbopt = require('./models/Dbopt');

const filter = require('./util/filter');
//站点配置
const settings = require('./models/db/settings');

const index = require('./routes/index');
const users = require('./routes/users');
const admin = require('./routes/admin');

const app = express();

//配置cors
app.use(cors({
	origin : ['http://localhost:8085','http://127.0.0.1:8085'], 	//允许这个域的访问
	methods : ['GET','POST'], 	//只允许get和post请求
	alloweHeaders : ['Content-Type','Authorization'] 	//只允许这两种请求头的链接访问
}))


// view engine setup
// app.engine('html',ejs.__express);
// app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(settings.session_secret));
app.use(express.static(path.join(__dirname, 'public')));
//解决异步层次混乱问题
app.use(require('express-promise')());


app.use(session({
  secret : settings.session_secret,
  store : new RedisStore({
    port : settings.redis_port,
    host : settings.redis_host,
    pass : settings.redis_psd,
    ttl : 1800  //过期时间
  }),
  resave : true,
  saveUninitialized : true
}));

app.use(filter.authUser);

console.log(1111111111111111111111111111111111);
app.use(function(req, res, next){
  //针对前台会员
  res.locals.logined = req.session.logined;
  res.locals.userInfo = req.session.user;
  //针对管理员
  res.locals.adminlogined = req.session.adminlogined;
  res.locals.adminUserInfo = req.session.adminUserInfo;
  //    指定站点域名
  // console.log('req.headers:',req.headers);
  // console.log('req.headers.host:',req.headers.host);
  res.locals.myDomain = req.headers.host;
  // console.log('res.locals:',res.locals);
  next();
});
console.log(222222222222222222222222);
// 事件监听
// app.io = io;
// io.on('connection',(socket) =>{
//   console.log('socket:',socket);
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//      console.log(data);
//   });
// });

app.use('/', index); 	//前台api接口
app.use('/users', users);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
	console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.json('error');
});

module.exports = app;
