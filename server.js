var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');

var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var expressValidator = require('express-validator');
require('dotenv').config({ path: './.env' });
require('./config/database');
require('./config/passport')(passport);

var indexRouter = require('./routes/index');
var mainRouter = require('./routes/main');
var commentRouter = require('./routes/comment');
var userRoutes = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true })); //grab info from form
app.use(expressValidator());  //must right below body-parser to validat info from form
app.use(session({
  secret: process.env.SECRET,
  cookie: { maxAge: 60000 },
  resave: false,  //force the session to be saved back to the store
  saveUninitialized: false //dont save unmodifed
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use('/', indexRouter);
app.use('/main', mainRouter);
app.use('/', commentRouter);
app.use('/', userRoutes);

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
  next();
});
//global vars
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error_msg = req.flash("error_msg"); //register
  res.locals.err = req.flash("err");  //for log in
  res.locals.success_msg = req.flash("success_msg"); //register
  next();
});
module.exports = app;
