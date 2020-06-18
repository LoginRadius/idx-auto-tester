# LoginRadius IEF Open Source Automation

## About:
LoginRadius Identify Experience Automation Framework which refers to IEF Automation, is an open-source automation framework built-in Nightwatch| Node.js tool with delivering all the standard authentication cases of LoginRadius Identity Experience.
 - Script is written in [Nightwatch](https://nightwatchjs.org/) framework 
 - [Node.js](https://nodejs.org) Core Assertion Testing Library is
   used for assertions

## Getting Started:
The Standard Authentication functionality which is available with loginradius identity experience framework can be tested via using these automated scripts. By running all the scripts, you can ensure your implementation.
We will continuously improve automation scripts and try to deliver you the best with adding more test cases, when any new functionality will be introduced in loginradius identity experience.

### Usage:
- Clone this repo to your local machine

#### Configure:
- Rename file`config\config.temp.js` by `config\config.js`
```
├── config
│   ├── inputs
│   ├── config.temp.js
├── helpers
├── test
├── package.json
├── nightwatch.js
└── nightwatch.json  
```
- Add your apiKey, apiSecret, and siteName in `config\config.js`

> Don't have Loginradius App ?. Create your own [here](https://adminconsole.loginradius.com/)
- Add mail7 apiKey and apiSecret for disposable email addresses
> *Mail7.io is an open-source service, mail7 apikey and secret can retrieved by signingup at [mail7.io](https://api.mail7.io/login)*
- Open Terminal in IDE like VS Code or Sublime Text
- Add Project dependencies by command `npm install`
- You also can install dependencies by running command for particular package like `npm install -g nightwatch`

#### Running Tests:
Now you are able to run scripts on your own implementated loginradius identity experience.
- Command to run all tests at once `node nightwatch.js test`
- Command to run a single file `node nightwatch.js test\<filename>.js`
- If you have installed Nightwatch globally (with -g option), the binary nightwatch will be available anywhere and test can be run by directly using nightwatch as a test runner `nightwatch test\<filename.js>`

> *Nightwatch includes a command-line test runner which makes it easy to run tests and generate useful output. Please refer to the [Installation](https://nightwatchjs.org/guide/running-tests/) section for details on how to get the runner installed. There are a few different options on how to use the test runner, depending on your installation type.*
#### Configure in Headless Mode:
Search for `--headless-none` in `nightwatch.json` and replace it by `headless` like below code:
````
"chromeOptions": {
	"args": [
		"headless" ]
}
````
> *A [headless](https://en.wikipedia.org/wiki/Headless_browser) browser is a web browser without a graphical user interface. _Headless browsers_ provide automated control of a web page in an environment similar to popular web browsers, but are executed via a command-line interface or using network communication.*

#### Limitations:
Currently, Test Cases are scripted to run with only ***Required Email Verification Flow***

#### Reporting:
##### XML Reporting:

 - By default tests will generate a JUnit formatted xml report for each
   test file in the `tests_output` folder at the root of the project.

##### html-reporting:
- Create a folder`html-reports`at project root.
- You can use interactive html-report also simply by running `node nightwatch.js --reporter html-reporter.js test` command.
- html report will be saved as `html-reports\siteName-datetime.html`
- Generated html report will looks like:

> *If you'd like to define your own reporter in addition to the built-in ones, you can follow the detailed guide [here](https://nightwatchjs.org/guide/extending-nightwatch/#custom-reporter)*

Feel free to log issues. PR also welcome, read the contribution guideline [here](CONTRIBUTING.md)
