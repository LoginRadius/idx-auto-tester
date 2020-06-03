/**
 * Case: Change Password
 */
let router = require('../route.js');
let _ = require('underscore');
let elements = require(router.locators);
let config = require(router.config);
let message = require(router.messages);
let samplePayload = require(router.samplePayload);
let inputsFilePath = router.inputs;
let uri = new require(router.uri)(config)
let Chance = require('chance');
let chance = new Chance();

module.exports = {
    '@tags': ['changepassword'],

    '\n1. User should be able to change the password successfully.': function (browser, done) {

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
            browser.pause(1000);
            browser.click(elements.profilePage.changePassword.changePasswordButtonLocator);
            browser.pause(7000);
            browser.getText(elements.commonLocators.notificationDiv, function (result) {
                this.assert.equal(result.value, message.changePasswordSuccess)
            })
        });
        browser.end(done);
    },

    '\n2. Verify the proper error message shold show when user put invalid current password': function (browser, done) {

        let body = samplePayload();
        let newPassword = chance.word({ length: 10 });
        let pass = chance.word({ length: 10 });

        browser.createUser(body, function (response) {
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000);
            browser.maximizeWindow();
            browser.userLogin(response.Email[0].Value, body.Password);
            browser.waitForElementVisible(elements.profilePage.profileImage, 20000, "User should be able to login, profile-img should locate");
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
    }


}

