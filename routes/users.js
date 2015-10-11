var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var User = require('../models/User');

var isValidUserReq = function(req, res) {
    if (req.currentUser) {
        utils.sendErrResponse(res, 403, 'There is already a user logged in.');
        return false;
    } else if (!req.body.username) {
        utils.sendErrResponse(res, 400, 'Username not provided.');
        return false;
    }
    return true;
};

router.post('/login', function(req, res) {
    if (isValidUserReq(req, res)) {
        User.authUser(req.body.username, function(err,result) {
            if (err) {
                utils.sendErrResponse(res, 403, err);
            } else {
                req.session.username = req.body.username;
                utils.sendSuccessResponse(res, { user : req.body.username });
            }
        });
    }
});

router.post('/logout', function(req, res) {
    if (req.currentUser) {
        req.session.destroy();
        utils.sendSuccessResponse(res);
    } else {
        utils.sendErrResponse(res, 403, 'There is no user currently logged in.');
    }
});

router.post('/create', function(req, res) {
    if (isValidUserReq(req, res)) {
        User.createUser(req.body.username, function(err,result) {
            if (err) {
                utils.sendErrResponse(res, 403, err);
            } else {
                req.session.username = req.body.username;
                utils.sendSuccessResponse(res, { user : req.body.username });
            }
        });
    }
});

router.get('/current', function(req, res) {
    if (req.currentUser) {
        utils.sendSuccessResponse(res, { loggedIn : true, user : req.currentUser.username });
    } else {
        utils.sendSuccessResponse(res, { loggedIn : false });
    }
});

module.exports = router;
