/**
 * Wait for Element Visible on Webpage
 */

exports.command = function (elements, timeout, isAbort) {

    /**
     * @param {string} elements - locator id to search for
     * @param {number} timeout - total timeout
     * @param {boolean} isAbort - program will continue when set false and element not found.
     */

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


