exports.config = {
    user: 'applitools',
    key: 'zBo67o7BsoKhdkf8Va4u',  // Your BrowserStack credentials go here
  
    specs: [
      './test/specs/example.e2e.js'  // The test specs to run
    ],
    exclude: [],
  
    capabilities: [{
      browserName: 'Chrome',  // Signifies on what platform your test will run. You can define other capabilities here.
      name: 'single_test',
      build: 'first-webdriverio-browserstack-build'  // The name of test and name of build is being defined here
    }],
  
    logLevel: 'warn',
    coloredLogs: true,
    screenshotPath: './errorShots/',
    baseUrl: '',
    waitforTimeout: 30000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    host: 'hub.browserstack.com',  // This line is important for your tests to run on BrowserStack
  
    before: function () {
      var chai = require('chai');
      global.expect = chai.expect;
      chai.Should();
    },
    framework: 'mocha',
    mochaOpts: {
      ui: 'bdd',
      timeout: 60000
    },
  
    // The afterTest function is used to mark the test status on BrowserStack using JavaScript executor based on the assertion status of your tests
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
      if(passed) {
        browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": ""}}');
      } else {
        browser.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": ""}}');
      }
    }
}
