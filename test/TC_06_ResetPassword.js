/**
 * Case: Reset Password
 */

const router = require("../route.js");
const _ = require("underscore");
const elements = require(router.locators);
const config = require(router.config);
const message = require(router.messages);
const showInReport = require(router.reportMessages);
const samplePayload = require(router.samplePayload);
const uri = new require(router.uri)(config);
const Chance = require("chance");
const chance = new Chance();

module.exports = {
  "@tags": ["resetpassword", "forgotpassword"],

  "1. User should be able to reset password": function (browser, done) {
    let body = samplePayload();
    var Reset_Password = chance.word({
      length: 8,
    });

    browser.createUser(body, function (response) {
      browser.url(uri.iefAuthPageUri);
      browser.pause(5000);
      browser.waitForElementVisible(elements.authPage.login.loginDiv, 20000, showInReport.loginPage);
      browser.waitForElementVisible(elements.authPage.resetPassword.resetButtonLocator, 10000, showInReport.forgotPasswordForm);
      browser.fillForgotPasswordForm(response.Email[0].Value);
      browser.pause(5000);
      browser.getText(elements.commonLocators.notificationDiv, function (result) {
        if (result.value === message.forgotPassword) {
          browser.getVerificationToken(response.Email[0].Value, function (response) {
            browser.url(uri.iefAuthPageUri + "?vtype=reset&vtoken=" + response.vtoken);
            browser.fillResetPasswordForm(Reset_Password);
            browser.waitForElementVisible(elements.commonLocators.notificationDiv, 20000, false, showInReport.notificationMessage);
            browser.getText(elements.commonLocators.notificationDiv, function (result) {
              browser.assert.equal(result.value, message.resetPasswordSuccess, showInReport.resetPasswordSuccess);
            });
          });
        }
        browser.userLogin(response.Email[0].Value, Reset_Password);
        browser.waitForElementVisible(elements.profilePage.profileImage, 20000, showInReport.loginSuccess);
        browser.assert.urlEquals(uri.iefProfilePageUri, showInReport.profileUrl);
        browser.logout();
      });
    });
    browser.end(done);
  },
};
