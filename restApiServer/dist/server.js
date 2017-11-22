'use strict';

/**
 * Created by Mike on 14/11/2017.
 */
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Client = require('./api/models/clientListModel'),
    bodyPaser = require('body-paser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Clientdb');

app.use(bodyPaser.urlencoded({ extended: true }));
app.use(bodyPaser.json());

var routes = require('./api/routes/clientListRoutes');

// register the route
routes(app);

app.listen(port);

console.log('jpm test RESTful sever started on: ' + port);