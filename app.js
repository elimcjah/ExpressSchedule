

let express          = require('express');
let path             = require('path');
//let favicon        = require('serve-favicon');
let logger           = require('morgan');
let cookieParser     = require('cookie-parser');
let bodyParser       = require('body-parser');
let expressValidator = require('express-validator');
let flash            = require('connect-flash');
let session          = require('express-session');
let hbs              = require('hbs');
let passport         = require('passport');
let LocalStrategy    = require('passport-local').Strategy;
let mongodb          = require('mongodb');
let mongoose         = require('mongoose');



mongoose.connect('mongodb://localhost:27017');
let db = mongoose.connection;


// Routes to the individual urls.

let index       = require('./routes/index');
let users       = require('./routes/users');
let hired       = require('./routes/hired');
let fired       = require('./routes/fired');
let directory   = require('./routes/directory');
// let signup      = require('./routes/users/signup');
// let moreinfo = require('./routes/moreinfo');
// let contact  = require('./routes/contact');
// let update   = require('./routes/update');

// Init the app
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// log writer.
app.use(logger('dev'));

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',          index);
app.use('/users',     users);
app.use('/hired',     hired);
app.use('/directory', directory);
// app.use('/users/signup',    signup);
// app.use('/fired',     fired);
// app.use('/update',    update);
// app.use('/moreinfo',  moreinfo);
// app.use('/contact',   contact);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set static folders
app.use(express.static(__dirname + '/public'));

// Express Session
app.use(session({
  secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());


// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        let namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));


// Flash a message
app.use(flash());

// passport local messages
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg   = req.flash('error_msg');
    res.locals.error_msg   = req.flash('error_msg');
    next();
});


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
