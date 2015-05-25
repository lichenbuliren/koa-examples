var render = require('../lib/render');
var parse = require('co-body');
var router = require('koa-router')();

// db
var posts = [];
/**
 * 基础路由
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
module.exports = function(app) {

    router.get('/',function *(next){
        this.body = yield render('list', {
            posts: posts,
            title: '文章列表'
        });
    }).get('/post',function *(next){
        this.body = yield render('new', {
            title: '添加文章'
        });
    }).post('/post',function *(next){
        var post = yield parse(this);
        var id = posts.push(post) - 1;
        post.created_at = new Date;
        post.id = id;
        this.redirect('/');
    }).get('/post/:id',function *(next){
        var id = this.params.id;
        var post = posts[id];
        if (!post) this.throw(404, 'invalid post id');
        this.body = yield render('show', {
            post: post,
            title: post.title
        });
    });

    app.use(router.routes());
}