/**
 * Cases: logout from site
 */
let router = require('../route.js');
let elements = require(router.locators);
let config = require(router.config);
let samplePayload = require(router.samplePayload);
let uri = new require(router.uri)(config)

module.exports = {
    '@tags': ['logout'],


    '\n1. User should be able to login': function (browser, done) {

        let body = samplePayload();

        browser.createUser(body, function (response) {
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000);
            browser.userLogin(response.Email[0].Value, body.Password);
            browser.waitForElementVisible(elements.profilePage.profileImage, 20000, "User should be able to login, profile-img should locate");
            browser.assert.urlEquals(uri.iefProfilePageUri);
            browser.waitForElementVisible(elements.profilePage.accountmenu, 10000);
            browser.pause(1000);
            browser.click(elements.profilePage.accountmenu);
            browser.pause(1000);
            browser.click(elements.profilePage.logoutBtn);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, "User should logout successfully.");
            browser.assert.urlEquals(uri.iefAuthPageUri);
            browser.back(); // Verify that it should not redirect to profile.aspx when press browser's back button.
            browser.pause(1000);
            browser.assert.urlEquals(uri.iefAuthPageUri);
        });
    },


    after: function (browser, done) {
        browser.end(done);
    }
}

