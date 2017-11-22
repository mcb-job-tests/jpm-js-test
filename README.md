# jpm-js-test
JP Morgan - Javascript Technical Challange - Clients &amp; Sales

Please install mongoDB, node 6.9.1, and create-react-app (https://github.com/facebookincubator/create-react-app)

We had issues installing some dependencies using the latest version of npm on windows. This was solved with version 5.3.0

To test and run the App, please follow the below instructions using a CLI;

1) start mongo server with command 'mongod'.
2) cd into the restApiServer directory and run the mocha/chai unit tests with command 'npm test'.
3) after running the tests, start the 'development' REST API Server with command 'npm start'.
4) cd into the client-sales-app directory and start react's front-end facing server with command 'npm start'.
5) open a browser and point it at http://localhost:3000

All CRUD operations (POST/GET/PUT/DELETE) have been implemented and tested (using Mocha/Chai).

You may use https://www.getpostman.com/ for manual testing, by point it at http://localhost:8080

Valid REST Routes are;
1) GET /api/clients
2) GET /api/clients/:_id
3) GET /api/sales
4) GET /api/sales/:_id
5) POST /api/clients
6) POST /api/sales
7) PUT /api/clients/:_id
8) PUT /api/sales/:_id
9) DELETE /api/clients/:_id
10) DELETE /api/sales/:_id

Please Note: The front-end will only update manual changes made to the back-end's mongoDB (via Postman) after a page refresh or after navigating to either of the app's main Client/Sales routes via the GUI tabs provided.
