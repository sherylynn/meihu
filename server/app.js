var express = require('express'),
  http = require('http'),
  fs = require('fs'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  async = require('async'),
  routes = require('./routes/routes'),
  app = express(),
  showdown = require('showdown'),
  converter = new showdown.Converter(),
  PouchDB = require('pouchdb');


app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('md', function(path, options, fn) {
  fs.readFile(path, 'utf8', function(err, str) {
    if (err) return fn(err);
    str = converter.makeHtml(str);
    fn(null, str);
  });
});
app.use(favicon(__dirname + '/views/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/db', require('express-pouchdb')(PouchDB));
var shit = new PouchDB('shit')

var server = http.createServer(app);
server.listen(app.get('port'));

server.on('listening', function() {
  console.log('----------listening on port: ' + app.get('port') + '----------------------');
});


server.on('error', function(error) {
  switch (error.code) {
    case 'EACCES':
      console.error(bind + '需要权限许可');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + '端口已被占用');
      process.exit(1);
      break;
    default:
      throw error;
  }
});


//加载路由
async.waterfall([
  function(callback) {
    routes(app);
    callback(null);
  },
  function() {
    /*
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });
    */

    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('404/error', {
          message: err.message,
          error: err
        });
      });
    }

    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('404/error', {
        message: err.message,
        error: {}
      });
    });
  }
]);