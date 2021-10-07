const router = require('../route.js');
const config = require(router.config);
const fetch = require('node-fetch');

const { URL } = require('url');

const defaultHost = 'https://api.mail7.io';

/**
 * @param {String} e: email in form of email(zyx@mail7.io or zyx), you want get data from...
 * @param {function} cb: callback function to handle response
 */
module.exports = function (e, cb) {
    let domain = e.substr(e.indexOf('@'));
    e = e.indexOf('@') > -1 ? e.replace(domain, '') : e;

    const fetchUrl = new URL(`${defaultHost}/inbox`);

    fetchUrl.searchParams.set('apikey', config.mail7ApiKey);
    fetchUrl.searchParams.set('apisecret', config.mail7ApiSecret);
    fetchUrl.searchParams.set('to', e);
    fetchUrl.searchParams.set('domain', domain.replace('@', ''));

    let output = {};
    fetch(fetchUrl.href)
        .then((res) => res.json())
        .then((body) => {
            const subjects = [];
            if (body.status === 'success') {
                if (body.data.length > 0) {
                    for (const i in body.data) {
                        subjects.push(body.data[i].mail_source.subject);
                    }
                    const html = body.data[0].mail_source.html;

                    output.status = 'success';
                    output.subjects = subjects; // array of all subjects
                    output.state = 0;
                    output.text = html.replace(/<\/?[^>]+(>|$)/g, ' '); // simple text body

                    /**
                     * Extract token from mail body
                     * returned tokens: verification token, reset token, oneclicksign, delete token etc..
                     */
                    if (html.indexOf('vtoken=') > -1) {
                        const indexValue = html.indexOf('vtoken=');
                        const remainingText = html.substr(indexValue + 7, 100);
                        //find gap in string
                        //var gap = remainingText.indexOf(' ');
                        const vtoken = remainingText.substr(0, 32);
                        const emailOTP = remainingText.substr(0, 6);

                        if (typeof vtoken !== 'undefined' && vtoken) {
                            output.vtoken = vtoken;
                            output.emailOTP = emailOTP;
                            if (vtoken.indexOf(' ') > -1 || vtoken.indexOf('<br/>') > -1) output.vtoken = null;
                            else output.emailOTP = null;
                        } else {
                            output.status = 'success';
                            output.state = 0;
                            output.vtoken = 'Unable to locate vtoken in recent mail body...';
                        }
                    }
                } else {
                    output.status = 'error';
                    output.state = -1;
                    output.message = 'mail_source is not found for this username...';
                    output.body = body;
                }
            } else {
                output.status = 'error';
                output.state = -1;
                output.message = body.message;
            }
        })
        .catch((err) => {
            output.status = 'error';
            output.state = -1;
            output.body = err;
        })
        .finally(() => {
            cb(output);
        });
};
