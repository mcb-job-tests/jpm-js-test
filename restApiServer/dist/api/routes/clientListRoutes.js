'use strict';

/**
 * Created by Mike on 14/11/2017.
 */

module.exports = function (app) {
    var clientList = require('../controllers/clientListController');

    app.route('/clients').get(clientList.list_all_clients).post(clientList.create_a_client);

    /*    app.route('clients/:clientId')
            .get(clientList.read_a_client)
            .post(clientList.update_a_client)
            .delete(clientList.delete_a_client);*/
};