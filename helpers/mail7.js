let router = require('../route.js');
let config = require(router.config);
var request = require('request'),
    defaultHost = 'https://api.mail7.io',
    text_body;

module.exports = function (e, cb) {

    /**
     * @param {String} key: mail7 key
     *
     * @param {String} key: mail7 secret
     *
     * @param {String} email: email(zyx@mail7.io or zyx), you want get data from...
     *
     * @param {function} callback: a callback function to handle response
     */

    let domain = e.substr(e.indexOf('@'))
    e = e.indexOf('@') > -1 ? e.replace(domain, '') : e;

    request(defaultHost + '/inbox?apikey=' + config.mail7ApiKey + '&apisecret=' + config.mail7ApiSecret + '&to=' + e + "&domain=" + domain.replace('@', ''), function (err, res) {

        var output = {};

        if (!err) {

            var body = JSON.parse(res.body);

            var subjects = [];

            if (body.status === 'success') {

                if (body.data.length > 0) {

                    for (var i in body.data) {
                        subjects.push(body.data[i].mail_source.subject);
                    }

                    var html = body.data[0].mail_source.html;

                    output.status = 'success';
                    output.subjects = subjects; //array of all subjects
                    output.state = 0;
                    output.text = html.replace(/<\/?[^>]+(>|$)/g, " "); // simple text body
                    text_body = output.text;

                    /**
                     * Extract token from mail body
                     *
                     * returned tokens: verification token, reset token, oneclicksign, delete token etc..
                     */

                    if (html.indexOf("vtoken=") > -1) {

                        var indexValue = html.indexOf("vtoken=");
                        var remainingText = html.substr(indexValue + 7, 100);
                        //find gap in string
                        //var gap = remainingText.indexOf(' ');
                        var vtoken = remainingText.substr(0, 32);
                        var emailOTP = remainingText.substr(0, 6);

                        if (typeof vtoken !== 'undefined' && vtoken) {
                            output.vtoken = vtoken;
                            output.emailOTP = emailOTP;
                            if (vtoken.indexOf(' ') > -1 || vtoken.indexOf('<br/>') > -1)
                                output.vtoken = null;
                            else
                                output.emailOTP = null;
                        } else {
                            output.status = 'success';
                            output.state = 0;
                            output.vtoken = "Unable to locate vtoken in recent mail body...";
                        }
                    }
                } else {
                    output.status = 'error';
                    output.state = -1;
                    output.message = "mail_source is not found for this username...";
                    output.body = res.body;
                }
            } else {
                output.status = 'error';
                output.state = -1;
                output.message = body.message;
            }

        } else {
            output.status = 'error';
            output.state = -1;
            output.body = err;
        }
        cb(output)
    })

};