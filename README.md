# jpm-js-test
JP Morgan - Javascript Technical Challange - Clients &amp; Sales

Please install mongoDB, node 6.9.1, and react

To test and run App, please follow the below instructions from a CLI;

1) start mongo server with command 'mongod'.
2) cd into the restApiServer directory and run the mocha/chai unit tests with command 'npm test'.
3) start the rest API Server with command 'npm start'
4) cd into the client-sales-app directory and start the react's fromt end server with command 'npm start'
5) open a browser and point it to http://localhost:3000

All CRUD operations (POST/GET/PUT/DELETE) have been implemented and tested (with Mocha/Chai).

You may use https://www.getpostman.com/ for manual testing. 

Please Note: The front-end will only update any changes to the back-end mongoDB after a page refresh or after navigating to either of the app's main Client/Sales routes via the GUI tabs provided.
