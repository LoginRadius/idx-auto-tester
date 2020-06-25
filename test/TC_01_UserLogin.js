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


    '\n1. Verify that user should able to login': function (browser, done) {

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

    '\n2. Verify that user should unable to login when provide invalid email and password combination': function (browser, done) {

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

    '\n3. Verift that proper message should show when pass valid email and Invalid Password': function (browser, done) {

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

    after: function (browser, done) {
        browser.end(done);
    }
}

