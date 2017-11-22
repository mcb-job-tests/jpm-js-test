'use strict';

/**
 * Created by Mike on 14/11/2017.
 */
var mongoose = require('mongoose'),
    Client = mongoose.model('Clients');

exports.list_all_clients = function (req, res) {
    Client.find({}, function (err, client) {
        if (err) res.send(err);
        res.json(client);
    });
};