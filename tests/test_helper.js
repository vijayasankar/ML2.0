/**
 * Mocha Test Environment Setup
 */

import 'babel-core/register'
import 'babel-polyfill'

import jsdom from 'jsdom'
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

global.__DEV__ = false
global.__TEST__ = true

const doc = jsdom.jsdom('<!DOCTYPE html><html><body></body></html>')
const win = doc.defaultView

global.document = doc
global.window = win
global.navigator = window.navigator

global.console.debug = global.console.log

const noop = () => 1
require.extensions['.svg'] = noop

global.sessionStorage = global.localStorage = {
  getItem: function (key) {
    return this[key]
  },
  setItem: function (key, value) {
    this[key] = value
  }
}

global.Headers = function () {}
global.Headers.prototype.append = function (name, value) {}

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key]
  }
})

// ----------------------------------------------------------------------------
// https://github.com/airbnb/enzyme/issues/395
// ----------------------------------------------------------------------------
chai.use(require('chai-enzyme')())

