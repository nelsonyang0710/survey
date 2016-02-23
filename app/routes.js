// app/routes.js
var expressJwt = require('express-jwt');
var config = require('config.json');
module.exports = function (app) {
    app.use('/api',expressJwt({secret:config.secret}).unless({path:['/api/users/authenticate']}));

    //route
    app.use('/',require('./controller/main.controller'));
    //app.use('/api',require('./controller/api.controller'));
};