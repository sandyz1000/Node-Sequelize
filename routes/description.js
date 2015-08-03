var logger = require('../utils/logger');
var userModel = require('../models/');
var descriptionModel = require('../description');
var Q = require('q');

module.exports = function (app, sequelize) {
    app.get('/:user_id', function (req, res) {
        var userId = req.params.user_id;
        descriptionModel.fetchAll(userId)
            .then(function (data) {
                res.send(data);
            })
            .fail(function (err) {
                res.status(500).json({
                    "error" : true,
                    "data" : {message:"Error fetching description"}
                });
            });
    });

    app.post('/:user_id', function (req, res) {
        var userId = req.params.user_id;
        descriptionModel.create(userId)
            .then(function (data) {
                res.send(data);
            })
            .fail(function (err) {
                res.status(500).json({
                    "error" : true,
                    "data" : {message:"Error fetching description"}
                });
            })
    });

    app.put('/:desc_id', function(req, res) {
        var id = req.params.desc_id;
        descriptionModel.update(id)
            .then(function (data) {
                res.send(data);
            })
            .fail(function (err) {
                res.status(500).json({
                    "error" : true,
                    "data" : {message:"Error fetching description"}
                });
            });
    });

    app.delete('/:desc_id', function (req, res) {
        var desc_id = req.params.desc_id;
        descriptionModel.destroy(desc_id)
            .then(function (data) {
                res.send(data);
            })
            .fail(function (err) {
                res.status(500).json({
                    "error" : true,
                    "data" : {message:"Error fetching description"}
                });
            });
    });
};

