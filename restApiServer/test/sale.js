//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require( 'mongoose' );
let Sale = require( '../api/models/sale' );

//Require the dev-dependencies
let chai = require( 'chai' );
let chaiHttp = require( 'chai-http' );
let server = require( '../server' );
let should = chai.should();

chai.use( chaiHttp );

//Our parent block
describe( 'Sales', () => {

    beforeEach( ( done ) => { //Before each test we empty the database collection
        Sale.remove( {}, ( err ) => {
            if ( err ) {
                console.log( err );
            }
            done();
        });
    });


    /*
     * Test the /GET route
     */
    describe( '/GET sale', () => {

        it( 'should GET all the sales', ( done ) => {
            chai.request( server )
                .get( '/api/sales' )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( 'array' );
                    res.body.length.should.be.eql( 0 );
                    done();
                });
        });
    });


    /*
     * Test the /POST route
     */
    describe( '/POST sale', () => {

        it( 'should not POST a sale without id field', ( done ) => {

            const sale = {
                /*id: 1,*/
                clientId: 7,
                productname: 'Chocolate - Semi Sweet, Calets',
                price: '£1.34',
                size: 87
            };


            chai.request( server )
                .post( '/api/sales' )
                .send( sale )
                .end( ( err, res ) => {
                    res.should.have.status( 400 );
                    res.body.should.be.a( 'object' );
                    res.body.should.have.property( 'errors' );
                    res.body.errors.should.have.property( 'id' );
                    res.body.errors.id.should.have.property( 'kind' ).eql( 'required' );
                    done();
                });
        });

        it( 'should not POST a sale without clientId field', ( done ) => {

            const sale = {
                id: 1,
                /*clientId: 7,*/
                productname: 'Chocolate - Semi Sweet, Calets',
                price: '£1.34',
                size: 87
            };

            chai.request( server )
                .post( '/api/sales' )
                .send( sale )
                .end( ( err, res ) => {
                    res.should.have.status( 400 );
                    res.body.should.be.a( 'object' );
                    res.body.should.have.property( 'errors' );
                    res.body.errors.should.have.property( 'clientId' );
                    res.body.errors.clientId.should.have.property( 'kind' ).eql( 'required' );
                    done();
                });
        });

        it( 'should not POST a sale without productname field', ( done ) => {

            const sale = {
                id: 1,
                clientId: 7,
                /*productname: 'Chocolate - Semi Sweet, Calets',*/
                price: '£1.34',
                size: 87
            };

            chai.request( server )
                .post( '/api/sales' )
                .send( sale )
                .end( ( err, res ) => {
                    res.should.have.status( 400 );
                    res.body.should.be.a( 'object' );
                    res.body.should.have.property( 'errors' );
                    res.body.errors.should.have.property( 'productname' );
                    res.body.errors.productname.should.have.property( 'kind' ).eql( 'required' );
                    done();
                });
        });

        it( 'should not POST a sale without price field', ( done ) => {

            const sale = {
                id: 1,
                clientId: 7,
                productname: 'Chocolate - Semi Sweet, Calets',
                /*price: '£1.34',*/
                size: 87
            };

            chai.request( server )
                .post( '/api/sales' )
                .send( sale )
                .end( ( err, res ) => {
                    res.should.have.status( 400 );
                    res.body.should.be.a( 'object' );
                    res.body.should.have.property( 'errors' );
                    res.body.errors.should.have.property( 'price' );
                    res.body.errors.price.should.have.property( 'kind' ).eql( 'required' );
                    done();
                });
        });

        it( 'should not POST a sale without size field', ( done ) => {

            const sale = {
                id: 1,
                clientId: 7,
                productname: 'Chocolate - Semi Sweet, Calets',
                price: '£1.34',
                /*size: 87*/
            };

            chai.request( server )
                .post( '/api/sales' )
                .send( sale )
                .end( ( err, res ) => {
                    res.should.have.status( 400 );
                    res.body.should.be.a( 'object' );
                    res.body.should.have.property( 'errors' );
                    res.body.errors.should.have.property( 'size' );
                    res.body.errors.size.should.have.property( 'kind' ).eql( 'required' );
                    done();
                });
        });

        it( 'should POST a sale ', ( done ) => {

            const sale = {
                id: 1,
                clientId: 7,
                productname: 'Chocolate - Semi Sweet, Calets',
                price: '£1.34',
                size: 87
            };

            chai.request( server )
                .post( '/api/sales' )
                .send( sale )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( 'object' );
                    res.body.should.have.property( 'message' ).eql( 'Sale successfully added!' );
                    res.body.sale.should.have.property( 'id' );
                    res.body.sale.should.have.property( 'clientId' );
                    res.body.sale.should.have.property( 'productname' );
                    res.body.sale.should.have.property( 'price' );
                    res.body.sale.should.have.property( 'size' );
                    done();
                });
        });
    });


    /*
     * Test the /GET/:_id route
     */
    describe( '/GET/:_id sale', () => {

        it( 'should GET a sale by the given _id', ( done ) => {

            const sale = {
                id: 1,
                clientId: 7,
                productname: 'Chocolate - Semi Sweet, Calets',
                price: '£1.34',
                size: 87
            };

            chai.request( server )
                .post( '/api/sales' )
                .send( sale )
                .end( ( err, postRes ) => {
                    const postRes_id = postRes.body.sale._id;
                    chai.request( server )
                        .get( '/api/sales/' +  postRes_id )
                        .end( ( err, res ) => {
                            res.should.have.status( 200 );
                            res.body.should.be.a( 'object' );
                            res.body.should.have.property( 'id' ).eql( 1 );
                            res.body.should.have.property( 'clientId' ).eql( 7 );
                            res.body.should.have.property( 'productname' ).eql( 'Chocolate - Semi Sweet, Calets' );
                            res.body.should.have.property( 'price' ).eql( '£1.34' );
                            res.body.should.have.property( 'size' ).eql( 87 ) ;
                            res.body.should.have.property( '_id' ).eql( postRes_id );
                            done();
                        });
                });
        });
    });


    /*
     * Test the /PUT/:_id route
     */
    describe( '/PUT/:_id sale', () => {
        it( 'should UPDATE a sale given the _id', ( done ) => {

            let sale = new Sale({
                id: 1,
                clientId: 7,
                productname: 'Chocolate - Semi Sweet, Calets',
                price: '£1.34',
                size: 87
            });

            sale.save( ( err, sale ) => {
                chai.request( server )
                    .put( '/api/sales/' + sale._id)
                    .send({ productname: 'Ice Cream - Cones, Chocolate Chip', price:'£2.43', size: 99 })
                    .end( ( err, res ) => {
                        res.should.have.status( 200 );
                        res.body.should.be.a( 'object' );
                        res.body.should.have.property( 'message' ).eql( 'Sale updated!' );
                        res.body.sale.should.have.property( 'productname' ).eql( 'Ice Cream - Cones, Chocolate Chip' );
                        res.body.sale.should.have.property( 'price' ).eql( '£2.43' );
                        res.body.sale.should.have.property( 'size' ).eql( 99 );
                        done();
                    });
            });
        });
    });

    /*
     * Test the /DELETE/:_id route
     */
    describe( '/DELETE/:_id sale', () => {
        it( 'should DELETE a sale given the _id', ( done ) => {

            let sale = new Sale({
                id: 1,
                clientId: 7,
                productname: 'Chocolate - Semi Sweet, Calets',
                price: '£1.34',
                size: 87
            });

            sale.save( ( err, sale ) => {
                chai.request( server )
                    .delete('/api/sales/' + sale._id)
                    .end( ( err, res ) => {
                        res.should.have.status( 200 );
                        res.body.should.be.a( 'object' );
                        res.body.should.have.property( 'message' ).eql( 'Sale successfully deleted!');
                        res.body.sale.should.have.property( 'ok' ).eql( 1 );
                        res.body.sale.should.have.property( 'n' ).eql( 1 );
                        done();
                    });
            });
        });
    });
});