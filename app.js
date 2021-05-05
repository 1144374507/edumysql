var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getClass = require('./routes/getClass');
var addClass = require('./routes/addClass');
var createStudent = require('./routes/createStudent');
var createTeacher = require('./routes/createTeacher');
var getMark = require('./routes/getMark');
var getPid = require('./routes/getPid');
var login = require('./routes/login');

const cors = require('cors');
var app = express();

//引入插件
var vertoken = require('./token/token')
var expressJwt = require('express-jwt')

//解析token获取用户信息
app.use(function (req, res, next) {
  var token = req.headers['authorization'];
  console.log('token', token);
  if (token == undefined) {
    return next();
  } else {
    vertoken.getToken(token).then((data) => {
      req.data = data;
      return next();
    }).catch((error) => {
      return next();
    })
  }
});

//验证token是否过期并规定那些路由不需要验证
app.use(expressJwt({
  secret: 'zgs_first_token',
  algorithms: ['HS256']
}).unless({
  path: ['/login']  //不需要验证的接口名称
}))

//设置托管静态目录; 项目根目录+ public.可直接访问public文件下的文件eg:http://localhost:3000/images/url.jpg
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', indexRouter);
// app.use('/', usersRouter);



//token失效返回信息
app.use(function (err, req, res, next) {
  console.log('err.status', err.status);
  if (err.status == 401) {
    return res.status(401).send({
      success: false,
      msg: "token失效"
    })
    //可以设置返回json 形式  res.json({message:'token失效'})
  }
})


app.use(bodyParser.urlencoded({ extended: false }));
//使用Json传值
app.use(bodyParser.json());

//使用cors 解决跨域问题
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 改写
var http = require('http');
var server = http.createServer(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//静态资源
app.use(express.static(path.join(__dirname, 'public')));
//post请求
app.use('/home', indexRouter);
app.use('/users', usersRouter);
app.use('/teacherManagement', getClass);
app.use('/addClass', addClass);
app.use('/createStudent', createStudent);
app.use('/createTeacher', createTeacher);
app.use('/getMark', getMark);
app.use('/getPid', getPid);
app.use('/login', login);


server.listen('3000')

