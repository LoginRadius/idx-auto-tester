/**
 * Cases: logout from site
 */
let router = require('../route.js');
let elements = require(router.locators);
let config = require(router.config);
let samplePayload = require(router.samplePayload);
let showInReport = require(router.reportMessages);
let uri = new require(router.uri)(config);
let userProfile;

module.exports = {
    '@tags': ['logout'],

    before: function (browser, done) {
        userProfile = samplePayload();

        browser.createUser(userProfile, function (response) {
            done();
        })
    },

    '1. Verify that user should successfully logout by clicking on logout button': function (browser, done) {

        browser.url(uri.iefAuthPageUri);
        browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.loginPage);
        browser.userLogin(userProfile.Email[0].Value, userProfile.Password);
        browser.waitForElementVisible(elements.profilePage.profileImage, 20000, showInReport.loginSuccess);
        browser.assert.urlEquals(uri.iefProfilePageUri, showInReport.profileUrl);
        browser.waitForElementVisible(elements.profilePage.accountmenu, 10000, showInReport.accountMenu);
        browser.pause(1000);
        browser.click(elements.profilePage.accountmenu);
        browser.pause(1000);
        browser.click(elements.profilePage.logoutBtn);
        browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.logoutSuccess);
        browser.assert.urlEquals(uri.iefAuthPageUri, showInReport.homeUrl);
        browser.back(); // Verify that it should not redirect to profile.aspx when press browser's back button.
        browser.pause(1000);
        browser.assert.urlEquals(uri.iefAuthPageUri, showInReport.browserBackSuccess);
    },

    '2. Verify that user should successfully logout by browsing logout url': function (browser, done) {

        browser.url(uri.iefAuthPageUri);
        browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.loginPage);
        browser.userLogin(userProfile.Email[0].Value, userProfile.Password);
        browser.waitForElementVisible(elements.profilePage.profileImage, 20000, showInReport.loginSuccess);
        browser.assert.urlEquals(uri.iefProfilePageUri, showInReport.profileUrl);
        browser.url(uri.iefLogoutUri);
        browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.logoutSuccess);
        browser.assert.urlEquals(uri.iefAuthPageUri, showInReport.homeUrl);
        browser.back(); // Verify that it should not redirect to profile.aspx when press browser's back button.
        browser.pause(1000);
        browser.assert.urlEquals(uri.iefAuthPageUri, showInReport.browserBackSuccess);
    },


    after: function (browser, done) {
        browser.end(done);
    }
}

