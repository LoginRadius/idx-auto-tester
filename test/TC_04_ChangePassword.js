/**
 * Case: Change Password
 */
let router = require('../route.js');
let _ = require('underscore');
let elements = require(router.locators);
let config = require(router.config);
let message = require(router.messages);
let showInReport = require(router.reportMessages);
let samplePayload = require(router.samplePayload);
let uri = new require(router.uri)(config);
let Chance = require('chance');
let chance = new Chance();

module.exports = {
    '@tags': ['changepassword'],

    '1. Verify that user should able to change the password successfully.': function (browser, done) {

        let body = samplePayload();
        let newPassword = chance.word({ length: 10 });

        browser.createUser(body, function (response) {
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.loginPage);
            browser.maximizeWindow();
            browser.userLogin(response.Email[0].Value, body.Password);
            browser.waitForElementVisible(elements.profilePage.profileImage, 20000, showInReport.loginSuccess);
            browser.assert.urlEquals(uri.iefProfilePageUri, showInReport.profileUrl);
            browser.fillChangePasswordForm(body.Password, newPassword);
            browser.pause(1000);
            browser.click(elements.profilePage.changePassword.changePasswordButtonLocator);
            browser.pause(7000);
            browser.getText(elements.commonLocators.notificationDiv, function (result) {
                browser.assert.equal(result.value, message.changePasswordSuccess, showInReport.passwordChangeSuccess);
            })
        });
        browser.end(done);
    },

    '2. Verify the proper error message should show when user put invalid current password': function (browser, done) {

        let body = samplePayload();
        let newPassword = chance.word({ length: 10 });
        let pass = chance.word({ length: 10 });

        browser.createUser(body, function (response) {
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.loginPage);
            browser.maximizeWindow();
            browser.userLogin(response.Email[0].Value, body.Password);
            browser.waitForElementVisible(elements.profilePage.profileImage, 20000, showInReport.loginSuccess);
            browser.assert.urlEquals(uri.iefProfilePageUri, showInReport.profileUrl);
            browser.fillChangePasswordForm(pass, newPassword);
            browser.pause(2000);
            browser.click(elements.profilePage.changePassword.changePasswordButtonLocator);
            browser.pause(7000);
            browser.getText(elements.commonLocators.notificationDiv, function (result) {
                browser.assert.equal(result.value, message.invalidOldPassword, showInReport.changePasswordFailCurrentPassword);
            })
        });
        browser.end(done);
    }, 

    '3. Verify that user should unable to change password with blank data': function (browser, done) {
        let body = samplePayload();

        browser.createUser(body, function (response) {
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.loginPage);
            browser.maximizeWindow();
            browser.userLogin(response.Email[0].Value, body.Password);
            browser.waitForElementVisible(elements.profilePage.profileImage, 20000, showInReport.loginSuccess);
            browser.assert.urlEquals(uri.iefProfilePageUri, showInReport.profileUrl);
            browser.fillChangePasswordForm('','');
            browser.pause(1000);
            browser.click(elements.profilePage.changePassword.changePasswordButtonLocator);
            browser.pause(7000);
            browser.waitForElementVisible(elements.profilePage.changePassword.oldPasswordValidationLocator, 10000, showInReport.changePasswordFailInvalidPassword);
            browser.expect.element(elements.profilePage.changePassword.oldPasswordValidationLocator).text.to.contain(message.blankOldPasswordMessage);
            browser.expect.element(elements.profilePage.changePassword.newPasswordValidationLocator).text.to.contain(message.passwordValationMessage);
            browser.expect.element(elements.profilePage.changePassword.confirmPasswordValidationLocator).text.to.contain(message.confirmpasswordValidationMessage);
            browser.end(done);
        });
    },
    

    '4. Verify that user should unable to change password with mismatch Password and Confirm Password data': function (browser, done) {
        let body = samplePayload();
        let newPassword = chance.word({ length: 10 });
       
        browser.createUser(body, function (response) {
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.loginPage);
            browser.maximizeWindow();
            browser.userLogin(response.Email[0].Value, body.Password);
            browser.waitForElementVisible(elements.profilePage.profileImage, 20000, showInReport.loginSuccess);
            browser.assert.urlEquals(uri.iefProfilePageUri, showInReport.profileUrl);
            browser.fillChangePasswordForm(body.Password, newPassword);
            browser.setValue(elements.profilePage.changePassword.confirmPasswordLocator, newPassword);
            browser.pause(1000);
            browser.click(elements.profilePage.changePassword.changePasswordButtonLocator);
            browser.pause(7000);
            browser.waitForElementVisible(elements.profilePage.changePassword.confirmPasswordValidationLocator, 10000, showInReport.passwordMismatch);
            browser.expect.element(elements.profilePage.changePassword.confirmPasswordValidationLocator).text.to.contain(message.confirmPasswordMismatch);
            browser.end(done);
        });    
    }


}

