/**
 * Fill Profile Editor Form with given data
 */

let router = require('../../route.js');
let elements = require(router.locators);


exports.command = function (firstname, lastname) {

    this.waitForElementVisible(elements.profilePage.profileImage, 10000, "Login Success, Profile Page visible.");
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