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

//Left menu items
const play = Selector('[href="/play"]')
const howToPlay = Selector('[href="/how-to-play"]')
const whereToPlay = Selector('[href="/where-to-play"]')
const subscribe = Selector('[href="/lotto/subscriptions"]')
const textToPlay = Selector('[href="/lotto/text-service"]')
const winning = Selector('[href="/winning"]')
const theWinningExperience = Selector('[href="/the-winning-experience"]')
const communityFunding = Selector('[href="/community-funding"]')

//Login form components
const email = Selector('input[id="email"]')
const password = Selector('input[id="password"]')
const loginSubmit = Selector('.button.primay.block')
const loginFormClose = Selector('.closeModal')
const loginFormHeader = Selector('.login-header-title')
const needHelpLink = Selector('input[id="cantAccessEmailLinkFromLogin"]')
const forgottenPasswordLink = Selector('input[id="forgotPasswordLinkFromLogin"]')
const loginFormSignUp = Selector('.login-signup-block')
//Error Validation
const emailValidationError = Selector('.validation-message').withText('Email address is required')
const passwordValidationError = Selector('.validation-message').withText('Password is required')
const invalidEmailValidationError = Selector('.validation-message').withText('Invalid email address')

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

fixture `***** Smoke tests for SIT 1 environment *****`
  .page (config.domTestRootUrl)

test('Verify the login workflow', async t => {
    H.StepDescription('has navigated to Lotto SIT 1 environment')
    H.StepDescription('Checks the login form')
    await t
      .click(login)
      .expect(loginButton.exists).ok()
      .expect(registerNowButton.exists).ok()
      .click(loginButton)
      .expect(loginForm.exists).ok()
      .expect(loginFormHeader.exists).ok()
      .expect(email.exists).ok()
    await t
      .expect(password.exists).ok()
      .expect(loginSubmit.exists).ok()
      .expect(loginFormSignUp.exists).ok()
    H.StepDescription('Checks the validation elements in the login form')
    await t
      .click(loginSubmit)
      .expect(emailValidationError.exists).ok()
      .expect(passwordValidationError.exists).ok()
      .typeText(email, 'abc')
      .click(loginSubmit)
      .expect(invalidEmailValidationError.exists).ok()
      .click(email)
      .pressKey('ctrl+a delete')
    H.StepDescription('Enters the valid details in the login form and submit')
    await t
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
     H.StepDescription('User logs out')
     await t
      .click(logout)
      .expect(tickets.exists).notOk()
})

test('Smoke test : Navigate to all pages - as not-logged-in user', async t => {
    H.StepDescription('should check the items under right menu')
    await t
      .click(login)
      .expect(loginButton.exists).ok()
      .expect(registerNowButton.exists).ok()
    H.StepDescription('should check games list')
    await t
      .expect(lottoGame.exists).ok()
      .expect(kenoGame.exists).ok()
      .expect(bullseyeGame.exists).ok()
      .expect(play3Game.exists).ok()
      .expect(instantKiwiGame.exists).ok()
    H.StepDescription('should check top header items')
    await t
      //.setTestSpeed(0.1)
      .expect(menu.exists).ok()
      .expect(results.exists).ok()
      .expect(lottoLogo.exists).ok()
      .expect(login.exists).ok()
    H.StepDescription('should check the items under left menu')
    await t
      .click(menu)
      .expect(play.exists).ok()
      .expect(howToPlay.exists).ok()
      .expect(whereToPlay.exists).ok()
      .expect(subscribe.exists).ok()
      .expect(textToPlay.exists).ok()
      .expect(winning.exists).ok()
      .expect(theWinningExperience.exists).ok()
      .expect(communityFunding.exists).ok()

    //TODO H.StepDescription('should check the footer menu')

    H.StepDescription('should navigate to all games')
    await t
      .click(lottoLogo)
    H.StepDescription('should navigate to Lotto')
    await t
      .click(lottoGame)
    H.StepDescription('should navigate to Keno')
    await t
      .click(kenoGame)
    H.StepDescription('should navigate to Bullseye')
    await t
      .click(bullseyeGame)
    H.StepDescription('should navigate to Play3')
    await t
      .click(play3Game)
    H.StepDescription('should navigate to Instant Kiwi')
    await t
      .click(instantKiwiGame)
    H.StepDescription('should navigate to all links from the left menu')
    await t
          //TODO page content to be validated for the below pages if necessary
      .click(menu)
      .click(play)
      .click(menu)
      .click(howToPlay)
      .click(menu)
      .click(whereToPlay)
      .click(menu)
      .click(subscribe)
      .click(menu)
      .click(textToPlay)
      .click(menu)
      .click(winning)
      .click(menu)
      .click(theWinningExperience)
      .click(menu)
      .click(communityFunding)

})

