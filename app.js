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
const cors = require('cors');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
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

 
server.listen('3000')

