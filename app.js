var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();


// __dirname : 현재 수행중인 파일의 위치, 즉 app.js가 위치한 경로를 의미
// path.join : 경로를 잘 만들기 위함. ex) path.join('/a', 'b', 'xxx') ==> /a/b/xxx

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// http request body가 json, url encoded 일때도 파싱할 수 있도록 지원한다.
app.use(bodyParser.json());
 
 // extended가 false인 것은 queryString를 사용하지 않겠다는 것. 
 // queryString : URL에서 데이터를 담고 있는 부분
 //   ex) http://example.com/over/there?name=ferret ==> name=ferret가 queryString이다.
app.use(bodyParser.urlencoded({ extended: false }));

// 정적인 리소스가 있는 경로를 express에 알려준다.
app.use(express.static(path.join(__dirname, 'public')));

// router 처리
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
