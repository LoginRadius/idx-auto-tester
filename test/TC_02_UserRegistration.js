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


    '\n1. Verify that user should navigate to register page': function (browser, done) {

        browser.url(uri.iefAuthPageUri);
        browser.waitForElementVisible(elements.authPage.login.loginSubmit, 20000, false);
        browser.click(elements.authPage.login.registerLink);
        browser.pause(5000);
        browser.waitForElementVisible(elements.authPage.register.submit, 10000, false);
        browser.end(done);
    },


    '\n2. Verify that user should receive error message on minimum password length': function (browser, done) {

        let emailId = chance.word({
            length: 10
        });
        let password = chance.word({
            length: 4
        });

        browser.url(uri.iefAuthPageUri);
        browser.waitForElementVisible(elements.authPage.login.loginSubmit, 20000, false);
        browser.click(elements.authPage.login.registerLink);
        browser.pause(5000);
        browser.fillRegistrationForm(emailId, password);
        browser.click(elements.authPage.register.submit);
        browser.waitForElementVisible(elements.authPage.register.passwordValidation, 10000, false);
        browser.expect.element(elements.authPage.register.passwordValidation).text.to.contain(message.passwordlength);
        browser.end(done);
    },


    '\n3. Verify that user should unable to register with mismatch password': function (browser, done) {

        let emailId = chance.word({
            length: 10
        });
        let password = chance.word({
            length: 8
        });
        let confirmPassword = chance.word({
            length: 8
        });

        browser.url(uri.iefAuthPageUri);
        browser.waitForElementVisible(elements.authPage.login.loginSubmit, 20000, false);
        browser.click(elements.authPage.login.registerLink);
        browser.pause(5000);
        browser.fillRegistrationForm(emailId, password);
        browser.setValue(elements.authPage.register.confirmPassword, confirmPassword);
        browser.click(elements.authPage.register.submit);
        browser.waitForElementVisible(elements.authPage.register.confirmpasswordValidation, 10000, false);
        browser.expect.element(elements.authPage.register.confirmpasswordValidation).text.to.contain(message.confirmPasswordMismatch);
        browser.end(done);
    },

    '\n4. Verify that User should able to register': function (browser, done) {

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


    '\n5. Verify that user should able to verify the email': function (browser, done) {
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

    '\n6. Verify that user should unable to register with already registered emailId': function (browser, done) {

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

    '\n7. Verify that user should unable to register with invalid emailId': function (browser, done) {

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
        browser.expect.element(elements.authPage.register.emailValidation).text.to.contain(message.invalidemailIdValidationMessage);
        browser.end(done);
    },

    '\n8. Verify that user should unable to register with blank data': function (browser, done) {
        browser.url(uri.iefAuthPageUri);
        browser.waitForElementVisible(elements.authPage.login.loginSubmit, 20000);
        browser.click(elements.authPage.login.registerLink);
        browser.pause(5000);
        browser.click(elements.authPage.register.submit);
        browser.waitForElementVisible(elements.authPage.register.emailValidation, 10000);
        browser.expect.element(elements.authPage.register.emailValidation).text.to.contain(message.invalidemailIdValidationMessage);
        browser.expect.element(elements.authPage.register.passwordValidation).text.to.contain(message.passwordValationMessage);
        browser.expect.element(elements.authPage.register.confirmpasswordValidation).text.to.contain(message.confirmpasswordValidationMessage);
        browser.end(done);
    }
}