/**
 * Case: User Registration
 */
let router = require('../route.js');
let _ = require('underscore');
let elements = require(router.locators);
let config = require(router.config);
let message = require(router.messages);
let showInReport = require(router.reportMessages);
let uri = new require(router.uri)(config)
let Chance = require('chance');
let chance = new Chance();
let registrationSuccess = false;
let emailId;
var EmailFlow;

module.exports = {
    '@tags': ['registration', 'userregistration'],

    before: function (browser, done) {
        browser.appConfig(function (config) {
            EmailFlow = config.EmailVerificationFlow;
            done();
        })
    },

    '\n1. Verify that user should navigate to register page': function (browser, done) {

        browser.url(uri.iefAuthPageUri);
        browser.waitForElementVisible(elements.authPage.login.loginSubmit, 20000, false, showInReport.loginPage);
        browser.click(elements.authPage.login.registerLink);
        browser.pause(5000);
        browser.waitForElementVisible(elements.authPage.register.submit, 10000, false, showInReport.registerPage);
    },


    '2. Verify that user should receive error message on minimum password length': function (browser, done) {

        let emailId = chance.word({
            length: 10
        });
        let password = chance.word({
            length: 4
        });

        browser.url(uri.iefAuthPageUri);
        browser.waitForElementVisible(elements.authPage.login.loginSubmit, 20000, false, showInReport.loginPage);
        browser.click(elements.authPage.login.registerLink);
        browser.pause(5000);
        browser.fillRegistrationForm(emailId, password);
        browser.click(elements.authPage.register.submit);
        browser.waitForElementVisible(elements.authPage.register.passwordValidation, 10000, false, showInReport.invalidPassword);
        browser.expect.element(elements.authPage.register.passwordValidation).text.to.contain(message.passwordlength);
    },


    '3. Verify that user should unable to register with mismatch password': function (browser, done) {

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
        browser.waitForElementVisible(elements.authPage.login.loginSubmit, 20000, false, showInReport.loginPage);
        browser.click(elements.authPage.login.registerLink);
        browser.pause(5000);
        browser.fillRegistrationForm(emailId, password);
        browser.setValue(elements.authPage.register.confirmPassword, confirmPassword);
        browser.click(elements.authPage.register.submit);
        browser.waitForElementVisible(elements.authPage.register.confirmpasswordValidation, 10000, false, showInReport.passwordMismatch);
        browser.expect.element(elements.authPage.register.confirmpasswordValidation).text.to.contain(message.confirmPasswordMismatch);
    },

    '4. Verify that User should able to register with different email verification flow': function (browser, done) {

        let email = chance.email({
            domain: "mail7.io",
            length: 10
        });
        let password = chance.word({
            length: 8
        });

        browser.url(uri.iefAuthPageUri);
        browser.waitForElementVisible(elements.authPage.login.loginSubmit, 20000, showInReport.loginPage);
        browser.click(elements.authPage.login.registerLink);
        browser.pause(5000);
        browser.fillRegistrationForm(email, password);
        browser.click(elements.authPage.register.submit);
        if(EmailFlow=="required"){
        browser.waitForElementVisible(elements.commonLocators.notificationDiv, 10000, false, showInReport.notificationMessage);
        browser.getText(elements.commonLocators.notificationDiv, function (result) {
            browser.assert.equal(result.value, message.registrationSuccess, showInReport.registerSuccess);
            if (result.value === message.registrationSuccess) {
                registrationSuccess = true;
                emailId = email;
            }
        });
    }
    else{
        browser.waitForElementVisible(elements.profilePage.profileImage, 20000, showInReport.loginSuccess);
        browser.assert.urlEquals(uri.iefProfilePageUri, showInReport.profileUrl);
        browser.logout();
    }
    },


    '5. Verify that user should able to verify the email if email verification flow is required': function (browser, done) {
        if (registrationSuccess && EmailFlow=="required") {
            browser.getVerificationToken(emailId, function (res) {
                browser.url(uri.iefAuthPageUri + "?vtype=emailverification&vtoken=" + res.vtoken);
                browser.pause(5000);
                browser.waitForElementVisible(elements.commonLocators.notificationDiv, 30000, false), showInReport.notificationMessage;
                browser.getText(elements.commonLocators.notificationDiv, function (text) {
                    browser.assert.equal(text.value, message.emailVerifySuccess, showInReport.verifyEmailSuccess);
                });
            });
        }
        else browser.assert.ok('Email Verification flow is set as Optional or Disabled.');
    },

    '6. Verify that user should unable to register with already registered emailId': function (browser, done) {

        if (registrationSuccess) {
            let password = chance.word({
                length: 8
            });
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginSubmit, 20000, false, showInReport.loginPage);
            browser.click(elements.authPage.login.registerLink);
            browser.pause(5000);
            browser.fillRegistrationForm(emailId, password);
            browser.click(elements.authPage.register.submit);
            browser.waitForElementVisible(elements.commonLocators.notificationDiv, 10000, false, showInReport.notificationMessage);
            browser.getText(elements.commonLocators.notificationDiv, function (result) {
                browser.assert.equal(result.value, message.registeredEmailMessage, showInReport.registerFailonRegisteredEmail);
            });
        }
    },

    '7. Verify that user should unable to register with invalid emailId': function (browser, done) {

        let emailId = chance.word({
            length: 10
        });
        let password = chance.word({
            length: 8
        });

        browser.url(uri.iefAuthPageUri);
        browser.waitForElementVisible(elements.authPage.login.loginSubmit, 20000, false, showInReport.loginPage);
        browser.click(elements.authPage.login.registerLink);
        browser.pause(5000);
        browser.fillRegistrationForm(emailId, password);
        browser.click(elements.authPage.register.submit);
        browser.waitForElementVisible(elements.authPage.register.emailValidation, 10000, false, showInReport.registerFailonInvalidEmail);
        browser.expect.element(elements.authPage.register.emailValidation).text.to.contain(message.invalidemailIdValidationMessage);
    },

    '8. Verify that user should unable to register with blank data': function (browser, done) {
        browser.url(uri.iefAuthPageUri);
        browser.waitForElementVisible(elements.authPage.login.loginSubmit, 20000, showInReport.loginPage);
        browser.click(elements.authPage.login.registerLink);
        browser.pause(5000);
        browser.click(elements.authPage.register.submit);
        browser.waitForElementVisible(elements.authPage.register.emailValidation, 10000, showInReport.registerFailonInvalidEmail);
        browser.expect.element(elements.authPage.register.emailValidation).text.to.contain(message.invalidemailIdValidationMessage);
        browser.expect.element(elements.authPage.register.passwordValidation).text.to.contain(message.passwordValationMessage);
        browser.expect.element(elements.authPage.register.confirmpasswordValidation).text.to.contain(message.confirmpasswordValidationMessage);
    },

    after: function (browser, done) {
        browser.end(done);
    }
}