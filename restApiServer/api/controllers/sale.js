let Sale = require('../models/sale');

function getSales( req, res ) {
    Sale.find( {}, function( err, sale ){
        if ( err )
            res.send( err );
        res.json( sale );
    });
}

function postSale( req, res ) {
    // create a new sale
    let sale = new Sale( req.body );

    let validationError = sale.validateSync();

    if ( validationError ) {
        res.status( 400 ).send( validationError )
    } else {
        sale.save( function ( err ) {
            if ( err ) {
                res.send( err );
            } else {
                res.json( { message: 'Sale successfully added!', sale } );
            }
        });
    }
}

function getSale( req, res ) {
    Sale.findById( req.params.sale_id, function( err, sale ) {
        if ( err ) {
            res.send( err );
        }

        res.json( sale );
    });
}

function deleteSale( req, res ) {
    Sale.remove({
            _id : req.params.sale_id
        },
        function( err, sale) {
            if ( err ) {
                res.send( err );
            } else {
                res.json( { message: 'Sale successfully deleted!', sale } );
            }
        }
    );
}

function updateSale( req, res ) {
    Sale.findById( req.params.sale_id, function( err, sale ) {
        if ( err ) {
            res.send( err );
        }
        // We use Object.assign, a new function introduced in ES6 which, in this case, overrides
        // the common properties of sale with req.body while leaving untouched the others.
        Object.assign( sale, req.body ).save( ( err, sale ) => {
            if ( err ) {
                res.send( err );
            }
            res.json( { message: 'Sale updated!', sale } );
        });
    });
}

// export all the functions
module.exports = { getSales, postSale, getSale, deleteSale, updateSale };