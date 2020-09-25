/**
 * Fill Reset Password Form with given data
 */
let router = require('../../route.js');
let elements = require(router.locators);
let showInReport = require(router.reportMessages);


exports.command = function (resetPassword) {

    /**
     * @param {string} resetPassword - new password as string
     */

    this.waitForElementVisible(elements.authPage.resetPassword.newPasswordLocator, 30000, false, showInReport.resetPasswordForm);
    this.setValue(elements.authPage.resetPassword.newPasswordLocator, resetPassword);
    this.setValue(elements.authPage.resetPassword.confirmPasswordLocator, resetPassword);
    this.click(elements.authPage.resetPassword.resetPasswordButtonLocator);

    return this;
};