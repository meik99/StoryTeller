var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
var passport = require("passport");
var formidable = require("formidable")
var authentication = require("./authentication/authentication")

var index = require('./routes/index');
var login = require("./routes/login");
var story = require("./routes/story");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use((req, res, next) => {
  var form = new formidable.IncomingForm({
    encoding: "utf-8",
    uploadDir: path.join(__dirname, "uploads"),
    multiples: true,
    keepExtensions: true
  });
  form.once("error", console.log);
  form.parse(req, (err, fields, files) => {
    Object.assign(req, {fields, files});
    next()
  })
});

app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
authentication();

app.use('/', index);
app.use("/login", login);
app.use("/story", story);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
