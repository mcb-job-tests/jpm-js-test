'use strict';

/**
 * Created by Mike on 14/11/2017.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClientSchema = new Schema({
    id: {
        type: Symbol
    },
    firstName: {
        type: String
    },
    surName: {
        type: String
    },
    company: {
        type: String
    },
    telephone: {
        type: Symbol
    },
    country: {
        type: Symbol
    }
});

module.exports = mongoose.model('Clients', ClientSchema);