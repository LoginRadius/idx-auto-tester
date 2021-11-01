/**
 * Case: Forgot Password
 */

const router = require("../route.js");
const _ = require("underscore");
const elements = require(router.locators);
const config = require(router.config);
const message = require(router.messages);
const showInReport = require(router.reportMessages);
const samplePhonePayload = require(router.samplePhonePayload);
const uri = new require(router.uri)(config);
const Chance = require("chance");
const chance = new Chance();

module.exports = {
  "@tags": ["forgotpassword"],

  "1. User is able to perform forgot password journey with valid registered phone number": function (browser, done) {
    let body = samplePhonePayload();

    browser.createUser(body, function (response) {
      browser.url(uri.iefAuthPageUri);
      browser.pause(2000);
      browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.loginPage);
      browser.waitForElementVisible(elements.authPage.resetPassword.resetButtonLocator, 10000, showInReport.forgotPasswordForm);
      browser.fillForgotPasswordForm(response.PhoneNumbers[0].PhoneNumber);
      browser.pause(5000);
      browser.getText(elements.commonLocators.notificationDiv, function (result) {
        browser.assert.equal(result.value, message.phoneForgotPassword, showInReport.phoneForgotPasswordMessageSent);
      });
    });
    browser.end(done);
  },

  "2. User is not able to perform forgot password journey with not registered phone number": function (browser, done) {
    let body = samplePhonePayload();
    let phone = chance.string({ length: "11", pool: "1234567890" });

    browser.createUser(body, function (response) {
      browser.url(uri.iefAuthPageUri);
      browser.pause(2000);
      browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.loginPage);
      browser.waitForElementVisible(elements.authPage.resetPassword.resetButtonLocator, 10000, showInReport.forgotPasswordForm);
      browser.fillForgotPasswordForm(phone);
      browser.pause(5000);
      browser.getText(elements.commonLocators.notificationDiv, function (result) {
        browser.assert.equal(result.value, message.userNotExist, showInReport.userNotExist);
      });
    });
    browser.end(done);
  },

  "3. User is not able to perform forgot password journey with empty phone number": function (browser, done) {
    let body = samplePhonePayload();

    browser.createUser(body, function (response) {
      browser.url(uri.iefAuthPageUri);
      browser.pause(2000);
      browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.loginPage);
      browser.waitForElementVisible(elements.authPage.resetPassword.resetButtonLocator, 10000, showInReport.forgotPasswordForm);
      browser.fillForgotPasswordForm("");
      browser.pause(5000);
      browser.expect.element(elements.authPage.resetPassword.emailPhoneValidation).text.to.contain(message.emailIdPhoneValidationMessage);
    });
    browser.end(done);
  },
};
