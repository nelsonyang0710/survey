// app/routes.js
var jwt = require('express-jwt');
var config = require('config.json');
var unless = require('express-unless')
var session = require('express-session');
module.exports = function (app) {
    app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
    app.use('/api',jwt({secret:config.secret}).unless({ path: ['/api/users/authenticate','/api/users/register','/api/users/token']}));

    //route
    app.use('/',require('app/controllers/main.controller'));
    app.use('/api/users', require('app/controllers/api/users.controller'));
    app.get('*', function(req, res){
        res.status(404);

        // respond with html page
        if (req.accepts('html')) {
            res.render('404', {url: req.url});
            return;
        }

        // respond with json
        if (req.accepts('json')) {
            res.send({error: 'Not found'});
            return;
        }

        // default to plain-text. send()
        res.type('txt').send('Not found');
    });
};