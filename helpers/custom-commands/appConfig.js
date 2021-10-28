/**
* This API is used to get the configurations which are set in the LoginRadius Dashboard for a particular LoginRadius site/environment
* @return Response containing LoginRadius App configurations which are set in the LoginRadius Dashboard for a particular LoginRadius site/environment
*100
*/
const router = require('./../../route.js');
const config = require(router.config);
const lrv2 = require('loginradius-sdk')(config);


module.exports = {

    command: async function (cb) {

        /**
         * @param {function} cb - callback function to handle response
         */

        lrv2.configurationApi.getConfigurations().then(cb).catch(cb);
    }
};