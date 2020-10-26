/**
 * Get Received Email on given emailId
 */

let router = require('../../route.js');
let mail7 = require(router.mail7);

module.exports = {

    command: async function (email, cb) {

        /**
         * @param {string} email - Email of account for which vtoken need to generate.
         * @param {string} cb - callback function to handle response
         */

        setTimeout(() => {
            mail7(email, function (data) {
                console.log("its mails data: ", data);
                cb(data);
                //done();
            })
        }, 10000);
        // wait for email to be receive
    }
}

