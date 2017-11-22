//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require( 'mongoose' );
let Client = require( '../api/models/client' );

//Require the dev-dependencies
let chai = require( 'chai' );
let chaiHttp = require( 'chai-http' );
let server = require( '../server' );
let should = chai.should();

chai.use( chaiHttp );

//Our parent block
describe( 'Clients', () => {

    beforeEach( ( done ) => { //Before each test we empty the database
        Client.remove( {}, ( err ) => {
            if ( err ) {
                console.log( err );
            }
            done();
        });
    });


    /*
     * Test the /GET route
     */
    describe( '/GET client', () => {

        it( 'should GET all the clients', ( done ) => {
            chai.request( server )
                .get( '/api/clients' )
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
    describe( '/POST client', () => {

        it( 'should not POST a client without id field', ( done ) => {

            const client = {
                firstname: 'John',
                surname: 'Smith',
                company: 'Walmart',
                telephone: '333-333-4444',
                country: 'USA'
            };

            chai.request( server )
                .post( '/api/clients' )
                .send( client )
                .end( ( err, res ) => {
                    res.should.have.status( 400 );
                    res.body.should.be.a( 'object' );
                    res.body.should.have.property( 'errors' );
                    res.body.errors.should.have.property( 'id' );
                    res.body.errors.id.should.have.property( 'kind' ).eql( 'required' );
                    done();
                });
        });

        it( 'should not POST a client without firstname field', ( done ) => {

            const client = {
                id: 999,
                surname: 'Smith',
                company: 'Walmart',
                telephone: '333-333-4444',
                country: 'USA'
            };

            chai.request( server )
                .post( '/api/clients' )
                .send( client )
                .end( ( err, res ) => {
                    res.should.have.status( 400 );
                    res.body.should.be.a( 'object' );
                    res.body.should.have.property( 'errors' );
                    res.body.errors.should.have.property( 'firstname' );
                    res.body.errors.firstname.should.have.property( 'kind' ).eql( 'required' );
                    done();
                });
        });

        it( 'should not POST a client without surname field', ( done ) => {

            const client = {
                id: 999,
                firstname: 'John',
                company: 'Walmart',
                telephone: '333-333-4444',
                country: 'USA'
            };

            chai.request( server )
                .post( '/api/clients' )
                .send( client )
                .end( ( err, res ) => {
                    res.should.have.status( 400 );
                    res.body.should.be.a( 'object' );
                    res.body.should.have.property( 'errors' );
                    res.body.errors.should.have.property( 'surname' );
                    res.body.errors.surname.should.have.property( 'kind' ).eql( 'required' );
                    done();
                });
        });

        it( 'should not POST a client without company field', ( done ) => {

            const client = {
                id: 999,
                firstname: 'John',
                surname: 'Smith',
                telephone: '333-333-4444',
                country: 'USA'
            };

            chai.request( server )
                .post( '/api/clients' )
                .send( client )
                .end( ( err, res ) => {
                    res.should.have.status( 400 );
                    res.body.should.be.a( 'object' );
                    res.body.should.have.property( 'errors' );
                    res.body.errors.should.have.property( 'company' );
                    res.body.errors.company.should.have.property( 'kind' ).eql( 'required' );
                    done();
                });
        });

        it( 'should not POST a client without telephone field', ( done ) => {

            const client = {
                id: 999,
                firstname: 'John',
                surname: 'Smith',
                company: 'Walmart',
                country: 'USA'
            };

            chai.request( server )
                .post( '/api/clients' )
                .send( client )
                .end( ( err, res ) => {
                    res.should.have.status( 400 );
                    res.body.should.be.a( 'object' );
                    res.body.should.have.property( 'errors' );
                    res.body.errors.should.have.property( 'telephone' );
                    res.body.errors.telephone.should.have.property( 'kind' ).eql( 'required' );
                    done();
                });
        });

        it( 'should not POST a client without country field', ( done ) => {

            const client = {
                id: 999,
                firstname: 'John',
                surname: 'Smith',
                company: 'Walmart',
                telephone: '333-333-4444',
            };

            chai.request( server )
                .post( '/api/clients' )
                .send( client )
                .end( ( err, res ) => {
                    res.should.have.status( 400 );
                    res.body.should.be.a( 'object' );
                    res.body.should.have.property( 'errors' );
                    res.body.errors.should.have.property( 'country' );
                    res.body.errors.country.should.have.property( 'kind' ).eql( 'required' );
                    done();
                });
        });

        it( 'should POST a client ', ( done ) => {

            const client = {
                id: 888,
                firstname: 'John',
                surname: 'Smith',
                company: 'Walmart',
                telephone: '333-333-4444',
                country: 'USA'
            };

            chai.request( server )
                .post( '/api/clients' )
                .send( client )
                .end( ( err, res ) => {
                    res.should.have.status( 200 );
                    res.body.should.be.a( 'object' );
                    res.body.should.have.property( 'message' ).eql( 'Client successfully added!' );
                    res.body.client.should.have.property( 'id' );
                    res.body.client.should.have.property( 'firstname' );
                    res.body.client.should.have.property( 'surname' );
                    res.body.client.should.have.property( 'company' );
                    res.body.client.should.have.property( 'telephone' );
                    res.body.client.should.have.property( 'country' );
                    done();
                });
        });
    });


    /*
     * Test the /GET/:id route
     */
    describe( '/GET/:_id client', () => {

        it( 'should GET a client by the given id', ( done ) => {

            let client = new Client({
                id: 777,
                firstname: 'Tony',
                surname: 'White',
                company: 'ASDA',
                telephone: '222-222-7777',
                country: 'UK'
            });

            chai.request( server )
                .post( '/api/clients' )
                .send( client )
                .end( ( err, postRes ) => {
                    const postRes_id = postRes.body.client._id;
                    chai.request( server )
                        .get( '/api/clients/' +  postRes_id )
                        .end( ( err, res ) => {
                            res.should.have.status( 200 );
                            res.body.should.be.a( 'object' );
                            res.body.should.have.property( 'id' ).eql( 777 );
                            res.body.should.have.property( 'firstname' ).eql( 'Tony' );
                            res.body.should.have.property( 'surname' ).eql( 'White' );
                            res.body.should.have.property( 'company' ).eql( 'ASDA' );
                            res.body.should.have.property( 'telephone' ).eql( '222-222-7777' ) ;
                            res.body.should.have.property( 'country' ).eql( 'UK' );
                            res.body.should.have.property( '_id' ).eql( postRes_id );
                            done();
                        });
                });
        });
    });


    /*
     * Test the /PUT/:id route
     */
    describe( '/PUT/:_id client', () => {
        it( 'should UPDATE a client given the id', ( done ) => {

            let client = new Client({
                id: 444,
                firstname: 'Pete',
                surname: 'Brown',
                company: 'Google',
                telephone: '444-555-6666',
                country: 'Ireland'
            });

            client.save( ( err, client ) => {
                chai.request( server )
                    .put( '/api/clients/' + client._id)
                    .send({ firstname: 'Paul', surname:'Jobs', company:'Apple Inc'})
                    .end( ( err, res ) => {
                        res.should.have.status( 200 );
                        res.body.should.be.a( 'object' );
                        res.body.should.have.property( 'message' ).eql( 'Client updated!' );
                        res.body.client.should.have.property( 'firstname' ).eql( 'Paul' );
                        res.body.client.should.have.property( 'surname' ).eql( 'Jobs' );
                        res.body.client.should.have.property( 'company' ).eql( 'Apple Inc' );
                        done();
                    });
            });
        });
    });

    /*
     * Test the /DELETE/:id route
     */
    describe( '/DELETE/:_id client', () => {
        it( 'should DELETE a client given the _id', ( done ) => {

            let client = new Client({
                id: 444,
                firstname: 'Pete',
                surname: 'Brown',
                company: 'Google',
                telephone: '444-555-6666',
                country: 'Ireland'
            });

            client.save( ( err, client ) => {
                chai.request( server )
                    .delete('/api/clients/' + client._id)
                    .end( ( err, res ) => {
                        res.should.have.status( 200 );
                        res.body.should.be.a( 'object' );
                        res.body.should.have.property( 'message' ).eql( 'Client successfully deleted!');
                        res.body.client.should.have.property( 'ok' ).eql( 1 );
                        res.body.client.should.have.property( 'n' ).eql( 1 );
                        done();
                    });
            });
        });
    });
});