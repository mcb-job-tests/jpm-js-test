let mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema;

let ClientSchema =  new Schema({
    id: {
        type: Number,
        required : true
    },
    firstname: {
        type: String,
        required : true
    },
    surname: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model( 'Client', ClientSchema );