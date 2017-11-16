// !!!!! NOTE: changing sitUrl also requires changing .testcafe-electron-rc
let config = {
//   sitUrl: 'https://2.sit.mylotto.co.nz/',
//   //sit2Url: 'https://2.sit.mylotto.co.nz/',
//   userName: 'automation1@sit2.com', //SIT2 userName
// //  userName: 'lotto1@test.com', //Update the userID for spendingLimits and updateWalletBalance in helper.js
//   password: 'password1',
//   showBrowser: true,
  devTools: false,
  odooUrl: 'https://test-9.odooplus.nz/',
  odooUser: 'solnet',
  odooPassword: 'longchilliroot'
}

// Octopus variable substitution expected for non-development
if (process.env.NODE_ENV !== 'development') {
  // config = {
  //   sitUrl: '#{sitUrl}'
  // }
}

console.log('===> tests are running using the following config parameters = ', config)

module.exports = config
