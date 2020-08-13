/**
 * User will be created using loginradius api
 */
let router = require('./../../route.js');
let config = require(router.config);
var lrv2 = require('loginradius-sdk')(config);


exports.command = function (accountCreateModel, cb) {

    /**
     * @param {object} accountCreateModel - json object loaded user profile data
     * @param {function} cb - callback function to handle response
     */

    let self = this;

    self.perform(function (self, done) {
        let fields = null;

        lrv2.accountApi.createAccount(accountCreateModel, fields).then((response) => {
            cb(response);
            done();
        }).catch((error) => {
            cb(error);
            done();
        });
    });

    return this;
};