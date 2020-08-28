
# LoginRadius 'Idx-Auto-Tester' Open Source Automation

## About:
Idx-Auto-Tester is LoginRadius identity Experience Automation Framework which refers to IEF Automation, is an open-source automation framework built-in Nightwatch| Node.js tool with delivering all the standard authentication cases of LoginRadius Identity Experience.
 - Script is written in [Nightwatch](https://nightwatchjs.org/) framework 
 - [Node.js](https://nodejs.org) Core Assertion Testing Library is used for assertions

#### Release Roadmap:
The full-version releases that include more test coverage and major changes with several improvements & code optimizations will be coming up in the multiple scheduled major releases. The details can be found [here](https://www.loginradius.com/engineering/blog/roadmap-idx-autotester/).

#### Changelog:
- All notable changes can be found [here](CHANGELOG.md)

#### Contribution:
The `idx-auto-tester` is open for community to contribute, read the contribution guidelines [here](CONTRIBUTING.md)


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
- An executable Batch file is also added with named as `executable.bat` which can be run with double-click, and written command will be executed and html output report will be generated

> *Nightwatch includes a command-line test runner which makes it easy to run tests and generate useful output. Please refer to the [Installation](https://nightwatchjs.org/guide/running-tests/) section for details on how to get the runner installed. There are a few different options on how to use the test runner, depending on your installation type.*

##### Parallel Running:
The Test Case can also be run in parallel, as the test files will triggered at once. Each test file will fill a test worker slot. Individual tests/steps in a test file will not run concurrently.
- Open `nightwatch.json` file and look for below code
````
"test_workers": {
	"enabled": false,
	"workers": "auto"
}
````
- The `workers` option configures how many child processes can run concurrently.
- "auto" - determined by number of CPUs e.g. 4 CPUs means 4 workers
- {number} - specifies an exact number of workers

The more details on parallel run can be found [here](https://nightwatchjs.org/guide/running-tests)

#### Configure Headless Mode:
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

### Implementation: 
The process of implementation or creation automation framework is defined [here](https://www.loginradius.com/engineering/blog/introduction-of-Idx-Auto-Tester/). This will be helpful to the user for creating new/update testcases with different scenarios.

### Reporting:
##### XML Reporting:

 - By default tests will generate a JUnit formatted xml report for each test file in the `tests_output` folder at the root of the project.

**![](https://lh5.googleusercontent.com/8N5dtdTlF1-5akxJYvyl6LoOzQaAORnkjQX2DTH3rOXOgB7fDm1L99WEyjvBTUMltzN9T2gU6Z2xdgKOJ6XpNSeaJ9dxaMyF7oaNCKilDulm5RkL8o_SSf24am-ZvwjxNTLVHYIc)**

##### HTML Reporting:
- Create a folder`html-reports`at project root.
- You can use interactive html-report also simply by running `node nightwatch.js --reporter html-reporter.js test` command.
- html report will be saved as `html-reports\siteName-datetime.html`

**![](https://lh3.googleusercontent.com/Gc_RQrBUslcYhjZDqlyme4Y7DjEJN02Uun2a9HnPDZyuJDWfYeRhshXueIhj4HHmdrG8NwvldU-DzqaKUYibQ-L9Jp7cX6tVXwkTaYUlW06FPtUgRJ9ug4v13HhS037EVdNTT7aJ)**

> *If you'd like to define your own reporter in addition to the built-in ones, you can follow the detailed guide [here](https://nightwatchjs.org/guide/extending-nightwatch/#custom-reporter)*


## Value Proposition:
What do we offer ? and how is it useful ?

### 1.  Tested Automation Scripts
    
With ready and tested automated scripts, you can quickly test the authentication features and workflows implemented using the LoginRadius Identity Experience Framework.

It covers following features and benefits:

#### Shorter execution time for Validation
As it is an automation script covering all the positive/negative test cases, the validation of the implementation is faster.
This will be helpful to you to create new/update test cases with different scenarios. Hence lowers administrative cost.

#### Minimal Configuration needed
It automates the entire test suite quickly with minimal configuration and is readable as well as easy to update.

#### Scenario-based Test cases
Each test case is covered in a way that every scenario is captured end to end to understand the consumer’s journey right from registration, login, forget the password, profile editor etc.

#### Error and Exception Handling
Error and exceptions handling is supported for failed assertions.

### 2.  Support for Manual Test Cases

Mining the test cases by reviewing code is difficult, so we have extended support to deliver the written Test Cases with the expected outcomes as well.

### 3.  Robust Framework

We have used Nightwatch.js end-to-end testing framework to create the Idx-Auto-Tester tool, which comes with the following benefits:

#### Robust automation framework
The capability of multi-browser compatibility runs the tests either sequentially or in parallel, together, by group, tags, or by single, that proves to be time-efficient.

#### Resolve the asynchronous queuing system problem
We are using 'Function-style commands' of Nightwatch to create commands while running the test cases.

#### Continuous Integration
It internally uses the powerful W3C Webdriver API or the Selenium Webdriver and simplifies writing end-to-end automated tests in Node.js and effortlessly sets up for integration.

#### Scalability
The automation script is scalable enough to incorporate any additions in the feature list, so in case there are new changes or enhancements, those will be easily taken into considerations.

### 4.  Test Results and Reporting

The test results can directly be read from the terminal and also stored at a specified output folder.

Reports can be defined in supporting means-:

-   XML report for each test file
    
-   Interactive HTML report
    
-   Also, you can define reports in addition to the built-in ones.
    
- Graphical Representations of HTML reports is planned to be accomplished as per [roadmap](https://www.loginradius.com/engineering/blog/roadmap-idx-autotester/).

### 5.  Easy to read Documentation

With very effective documentation (readme, descriptive comments to test cases, commands) it is very easy to use by even a non-technical person.

### 6.  Open Source

The tool is open for the community to contribute with the pull request process and standards defined by LoginRadius [here](https://github.com/LoginRadius/idx-auto-tester/blob/master/CONTRIBUTING.md).

## Useful Links:

1.  [https://www.loginradius.com/engineering/blog/opensource-Automation-for-identity-experience-framework/](https://www.loginradius.com/engineering/blog/opensource-Automation-for-identity-experience-framework/)
    
2.  [https://www.loginradius.com/engineering/blog/introduction-of-Idx-Auto-Tester/](https://www.loginradius.com/engineering/blog/introduction-of-Idx-Auto-Tester/)
    
3.  [https://www.loginradius.com/engineering/blog/roadmap-idx-autotester/](https://www.loginradius.com/engineering/blog/roadmap-idx-autotester/)

## Terms Used in Doc:

- We- LoginRadius idx-auto-tester
- You- for reader who is developer and will buy our services- our customer
- Consumer- is end user who consumes services of our customer