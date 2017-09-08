import { Selector } from 'testcafe'
import Helpers from '../test_utils/helpers'
import config from '../test_utils/config'

const H = new Helpers()
// entry points
//Lotto LandingPage components - Before login
const menu = Selector('.navDesc').withText('Menu')
const results = Selector('.results')
const lottoLogo = Selector('.navLottoLogo')
const login = Selector('.account')
const registerNowButton = Selector('[href="/registration"]')
const lottoGame = Selector('[href="/lotto"]')
const kenoGame = Selector('[href="/keno"]')
const bullseyeGame = Selector('[href="/bullseye"]')
const play3Game = Selector('[href="/play3"]')
const instantKiwiGame = Selector('[href="/instant-kiwi"]')
const loginButton = Selector('.login')
const loginForm = Selector('.form-login')

//Registration Page
const registrationPageTitle = Selector('#register-title')
const registrationForm = Selector('#registerForm')
const emailForRegistration = Selector('#emailAddress')
const firstName = Selector('#firstName')
const lastName = Selector('#lastName')
const newPassword = Selector('#password')
const dobDD = Selector('#dobDay')
const dobMonth = Selector('#dobMonth')
const dobYYYY = Selector('#dobYear')
const maleGender = Selector('#maleCheckboxLabel')
const femaleGender = Selector('#femaleCheckboxLabel')
const mobileAreaCode = Selector('#mobileNetwork')
const mobileNumber = Selector('#mobileNumber')
const region = Selector('#regionPickerValue')
const location = Selector('#locationPickerValue')
const securityQuestion = Selector('#securityQuestion')
const securityAnswer = Selector('#securityAnswer')
const emailPreferencesJackpots = Selector('#jackpotReminderLabel')
const emailPreferencesResults = Selector('#promotionRemindersLabel')
const emailPreferencesInstantKiwi = Selector('#IKReminderLabel')
const registrationSubmitButton = Selector('#signupButton')
const myLottoTerms = Selector('#tandc-link')
const loginFromRegistration = Selector('#loginLinkFromRegisterForm')
const registrationSuccessPage = Selector('#nearlyThereContainer')

//Login form components
const email = Selector('input[id="email"]')
const password = Selector('input[id="password"]')
const loginSubmit = Selector('.button.primay.block')
const loginFormClose = Selector('.closeModal')
const loginFormHeader = Selector('.login-header-title')
const needHelpLink = Selector('input[id="cantAccessEmailLinkFromLogin"]')
const forgottenPasswordLink = Selector('input[id="forgotPasswordLinkFromLogin"]')
const loginFormSignUp = Selector('.login-signup-block')

//After login components
const rightMenuLoggedIn = Selector('.rightMenuLoggedIn')
const tickets = Selector('.tickets')
const accountBalanceIcon = Selector('input[id="nav-menu-account-link"]')
const accountDetails = Selector('.accountDetails')
const accountWelcome = Selector('.accountWelcome')
const accountEmail = Selector('.accountEmail')
const accountBalance = Selector('.accountBalance')
const topUpButton = Selector('.topUpButton')
const settings = Selector('.navMenuItemSettings')
const myTickets = Selector('[href="/my-tickets"]')
const messages = Selector('.navMenuItem').withText('Messages')
const favourites = Selector ('[href="/my-tickets/favourites"]')
const logout = Selector('.navMenuItem').withText('Log out')

//Register CreditCard
//const activationCode = async function (t) {
//var ibmdb = require('ibm_db');
//var connectionString = "DRIVER=DB2;DATABASE=esi_db;UID=gtkinst1;PWD=gtkinst1;HOSTNAME=192.168.225.66;port=50000;";
////var queryString = 'Select NZDEV.ES_SECURITY.ACTIVATION_ID From NZDEV.ES_SECURITY order by insrt_dt desc FETCH FIRST 1 ROW ONLY';
////ibmdb.open(connectionString, function(err, conn)
////{if (err)
////{ res.send("----error" + err.message);}
////else { conn.query(queryString, function(err, tables, moreResult)
////return tables;
////  })
////)};}}
//
//
//ibmdb.open(connection);
//var queryString = 'Select NZDEV.ES_SECURITY.ACTIVATION_ID From NZDEV.ES_SECURITY order by insrt_dt desc FETCH FIRST 1 ROW ONLY';
//ibmdb.query(queryString, function(err, rows, fields)
//{ if (err) throw err;
// for (var i in rows) {
//        console.log('Post Titles: ', rows[i].ACTIVATION_ID);
//    }
//});
//connection.end();}
//connection.open("DRIVER=DB2;DATABASE=esi_db;UID=gtkinst1;PWD=gtkinst1;HOSTNAME=192.168.225.66;port=50000;PROTOCOL=TCPIP",
//  function(err, conn)
//   {
//    if(err)
//    {
//     	console.error("-------------error: ", err.message);
//    } else {
//		  //code += conn.query("Select NZDEV.ES_SECURITY.ACTIVATION_ID From NZDEV.ES_SECURITY Where NZDEV.ES_SECURITY.USER_NAME = " + newUserEmail ,
//        code += conn.query("Select NZDEV.ES_SECURITY.ACTIVATION_ID From NZDEV.ES_SECURITY order by insrt_dt desc FETCH FIRST 1 ROW ONLY")
//    return code;
//
//}});



fixture `***** User setup *****`
  .page (config.domTestRootUrl)

test('Register new user', async t => {
  H.StepDescription('should go to Registration form')
  const newUserEmail = await H.makeEmail()
  await t
    .click(login)
    .click(registerNowButton)
  H.StepDescription('should fill the registration form')

    await t
      .expect(registrationPageTitle.exists).ok()
      .expect(registrationPageTitle.innerText).eql('Register Now')
      .expect(registrationForm.exists).ok()
      .expect(emailForRegistration.exists).ok()
      .typeText(emailForRegistration, newUserEmail)
      .expect(firstName.exists).ok()
      .typeText(firstName, 'regression')
      .expect(lastName.exists).ok()
      .typeText(lastName, 'user')
      .expect(newPassword.exists).ok()
      .typeText(newPassword, 'password1')
      .expect(dobDD.exists).ok()
      .typeText(dobDD, '10')
      .expect(dobMonth.exists).ok()
      .click(dobMonth)
      .pressKey('down enter')
      .expect(dobYYYY.exists).ok()
      .typeText(dobYYYY, '1990')
      .expect(femaleGender.exists).ok()
      .expect(maleGender.exists).ok()
      .click(femaleGender)
      .expect(mobileAreaCode.exists).ok()
      .typeText(mobileAreaCode, '021')
      .expect(mobileNumber.exists).ok()
      .typeText(mobileNumber, await H.makePhoneNumber())
      .click(region)
      .click(region.child(1))
      .click(location)
      .click(location.child(2))
      .click(securityQuestion)
      .click(securityQuestion.child(2))
      .typeText(securityAnswer, 'puppy')
      .click(emailPreferencesJackpots)
      .click(emailPreferencesInstantKiwi)
      .click(emailPreferencesResults)
      .expect(myLottoTerms.exists).ok()
      .expect(loginFromRegistration.exists).ok()
      .expect(registrationSubmitButton.exists).ok()
      .expect(registrationSubmitButton.innerText).eql('REGISTER NOW')
      .click(registrationSubmitButton)
  H.StepDescription('should display the registration success message')
  await t
      .expect(registrationPageTitle.exists).ok()
      .expect(registrationPageTitle.innerText).eql('Nearly there!')
      .expect(registrationSuccessPage.innerText).contains(newUserEmail)
      .expect(registrationSuccessPage.innerText).contains('I can\'t find the email - send it again')
  H.StepDescription('should get the activation code from db')
  const activationCodeFromDb = await H.getActivationCode()
  const activationUrl = "activation?activationid="
  await t
    .wait(3000)
    .navigateTo(config.domTestRootUrl + activationUrl + activationCodeFromDb)
        console.log(activationCodeFromDb)
    //.navigateTo(config.domTestRootUrl + activationUrl + '1234567')



})

