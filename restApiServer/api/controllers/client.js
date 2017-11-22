let Client = require('../models/client');

function getClients( req, res ) {
    Client.find( {}, function( err, client ){
        if ( err ) {
            res.send( err );
        } else {
            res.json( client );
        }
    });
}

function postClient( req, res ) {
    let newClient = new Client( req.body );

    let validationError = newClient.validateSync();

    if ( validationError ) {
        res.status( 400 ).send( validationError )
    } else {
        newClient.save( function( err, client ) {
            if ( err ) {
                res.send( err );
            } else {
                res.json( { message: "Client successfully added!", client } );
            }

        });
    }
}

function getClient( req, res ) {
    Client.findById( req.params.client_id, ( err, client ) => {
        if ( err ) {
            res.send( err );
        } else {
            res.json( client );
        }
    });
}

function updateClient( req, res ) {
    Client.findById( req.params.client_id, ( err, client ) => {
        if ( err ) {
            res.send( err );
        }
        // We use Object.assign, a new function introduced in ES6 which, in this case, overrides
        // the common properties of client with req.body while leaving untouched the others.
        Object.assign( client, req.body )
            .save( ( err, client ) => {
                if ( err ) {
                    res.send( err );
                } else {
                    res.json( { message: 'Client updated!', client } );
                }
            });
    });
}

function deleteClient( req, res ){
    Client.remove( { _id : req.params.client_id }, ( err, client) => {
        if ( err ){
            res.send( err );
        } else {
            res.json( { message: 'Client successfully deleted!', client } );
        }
    });
}

// export all the functions
module.exports = { getClients, postClient, getClient, deleteClient, updateClient };