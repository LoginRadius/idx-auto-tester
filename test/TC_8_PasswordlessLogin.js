/**
 * Cases: Passwordless login using email
 */
let router = require('../route.js');
let elements = require(router.locators);
let config = require(router.config);
let message = require(router.messages);
let samplePayload = require(router.samplePayload);
let showInReport = require(router.reportMessages);
let uri = new require(router.uri)(config)
let Chance = require('chance');
let chance = new Chance();
var EmailOneClick;

module.exports = {
    '@tags': ['passwordlesslogin', 'oneclicksignin'],

    before: function (browser, done) {
        browser.appConfig(function (config) {
            EmailOneClick = config.IsInstantSignin.EmailLink;
            done();
        })
    },

    '1. Verify that user should able to login by passwordless login': function (browser, done) {

        let body = samplePayload();

        if (EmailOneClick) {
            browser.createUser(body, function (response) {
                browser.url(uri.iefAuthPageUri);
                browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.loginPage);
                browser.setValue(elements.authPage.login.loginEmail, response.Email[0].Value);
                browser.pause(1000);
                browser.click(elements.authPage.login.instantLoginButton);
                browser.getVerificationToken(response.Email[0].Value, function (res) {
                    browser.url(uri.iefAuthPageUri + "?vtype=emailverification&vtoken=" + res.vtoken);
                    browser.pause(5000);
                    browser.waitForElementVisible(elements.profilePage.profileImage, 20000, showInReport.loginSuccess);
                    browser.assert.urlEquals(uri.iefProfilePageUri, showInReport.profileUrl);
                    browser.logout();
                });
            });
        }
        else browser.assert.ok('OneClick Signin not enabled for this app.');
    },

    "2. Verify that it send the login link when login by unverified user's email": function (browser, done) {

        let body = samplePayload({
            "EmailVerified": false
        });

        if (EmailOneClick) {
            browser.createUser(body, function (response) {
                browser.url(uri.iefAuthPageUri);
                browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.loginPage);
                browser.setValue(elements.authPage.login.loginEmail, response.Email[0].Value);
                browser.click(elements.authPage.login.instantLoginButton)
                browser.pause(4000);
                browser.getText(elements.commonLocators.notificationDiv, function (result) {
                    browser.assert.equal(result.value, message.instantLoginLink);
                });
            });
        }
        else browser.assert.ok('OneClick Signin not enabled for this app.');
    },

    "3. Verify that it should validation message when pass email in invalid format": function (browser, done) {

        let invalidFormattedEmail = chance.word({ length: 10 });

        if (EmailOneClick) {
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.loginPage);
            browser.setValue(elements.authPage.login.loginEmail, invalidFormattedEmail);
            browser.click(elements.authPage.login.instantLoginButton)
            browser.pause(2000);
            browser.getText(elements.authPage.login.validators.emailIdErrorMessage, function (result) {
                browser.assert.equal(result.value, message.invalidemailIdValidationMessage, showInReport.loginFailonInvalidEmail);
                browser.assert.urlEquals(uri.iefAuthPageUri, showInReport.profileUrl);
            });
        }
        else browser.assert.ok('OneClick Signin not enabled for this app.');
    },

    after: function (browser, done) {
        browser.end(done);
    }
}