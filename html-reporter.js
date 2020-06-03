/**
 * html report generator
 */

let router = require('./route.js');
let config = require(router.config);
let d = (new Date).toISOString().replace(/:|z|t/gi, '-').replace(/\..+/, '').trim();
let HtmlReporter = require('nightwatch-html-reporter');
/* Same options as when using the built in nightwatch reporter option */
let reporter = new HtmlReporter({
    openBrowser: true,
    reportsDirectory: __dirname + '/html-reports/',
    reportFilename: config.siteName + "-" + d + ".html",
    themeName: 'default'// cover, compact, compact-gray, default-gray, outlook
});

module.exports = {
    write: function (results, options, done) {
        reporter.fn(results, done);
    }
};