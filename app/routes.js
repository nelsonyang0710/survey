// app/routes.js
var expressJwt = require('express-jwt');
var config = require('config.json');
module.exports = function (app) {
    app.use('/api',expressJwt({secret:config.secret}).unless({ path: ['/api/users/authenticate','/api/users/register']}));

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