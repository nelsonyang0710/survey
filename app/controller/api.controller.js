
var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');
router.post('/authenticate', authenticateUser);
module.exports = router;