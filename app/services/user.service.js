// 
// Copyrights (c) 2011-2016, TalentCircles, Inc.

var config = require('config.json');
var mongoose = require('mongoose');
mongoose.connect(config.dbConnectionUrl);

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    hash: String
})
var User = mongoose.model('User', userSchema);
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var service = {};

service.authenticate = authenticate;
service.create = create;
module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();

    User.findOne({username: username }, function (err, user) {
        if (err) deferred.reject(err);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();

    // validation
    User.findOne(
        {username: userParam.username},
        function (err, user) {
            if (err) deferred.reject(err);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        var newUser = new User(user);
        newUser.save(function(err)
        {
            if (err)
            {
                deferred.reject(err);
            }
            deferred.resolve();
        })
    }

    return deferred.promise;
}