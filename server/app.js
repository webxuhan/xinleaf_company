const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors'); 	//引入cors包
// const ejs = require('ejs');
//数据库连接
const Dbopt = require('./models/Dbopt');

const filter = require('./util/filter');
//站点配置
const settings = require('./models/db/settings');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

//配置cors
app.use(cors({
	origin : ['http://localhost:715'], 	//允许这个域的访问
	methods : ['GET','POST'], 	//只允许get和post请求
	alloweHeaders : ['Conten-Type','Authorization'] 	//只允许这两种请求头的链接访问
}))


// view engine setup
// app.engine('html',ejs.__express);
// app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
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

app.use('/', index); 	//前台api接口
app.use('/users', users);

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
  res.json('error');
});

module.exports = app;
