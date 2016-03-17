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
service.getById = getById;
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

    return deferred.promise;
}
function getById(id) {
    var deferred = Q.defer();

    User.findById(id, function (err, user) {
        if (err) deferred.reject(err);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(user.username);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}