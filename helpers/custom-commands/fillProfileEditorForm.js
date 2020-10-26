/**
 * Fill Profile Editor Form with given data
 */

let router = require('../../route.js');
let elements = require(router.locators);
let showInReport = require(router.reportMessages);


exports.command = function (firstname, lastname) {

  
    /**
     * @param {string} firstname - FirstName that need to update for this user
     * @param {string} lastname - LastName that need to update for this user
     */

    this.waitForElementVisible(elements.profilePage.profileImage, 10000, showInReport.loginSuccess);
    this.pause(3000);
    this.click(elements.profilePage.menu);
    this.click(elements.profilePage.editProfileLocator);
    this.pause(2000);
    this.clearValue(elements.profilePage.firstNameLocator);
    this.setValue(elements.profilePage.firstNameLocator, firstname);
    this.clearValue(elements.profilePage.lastNameLocator);
    this.setValue(elements.profilePage.lastNameLocator, lastname);
    
    return this;
};