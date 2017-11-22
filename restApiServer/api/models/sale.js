let mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema;

let SaleSchema =  new Schema({
    id: {
        type: Number,
        required : true
    },
    clientId: {
        type: Number,
        required : true
    },
    productname: {
        type: String,
        required : true
    },
    price: {
        type: String,
        required : true
    },
    size: {
        type: Number,
        min: 1,
        required : true
    },
});

module.exports = mongoose.model( 'Sale', SaleSchema );