var jsdom = require('jsdom')

var virtualConsole = jsdom.createVirtualConsole().sendTo(console)

jsdom.env({
  url: 'http://localhost:3001',
  features: {
    FetchExternalResources: ['script'],
    ProcessExternalResources: ['script'],
    SkipExternalResources: false
  },
  virtualConsole: virtualConsole,
  created: function (err, window) {
    if (err) {
      console.error(err)
      return
    }
    window.sessionStorage = window.localStorage = {
      getItem: function (key) {
        return this[key]
      },
      setItem: function (key, value) {
        this[key] = value
      }
    }

    console.log('CREATED!')
    console.log(window.document.documentElement, err)
  },
  onload: function (window) {
    console.log('ONLOAD!')
    console.log(window.document.documentElement.outerHTML)
  },
  done: function (err, window) {
    if (err) {
      console.error(err)
      return
    }
    console.log('DONE!')
    console.log(window.document.documentElement.outerHTML, err)
  }
})
