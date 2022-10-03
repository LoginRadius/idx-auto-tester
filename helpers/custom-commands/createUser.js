/**
 * User will be created using loginradius api
 */
const router = require('./../../route.js');
const config = require(router.config);
const lrv2 = require('loginradius-sdk')(config);


module.exports = {

    command: async function (accountCreateModel, cb) {

        /**
         * @param {object} accountCreateModel - json object loaded user profile data
         * @param {function} cb - callback function to handle response
         */

        lrv2.accountApi.createAccount(accountCreateModel, null).then(cb).catch(cb);
    }
};