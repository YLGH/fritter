var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');

var User = require('./models/User');

var app = express();

//route handlers
var index = require('./routes/index');
var users = require('./routes/users');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public'))); // make public files accessible
app.use(session({ secret : 'dankmemes', resave: false, saveUninitialized: false }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//authentication middleware
app.use(function(req, res, next) {
  if (req.session.username) {
    User.findByUsername(req.session.username, 
      function(err, user) {
        if (user) {
          req.currentUser = user;
        } else {
          req.session.destroy();
        }
        next();
      });
  } else {
      next();
  }
});

//map paths
app.use('/', index);
app.use('/users', users);

module.exports = app;