
var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var UserSchema = new Schema({
    username: {type: String, default: ''},
    password: {type: String, default: ''}
}, {collection: 'usercollection'});
module.exports = mongoose.model('User', UserSchema);