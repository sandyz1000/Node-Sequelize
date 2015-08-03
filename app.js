var express = require('express');
var Sequilize = require('sequelize');
var bodyParser =require('body-parser');
var app = express();
var userRoutes =
app.use(bodyParser());

var sequelize = new Sequelize("sequilizetest", "root", "password", {
    dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
    port:    3306, // or 5432 (for postgres)
});

sequelize.authenticate()
.then(function(err) {
    console.log('Connection has been established successfully.');
    // Sync the database to create a representation of model

    sequilize.sync()
        .success(function (err) {

            app.use('/user', require('./routes/user')(express(), sequilize));
            app.use('description', require('./routes/description')(express(), sequilize));
            app.listen(3000);
            console.log('Server running on port 3000');
        });
}, function (err) {
    console.log('Unable to connect to the database:', err);
});



