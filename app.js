/**
 * Module dependencies.
 */
var express = require('express'),
  fs = require('fs'),
  http = require('http'),
  path = require('path'),
	session = require('express-session'),
	logger = require('morgan'),
	errorHandler = require('errorhandler'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	methodOverride = require('method-override'),
	favicon = require('serve-favicon'),
  mongoose = require('mongoose'),
  passport = require("passport"),
	RedisStore = require('connect-redis')(session),
  flash = require("connect-flash"),
	app = module.exports = express(),
	env = process.env.NODE_ENV || 'development',
  config = require('./config/config')[env],
	models_dir = __dirname + '/app/models';

mongoose.connect(config.db);

fs.readdirSync(models_dir).forEach(function (file) {
  if(file[0] === '.') return;
  require(models_dir+'/'+ file);
});

require('./config/passport')(passport, config);

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: '12345',
  store: new RedisStore({port: 11548, host: 'pub-redis-11548.us-east-1-3.2.ec2.garantiadata.com'/*, client: redis*/})
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride());
app.use(flash());
app.use(express.static(path.join(__dirname, '/public')));

if(env == 'development')
  app.use(errorHandler());

require('./config/routes')(app, passport);

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('500', { error: err });
});

app.use(function(req, res, next){
  res.status(404);
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  res.type('txt').send('Not found');
});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});