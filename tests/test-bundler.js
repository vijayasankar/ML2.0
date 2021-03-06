// ---------------------------------------
// Karma Test Environment Setup
// ---------------------------------------
import 'babel-core/register'
import 'babel-polyfill'

import sinon from 'sinon'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(sinonChai)
chai.use(chaiAsPromised)

global.chai = chai
global.sinon = sinon
global.expect = chai.expect
global.should = chai.should()

global.sessionStorage = global.localStorage = {
  getItem: function (key) {
    return this[key]
  },
  setItem: function (key, value) {
    this[key] = value
  }
}

// ---------------------------------------
// Require Tests
// ---------------------------------------
// for use with karma-webpack-with-fast-source-maps
const __karmaWebpackManifest__ = []; // eslint-disable-line
const inManifest = (path) => ~__karmaWebpackManifest__.indexOf(path)

// require all `tests/**/*.spec.js`
const testsContext = require.context('./', true, /\.spec\.js$/)

// only run tests that have changed after the first pass.
const testsToRun = testsContext.keys().filter(inManifest)
;(testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext)

// require all `src/**/*.js` except for `main.js` (for isparta coverage reporting)
if (__COVERAGE__) {
  const componentsContext = require.context('../src/', true, /^((?!main|reducers).)*\.js$/)
  componentsContext.keys().forEach(componentsContext)
}

chai.use(require('chai-enzyme')())
