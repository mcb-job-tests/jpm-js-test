// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
let express    = require( 'express' );      // call express
let app        = express();                 // define our app using express
/*let cors       = require( 'cors' );         // allow localhost server api calls during development*/
let bodyParser = require( 'body-parser' );
let mongoose   = require( 'mongoose' );     // access MongoDB
let port       = process.env.PORT || 8080;        // set our port

require('dotenv').config();
console.log('Your environment variable NODE_ENV has the value: ', process.env.NODE_ENV);

// mongoose instance url connection
mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://127.0.0.1/Testdb', { useMongoClient: true } );
let db = mongoose.connection;
db.on( 'error', console.error.bind( console, 'MongoDB connection error' ) );

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );

// ROUTES FOR OUR API
// =============================================================================
let router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use( function( req, res, next ){
    if( process.env.NODE_ENV === 'development' ) {
        // logging
        console.log( 'Received an API call' );
    }
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get( '/', function( req, res ) {
    res.json({ message: 'Welcome to our api!' });
});

require( './api/routes' )( router );

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use( '/api', router );

// ERROR HANDLING
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Enable All CORS Requests
// for localhost development only!!
/*router.use( cors() );*/


initialiseDataBaseData = function(){
    let Client     = require( './api/models/client' );

    Client.remove( {}, () => {

        let clientData = require( './data/CLIENTS_MOCK_DATA.json' );

        for( let i = 0; i < clientData.length; i++ ){

            let client = new Client( {
                id: clientData[ i ].id,
                firstname: clientData[ i ].firstname,
                surname: clientData[ i ].surname,
                company: clientData[ i ].company,
                telephone: clientData[ i ].telephone,
                country: clientData[ i ].country
            });

            client.save( ( err ) => {
                if (err) {
                    console.log( err );
                }
            })
        }

    });



    let Sale = require( './api/models/sale' );

    Sale.remove( {}, () => {

        let saleData = require( './data/SALES_MOCK_DATA.json' );

        for( let i = 0; i < saleData.length; i++ ){

            let sale = new Sale( {
                id: saleData[ i ].id,
                clientId: saleData[ i ].client_id,
                productname: saleData[ i ].product_name,
                price: saleData[ i ].price,
                size: saleData[ i ].size,
            } );

            sale.save( ( err ) => {
                if ( err ) {
                    console.log( err );
                }
            })
        }

    });
};

// START THE SERVER
// =============================================================================
app.listen( port, ()=>{
    console.log( 'CORS-enabled web server listening on port ' + port );
    if ( process.env.NODE_ENV === 'development' ) {
        initialiseDataBaseData();
    }
});

module.exports = app; // for testing

