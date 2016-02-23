'use strict';
var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// App Configuration
var app = express();
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// App wide middlewares
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// Dynamic Routes
app.get('/', function(req, res){
  res.render('pages/home.ejs');
});
app.use('/burgers', require(path.join(__dirname, '/routes/burgers')));

// Start app
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Now serving on port ', port);
});
