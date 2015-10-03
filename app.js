var express = require('express');
var path = require('path');

var app = express();

var index = require('./routes/index');

app.use('/', index);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(8000,'localhost');

module.exports = app;