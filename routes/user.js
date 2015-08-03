var logger = require('../utils/logger');
var userModel = require('../models/');
var Q = require('q');

module.exports = function(app, sequilize) {

    // User all descriptions of a users
    app.get('/', function (req, res) {
        var username = req.body.username;
        var password = req.body.password;

        userModel.fetch(username, password).then(function (data) {
            res.send(data);
        })
        .fail(function (err) {
            res.status(500).json({
                error:true,
                data : {message : "Internal server error"}
            });
        });
    });

    //Add user
    app.post('/user', function (req, res) {
        var _data = { username : req.body.username, password : req.body.password };
        userModel.create(_data).then(function (data) {
            res.send(data);
        })
        .fail(function (err) {
            res.status(500).json({
                error:true,
                data : {message : "Internal server error"}
            });
        });
    });

    // Edit user
    app.put('/:user_id', function (req, res) {
        var _data = { username : req.body.username, password : req.body.password };
        var id = req.params.user_id;
        userModel.update(id, _data)
            .then(function (data) {
                res.send(data);
            })
            .fail(function () {
                res.status(500).json({
                    error:true,
                    data : {message : "Internal server error"}
                });
            });
    });

    // Delete user and all the related descriptions
    app.delete('/:user_id', function (req, res) {
        var id = req.params.user_id;
        userModel.destroy(id)
            .then(function (data) {
                res.send(data);
            })
            .fail(function () {
                res.status(500).json({
                    error:true,
                    data : {message : "Internal server error"}
                });
            });
    });
};
