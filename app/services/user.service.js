// 
// Copyrights (c) 2011-2016, TalentCircles, Inc.

var config = require('config.json');
var mongoose = require('mongoose');
var service = {};
mongoose.connect(config.dbConnectionUrl);
module.exports = service;