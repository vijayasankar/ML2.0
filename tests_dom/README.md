# dom tests with TestCafe

For TestCafe 101 and APIs, visit https://devexpress.github.io/testcafe/documentation/getting-started/.

To run these tests, `yarn dom-test`.  Note that this command does not run the e2e tests, which is run by `yarn e2e-test`.

Configs:
* `test_utils/.testcafe-electron-rc` and `config.js`.
* These tests are set to run against the nightly build. To run against other builds, change both above files.
* To run these tests in visible Electron browser, change the `showBrowser` flag in `config.js`.
* To run these tests in other broswers, for example Chrome:
  * `./node_modules/.bin/testcafe --color chrome tests_dom/*.spec.js`
