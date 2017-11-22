# jpm-js-test
JP Morgan - Javascript Technical Challange - Clients &amp; Sales

Please install mongoDB, node 6.9.1, and react

To test and run App, please follow the below instructions from a CLI;

1) start mongo server with command 'mongod'.
2) cd into the restApiServer directory and run the mocha/chai unit tests with command 'npm test'.
3) start the rest API Server with command 'npm start'
4) cd into the client-sales-app directory and start the react's front end server with command 'npm start'
5) open a browser and point it to http://localhost:3000

All CRUD operations (POST/GET/PUT/DELETE) have been implemented and tested (with Mocha/Chai).

Valid REST Routes are;
GET /api/clients
GET /api/clients/:_id
GET /api/sales
GET /api/clients/:_id
POST /api/clients
POST /api/sales
PUT /api/clients/:_id
PUT /api/sales/:_id
DELETE /api/clients/:_id
DELETE /api/sales/:_id

You may use https://www.getpostman.com/ for manual testing. 

Please Note: The front-end will only update manual changes made to the back-end's mongoDB (via Postman) after a page refresh or after navigating to either of the app's main Client/Sales routes via the GUI tabs provided.
