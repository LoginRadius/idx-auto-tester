/**
 * Case: User Registration
 */
let router = require('../route.js');
let _ = require('underscore');
let elements = require(router.locators);
let config = require(router.config);
let message = require(router.messages);
let uri = new require(router.uri)(config)
let Chance = require('chance');
let chance = new Chance();
let registrationSuccess = false;
let emailId;

module.exports = {
    '@tags': ['registration', 'userregistration'],

    '\n1. User should able to register': function (browser, done) {

        let email = chance.email({
            domain: "mail7.io",
            length: 10
        });
        let password = chance.word({
            length: 8
        });

        browser.url(uri.iefAuthPageUri);
        browser.waitForElementVisible(elements.authPage.login.loginSubmit, 20000);
        browser.click(elements.authPage.login.registerLink);
        browser.pause(5000);
        browser.fillRegistrationForm(email, password);
        browser.click(elements.authPage.register.submit);
        browser.waitForElementVisible(elements.commonLocators.notificationDiv, 10000, false);
        browser.getText(elements.commonLocators.notificationDiv, function (result) {
            browser.assert.equal(result.value, message.registrationSuccess);
            if (result.value === message.registrationSuccess) {
                registrationSuccess = true;
                emailId = email;
            }
        });
        browser.end(done);
    },


    '\n2. User should able to verify the email': function (browser, done) {
        if (registrationSuccess) {
            browser.getVerificationToken(emailId, function (res) {
                browser.url(uri.iefAuthPageUri + "?vtype=emailverification&vtoken=" + res.vtoken);
                browser.waitForElementVisible(elements.commonLocators.notificationDiv, 30000, false);
                browser.getText(elements.commonLocators.notificationDiv, function (text) {
                    this.assert.equal(text.value, message.emailVerifySuccess);
                });
            });
        }
        browser.end(done);
    },

    '\n3. User should unable to register with already registered emailId': function (browser, done) {

        if (registrationSuccess) {
            let password = chance.word({
                length: 8
            });
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginSubmit, 20000, false);
            browser.click(elements.authPage.login.registerLink);
            browser.pause(5000);
            browser.fillRegistrationForm(emailId, password);
            browser.click(elements.authPage.register.submit);
            browser.waitForElementVisible(elements.commonLocators.notificationDiv, 10000, false);
            browser.getText(elements.commonLocators.notificationDiv, function (result) {
                browser.assert.equal(result.value, message.registeredEmailMessage);
            });
            browser.end(done);
        }
    },

    '\n4. User should unable to register with invalid emailId': function (browser, done) {

        let emailId = chance.word({
            length: 10
        });
        let password = chance.word({
            length: 8
        });

        browser.url(uri.iefAuthPageUri);
        browser.waitForElementVisible(elements.authPage.login.loginSubmit, 20000, false);
        browser.click(elements.authPage.login.registerLink);
        browser.pause(5000);
        browser.fillRegistrationForm(emailId, password);
        browser.click(elements.authPage.register.submit);
        browser.waitForElementVisible(elements.authPage.register.emailValidation, 10000, false);
        browser.expect.element(elements.authPage.register.emailValidation).text.to.contain(message.invalidemailIdValidationMsg);
        browser.end(done);
    },

    '\n5. User should unable to register with blank data': function (browser, done) {
        browser.url(uri.iefAuthPageUri);
        browser.waitForElementVisible(elements.authPage.login.loginSubmit, 20000);
        browser.click(elements.authPage.login.registerLink);
        browser.pause(5000);
        browser.click(elements.authPage.register.submit);
        browser.waitForElementVisible(elements.authPage.register.emailValidation, 10000);
        browser.expect.element(elements.authPage.register.emailValidation).text.to.contain(message.invalidemailIdValidationMsg);
        browser.expect.element(elements.authPage.register.passwordValidation).text.to.contain(message.passwordValationMsg);
        browser.expect.element(elements.authPage.register.confirmpasswordValidation).text.to.contain(message.confirmpasswordValidationMsg);
        browser.end(done);
    }
}