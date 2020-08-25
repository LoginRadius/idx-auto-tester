/**
 * Fill Change Password Form with given data
 */

let router = require('../../route.js');
let elements = require(router.locators);
let showInReport = require(router.reportMessages);

exports.command = function (oldPassword, newPassword) {
    
    /**
     * @param {string} oldPassword - current password as string
     * @param {string} newPassword - new password as string
     */

    this.waitForElementVisible(elements.profilePage.accountmenu, 10000, showInReport.accountMenu);
    this.pause(1000);
    this.click(elements.profilePage.accountmenu);
    this.pause(2000);
    this.click(elements.profilePage.changePassword.changePasswordLinkLocator);
    this.pause(5000); // wait to expand the input fields
    this.waitForElementVisible(elements.profilePage.changePassword.changePasswordDivLocator, 10000, false, showInReport.changePasswordForm);
    this.pause(1000);
    this.setValue(elements.profilePage.changePassword.oldPasswordLocator, oldPassword);
    this.pause(1000);
    this.setValue(elements.profilePage.changePassword.newPasswordLocator, newPassword);
    this.setValue(elements.profilePage.changePassword.confirmPasswordLocator, newPassword);

    return this;
};