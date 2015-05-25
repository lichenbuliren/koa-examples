
/**
 * Module dependencies.
 */

var logger = require('koa-logger');
var routes = require('./routes');
var parse = require('co-body');
var staticServer = require('koa-static');
var path = require('path');
var koa = require('koa');
var app = koa();

// "database"
var posts = [];

// middleware

app.use(logger());
app.use(staticServer(path.join(__dirname,'public')));


// route middleware
// 自定义路由
routes(app);
// route definitions

// listen

app.listen(3000);
console.log('listening on port 3000');