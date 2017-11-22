let cors = require( 'cors' );         // allow localhost server api calls during development
let Client = require('../controllers/client');

module.exports = function ( router ) {


    // on routes that end in /clients
    // ----------------------------------------------------
    router.route('/clients')

        // create a client ( accessed at POST http://localhost:8080/api/clients )
        .post( cors(), Client.postClient )

        // get all clients ( accessed at GET http://localhost:8080/api/clients )
        .get( cors(), Client.getClients );


    // on routes that end in /clients/:client_id
    // ----------------------------------------------------
    router.route( '/clients/:client_id' )

        // get the client with that id ( accessed at GET http://localhost:8080/api/clients/:client_id )
        .get( cors(), Client.getClient )

        // update the client with this id ( accessed at PUT http://localhost:8080/api/client/:client_id )
        .put( cors(), Client.updateClient )

        // delete the client with this id ( accessed at DELETE http://localhost:8080/api/client/:client_id )
        .delete( cors(), Client.deleteClient );


    router.route('/fault')
        .get( cors(), ( err, req, res, next )=>{
            res.end( 500 );
        });
};