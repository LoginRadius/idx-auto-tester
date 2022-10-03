/**
 * ief web app pages 
 */

module.exports = function (config) {
    const BASE_URL = `https://${config.siteName}.${config.defaultHub}.${config.defaultHost}`;
    return {
        iefAuthPageUri: BASE_URL + "/auth.aspx",
        iefLogoutUri: BASE_URL + "/auth.aspx?action=logout",
        iefProfilePageUri: BASE_URL + "/profile.aspx"
    };
}