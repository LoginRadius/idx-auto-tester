/**
 * All app Urls store here
 */

module.exports = function (config) {

    let module = {};

    module.iefAuthPageUri = "https://" + config.siteName + "." + config.defaultHub + "." + config.defaultHost + "/auth.aspx",

    module.iefLogoutUri = "https://" + config.siteName + "." + config.defaultHub + "." + config.defaultHost + "/auth.aspx?action=logout",

    module.iefProfilePageUri = "https://" + config.siteName + "." + config.defaultHub + "." + config.defaultHost + "/profile.aspx"

    return module;
}