/**
 * Fill Forgot Password Form with given data
 */
let router = require('../../route.js');
let elements = require(router.locators);


exports.command = function (email) {

    /**
     * @param {string} email - the email of account for which password need to reset
     */

    this.waitForElementVisible(elements.authPage.resetPassword.resetButtonLocator, 10000);
    this.click(elements.authPage.resetPassword.resetButtonLocator);
    this.pause(5000);
    this.waitForElementVisible(elements.authPage.resetPassword.passwordEmailLocator, 10000, "Forgot Password form should show");
    this.setValue(elements.authPage.resetPassword.passwordEmailLocator, email);
    this.click(elements.authPage.resetPassword.passwordButtonLocator);
    
    return this;
};