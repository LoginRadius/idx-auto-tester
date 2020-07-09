/**
 * Case: Profile Editor
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
let updateProfileSuccess = false;
let emailId;
let password;


module.exports = {
    '@tags': ['profileeditor'],

    '\n1. Verify that user should able to update the profile successfully.': function (browser, done) {

        let body = samplePayload();
        let firstname = chance.word({
            length: 10
        });
        let lastname = chance.word({
            length: 10
        });

        browser.createUser(body, function (response) {
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000);
            browser.maximizeWindow();
            browser.userLogin(response.Email[0].Value, body.Password);
            browser.waitForElementVisible(elements.profilePage.profileImage, 20000, "User should able to login, profile-img should locate");
            browser.assert.urlEquals(uri.iefProfilePageUri);
            browser.fillProfileEditorForm(firstname, lastname);
            browser.pause(1000);
            browser.click(elements.profilePage.updateProfileButtonLocator);
            browser.pause(3000);
            browser.getText(elements.commonLocators.notificationDiv, function (result) {
                browser.assert.equal(result.value, message.updateProfileMessage);
                if (result.value === message.updateProfileMessage) {
                    updateProfileSuccess = true;
                    emailId = response.Email[0].Value;
                    password = body.Password;
                }
                browser.logout();
            });
        });
        browser.end(done);
    },

    '\n2. User should able to update the profile with blank last name successfully.': function (browser, done) {

        if (updateProfileSuccess) {
            browser.url(uri.iefAuthPageUri);
            browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000);
            browser.maximizeWindow();
            browser.userLogin(emailId, password);
            browser.waitForElementVisible(elements.profilePage.profileImage, 20000, "User should be able to login, profile-img should locate");
            browser.assert.urlEquals(uri.iefProfilePageUri);
            browser.click(elements.profilePage.menu);
            browser.click(elements.profilePage.editProfileLocator);
            browser.pause(2000);
            browser.clearValue(elements.profilePage.lastNameLocator);
            browser.pause(2000);
            browser.click(elements.profilePage.updateProfileButtonLocator);
            browser.pause(3000);
            browser.getText(elements.commonLocators.notificationDiv, function (result) {
                browser.assert.equal(result.value, message.updateProfileMessage);
                browser.click(elements.profilePage.closeProfileEditorLocator);
                browser.refresh();
                browser.pause(3000);
                browser.elements('css selector', elements.profilePage.lastNameProfileLocator, function (fieldsArray) {
                    browser.assert.equal(fieldsArray.value.length, 2, 'Last Name field should not display');
                  });
                browser.logout();
            })
        }
        browser.end(done);
    }
}