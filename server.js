// server.js

// modules =================================================
require('rootpath')();
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
// configuration ===========================================

// config files
var config = require('config.json')

// set our port
var port = process.env.PORT || 8080;

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
// mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json

app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
require('app/routes')(app); // configure our routes

app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
    else {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }

});
// start app ===============================================
// startup our app at http://localhost:8080
var server = app.listen(port,function(){
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});

// expose app
exports = module.exports = app;
