var Sequelize = require('sequelize');
var logger = require('../utils/logger');
var Q = require('q');

module.exports = function (sequelize) {
    var User = sequelize.define('User', {
        username: Sequelize.STRING,
        mobileNo : Sequelize.BIGINT(11),
        password: Sequelize.STRING
    },
    {
        tableName : 'user',
        updatedAt: 'modified_at',
        createdAt: 'created_at'
    })


    var fetch = function (username, password) {
        return Q.Promise(function () {
            User.find({username : username, password : password}).success(function (user) {
                logger.info("Successfully fetched user", username);
                resolve(user);
            });
        });
    };

    var create = function (data) {
        return.Q.Promise(function (resolve, reject) {
            User.create(data, {feilds : ['username', 'password']}).then(function (user) {
                // Create teh new user and return
                resolve(user);
            })
            .catch(function (err) {
                logger.warn("Error occured while creating user");
                reject(err);
            });
        });
    };

    var update = function (id, data) {
        return Q.Promise(function (resolve, reject) {
            User.find(id).success(function (user) {
                _.forEach(data, function (value, key) {
                    if(key && value && value != "") { user[key] = value; }
                });
                user.save().then(function (result) {
                    logger.info("Successfully updated user");
                    resolve(user);
                })
                .catch(function (err) {
                    logger.warn("Error occured while updating user");
                    reject(err);
                })
            });
        });
    };

    var txnSuccess = function (t) {
        t.commit().success(function () {

        });
    };

    var txnRollBack = function (t) {
        t.rollback().success(function () {

        });
    };

    var destroy = function (id) {
        return Q.Promise(function () {
            // Delete user and its respective descriptions
            sequelize.transaction(function (t) {

                var user = User.build({id:id});
                user.destroy().then(function (user) {
                    if(!user.id) {
                        // If transaction is reverted
                        txnRollBack(t);
                    }

                    descriptionModel.destroy(user.id, t).then(function () {
                        // If transactioni is succesfull
                        txnSuccess(t);
                    })
                    .fail(function (err) {
                        txnRollBack(t);
                    })
                })
                .catch(function (err) {
                    logger.warn("Unable to find user info for user id ", id);
                    txnRollBack(t);
                });


                t.done(function (args) {
                    // Once transaction is committed/reverted
                    logger.info();
                })
            });
        });
    };
};
