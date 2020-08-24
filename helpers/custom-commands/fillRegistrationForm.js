/**
 * Fill User Registration Form with given data
 */

let router = require('../../route.js');
let elements = require(router.locators);
let showInReport = require(router.reportMessages);
let Chance = require('chance');
let chance = new Chance();

exports.command = function (emailId, password) {
    gender = chance.pick(['M', 'F']),
        this.waitForElementVisible(elements.authPage.register.submit, 10000);

    this.elements("css selector", "#registration-container div input", function (fields_array) {
        for (var x = 0; x < fields_array.value.length; x++) {
            //Fetch the Id from each input tag from the Raas form
            this.elementIdAttribute(fields_array.value[x].ELEMENT, "id", function (links) {
                var inputId = '#' + links.value;
                if (inputId.indexOf('emailid') >= 0)
                    this.setValue(inputId, emailId);
                else if (inputId.indexOf('firstname') >= 0)
                    this.setValue(inputId, chance.first());
                else if (inputId.indexOf('lastname') >= 0)
                    this.setValue(inputId, chance.last());
                else if (inputId.indexOf('password') >= 0)
                    this.setValue(inputId, password);
                else if (inputId.indexOf('confirmpassword') >= 0)
                    this.setValue(inputId, password);
                else if (inputId.indexOf('phonenumber') >= 0)
                    this.setValue(inputId, chance.phone({
                        formatted: false,
                        length: 10
                    }));
                else if (inputId.indexOf('emailsubscritpion') >= 0)
                    this.click(inputId);
                else if (inputId.indexOf('birthdate') >= 0)
                    this.setValue(inputId, '01-01-1990');
                else if (inputId.indexOf('cellphone') >= 0)
                    this.setValue(inputId, chance.phone({
                        mobile: true,
                        formatted: false,
                        length: 10
                    }));
                else if (inputId.indexOf('PostalCode') >= 0)
                    this.setValue(inputId, chance.postal());
                else if (inputId.indexOf('phoneid') >= 0)
                    this.setValue(inputId, chance.phone({
                        mobile: true,
                        formatted: false
                    }));
                else
                    this.setValue(inputId, chance.string({
                        pool: "aiopwernm",
                        length: 6
                    }));
            });
        }

    });
    // Select gender in dropdwon if is enabled in form
    this.elements("css selector", "#registration-container div", function (fields_array) {
        for (var x = 0; x < fields_array.value.length; x++) {
            //Fetch the Id from each input tag from the Raas form

            this.elementIdAttribute(fields_array.value[x].ELEMENT, "id", function (links) {
                if (links.value.indexOf('gender') >= 0) {
                    this.click(elements.authPage.register.gender);
                    this.click('option[value=' + '"' + gender + '"]');
                }
            })
        }
    });
    this.waitForElementVisible(elements.authPage.register.submit, 10000, showInReport.registerbutton);
    return this;
};