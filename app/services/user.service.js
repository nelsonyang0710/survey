// 
// Copyrights (c) 2011-2016, TalentCircles, Inc.

var config = require('config.json');
var mongoose = require('mongoose');
mongoose.connect(config.dbConnectionUrl);

var userSchema = mongoose.Schema({
    name: String
})
var User = mongoose.model('User', userSchema);
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var service = {};

service.authenticate = authenticate;
module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();

    User.findOne({name: username }, function (err, user) {
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
