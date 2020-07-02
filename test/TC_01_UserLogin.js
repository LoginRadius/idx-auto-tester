/**
 * Cases: User Login
 */
let router = require('../route.js');
let elements = require(router.locators);
let config = require(router.config);
let message = require(router.messages);
let samplePayload = require(router.samplePayload);
let uri = new require(router.uri)(config)
let Chance = require('chance');
let chance = new Chance();

module.exports = {
    '@tags': ['login', 'userlogin'],


    '1. Verify that user should able to login': function (browser, done) {

        let body = samplePayload();

        browser.createUser(body, function (response) {
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000);
            browser.userLogin(response.Email[0].Value, body.Password);
            browser.waitForElementVisible(elements.profilePage.profileImage, 20000, "User should able to login, profile-img should locate");
            browser.assert.urlEquals(uri.iefProfilePageUri);
            browser.logout();
        });
    },

    '2. Verify that user should unable to login when provide invalid email and password combination': function (browser, done) {

        let email = chance.email({ length: 10 });
        let pass = chance.word({ length: 10 })

        browser.url(uri.iefAuthPageUri);
        browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000);
        browser.userLogin(email, pass);
        browser.pause(3000);
        browser.getText(elements.commonLocators.notificationDiv, function (result) {
            this.assert.equal(result.value, message.invalidUserMessage);
            browser.assert.urlEquals(uri.iefAuthPageUri);
        });
    },

    '3. Verify that proper message should show when pass valid email and Invalid Password': function (browser, done) {

        let body = samplePayload();
        let pass = chance.word({ length: 10 })

        browser.createUser(body, function (response) {
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000);
            browser.userLogin(response.Email[0].Value, pass);
            browser.pause(3000);
            browser.getText(elements.commonLocators.notificationDiv, function (result) {
                this.assert.equal(result.value, message.invalidUserPasswordMessage);
                browser.assert.urlEquals(uri.iefAuthPageUri);
            });
        });
    },

    "4. Verift that it should show proper errormessage when login by unverified user's email": function (browser, done) {

        let body = samplePayload({
            "EmailVerified": false
        });

        browser.createUser(body, function (response) {
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000);
            browser.userLogin(response.Email[0].Value, body.Password);
            browser.pause(4000);
            browser.getText(elements.commonLocators.notificationDiv, function (result) {
                this.assert.equal(result.value, message.unverifiedUserLoginMessage);
                browser.assert.urlEquals(uri.iefAuthPageUri);
            });
        });
    },

    "5. Verify that it should validation message when pass email in invalid format": function (browser, done) {

        let invalidFormattedEmail = chance.word({ length: 10 });
        browser.url(uri.iefAuthPageUri);
        browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000);
        browser.userLogin(invalidFormattedEmail, chance.word({ length: 10 }));
        browser.pause(2000);
        browser.getText(elements.authPage.login.validators.emailIdErrorMessage, function (result) {
            this.assert.equal(result.value, message.invalidemailIdValidationMsg);
            browser.assert.urlEquals(uri.iefAuthPageUri);
        });
    },

    after: function (browser, done) {
        browser.end(done);
    }
}