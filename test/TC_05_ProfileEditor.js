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


module.exports = {
    '@tags': ['profileeditor'],

    '\n1. User should able to update the profile successfully.': function (browser, done) {

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
            browser.waitForElementVisible(elements.profilePage.profileImage, 20000, "User should be able to login, profile-img should locate");
            browser.assert.urlEquals(uri.iefProfilePageUri);
            browser.fillProfileEditorForm(firstname, lastname);
            browser.pause(1000);
            browser.click(elements.profilePage.updateProfileButtonLocator);
            browser.pause(3000);
            browser.getText(elements.commonLocators.notificationDiv, function (result) {
                this.assert.equal(result.value, message.updateProfileMessage);
                browser.logout();
            })
        });
        browser.end(done);
    }
}