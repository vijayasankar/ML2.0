// !!!!! NOTE: changing domTestRootUrl also requires changing .testcafe-electron-rc
let config = {
  domTestRootUrl: 'https://1.sit.mylotto.co.nz/',
  //sit2Url: 'https://2.sit.mylotto.co.nz/',
  showBrowser: true,
  devTools: false
}

// Octopus variable substitution expected for non-development
if (process.env.NODE_ENV !== 'development') {
  // config = {
  //   domTestRootUrl: '#{domTestRootUrl}'
  // }
}

console.log('===> tests_dom config = ', config)

module.exports = config
