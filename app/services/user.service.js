// 
// Copyrights (c) 2011-2016, TalentCircles, Inc.

var config = require('config.json');
var mongoose = require('mongoose');

mongoose.connect(config.dbConnectionUrl);