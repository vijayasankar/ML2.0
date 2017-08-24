import { Selector } from 'testcafe'
import Helpers from '../test_utils/helpers'
import config from '../test_utils/config'

const H = new Helpers()
// entry points
    //TODO - To get into detailed tests refer into regression tests. Remember : this is just smoke test
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

//Settings Page Components
const settingsPageHeader = Selector('#settings')
const myDetailsSection = Selector('#myDetails')
const myFundsSection = Selector('#myFunds')

//Edit Name
const editName = Selector('#nameEdit')
const editNameModal = Selector('#react-aria-modal-dialog')
const closeEditNameModal = Selector('.closeModal')
const emailEdit = Selector('#emailEdit')

//Edit Email address
const editEmail = Selector('#emailEdit')
const cancelEditEmail = Selector('#emailCancel')
const changeEmailAddressInputField = Selector('#changeEmailAddressInputField')
const changeEmailPasswordInputField = Selector('#changeEmailAddressPasswordInputField')
const changeEmailAddressSubmit = Selector('#changeEmailAddressFormSubmitButton')

//Change Phone number
const editPhoneNumber = Selector('#phoneNumberEdit')
const cancelEditPhoneNumber = Selector('#phoneNumberEditCancel')
const mobileNetwork = Selector('#mobileNetwork')
const mobileNumber = Selector('#mobileNumber')
const changePhoneNumberPasswordInputField = Selector('#changePhoneNumberPasswordInputField')
const ChangePhoneNumberSubmit = Selector('#changePhoneNumberFormSubmitButton')

//Change Location
const editLocation = Selector('#locationEdit')
const cancelEditLocation = Selector('#locationEditCancel')
const regionPickerValue = Selector('#regionPickerValue')
const locationPickerValue = Selector('#locationPickerValue')
const editLocationPasswordInputField = Selector('#questionPasswordInput')
const editLocationSubmit = Selector('#changeLocationFormSubmitButton')

//userId
const userId = Selector('#userId')

//Change Password
const changePasswordLink = Selector('#changePassword')
const changePasswordModal = Selector('#login-form')
const currentPasswordField = Selector('#change-password-old')
const newPasswordField = Selector('#password')
const poorPassword = Selector('#password-strength-Poor')
const okPassword = Selector('#password-strength-OK')
const toggleShowHidePassword = Selector('#toggleShowHidePassword')
const changePasswordSubmit = Selector('#change-password-submit-button')
const closeChangePasswordModal = Selector('#close-modal')

//Change security question
const changeSecurityQuestionLink = Selector('#changeSecurityQuestion')
const changeSecurityQuestionModal = Selector('#securityQuestionModal')
const newSecurityQuestion = Selector('#securityQuestion')
const answerForSecurityQuestion = Selector('#securityAnswer')
const changeSecurityQuestionPasswordInput = Selector('#questionPasswordInput')
const changeSecurityQuestionSubmit = Selector('#questionSubmitButton')
const closeChangeSecurityQuestionModal = Selector('#close-modal')
//Notification settings
const notificationSettingsLink = Selector('#settingsCommunicationPreferences')
const notificationSettingsModal = Selector('#securityQuestionModal') //TODO Wrong Class name
const jackpotNotifications = Selector('#optInLottoJackpotLabel')
const jackpotAmount = Selector('#selectJackpotAmount')
const resultsNotifications = Selector('#optInLottoResultsLabel')
const instantKiwiNotifications = Selector('#optInInstantKiwiLabel')
const unsubscribeAllNotifications = Selector('#unsubscribeFromAllLabel')
const notificationPasswordInput = Selector('#questionPasswordInput') //TODO Wrong Class name
const notificationSettingSubmit = Selector('#questionSubmitButton') //TODO Wrong Class name
const closeNotificationSettingsModal = Selector('#close-modal')

//Text Service
const textServiceLink = Selector('#textService')
const createTextServiceModal = Selector('#blockedGamesFormContainer')
const createButton = Selector('.button.primary.buttonOverlap')
const closeTextServiceModal = Selector('#close-modal')
const jackpotThreshold = Selector('#jackpotThreshold')
const saveTextService = Selector('#textServiceSaveButton')

//Block games
const blockGameLink = Selector('#blockGames')
const blockGameModal = Selector('#blockedGamesFormContainer')
const blockGameList = Selector('#blockedGamesList')
const editBlockGameLotto = Selector('#blockLottoButton')
const editBlockGameBullseye = Selector('#blockBullseyeButton')
const editBlockGameKeno = Selector('#blockKenoButton')
const editBlockGamePlay3 = Selector('#blockPlay3Button')
const closeBlockGamesModal = Selector('#close-modal')
const editBlockedGame = Selector('.edit-blocked-game')
const cancelEditBlockGame = Selector('.col-xs-2')
const blockGameDay = Selector('#dobDay')
const blockGameMonth = Selector('#dobMonth')
const blockGameYear = Selector('#dobYear')
const blockGamePasswordInput = Selector('#blockedGamePassword')
const blockLottoGameSubmitButton = Selector('#blockLottoFormSubmitButton')
const blockBullseyeGameSubmitButton = Selector('#blockBullseyeFormSubmitButton')
const blockKenoGameSubmitButton = Selector('#blockKenoFormSubmitButton')
const blockPlay3GameSubmitButton = Selector('#blockPlay3FormSubmitButton')

//Close account
const closeAccountLink = Selector('#closeAccount')
const closeAccountModal = Selector('#bankAccountFormContainer')
const closeAccountContactUs = Selector('#bankAccounForm')
const feedBack = Selector('#closeAccountFeedback')
const bankAccountFromCloseAccount = Selector('#bankAccountNumberFromCloseAccount')
const editBankAccountFromCloseAccount = Selector('#bankAccountEditButtonFromCloseAccount')
const closeAccountPasswordInput = Selector('#closeAccountPassword')
const closeAccountSubmitButton = Selector('#bankAccountSaveButton')
const ExitCloseAccountModal = Selector('#close-modal')

//Spending limits

const spendingLimitsLink = Selector('#spendingLimits')
const spendingLimitsModal = Selector('#spendingLimitBody')
const weeklySpendingProgressBar = Selector('#weeklySpendingLimitProgressBar')
const monthlySpendingProgressBar = Selector('#monthlySpendingLimitProgressBar')
const editSpendingLimit = Selector('#spendingLimitEditButton')
const closeSpendingLimitModal = Selector('#close-modal')
const cancelEditSpendingLimit = Selector('#spendingLimitCloseEditButton')
const weeklySpendingLimitSlider = Selector('#weeklySpendingLimitSlider')
const monthlySpendingLimitSlider = Selector('#monthlySpendingLimitSlider')
const editSpendingLimitPasswordInput = Selector('#spendingLimitPassword')
const spendingLimitsSubmitButton = Selector('#spendingLimitUpdateButton')



fixture `***** Verify the Settings page *****`
  .page (config.domTestRootUrl)

test('Navigate to Settings page', async t => {
    H.StepDescription('has navigated to Lotto SIT 1 environment')
    H.StepDescription('Checks the login form')
    await t
      .click(login)
      .click(loginButton)
      .typeText(email, '14aug1@vj.com')
      .typeText(password, 'password1')
      .click(loginSubmit)
    H.StepDescription('Checks the after-login options')
    await t
      .expect(rightMenuLoggedIn.exists).ok()
      .expect(tickets.exists).ok()
      .click(rightMenuLoggedIn.child(1))
      .expect(accountDetails.exists).ok()
      .expect(accountWelcome.exists).ok()
      .expect(accountEmail.exists).ok()
      .expect(accountBalance.exists).ok()
      .expect(topUpButton.exists).ok()
      .expect(settings.exists).ok()
      .expect(myTickets.exists).ok()
      .expect(messages.exists).ok()
      .expect(favourites.exists).ok()
      .expect(logout.exists).ok()
    H.StepDescription('Clicks on Settings')
    await t
      .click(settings)
      .expect(settingsPageHeader.exists).ok()
      .expect(myDetailsSection.exists).ok()
      .expect(myFundsSection.exists).ok()
    H.StepDescription('User logs out')
    await t
      .click(rightMenuLoggedIn.child(1))
      .click(logout)
      .expect(tickets.exists).notOk()
})

test('Edit the name', async t => {
    H.StepDescription('has navigated to Lotto SIT 1 environment')
    H.StepDescription('should user log in')
    await t
      .click(login)
      .click(loginButton)
      .typeText(email, '14aug1@vj.com')
      .typeText(password, 'password1')
      .click(loginSubmit)
    H.StepDescription('Clicks on Settings')
    await t
      .expect(rightMenuLoggedIn.exists).ok()
      .expect(tickets.exists).ok()
      .click(rightMenuLoggedIn.child(1))
      .expect(accountDetails.exists).ok()
      .expect(accountWelcome.exists).ok()
      .expect(accountEmail.exists).ok()
      .expect(accountBalance.exists).ok()
      .expect(topUpButton.exists).ok()
      .click(settings)
      .expect(settingsPageHeader.exists).ok()
      .expect(myDetailsSection.exists).ok()
      .expect(myFundsSection.exists).ok()
    H.StepDescription('Edit the name')
    await t
      .expect(myDetailsSection.exists).ok()
      .expect(myFundsSection.exists).ok()
      .expect(editName.exists).ok()
      .click(editName)
      .expect(editNameModal.exists).ok()
      .expect(editNameModal.textContent).contains('Want to change your name?')
      .expect(closeEditNameModal.exists).ok()
      .click(closeEditNameModal)
    H.StepDescription('User logs out')
    await t
      .click(rightMenuLoggedIn.child(1))
      .click(logout)
      .expect(tickets.exists).notOk()
})

test('Edit the email address', async t => {
    H.StepDescription('has navigated to Lotto SIT 1 environment')
    H.StepDescription('should user log in')
    await t
      .click(login)
      .click(loginButton)
      .typeText(email, '14aug1@vj.com')
      .typeText(password, 'password1')
      .click(loginSubmit)
    H.StepDescription('Clicks on Settings')
    await t
      .expect(rightMenuLoggedIn.exists).ok()
      .expect(tickets.exists).ok()
      .click(rightMenuLoggedIn.child(1))
      .expect(accountDetails.exists).ok()
      .expect(accountWelcome.exists).ok()
      .expect(accountEmail.exists).ok()
      .expect(accountBalance.exists).ok()
      .expect(topUpButton.exists).ok()
      .click(settings)
      .expect(settingsPageHeader.exists).ok()
      .expect(myDetailsSection.exists).ok()
      .expect(myFundsSection.exists).ok()
    H.StepDescription('Edit the email address')
    //TODO Remember if you change the email address then the user has to be activated separately
    // TODO 1)Check the preflled email address, 2)Check you can update the email address, 3)check the confirmation
    await t
      .expect(myDetailsSection.exists).ok()
      .expect(myFundsSection.exists).ok()
      .expect(editEmail.exists).ok()
      .click(editEmail)
    await t
      .expect(cancelEditEmail.exists).ok()
      .expect(changeEmailAddressInputField.exists).ok()
    await t
      .expect(changeEmailPasswordInputField.exists).ok()
      .expect(changeEmailAddressSubmit.exists).ok()
    H.StepDescription('User logs out')
    await t
      .click(rightMenuLoggedIn.child(1))
      .click(logout)
      .expect(tickets.exists).notOk()
})

test('Edit the phone number', async t => {
    H.StepDescription('has navigated to Lotto SIT 1 environment')
    H.StepDescription('should user log in')
    await t
      .click(login)
      .click(loginButton)
      .typeText(email, '14aug1@vj.com')
      .typeText(password, 'password1')
      .click(loginSubmit)
    H.StepDescription('Clicks on Settings')
    await t
      .expect(rightMenuLoggedIn.exists).ok()
      .expect(tickets.exists).ok()
      .click(rightMenuLoggedIn.child(1))
      .expect(accountDetails.exists).ok()
      .expect(accountWelcome.exists).ok()
      .expect(accountEmail.exists).ok()
      .expect(accountBalance.exists).ok()
      .expect(topUpButton.exists).ok()
      .click(settings)
      .expect(settingsPageHeader.exists).ok()
      .expect(myDetailsSection.exists).ok()
      .expect(myFundsSection.exists).ok()
    H.StepDescription('should update the phone number')
    await t
      .expect(myDetailsSection.exists).ok()
      .expect(myFundsSection.exists).ok()
      .expect(editPhoneNumber.exists).ok()
      .click(editPhoneNumber)
    await t
      .expect(cancelEditPhoneNumber.exists).ok()
      .expect(mobileNetwork.exists).ok()
      .expect(mobileNumber.exists).ok()
    await t
      .expect(changePhoneNumberPasswordInputField.exists).ok()
      .expect(ChangePhoneNumberSubmit.exists).ok()
      .click(mobileNetwork)
      .pressKey('ctrl+a delete')
      .typeText(mobileNetwork, '022')
      .click(mobileNumber)
      .pressKey('ctrl+a delete')
      .typeText(mobileNumber, '123452')
      .typeText(changePhoneNumberPasswordInputField, 'password1')
      .click(ChangePhoneNumberSubmit)
    H.StepDescription('User logs out')
    await t
      .click(rightMenuLoggedIn.child(1))
      .click(logout)
      .expect(tickets.exists).notOk()
})

test('Edit the location', async t => {
    H.StepDescription('has navigated to Lotto SIT 1 environment')
    H.StepDescription('should user log in')
    await t
      .click(login)
      .click(loginButton)
      .typeText(email, '14aug1@vj.com')
      .typeText(password, 'password1')
      .click(loginSubmit)
    H.StepDescription('Clicks on Settings')
    await t
      .expect(rightMenuLoggedIn.exists).ok()
      .expect(tickets.exists).ok()
      .click(rightMenuLoggedIn.child(1))
      .expect(accountDetails.exists).ok()
      .expect(accountWelcome.exists).ok()
      .expect(accountEmail.exists).ok()
      .expect(accountBalance.exists).ok()
      .expect(topUpButton.exists).ok()
      .click(settings)
      .expect(settingsPageHeader.exists).ok()
      .expect(myDetailsSection.exists).ok()
      .expect(myFundsSection.exists).ok()
    H.StepDescription('should edit the region, Auckland then change it to Bay of Plenty')
    await t
      .expect(myDetailsSection.exists).ok()
      .expect(myFundsSection.exists).ok()
      .expect(editLocation.exists).ok()
      .click(editLocation)
      .expect(cancelEditLocation.exists).ok()
      .expect(regionPickerValue.exists).ok()
      .expect(locationPickerValue.exists).ok()
      .expect(editLocationPasswordInputField.exists).ok()
      .expect(editLocationSubmit.exists).ok()
    await t
      .click(regionPickerValue)
      .click(regionPickerValue.child(1))
      .expect(regionPickerValue.value).eql('Auckland')
      .click(regionPickerValue)
      .click(regionPickerValue.child(2))
      .expect(regionPickerValue.value).eql('Bay of Plenty')
    H.StepDescription('should edit the location - Select Taupo')
    await t
      .click(editLocationSubmit)
      .click(locationPickerValue)
      .click(locationPickerValue.child(4))
      .expect(locationPickerValue.value).eql('Taupo')
    H.StepDescription('should enter password to save the new location change')
    await t
      .typeText(editLocationPasswordInputField, 'password1')
      .click(editLocationSubmit)
      .expect(editLocation.exists).ok()
    H.StepDescription('User logs out')
    await t
      .click(rightMenuLoggedIn.child(1))
      .click(logout)
      .expect(tickets.exists).notOk()
})

test('Change password', async t => {
    H.StepDescription('has navigated to Lotto SIT 1 environment')
    H.StepDescription('should user log in')
    await t
      .click(login)
      .click(loginButton)
      .typeText(email, '14aug1@vj.com')
      .typeText(password, 'password1')
      .click(loginSubmit)
    H.StepDescription('Clicks on Settings')
    await t
      .expect(rightMenuLoggedIn.exists).ok()
      .expect(tickets.exists).ok()
      .click(rightMenuLoggedIn.child(1))
      .click(settings)
      .expect(settingsPageHeader.exists).ok()
      .expect(myDetailsSection.exists).ok()
      .expect(myFundsSection.exists).ok()
    H.StepDescription('should edit the password')
    await t
      .expect(changePasswordLink.exists).ok()
      .click(changePasswordLink.parent())
      .expect(currentPasswordField.exists).ok()
      .expect(newPasswordField.exists).ok()
      .expect(poorPassword.exists).notOk()
      .expect(toggleShowHidePassword.exists).ok()
      .expect(changePasswordSubmit.exists).ok()
      .expect(closeChangePasswordModal.exists).ok()
    H.StepDescription('should enter the current password')
    const oldPasswordRequiredErrorMessage = Selector('#oldpassword-Passwordisrequired')
    const newPasswordRequiredErrorMessage = Selector('#newpassword-Passwordisrequired')
    await t
      .click(changePasswordSubmit)
      .expect(oldPasswordRequiredErrorMessage.exists).ok()
      .expect(newPasswordRequiredErrorMessage.exists).ok()
      .typeText(currentPasswordField, 'password1')
      .click(changePasswordSubmit)
      .expect(oldPasswordRequiredErrorMessage.exists).notOk()
      .expect(newPasswordRequiredErrorMessage.exists).ok()
    H.StepDescription('should enter the new password')
    //TODO Investigate: Driving me crazy - Doesn't enter the actual password into the field
    await t
      .setTestSpeed(0.1)
      //.click(toggleShowHidePassword)
      .click(newPasswordField)
      .typeText(newPasswordField,'password1')
      .click(toggleShowHidePassword)
      //.expect(newPasswordField.innerText).eql('password2')
      //.expect(okPassword.exists).ok() //TODO Investigate: Icon doesn't display when the test is running
      .click(closeChangePasswordModal)
    H.StepDescription('User logs out')
    await t
      .click(rightMenuLoggedIn.child(1))
      .click(logout)
      .expect(tickets.exists).notOk()
    })

test('Change security question', async t => {
    H.StepDescription('has navigated to Lotto SIT 1 environment')
    H.StepDescription('should user log in')
    await t
      .click(login)
      .click(loginButton)
      .typeText(email, '14aug1@vj.com')
      .typeText(password, 'password1')
      .click(loginSubmit)
    H.StepDescription('Clicks on Settings')
    await t
      .expect(rightMenuLoggedIn.exists).ok()
      .expect(tickets.exists).ok()
      .click(rightMenuLoggedIn.child(1))
      .click(settings)
      .expect(settingsPageHeader.exists).ok()
      .expect(myDetailsSection.exists).ok()
      .expect(myFundsSection.exists).ok()
    H.StepDescription('should check the elements in change security question modal')
    await t
      .expect(changeSecurityQuestionLink.exists).ok()
      .click(changeSecurityQuestionLink.parent())
      .expect(changeSecurityQuestionModal.exists).ok()
      .expect(newSecurityQuestion.exists).ok()
      .expect(answerForSecurityQuestion.exists).ok()
      .expect(changeSecurityQuestionPasswordInput.exists).ok()
      .expect(changeSecurityQuestionSubmit.hasAttribute('disabled')).ok()
      .expect(closeChangeSecurityQuestionModal.exists).ok()
    H.StepDescription('should select new security question from the list')
    await t
      .click(newSecurityQuestion)
      .expect(newSecurityQuestion.child(2).exists).ok()
      .pressKey('down')
      .pressKey('down')
      .pressKey('enter')
      //.expect(newSecurityQuestion.innerText).eql('What town was I born in?')
    H.StepDescription('should enter the answer')
    await t
      .click(answerForSecurityQuestion)
      .typeText(answerForSecurityQuestion,'Auckland')
      .pressKey('tab')
    H.StepDescription('should enter the password')
    await t
      .click(changeSecurityQuestionPasswordInput)
      .typeText(changeSecurityQuestionPasswordInput, 'password1')
    H.StepDescription('should save the changes')
    await t
      .click(changeSecurityQuestionSubmit)
      .expect(changeSecurityQuestionModal.exists).notOk()
    H.StepDescription('User logs out')
    await t
      .click(rightMenuLoggedIn.child(1))
      .click(logout)
      .expect(tickets.exists).notOk()
    })

test('Update notification settings', async t => {
    H.StepDescription('has navigated to Lotto SIT 1 environment')
    H.StepDescription('should user log in')
    await t
      .click(login)
      .click(loginButton)
      .typeText(email, '14aug1@vj.com')
      .typeText(password, 'password1')
      .click(loginSubmit)
    H.StepDescription('Clicks on Settings')
    await t
      .expect(rightMenuLoggedIn.exists).ok()
      .expect(tickets.exists).ok()
      .click(rightMenuLoggedIn.child(1))
      .click(settings)
      .expect(settingsPageHeader.exists).ok()
      .expect(myDetailsSection.exists).ok()
      .expect(myFundsSection.exists).ok()
    H.StepDescription('should check the elements in notification settings modal')
    await t
      .expect(notificationSettingsLink.exists).ok()
      .click(notificationSettingsLink.parent())
      .expect(notificationSettingsModal.exists).ok()
      .expect(jackpotNotifications.exists).ok()
      .expect(resultsNotifications.exists).ok()
      .expect(instantKiwiNotifications.exists).ok()
      .expect(unsubscribeAllNotifications.exists).ok()
      .expect(notificationPasswordInput.exists).ok()
      .expect(notificationSettingSubmit.exists).ok()
      .expect(closeNotificationSettingsModal.exists).ok()
    H.StepDescription('should opt-in fot jackpot reminders')
    await t
      .expect(jackpotAmount.exists).notOk()
      .click(jackpotNotifications)
      .expect(jackpotAmount.exists).ok()
      .click(jackpotAmount)
      .pressKey('down')
    H.StepDescription('should opt-in for results reminders')
    await t
      .click(resultsNotifications)
    H.StepDescription('should opt-in for instant kiwi reminders')
    await t
      .click(instantKiwiNotifications)
    H.StepDescription('should opt-out for all reminders')
    await t
      .click(unsubscribeAllNotifications)
      .expect(jackpotAmount.exists).notOk()
    H.StepDescription('should update the notifications settings')
    await t
      .click(notificationPasswordInput)
      .typeText(notificationPasswordInput, 'password1')
      .click(notificationSettingSubmit)
      .expect(notificationSettingsModal.exists).notOk()

    H.StepDescription('User logs out')
    await t
      .click(rightMenuLoggedIn.child(1))
      .click(logout)
      .expect(tickets.exists).notOk()
    })

test('Create text service', async t => {
    H.StepDescription('has navigated to Lotto SIT 1 environment')
    H.StepDescription('should user log in')
    await t
      .click(login)
      .click(loginButton)
      .typeText(email, '14aug1@vj.com')
      .typeText(password, 'password1')
      .click(loginSubmit)
    H.StepDescription('Clicks on Settings')
    await t
      .expect(rightMenuLoggedIn.exists).ok()
      .expect(tickets.exists).ok()
      .click(rightMenuLoggedIn.child(1))
      .click(settings)
      .expect(settingsPageHeader.exists).ok()
      .expect(myDetailsSection.exists).ok()
      .expect(myFundsSection.exists).ok()
    H.StepDescription('should check the elements in text service modal')
    await t
      .expect(createTextServiceModal.exists).notOk()
      .click(textServiceLink.parent())
      .expect(createTextServiceModal.exists).ok()
      .expect(createButton.exists).ok()
      .expect(closeTextServiceModal.exists).ok()

    H.StepDescription('should create the jackpot threshold')
    await t
      .expect(jackpotThreshold.exists).notOk()
      .click(createButton)
      .expect(jackpotThreshold.exists).ok()
      .click(jackpotThreshold)
      .pressKey('down')
      .pressKey('enter')
    H.StepDescription('should enter the phone number for text service')
    await t
      .click(mobileNetwork)
      .pressKey('down')
      .pressKey('enter')
      .click(mobileNumber)
      .pressKey('ctrl+a delete')
      .typeText(mobileNumber, '123452')
    H.StepDescription('should select the ticket type')
    //TODO
    H.StepDescription('should save the text service settings')
    //TODO
    await t
      .expect(saveTextService.exists).ok()
    H.StepDescription('User logs out')
    await t
      .click(rightMenuLoggedIn.child(1))
      .click(logout)
      .expect(tickets.exists).notOk()
})

test('Block games', async t => {
    H.StepDescription('has navigated to Lotto SIT 1 environment')
    H.StepDescription('should user log in')
    await t
      .click(login)
      .click(loginButton)
      .typeText(email, '14aug1@vj.com')
      .typeText(password, 'password1')
      .click(loginSubmit)
    H.StepDescription('Clicks on Settings')
    await t
      .expect(rightMenuLoggedIn.exists).ok()
      .expect(tickets.exists).ok()
      .click(rightMenuLoggedIn.child(1))
      .click(settings)
      .expect(settingsPageHeader.exists).ok()
      .expect(myDetailsSection.exists).ok()
      .expect(myFundsSection.exists).ok()
    H.StepDescription('should check the elements in block games modal')
    await t
      .expect(blockGameModal.exists).notOk()
      .click(blockGameLink.parent())
      .expect(blockGameModal.exists).ok()
      .expect(editBlockGameLotto.exists).ok()
      .expect(editBlockGameBullseye.exists).ok()
      .expect(editBlockGameKeno.exists).ok()
      .expect(editBlockGamePlay3.exists).ok()
      .expect(closeBlockGamesModal.exists).ok()

    H.StepDescription('should block Lotto Game')
    await t
      .expect(editBlockedGame.exists).notOk()
      .click(editBlockGameLotto)
      .expect(editBlockedGame.exists).ok()
      .expect(cancelEditBlockGame.exists).ok()
      .expect(blockGameDay.exists).ok()
      .typeText(blockGameDay, '10')
      .expect(blockGameMonth.exists).ok()
      .click(blockGameMonth)
      .pressKey('down')
      .expect(blockGameYear.exists).ok()
      .typeText(blockGameYear, '2018')
      .click(blockGamePasswordInput)
      .typeText(blockGamePasswordInput, 'password1')
      .expect(blockLottoGameSubmitButton.exists).ok()
      //.click(blockGameSubmit)   //TODO -- DONT BLOCK THE GAME
      .click(cancelEditBlockGame)
      .expect(editBlockedGame.exists).notOk()
      .expect(blockGameDay.exists).notOk()
      .expect(blockGameMonth.exists).notOk()
      .expect(blockGameYear.exists).notOk()
      .expect(blockGamePasswordInput.exists).notOk()
      .expect(blockLottoGameSubmitButton.exists).notOk()

    H.StepDescription('should block Bullseye Game')
    await t
      .expect(editBlockedGame.exists).notOk()
      .click(editBlockGameBullseye)
      .expect(editBlockedGame.exists).ok()
      .expect(cancelEditBlockGame.exists).ok()
      .expect(blockGameDay.exists).ok()
      .typeText(blockGameDay, '10')
      .expect(blockGameMonth.exists).ok()
      .click(blockGameMonth)
      .pressKey('down')
      .expect(blockGameYear.exists).ok()
      .typeText(blockGameYear, '2018')
      .click(blockGamePasswordInput)
      .typeText(blockGamePasswordInput, 'password1')
      .expect(blockBullseyeGameSubmitButton.exists).ok()
      //.click(blockGameSubmit)   //TODO -- DONT BLOCK THE GAME
      .click(cancelEditBlockGame)
      .expect(editBlockedGame.exists).notOk()
      .expect(blockGameDay.exists).notOk()
      .expect(blockGameMonth.exists).notOk()
      .expect(blockGameYear.exists).notOk()
      .expect(blockGamePasswordInput.exists).notOk()
      .expect(blockBullseyeGameSubmitButton.exists).notOk()

    H.StepDescription('should block Keno Game')
    await t
      .expect(editBlockedGame.exists).notOk()
      .click(editBlockGameKeno)
      .expect(editBlockedGame.exists).ok()
      .expect(cancelEditBlockGame.exists).ok()
      .expect(blockGameDay.exists).ok()
      .typeText(blockGameDay, '10')
      .expect(blockGameMonth.exists).ok()
      .click(blockGameMonth)
      .pressKey('down')
      .expect(blockGameYear.exists).ok()
      .typeText(blockGameYear, '2018')
      .click(blockGamePasswordInput)
      .typeText(blockGamePasswordInput, 'password1')
      .expect(blockKenoGameSubmitButton.exists).ok()
      //.click(blockGameSubmit)   //TODO -- DONT BLOCK THE GAME
      .click(cancelEditBlockGame)
      .expect(editBlockedGame.exists).notOk()
      .expect(blockGameDay.exists).notOk()
      .expect(blockGameMonth.exists).notOk()
      .expect(blockGameYear.exists).notOk()
      .expect(blockGamePasswordInput.exists).notOk()
      .expect(blockKenoGameSubmitButton.exists).notOk()

    H.StepDescription('should block Play3 Game')
    await t
      .expect(editBlockedGame.exists).notOk()
      .click(editBlockGamePlay3)
      .expect(editBlockedGame.exists).ok()
      .expect(cancelEditBlockGame.exists).ok()
      .expect(blockGameDay.exists).ok()
      .typeText(blockGameDay, '10')
      .expect(blockGameMonth.exists).ok()
      .click(blockGameMonth)
      .pressKey('down')
      .expect(blockGameYear.exists).ok()
      .typeText(blockGameYear, '2018')
      .click(blockGamePasswordInput)
      .typeText(blockGamePasswordInput, 'password1')
      .expect(blockPlay3GameSubmitButton.exists).ok()
      //.click(blockGameSubmit)   //TODO -- DONT BLOCK THE GAME
      .click(cancelEditBlockGame)
      .expect(editBlockedGame.exists).notOk()
      .expect(blockGameDay.exists).notOk()
      .expect(blockGameMonth.exists).notOk()
      .expect(blockGameYear.exists).notOk()
      .expect(blockGamePasswordInput.exists).notOk()
      .expect(blockPlay3GameSubmitButton.exists).notOk()
      .click(closeBlockGamesModal)

    H.StepDescription('User logs out')
    await t
      .click(rightMenuLoggedIn.child(1))
      .click(logout)
      .expect(tickets.exists).notOk()
})

test('Close account', async t => {
    H.StepDescription('has navigated to Lotto SIT 1 environment')
    H.StepDescription('should user log in')
    await t
      .click(login)
      .click(loginButton)
      .typeText(email, 'asd@vj.com')
      .typeText(password, 'password1')
      .click(loginSubmit)
    H.StepDescription('Clicks on Settings')
    await t
      .expect(rightMenuLoggedIn.exists).ok()
      .expect(tickets.exists).ok()
      .click(rightMenuLoggedIn.child(1))
      .click(settings)
      .expect(settingsPageHeader.exists).ok()
      .expect(myDetailsSection.exists).ok()
      .expect(myFundsSection.exists).ok()
    H.StepDescription('should check the elements in close account modal')
    await t
      .expect(closeAccountModal.exists).notOk()
      .click(closeAccountLink.parent())
      .expect(closeAccountModal.exists).ok()
      .expect(closeAccountContactUs.exists).ok()
      .expect(feedBack.exists).ok()
      .expect(bankAccountFromCloseAccount.exists).ok()
      .expect(editBankAccountFromCloseAccount.exists).ok()
      .expect(closeAccountPasswordInput.exists).ok()
      .expect(closeAccountSubmitButton.exists).ok()
      .expect(ExitCloseAccountModal.exists).ok()

    H.StepDescription('should write the feedback')
    await t
      .click(feedBack)
      .typeText(feedBack, 'Sorry Lotto. I have to leave you guys..')//TODO

    H.StepDescription('should enter the password to close the account')
    await t
      .click(closeAccountPasswordInput)
      .typeText(closeAccountPasswordInput, 'password1')
      //.click(closeAccountSubmitButton)  //TODO -- DONT CLOSE THIS ACCOUNT.
      .click(ExitCloseAccountModal)
      .expect(closeAccountModal.exists).notOk()
    H.StepDescription('User logs out')
    await t
      .click(rightMenuLoggedIn.child(1))
      .click(logout)
      .expect(tickets.exists).notOk()
})

test('Spending limits', async t => {


    H.StepDescription('has navigated to Lotto SIT 1 environment')
    H.StepDescription('should user log in')
    await t
      .click(login)
      .click(loginButton)
      .typeText(email, '14aug1@vj.com')
      .typeText(password, 'password1')
      .click(loginSubmit)
    H.StepDescription('Clicks on Settings')
    await t
      .expect(rightMenuLoggedIn.exists).ok()
      .expect(tickets.exists).ok()
      .click(rightMenuLoggedIn.child(1))
      .click(settings)
      .expect(settingsPageHeader.exists).ok()
      .expect(myDetailsSection.exists).ok()
      .expect(myFundsSection.exists).ok()
    H.StepDescription('should check the elements in edit spending limit modal')
    await t
      .expect(spendingLimitsModal.exists).notOk()
      .click(spendingLimitsLink.parent())
      .expect(spendingLimitsModal.exists).notOk()
      .expect(weeklySpendingProgressBar.exists).ok()
      .expect(monthlySpendingProgressBar.exists).ok()
      .expect(editSpendingLimit.exists).ok()
      .expect(closeSpendingLimitModal.exists).ok()
      .expect(cancelEditSpendingLimit.exists).notOk()
      .click(editSpendingLimit)
      .expect(cancelEditSpendingLimit.exists).ok()
      .expect(weeklySpendingLimitSlider.exists).ok()
      .expect(monthlySpendingLimitSlider.exists).ok()
      .expect(editSpendingLimitPasswordInput.exists).ok()
      .expect(spendingLimitsSubmitButton.exists).ok()

    H.StepDescription('should edit the weekly spending limit')
    const slider = Selector('.slider-lower-fill.max')
    await t
      .click(slider)
      .expect(weeklySpendingLimitSlider.value).eql('150')
      .setTestSpeed(0.1)
      //TODO .drag(slider, -180, -5, { offsetX: 500, offsetY: 10 })
      //.drag(weeklySpendingLimitSlider, -180, -5, { offsetX: 480, offsetY: 15 })
      //.drag(weeklySpendingLimitSlider, 360, 5)
      //.expect(weeklySpendingLimitSlider.value).eql('100');

    H.StepDescription('should edit the monthly spending limit')
    //const slider = Selector('.slider-lower-fill.max')
    await t
      .click(slider)
      .expect(weeklySpendingLimitSlider.value).eql('150')
      .setTestSpeed(0.1)
      //TODO .drag(slider, -180, -5, { offsetX: 500, offsetY: 10 })
      //TODO Check with Ken Wong

    H.StepDescription('should save the spending limit changes')
    await t
      .click(editSpendingLimitPasswordInput)
      .typeText(editSpendingLimitPasswordInput, 'password1')
      .click(spendingLimitsSubmitButton)

    H.StepDescription('should notify the user with the message')
    const spendingLimitsNotificationModal = Selector('.top-notification-container')
    await t
      .expect(spendingLimitsNotificationModal.exists).ok()

    H.StepDescription('User logs out')
    await t
      .click(rightMenuLoggedIn.child(1))
      .click(logout)
      .expect(tickets.exists).notOk()
})

test('Change my bank account', async t => {


    H.StepDescription('has navigated to Lotto SIT 1 environment')
    H.StepDescription('should user log in')
    await t
      .click(login)
      .click(loginButton)
      .typeText(email, 'asd@vj.com')
      .typeText(password, 'password1')
      .click(loginSubmit)
    H.StepDescription('Clicks on Settings')
    await t
      .expect(rightMenuLoggedIn.exists).ok()
      .expect(tickets.exists).ok()
      .click(rightMenuLoggedIn.child(1))
      .click(settings)
      .expect(settingsPageHeader.exists).ok()
      .expect(myDetailsSection.exists).ok()
      .expect(myFundsSection.exists).ok()
    H.StepDescription('should check the elements in change bank account modal')
    const changeBankAccountLink = Selector('#changeMyBankAccount')
    const bankAccountNumber = Selector('#bankAccountNumber')
    const bankAccountBank = Selector('#bankAccountBank')
    const bankAccountBankBranch = Selector('#bankAccountBranch')
    const bankAccountAccount = Selector('#bankAccountAccount')
    const bankAccountSuffix = Selector('#bankAccountSuffix')
    const bankAccountPassword = Selector('#bankAccountPassword')
    const bankAccountForm = Selector('#bankAccountForm')
    const bankAccountSaveButton = Selector('#bankAccountSaveButton')

    await t
      .expect(bankAccountForm.exists).notOk()
      .click(changeBankAccountLink.parent())
      .expect(bankAccountForm.exists).ok()
      .expect(bankAccountNumber.exists).ok()
      .expect(bankAccountBank.exists).ok()
      .expect(bankAccountBankBranch.exists).ok()
      .expect(bankAccountAccount.exists).ok()
      .expect(bankAccountSuffix.exists).ok()
      .expect(bankAccountPassword.exists).ok()
      .expect(bankAccountSaveButton.exists).ok()

    H.StepDescription('should enter the new bank account number')
    await t
      .typeText(bankAccountBank, '02')
      .typeText(bankAccountBankBranch, '0599')
      .typeText(bankAccountAccount, '3741896')
      .typeText(bankAccountSuffix, '000')
    H.StepDescription('should enter the password to update the bank account')
    await t
      .typeText(bankAccountPassword, 'password1')
    H.StepDescription('should save the new bank account')
    await t
      .click(bankAccountSaveButton)
    H.StepDescription('User logs out')
    await t
      .click(rightMenuLoggedIn.child(1))
      .click(logout)
      .expect(tickets.exists).notOk()
})
