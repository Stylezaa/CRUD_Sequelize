var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
//passport library
const passport = require('passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// const roleRouter = require('./routes/role');
const tb_roleRouter = require('./routes/tb_role_router');
const tb_pubRouter = require('./routes/publication');
const tb_sectionRouter = require('./routes/tb_section_router');
const tb_userRouter = require('./routes/tb_user_router');
const mapRouter = require('./routes/mapRouter');
const damRouter = require('./routes/damRouter');

//import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

//Cors
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(
  express.json({
    limit: '50mb',
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//init passport
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/role',roleRouter);
app.use('/api/role', tb_roleRouter);
app.use('/api/pub', tb_pubRouter);
app.use('/api/section', tb_sectionRouter);
app.use('/api/user', tb_userRouter);
app.use('/api/map', mapRouter);
app.use('/api/dam', damRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//use errorHandler middleware
app.use(errorHandler);

module.exports = app;
