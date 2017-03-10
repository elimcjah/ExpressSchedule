let express      = require('express');
let path         = require('path');
//let favicon    = require('serve-favicon');
let logger       = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser');
let hbs          = require('hbs');

let index       = require('./routes/index');
let users       = require('./routes/users');
let hired       = require('./routes/hired');
let fired       = require('./routes/fired');
// let moreinfo    = require('./routes/moreinfo');
// let contact     = require('./routes/contact');
// let directory   = require('./routes/directory');
// let update      = require('./routes/update');


//TRYING TO FIGURE OUT HOW TO BUILD BY COMPONENT.  SEEMS LIKE I UNDERSTAND THE PURPOSE OF ANGULAR NOW!
// let navbar   = require('./routes/navbar');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',          index);
app.use('/users',     users);
app.use('/hired',     hired);
// app.use('/fired',     fired);
// app.use('/moreinfo',  moreinfo);
// app.use('/contact',   contact);
// app.use('/directory', directory);
// app.use('/update',    update);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
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
