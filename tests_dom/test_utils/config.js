// !!!!! NOTE: changing domTestRootUrl also requires changing .testcafe-electron-rc
let config = {
  domTestRootUrl: 'https://2.sit.mylotto.co.nz/',
  //sit2Url: 'https://2.sit.mylotto.co.nz/',
  userName: 'automation@sit2.com', //Update the userID for spendingLimits and updateWalletBalance in helper.js
  password: 'password1',
  showBrowser: true,
  devTools: false
}

// Octopus variable substitution expected for non-development
if (process.env.NODE_ENV !== 'development') {
  // config = {
  //   domTestRootUrl: '#{domTestRootUrl}'
  // }
}

console.log('===> tests are running using the following config parameters = ', config)

module.exports = config
