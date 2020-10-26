/**
* This API is used to get the configurations which are set in the LoginRadius Dashboard for a particular LoginRadius site/environment
* @return Response containing LoginRadius App configurations which are set in the LoginRadius Dashboard for a particular LoginRadius site/environment
*100
*/
let router = require('./../../route.js');
let config = require(router.config);
var lrv2 = require('loginradius-sdk')(config);


module.exports = {

    command: async function (cb) {

        /**
         * @param {function} cb - callback function to handle response
         */

        lrv2.configurationApi.getConfigurations().then((response) => {
            cb(response);
        }).catch((error) => {
            cb(error);
        });
    }
};