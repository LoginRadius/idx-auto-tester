/**
 * Cases: Email Verification
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

module.exports = {
    '@tags': ['emailverification'],


    '1. Verify that proper error message should show when pass invalid verification token': function (browser, done) {

        browser.url(uri.iefAuthPageUri + "?vtype=emailverification&vtoken=" + chance.hash());
        browser.waitForElementVisible(elements.commonLocators.notificationDiv, 30000, false, showInReport.notificationMessage);
        browser.pause(1000);
        browser.getText(elements.commonLocators.notificationDiv, function (text) {
            browser.assert.equal(text.value, message.invalidVerificationLink, showInReport.invalidVerificationLink);
        });
    },

    '2. Verify that proper error message should show when pass not pass email verification token': function (browser, done) {

        browser.url(uri.iefAuthPageUri + "?vtype=emailverification&vtoken=");
        browser.waitForElementVisible(elements.commonLocators.notificationDiv, 30000, false, showInReport.notificationMessage);
        browser.pause(1000);
        browser.getText(elements.commonLocators.notificationDiv, function (text) {
            browser.assert.equal(text.value, message.verificationTokenMissing, showInReport.invalidVerificationLink);
        });
    },

    after: function (browser, done) {
        browser.end(done);
    }
}

