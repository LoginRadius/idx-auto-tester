/**
 * Wait for Element Visible on Webpage
 */

exports.command = function (elements, timeout, isAbort) {
    var self = this;

    this.perform(function (self, done) {
        try {
            browser.waitForElementVisible(elements, timeout, isAbort);
        }
        catch (e) {
            throw new Error('Unable to locate the element ' + elements + ' timeout ' + timeout)
        }
        finally {
            done();
        }
    });

    return this;
};


