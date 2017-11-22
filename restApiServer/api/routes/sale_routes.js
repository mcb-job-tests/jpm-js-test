let cors = require( 'cors' );         // allow localhost server api calls during development
let SaleController = require('../controllers/sale');

module.exports = function ( router ) {

    // on routes that end in /sales
    // ----------------------------------------------------
    router.route('/sales')

        // create a sale ( accessed at POST http://localhost:8080/api/sales )
        .post( cors(), SaleController.postSale)


        // get all sales ( accessed at GET http://localhost:8080/api/sales )
        .get( cors(), SaleController.getSales );

    // on routes that end in /sales/:sale_id
    // ----------------------------------------------------
    router.route( '/sales/:sale_id' )

        // get the sale with that id ( accessed at GET http://localhost:8080/api/sales/:sale_id )
        .get( cors(), SaleController.getSale )

        // update the sale with this id ( accessed at PUT http://localhost:8080/api/sales/:sale_id )
        .put( cors(), SaleController.updateSale )

        // delete the sale with this id ( accessed at DELETE http://localhost:8080/api/sales/:sale_id )
        .delete( cors(), SaleController.deleteSale );
};
