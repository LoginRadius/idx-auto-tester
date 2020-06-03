/**
 * Get Received Email on given emailId
 */

let router = require('../../route.js');
let mail7 = require(router.mail7);

exports.command = function (email, cb) {
    var self = this;

    this.perform(function (self, done) {
        setTimeout(() => {
            mail7(email, function (data) {
                cb(data);
                done();
            })
        }, 10000); // wait for email to be receive
    });

    return this;
};


