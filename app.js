var express = require('express');
var session = require('express-session');
var path = require('path');

var app = express();

var index = require('./routes/index');

app.use('/', index);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public'))); // make public files accessible

app.use(session({ secret : 'dankmemes', resave: false, saveUninitialized: false }));

module.exports = app;