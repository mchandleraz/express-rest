var express       = require('express');
var path          = require('path');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');

var app           = express();

var mongoose      = require('mongoose');
var db;

var baseUrl;

mongoose.connect('mongodb://dbuser:pass@ds053438.mlab.com:53438/express-crud');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.set('apiVersion', '1');
app.set('baseUrl', '/api/' + app.get('apiVersion'));

// TODO: env var. i think.
app.set('jwtSecret', 'boomshakalaka');

baseUrl = app.get('baseUrl');

// Disable x-powered-by header
app.set('x-powered-by', false);

require('./router')(app);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
