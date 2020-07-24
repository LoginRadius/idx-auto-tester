
# LoginRadius 'Idx-Auto-Tester' Open Source Automation

## About:
Idx-Auto-Tester is LoginRadius identity Experience Automation Framework which refers to IEF Automation, is an open-source automation framework built-in Nightwatch| Node.js tool with delivering all the standard authentication cases of LoginRadius Identity Experience.
 - Script is written in [Nightwatch](https://nightwatchjs.org/) framework 
 - [Node.js](https://nodejs.org) Core Assertion Testing Library is used for assertions

### Release Roadmap:
The full-version releases that include more test coverage and major changes with several improvements & code optimizations will be coming up in the multiple scheduled major releases. The details can be found [here](https://www.loginradius.com/engineering/blog/roadmap-idx-autotester/).

### Changelog:
- All notable changes can be found [here](CHANGELOG.md)


## Getting Started:
The Standard Authentication functionality which is available with loginradius identity experience framework can be tested via using these automated scripts. By running all the scripts, you can ensure your implementation.
We will continuously improve automation scripts and try to deliver you the best with adding more test cases, when any new functionality will be introduced in loginradius identity experience.

#### Usage:
- Clone this repo to your local machine

#### Implementation: 
The process of implementation or creation automation framework is defined [here](https://www.loginradius.com/engineering/blog/introduction-of-Idx-Auto-Tester/). This will be helpful to the user for creating new/update testcases with different scenarios. 

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
![](https://lh3.googleusercontent.com/Wmi5FVepKIvITCI-ynwBjL8qBbtv0rrA1OfeMTpyPsO-_RhovEv7zVPbdAXEHHuGVYLnKMSyZmrkWv2fjbEM0SggmhO_ptEmL2XJLjPZ8NMf1gHJYZI12teQY4fc291B3M7f2rMS)
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
**![](https://lh5.googleusercontent.com/8N5dtdTlF1-5akxJYvyl6LoOzQaAORnkjQX2DTH3rOXOgB7fDm1L99WEyjvBTUMltzN9T2gU6Z2xdgKOJ6XpNSeaJ9dxaMyF7oaNCKilDulm5RkL8o_SSf24am-ZvwjxNTLVHYIc)**

##### HTML Reporting:
- Create a folder`html-reports`at project root.
- You can use interactive html-report also simply by running `node nightwatch.js --reporter html-reporter.js test` command.
- html report will be saved as `html-reports\siteName-datetime.html`
**![](https://lh3.googleusercontent.com/Gc_RQrBUslcYhjZDqlyme4Y7DjEJN02Uun2a9HnPDZyuJDWfYeRhshXueIhj4HHmdrG8NwvldU-DzqaKUYibQ-L9Jp7cX6tVXwkTaYUlW06FPtUgRJ9ug4v13HhS037EVdNTT7aJ)**
> *If you'd like to define your own reporter in addition to the built-in ones, you can follow the detailed guide [here](https://nightwatchjs.org/guide/extending-nightwatch/#custom-reporter)*

Feel free to log issues. PR also welcome, read the contribution guideline [here](CONTRIBUTING.md)
