//

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('main');
});
router.get('/login', function (req, res) {
    res.render('main');
});
router.get('/register', function (req, res) {
    res.render('main');
});
router.get('/users', function (req, res) {
    res.render('main');
});
module.exports = router;
