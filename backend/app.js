var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var mongoose = require("mongoose");
var morgan = require('morgan')
const config = require('./config')

mongoose.Promise = global.Promise;

var main = require('./routes/main');
var stock = require('./routes/stock');
var money = require('./routes/money');
var detail = require('./routes/detail');

var app = express();
app.use(require('connect-history-api-fallback')());

mongoose.connect(config.mongodbUri, {
  useNewUrlParser: true
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('jwt-secret', config.secret)

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'))

app.use('/', main);
app.use('/api', require('./routes/api'));
app.use('/api/stock', stock);
app.use('/api/money', money);
app.use('/api/detail', detail);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;