const clientRoutes = require( './client_routes' );
const saleRoutes = require( './sale_routes' );

module.exports = ( router ) => {
    clientRoutes( router );
    saleRoutes( router );
};