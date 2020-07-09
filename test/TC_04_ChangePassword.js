/**
 * Case: Change Password
 */
let router = require('../route.js');
let _ = require('underscore');
let elements = require(router.locators);
let config = require(router.config);
let message = require(router.messages);
let samplePayload = require(router.samplePayload);
let uri = new require(router.uri)(config);
let Chance = require('chance');
let chance = new Chance();

module.exports = {
    '@tags': ['changepassword'],

    '\n1. Verify that user should able to change the password successfully.': function (browser, done) {

        let body = samplePayload();
        let newPassword = chance.word({ length: 10 });

        browser.createUser(body, function (response) {
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000);
            browser.maximizeWindow();
            browser.userLogin(response.Email[0].Value, body.Password);
            browser.waitForElementVisible(elements.profilePage.profileImage, 20000, "User should able to login, profile-img should locate");
            browser.assert.urlEquals(uri.iefProfilePageUri);
            browser.fillChangePasswordForm(body.Password, newPassword);
            browser.pause(1000);
            browser.click(elements.profilePage.changePassword.changePasswordButtonLocator);
            browser.pause(7000);
            browser.getText(elements.commonLocators.notificationDiv, function (result) {
                this.assert.equal(result.value, message.changePasswordSuccess)
            })
        });
        browser.end(done);
    },

    '\n2. Verify the proper error message should show when user put invalid current password': function (browser, done) {

        let body = samplePayload();
        let newPassword = chance.word({ length: 10 });
        let pass = chance.word({ length: 10 });

        browser.createUser(body, function (response) {
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000);
            browser.maximizeWindow();
            browser.userLogin(response.Email[0].Value, body.Password);
            browser.waitForElementVisible(elements.profilePage.profileImage, 20000, "User should able to login, profile-img should locate");
            browser.assert.urlEquals(uri.iefProfilePageUri);
            browser.fillChangePasswordForm(pass, newPassword);
            browser.pause(2000);
            browser.click(elements.profilePage.changePassword.changePasswordButtonLocator);
            browser.pause(7000);
            browser.getText(elements.commonLocators.notificationDiv, function (result) {
                this.assert.equal(result.value, message.invalidOldPassword);
            })
        });
        browser.end(done);
    }, 

    '\n3. Verify that user should unable to change password with blank data': function (browser, done) {
        let body = samplePayload();

        browser.createUser(body, function (response) {
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000);
            browser.maximizeWindow();
            browser.userLogin(response.Email[0].Value, body.Password);
            browser.waitForElementVisible(elements.profilePage.profileImage, 20000, "User should be able to login, profile-img should locate");
            browser.assert.urlEquals(uri.iefProfilePageUri);
            browser.fillChangePasswordForm('','');
            browser.pause(1000);
            browser.click(elements.profilePage.changePassword.changePasswordButtonLocator);
            browser.pause(7000);
            browser.waitForElementVisible(elements.profilePage.changePassword.oldPasswordValidationLocator, 10000);
            browser.expect.element(elements.profilePage.changePassword.oldPasswordValidationLocator).text.to.contain(message.blankOldPasswordMessage);
            browser.expect.element(elements.profilePage.changePassword.newPasswordValidationLocator).text.to.contain(message.passwordValationMessage);
            browser.expect.element(elements.profilePage.changePassword.confirmPasswordValidationLocator).text.to.contain(message.confirmpasswordValidationMessage);
            browser.end(done);
        });
    },
    

    '\n4. Verify that user should unable to change password with mismatch Password and Confirm Password data': function (browser, done) {
        let body = samplePayload();
        let newPassword = chance.word({ length: 10 });
       
        browser.createUser(body, function (response) {
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000);
            browser.maximizeWindow();
            browser.userLogin(response.Email[0].Value, body.Password);
            browser.waitForElementVisible(elements.profilePage.profileImage, 20000, "User should be able to login, profile-img should locate");
            browser.assert.urlEquals(uri.iefProfilePageUri);
            browser.fillChangePasswordForm(body.Password, newPassword);
            browser.setValue(elements.profilePage.changePassword.confirmPasswordLocator, newPassword);
            browser.pause(1000);
            browser.click(elements.profilePage.changePassword.changePasswordButtonLocator);
            browser.pause(7000);
            browser.waitForElementVisible(elements.profilePage.changePassword.confirmPasswordValidationLocator, 10000);
            browser.expect.element(elements.profilePage.changePassword.confirmPasswordValidationLocator).text.to.contain(message.confirmPasswordMismatch);
            browser.end(done);
        });    
    }


}

