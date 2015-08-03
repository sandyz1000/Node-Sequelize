var Sequelize = require('sequelize');
var logger = require('../utils/logger');
var _ = require('lodash');
var Q = require('q');

module.exports = function (sequelize) {
    var Description = sequelize.define({
        title : Sequelize.STRING,
        description : Sequelize.TEXT,
        user_id : Sequelize.INT
    },
    {
        tableName : 'description',
        updatedAt: 'modified_at',
        createdAt: 'created_at'
    });

    var fetch = function (id) {
        return Q.Promise(function (resolve, reject) {
            Description.find(id)
            .success(function (desc) {
                logger.info("Successfully fetched description");
                resolve(desc);
            });
        });
    };

    var find = function (attr) {
        return Q.Promise(function (resolve, reject) {
            Description.findAll({where : attr}).success(function(descs) {
                logger.info("Successfully fetche descriptions");
                resolve(descs)
            });
        });
    };

    var create = function (data) {
        return Q.Promise(function (resolve, reject) {
            Description.create(data, {fields : ['title', 'description', 'user_id']})
            .success(function (res) {
                logger.info("Successfully created descriptions");
                resolve(res);
            })
            .catch(function(err) {
                logger.warn("Error occured while creating descriptions");
                reject(err);
            });
        });
    };

    var update = function (id, data) {
        return Q.Promise(function () {
            Description.find(id).success(function (description) {
                _.forEach(data, function(value, key) {
                    if(key && value && value != "") { description[key] = value; }
                });
                description.save().then(function (result) {
                    logger.info("Successfully updated descriptions");
                    resolve(result);
                })
                .catch(function (err) {
                    logger.warn("Error occured while update descriptions");
                    reject(err);
                });
            })
        });
    };

    var destroy = function (id, t) {
        return Q.Promise(function () {
            var description = Description.build({id:id});
            description.destroy({transaction:t}).then(function (result) {
                    logger.info("Successfully deleted description");
                    resolve(err);
                })
                catch(function (err) {
                    logger.warn("Error occured while update descriptions");
                    reject(err);
                });
        });
    };

    return { fetch : fetch, find : find, create : create, update : update, destroy : destroy }
};
