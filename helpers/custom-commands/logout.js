/**
 * Logout from application
 */
let router = require('../../route.js');
let config = require(router.config);
let uri = new require(router.uri)(config)

exports.command = function () {
    
    this.url(uri.iefLogoutUri);

    return this;
};


