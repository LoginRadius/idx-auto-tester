/**
 * Cases: User Login
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

module.exports = {
    '@tags': ['login', 'userlogin'],

    before: function (browser, done) {
        browser.appConfig(function (config) {
            emailFlow = config.emailVerificationFlow;
            done();
        })
    },


    '1. Verify that user should able to login': function (browser, done) {

        let body = samplePayload();

        browser.createUser(body, function (response) {
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.loginPage);
            browser.userLogin(response.Email[0].Value, body.Password);
            browser.waitForElementVisible(elements.profilePage.profileImage, 20000, showInReport.loginSuccess);
            browser.assert.urlEquals(uri.iefProfilePageUri, showInReport.profileUrl);
            browser.logout();
        });
    },

    '2. Verify that user should unable to login when provide invalid email and password combination': function (browser, done) {

        let email = chance.email({ length: 10 });
        let pass = chance.word({ length: 10 })

        browser.url(uri.iefAuthPageUri);
        browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.loginPage);
        browser.userLogin(email, pass);
        browser.pause(3000);
        browser.getText(elements.commonLocators.notificationDiv, function (result) {
            browser.assert.equal(result.value, message.invalidUserMessage, showInReport.loginFail);
            browser.assert.urlEquals(uri.iefAuthPageUri, showInReport.homeUrl);
        });
    },

    '3. Verify that proper message should show when pass valid email and Invalid Password': function (browser, done) {

        let body = samplePayload();
        let pass = chance.word({ length: 10 })

        browser.createUser(body, function (response) {
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.loginPage);
            browser.userLogin(response.Email[0].Value, pass);
            browser.pause(3000);
            browser.getText(elements.commonLocators.notificationDiv, function (result) {
                browser.assert.equal(result.value, message.invalidUserPasswordMessage, showInReport.loginFailOnInvalidCombination);
                browser.assert.urlEquals(uri.iefAuthPageUri, showInReport.homeUrl);
            });
        });
    },

    "4. Verify that it should show proper errormessage when login by unverified user's email if email verification flow is required else show profile page": function (browser, done) {

        let body = samplePayload({
            "EmailVerified": false
        });

        browser.createUser(body, function (response) {
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.loginPage);
            browser.userLogin(response.Email[0].Value, body.Password);
            browser.pause(4000);
            if(EmailFlow=='required'){
            browser.getText(elements.commonLocators.notificationDiv, function (result) {
                browser.assert.equal(result.value, message.unverifiedUserLoginMessage, showInReport.loginFailOnUnverifiedUser);
                browser.assert.urlEquals(uri.iefAuthPageUri, showInReport.homeUrl);
            });
            }
            else {
                browser.assert.urlEquals(uri.iefProfilePageUri, showInReport.profileUrl);
            }
            });
    },

    "5. Verify that it should validation message when pass email in invalid format": function (browser, done) {

        let invalidFormattedEmail = chance.word({ length: 10 });
        browser.url(uri.iefAuthPageUri);
        browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.loginPage);
        browser.userLogin(invalidFormattedEmail, chance.word({ length: 10 }));
        browser.pause(2000);
        browser.getText(elements.authPage.login.validators.emailIdErrorMessage, function (result) {
            browser.assert.equal(result.value, message.invalidemailIdValidationMessage, showInReport.loginFailonInvalidEmail);
            browser.assert.urlEquals(uri.iefAuthPageUri, showInReport.homeUrl);
        });
    },

    after: function (browser, done) {
        browser.end(done);
    }
}
