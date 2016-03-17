
var express = require('express');
var router = express.Router();
var userService = require('app/services/user.service');
router.post('/authenticate', authenticateUser);
router.post('/register', register);
router.get('/currentUser', currentUser);
router.get('/token', currentUserToken);
module.exports = router;

function authenticateUser(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (token) {
            if (token) {
                req.session.token = token;
                res.sendStatus(200);
            } else {
                res.sendStatus(401);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function register(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function currentUser(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function currentUserToken(req, res) {
    res.send(req.session.token);
}