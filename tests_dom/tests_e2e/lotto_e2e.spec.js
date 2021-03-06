import { Selector } from 'testcafe'
import Helpers from '../test_utils/helpers'
import config from '../test_utils/config'
import { ClientFunction } from 'testcafe';

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
const closeRightMenu = Selector('#nav-menu-account-pulldown-closelink')
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

//Lotto Dip
const burgerMenuIcon = Selector('#nav-menu-main-menu')
const lottoStrikeLinkFromLeft = Selector('#navLottoleft')
const LottoStrikeLinkFromTop = Selector('#navLottosecondary' )
const lottoBuyDip = Selector('#buyADip')
const lottoPYO = Selector('#pickYourOwn')
const textServiceButton = Selector('#textService')
const buyStrike = Selector('#buyStrike')
const eCommerceBar = Selector('#ecommerceBar')
const eCommerceMaximize = Selector('#maximiseBar')
const ecommerceBarBuyButton = Selector('#buyButton')
const buyADipHeader = Selector('#lottoDips > div.scrollView > div.l-section-content > div > div > div')
const luckyDip0580 = Selector('#luckyDipSash > div.dipItemWrapper > a:nth-child(1)')
const totalCost0580 = Selector('#totalIs560Dollars')
const buyNowPrice = Selector('.buyNowPrice')
const buyButton = Selector('#buyButton')
const powerBallUpSell = Selector('#PowerballUpsell')
const strikeUpSell = Selector('#strikeUpsellComponent')
const wednesdayDraw = Selector('#playWednesday')
const saturdayDraw = Selector('#playSaturday')
const multiDraw = Selector('#revealTab-moreDraws')
const previewYourSelection = Selector('#ticket')
const ticketPreview = Selector('#viewTicket_lotto_undefined')
const editTicketButton = Selector('#editYourLottoTicket')
const closeModal = Selector('#close-modal')
const ticketSummaryDetails = Selector('#totals-summary-title')
const ticketCostPerDraw = Selector('#totals-powerball-cost')
const totalNumberOfDraws = Selector('#totals-number-of-draws')
const totalTitle = Selector('#totals-title')
const totalCost = Selector('#totals-no-subs')
const confirmPurchase = Selector('#confirmation-button')
const thanksPageHeader = Selector('#thanksIntroTitle')
const thanksIntroDescription = Selector('#thanksIntroDescription')
const viewDetailsButton = Selector('.button.game-ticket-view-btn ')
const viewPurchasedTicketHeader = Selector('#myTicketHeader')
const viewPurchasedTicketBody = Selector('.viewFullTicketWrapper')
const purchasedTicketHeader = Selector('.gameTicketHeader')
const drawDateOfPurchasedTicket = Selector('.gameTicketDrawDate')
const typeOfPurchasedTicket = Selector('.gameTicketDipNameTxt')
const costOfPurchasedTicket = Selector('.gameTicketDipCostTxt')
const ticketSummaryThanksPage = Selector('.gameTicketPurchaseSummary')
const editNamePYO2Fav = Selector('#editNameYourFavourite')
const saveFavName = Selector ('#favouriteTicketSave')
const drawHappeningPYO = Selector('#ticketLottoTitleDrawHappening0')
const ticketBodyPYO = Selector('.gameTicketBoard')
const drawSummaryPYO = Selector('.gameTicketFooterSummaries')
//PYO Specific
const powerBallToggle =Selector('#powerballToggle')
const autoFillLine1 = Selector('#autofillLine1')
const refreshPYONumbers = Selector('#bullseyeRefresh')
const deleteLine1 = Selector('#deleteLine1')
const a1Position = Selector('#lottoPositionA1')
const a2Position = Selector('#lottoPositionA2')
const a3Position = Selector('#lottoPositionA3')
const a4Position = Selector('#lottoPositionA4')
const a5Position = Selector('#lottoPositionA5')
const a6Position = Selector('#lottoPositionA6')
const emptyNumber = Selector('.editLineNoNumber')
const autoFillLine2 = Selector('#autofillLine2')
const deleteLine2 = Selector('#deleteLine2')
const autoFillLine3 = Selector('#autofillLine3')
const deleteLine3 = Selector('#deleteLine3')
const autoFillLine4 = Selector('#autofillLine4')
const autoFillLine5 = Selector('#autofillLine5')
const deleteLine4 = Selector('#deleteLine4')
//Favourites
const createLottoFavourite = Selector('#addYourFavourite_lotto')
const createStrikeFavourite = Selector('#addYourFavourite_strike')
const favouriteName = Selector('#favouriteName')
const editFavouriteName = Selector('.favouriteTicketName.ticketDetailModalHeader')
const deleteFavourite = Selector('#favouriteTicketDelete')

//Subscription
const myTicketsTab = Selector('#select-page-my-tickets')
const favouritesTab = Selector('#select-page-favourites')
const subscriptionsTab = Selector('#select-page-subscriptions')
const subscriptionsPageHeader = Selector('#subscriptionsHeader')
const completedSubscriptionsHeader = Selector('#completedSubscriptionsContainer')
const subscribeNow = Selector('.gameTicketWrapperInner.gameTicketWrapperSubsPreview')
const subsFavTab = Selector('#react-tabs-10')
const subsTripleDipTab = Selector('#react-tabs-12')
const subsPowerDipTab = Selector('#react-tabs-14')
const subsLuckyDipTab = Selector('#react-tabs-16')
const dollar28Dip = Selector('.pill').nth(0)
const bothDraws = Selector('#day_option_0')
const wedOnly = Selector('#day_option_1')
const satOnly = Selector('#day_option_2')
const months3 = Selector('#duration_option_0')
const months6 = Selector('#duration_option_1')
const months12 = Selector('#duration_option_2')
const payByMyLotto = Selector('#payment_option_balance')
    //TODO - Simplify the subscriptionStartButton Selector
const subscriptionStartButton = Selector('#main > div.sectionWrapper > div:nth-child(3) > div > section > div:nth-child(5) > form > div.center-xs > button')
    //const subscriptionStartButton = Selector('.form-confirmation.payment-options').filter('.button').withText('Start')
    //const subscriptionStartButton = Selector('.form-confirmation.payment-options').child(2)
const subscriptionStartButtonInModal = Selector('#react-aria-modal-dialog > div > div > div > div > section > div:nth-child(3) > form > div.center-xs > button')
const subscriptionSuccessModal = Selector('.modalContent')
const okButtonInSubsSucessModal = Selector('#confirmOk')
const subsDetailsModalHeader = Selector('.ticketDetailModalHeader')
const subsDetailsModalSummary = Selector('.subscriptionDetailModalSummary')
const stopSubscriptionButton = Selector('.subscriptionActionButton')
const completedSubscriptionName = Selector('.subsColumnName').nth(1)
const completedSubscriptionGame = Selector('.subsColumnGame').nth(1)
const completedSubscriptionDrawDay = Selector('.subsColumnDrawDay').nth(1)
const completedSubscriptionPricePerDraw = Selector('.subsColumnPricePerDraw').nth(1)
const completedSubscriptionEndDate = Selector('.subsColumnEndDate').nth(1)
const completedSubscriptionRestart = Selector('.subsColumnActions').child(0)
const completedSubscriptionViewDetailsIcon = Selector('.subsColumnActions').child(1)
const restartSubscriptionButton = Selector('.subscriptionActionButton').withText('RESTART')
const deleteSubscriptionButton = Selector('.subscriptionActionButton').withText('DELETE')
const confirmDeleteSubscriptionModal = Selector('.confirm')
const cancelDeleteSubscriptionButton = Selector('.button.block').nth(0)
const okDeleteSubscriptionButton = Selector('.button.block').nth(1)
//Strike

const buyStrikeButton = Selector('#buyStrike')
const strikeDipsSection = Selector('.strike-only-upsell')
const strikeDipsSlider = Selector('input[name="strikeLines"]')
const strikeTicket = Selector('.strikeTicket.ticketSelector')
const strikeNumbers = Selector('.strikeNumberSelector.ticketSelector')
const strikeLineA = Selector('#strikeLineA')
const strikeLineB = Selector('#strikeLineB')
const strikeAutoFillLineA = Selector('#strikeAutofillLine1')
const strikeAutoFillLineB = Selector('#strikeAutofillLine2')
const strikeRefreshLineA = Selector(strikeLineA).filter('#strikeRefresh')
const strikeRefreshLineB = Selector(strikeLineB).filter('#strikeRefresh')
const strikeRefresh = Selector('#strikeRefresh')
const strikeDeleteLineA = Selector('#strikeDeleteLine1')
const strikeDeleteLineB = Selector('#strikeDeleteLine2')
const strikeA1 = Selector('#strikePositionA1')
const strikeA2 = Selector('#strikePositionA2')
const strikeA3 = Selector('#strikePositionA3')
const strikeA4 = Selector('#strikePositionA4')
const strikeB1 = Selector('#strikePositionB1')
const strikeB2 = Selector('#strikePositionB2')
const strikeB3 = Selector('#strikePositionB3')
const strikeB4 = Selector('#strikePositionB4')
const strikeNumber1 = Selector('#strikeNumberSelector').find('#strikeNumber1')
const strikeNumber2 = Selector('#strikeNumberSelector').find('#strikeNumber2')
const strikeNumber3 = Selector('.numberPosition').withText('3')
const strikeNumber4 = Selector('.numberPosition').withText('4')
const strikeTicketPreviewModal = Selector('.viewFullTicketWrapper')
const editStrikeTicketFromPreview = Selector('#editYourStrikeTicket')
const numberOfStrikeLines = Selector('#totals-strike-boards')
const costOfStrikePerDraw = Selector('#totals-strike-cost')

fixture `***** Verify the games in Lotto family *****`
  .page (config.sitUrl)
  .beforeEach( async t => {
      H.StepDescription('has navigated to MyLotto Home Page')
    H.StepDescription('should login with valid credentials')
    await t
      .click(login)
      .click(loginButton)
      .typeText(email, config.userName)
      .typeText(password, config.password)
      .click(loginSubmit)
  })
  .afterEach(async t => {
    H.StepDescription('User logs out')
    if(!closeModal.exists){
      await t
      .click(closeModal)
    }
    await t
      .click(rightMenuLoggedIn.child(1))
      .click(logout)
      .expect(tickets.exists).notOk()
    })

const endAnimationWatcher = ClientFunction(() => {
    return new Promise(resolve => {
        var interval = setInterval(() => {
            if (document.querySelector('.spinner'))
                return;

            clearInterval(interval);
            resolve();
        }, 100);
    });
});

test('Lotto - Dip single draw', async t => {
  H.StepDescription('should confirm the login')
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
    .click(closeRightMenu)

  H.StepDescription('should check the browser mode and navigate to games accordingly')
  const gamesAtTopAvailable = Selector('.themeNavSecondary')
  let isSecondaryNavHidden = false
  await gamesAtTopAvailable.getStyleProperty('display').then((res) => {
    return isSecondaryNavHidden = res === 'none'
  })

  if( ! isSecondaryNavHidden) {
    await t
       .click(LottoStrikeLinkFromTop)

  }
  else {
    await t
     .click(burgerMenuIcon)
     .click(lottoStrikeLinkFromLeft)
  }

  H.StepDescription('should select $5.80 Lotto dip')
  await t
      .click(lottoBuyDip)
      .click(luckyDip0580)
      .expect(totalCost0580.exists).ok()
      .expect(buyButton.exists).ok()
      .click(buyButton)
  H.StepDescription('should preview the $5.80 Lotto dip')
  await t
    .expect(powerBallUpSell.exists).ok()
    .expect(saturdayDraw.exists).ok()
    .expect(wednesdayDraw.exists).ok()
    .expect(previewYourSelection.exists).ok()
    .click(previewYourSelection)
    .expect(ticketPreview.exists).ok()
    .expect(editTicketButton.exists).ok()
    .expect(closeModal.exists).ok()
    .click(closeModal)
  H.StepDescription('should confirm purchase of $5.80 Single draw Lotto dip')
  await t
    .expect(ticketSummaryDetails.exists).ok()
    .expect(ticketCostPerDraw.exists).ok()
    .expect(ticketCostPerDraw.innerText).eql('$5.60')
    .expect(totalNumberOfDraws.exists).ok()
    .expect(totalNumberOfDraws.innerText).eql('x1')
    .expect(totalTitle.exists).ok()
    .expect(totalCost.exists).ok()
    .expect(totalCost.innerText).eql('$5.60')
    .expect(confirmPurchase.exists).ok()
    .click(confirmPurchase)
  H.StepDescription('should display the thanks page')
  await endAnimationWatcher();
  await t
    .wait(3000)
    .expect(thanksPageHeader.exists).ok()
    .expect(thanksIntroDescription.exists).ok()
    .expect(purchasedTicketHeader.exists).ok()
    .expect(purchasedTicketHeader.innerText).contains('Draw happening:')
    .expect(drawDateOfPurchasedTicket.exists).ok()
    .expect(typeOfPurchasedTicket.exists).ok()
    .expect(costOfPurchasedTicket.exists).ok()
  H.StepDescription('should view the details of purchased Lotto dip')
  await t
    .expect(viewDetailsButton.exists).ok()
    .click(viewDetailsButton)
    .expect(viewPurchasedTicketHeader.exists).ok()
      .expect(viewPurchasedTicketBody.exists).ok()
      .click(closeModal)
})

test('Lotto - PYO single draw', async t => {

  const updatedFavouriteName = await H.makeFavName()
  const favName = await H.makeFavName()
  const favFromMyFavourites = Selector('.gameTicketFavouriteTitle').withText(favName)
  const viewTicketsForNewFav = Selector(favFromMyFavourites).parent('div').nth(6)
  const latestFavourite = Selector('.gameTicketFavouriteTitle').withText(updatedFavouriteName)
  const latestFavFromMyFavourites = Selector('.gameTicketFavouriteTitle').withText(updatedFavouriteName)
  const viewLatestFavourite = Selector(latestFavFromMyFavourites).parent('div').nth(6)

  H.StepDescription('should check the browser mode and navigate to games accordingly')
  const gamesAtTopAvailable = Selector('.themeNavSecondary')
  let isSecondaryNavHidden = false
  await gamesAtTopAvailable.getStyleProperty('display').then((res) => {
    return isSecondaryNavHidden = res === 'none'
  })

  if( ! isSecondaryNavHidden) {
    await t
       .click(LottoStrikeLinkFromTop)

  }
  else {
    await t
     .click(burgerMenuIcon)
     .click(lottoStrikeLinkFromLeft)
  }

  H.StepDescription('should select Pick your own')
  await t
     .click(lottoPYO)
  H.StepDescription('should auto select the first 4 lines')
  await t
    .expect(autoFillLine1.exists).ok()
    .click(autoFillLine1)
    .expect(autoFillLine1.exists).notOk()
    .expect(refreshPYONumbers.nth(0).exists).ok()
    .expect(a1Position.hasClass(emptyNumber)).notOk()
    .expect(a2Position.hasClass(emptyNumber)).notOk()
    .expect(a3Position.hasClass(emptyNumber)).notOk()
    .expect(a4Position.hasClass(emptyNumber)).notOk()
    .expect(a5Position.hasClass(emptyNumber)).notOk()
    .expect(a6Position.hasClass(emptyNumber)).notOk()
    .click(refreshPYONumbers.nth(0))
    .expect(deleteLine1.exists).ok()
    .click(deleteLine1)
    .expect(autoFillLine1.exists).ok()
    .click(autoFillLine1)
    .expect(autoFillLine2.exists).ok()
    .click(autoFillLine2)
    .expect(autoFillLine3.exists).ok()
    .click(autoFillLine3)
    .expect(autoFillLine4.exists).ok()
    .click(autoFillLine4)
  H.StepDescription('should tap BUY button')
  await t
    .expect(buyNowPrice.exists).ok()
    .expect(buyButton.exists).ok()
    .click(buyButton)
  H.StepDescription('should preview PYO Lotto ticket')
  await t
    .expect(strikeUpSell.exists).ok()
    .expect(saturdayDraw.exists).ok()
    .expect(wednesdayDraw.exists).ok()
    .expect(previewYourSelection.exists).ok()
    .click(previewYourSelection)
    .expect(ticketPreview.exists).ok()
    .expect(editTicketButton.exists).ok()
    .expect(closeModal.exists).ok()
    .click(closeModal)
  H.StepDescription('should confirm purchase of PYO')
  await t
    .expect(ticketSummaryDetails.exists).ok()
    .expect(ticketCostPerDraw.exists).ok()
      //.expect(ticketCostPerDraw.innerText).eql('$5.60')
    .expect(totalNumberOfDraws.exists).ok()
    .expect(totalNumberOfDraws.innerText).eql('x1')
    .expect(totalTitle.exists).ok()
    .expect(totalCost.exists).ok()
    .expect(totalCost.innerText).eql('$6.00')
    .expect(confirmPurchase.exists).ok()
    .click(confirmPurchase)
  H.StepDescription('should display the thanks page')
  await endAnimationWatcher();
  await t
    .wait(3000)
    .expect(thanksPageHeader.exists).ok()
    .expect(thanksIntroDescription.exists).ok()
    .expect(purchasedTicketHeader.exists).ok()
    .expect(purchasedTicketHeader.innerText).contains('Draw happening:')
    .expect(drawDateOfPurchasedTicket.exists).ok()
    .expect(typeOfPurchasedTicket.exists).notOk()
    .expect(costOfPurchasedTicket.exists).ok()
  H.StepDescription('should view the details of purchased Lotto PYO')
  await t
    .expect(viewDetailsButton.exists).ok()
    .click(viewDetailsButton)
  H.StepDescription('should save the PYO as Favourite')
  await t
    .expect(editNamePYO2Fav.exists).ok()
    .expect(drawHappeningPYO.exists).ok()
    .expect(ticketBodyPYO.exists).ok()
    .expect(drawSummaryPYO.exists).ok()
    .click(editNamePYO2Fav)
    .typeText(editNamePYO2Fav, favName)
    .click(saveFavName)
    .expect(closeModal.exists).notOk()

})

test('Subscription - Start/Stop/Restart/Delete', async t => {
  H.StepDescription('should navigate to Subscription page')
  await t
      .click(myTickets)
      .expect(myTicketsTab.exists).ok()
      .expect(favouritesTab.exists).ok()
      .expect(subscriptionsTab.exists).ok()
      .click(subscriptionsTab)
      .expect(subscriptionsPageHeader.innerText).contains('Active Subscriptions')
      .expect(completedSubscriptionsHeader.exists).ok()
      .click(subscribeNow)

  H.StepDescription('should select any of the triple dip')
  await t
      .expect(satOnly.hasAttribute('disabled')).ok('should be enabled')
      .click(dollar28Dip)
      .pressKey('pagedown pagedown pagedown pagedown pagedown pagedown pagedown pagedown')

  H.StepDescription('should select saturday only draw')
  await t
    .expect(bothDraws.exists).ok()
    .expect(wedOnly.exists).ok()
    .expect(satOnly.exists).ok()
    .expect(satOnly.hasAttribute('disabled')).notOk('should be enabled')
    .expect(months3.hasAttribute('disabled')).ok('should be disabled until the draw day is selected')
    .expect(months6.hasAttribute('disabled')).ok('should be disabled until the draw day is selected')
    .expect(months12.hasAttribute('disabled')).ok('should be disabled until the draw day is selected')
    .click(satOnly.parent())
    .pressKey('pagedown pagedown pagedown pagedown pagedown pagedown pagedown pagedown')
    .expect(months3.hasAttribute('disabled')).notOk('should be enabled once the draw day is selected')
    .expect(months6.hasAttribute('disabled')).notOk('should be enabled once the draw day is selected')
    .expect(months12.hasAttribute('disabled')).notOk('should be enabled once the draw day is selected')

  H.StepDescription('should select 3 months duration')
  await t
    .expect(payByMyLotto.hasAttribute('disabled')).ok('should be disabled until the duration is selected')
    .click(months3.parent())
    .expect(payByMyLotto.hasAttribute('disabled')).notOk()
    .pressKey('pagedown pagedown pagedown pagedown pagedown pagedown pagedown pagedown')

  H.StepDescription('should select myLotto Account')
  await t
    .click(payByMyLotto.parent())
    .pressKey('pagedown pagedown pagedown pagedown pagedown pagedown pagedown pagedown')
    .expect(subscriptionStartButton.exists).ok()
    .expect(subscriptionStartButton.hasAttribute('disabled')).notOk()

  H.StepDescription('should start the subscription')
  await t
    .click(subscriptionStartButton)
    .expect(okButtonInSubsSucessModal.exists).ok()
    .click(okButtonInSubsSucessModal)

  H.StepDescription('should view the created subscription')
  await t
    .click(viewDetailsButton)
    .expect(subsDetailsModalHeader.innerText).contains('Active\nTriple Dip')
    .expect(subsDetailsModalSummary.exists).ok()
    .click(closeModal)

  H.StepDescription('should stop the subscription')
  await t
    .click(viewDetailsButton)
    .expect(subsDetailsModalHeader.innerText).contains('Active\nTriple Dip')
    .expect(subsDetailsModalSummary.exists).ok()
    .expect(stopSubscriptionButton.innerText).eql('STOP')
    .click(stopSubscriptionButton)
    .expect(completedSubscriptionName.innerText).eql('Triple Dip')
    .expect(completedSubscriptionGame.innerText).eql('Lotto')
    .expect(completedSubscriptionDrawDay.innerText).eql('Sat')
    .expect(completedSubscriptionPricePerDraw.innerText).eql('$28.00')
    .expect(completedSubscriptionEndDate.innerText).eql('Stopped')
    .expect(completedSubscriptionRestart.exists).ok()
    .expect(completedSubscriptionRestart.innerText).eql('Restart')
    .expect(completedSubscriptionViewDetailsIcon.exists).ok()

  H.StepDescription('should restart the subscription')
  await t
    .click(completedSubscriptionRestart)
    .click(satOnly.parent())
    .click(months3.parent())
    .click(payByMyLotto.parent())
    .click(subscriptionStartButtonInModal)
    .click(okButtonInSubsSucessModal)
    // .expect(completedSubscriptionName.exists).notOk()
    // .expect(completedSubscriptionGame.exists).notOk()
    // .expect(completedSubscriptionDrawDay.exists).notOk()
    // .expect(completedSubscriptionPricePerDraw.exists).notOk()
    // .expect(completedSubscriptionEndDate.exists).notOk()
    // .expect(completedSubscriptionRestart.exists).notOk()
    // .expect(completedSubscriptionViewDetailsIcon.exists).notOk()

  H.StepDescription('should delete the subscription')
  await t
    .click(viewDetailsButton)
    .expect(subsDetailsModalHeader.innerText).contains('Active\nTriple Dip')
    .expect(subsDetailsModalSummary.exists).ok()
    .expect(stopSubscriptionButton.innerText).eql('STOP')
    .click(stopSubscriptionButton)
    .expect(completedSubscriptionName.innerText).eql('Triple Dip')
    .expect(completedSubscriptionGame.innerText).eql('Lotto')
    .expect(completedSubscriptionDrawDay.innerText).eql('Sat')
    .expect(completedSubscriptionPricePerDraw.innerText).eql('$28.00')
    .expect(completedSubscriptionEndDate.innerText).eql('Stopped')
    .expect(completedSubscriptionRestart.exists).ok()
    .expect(completedSubscriptionRestart.innerText).eql('Restart')
    .expect(completedSubscriptionViewDetailsIcon.exists).ok()
    .click(completedSubscriptionViewDetailsIcon)
    .expect(subsDetailsModalHeader.innerText).contains('Stopped\nTriple Dip')
    .expect(subsDetailsModalSummary.exists).ok()
    .expect(restartSubscriptionButton.innerText).eql('RESTART')
    .expect(deleteSubscriptionButton.innerText).eql('DELETE')
    .expect(deleteSubscriptionButton.exists).ok()
    .click(deleteSubscriptionButton)
    .expect(confirmDeleteSubscriptionModal.exists).ok()
    .expect(cancelDeleteSubscriptionButton.exists).ok()
    .expect(okDeleteSubscriptionButton.exists).ok()
    .click(okDeleteSubscriptionButton)
    // .expect(completedSubscriptionName.exists).notOk()
    // .expect(completedSubscriptionGame.exists).notOk()
    // .expect(completedSubscriptionDrawDay.exists).notOk()
    // .expect(completedSubscriptionPricePerDraw.exists).notOk()
    // .expect(completedSubscriptionEndDate.exists).notOk()
    // .expect(completedSubscriptionRestart.exists).notOk()
    // .expect(completedSubscriptionViewDetailsIcon.exists).notOk()
})

test('In Purchase Favourites - StrikeOnly', async t => {
  H.StepDescription('should confirm the login')
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
    .click(closeRightMenu)
  H.StepDescription('should check the browser mode and navigate to games accordingly')
  const gamesAtTopAvailable = Selector('.themeNavSecondary')
  let isSecondaryNavHidden = false
  await gamesAtTopAvailable.getStyleProperty('display').then((res) => {
    return isSecondaryNavHidden = res === 'none'
  })

  if( ! isSecondaryNavHidden) {
    await t
       .click(LottoStrikeLinkFromTop)

  }
  else {
    await t
     .click(burgerMenuIcon)
     .click(lottoStrikeLinkFromLeft)
  }
  await t
    .click(buyStrikeButton)
    .expect(strikeDipsSection.exists).ok()
    .expect(strikeDipsSlider.exists).ok()
    .expect(strikeDipsSlider.value).eql('0')
    .expect(strikeTicket.exists).ok()
    .expect(strikeNumbers.exists).ok()
    .click(strikeAutoFillLineA)
    .expect(strikeDipsSlider.value).eql('0')
    .expect(buyNowPrice.innerText).eql('$1.00')
    .click(buyButton)

  H.StepDescription('should preview the 1 line strike PYO')
  await t
    .expect(saturdayDraw.exists).ok()
    .expect(wednesdayDraw.exists).ok()
    .expect(previewYourSelection.exists).ok()
    .click(previewYourSelection)
    .expect(strikeTicketPreviewModal.exists).ok()
    .expect(editStrikeTicketFromPreview.exists).ok()
    .expect(closeModal.exists).ok()
    .click(editStrikeTicketFromPreview)
    .expect(strikeDipsSlider.value).eql('0')
    .expect(buyNowPrice.innerText).eql('$1.00')
    .click(strikeRefresh.nth(0))
  await t.click(strikeNumber1)
  await t.click(strikeNumber2)
  await t.click(strikeNumber3)
  await t.click(strikeNumber4)
    .expect(strikeDipsSlider.value).eql('0')
    .expect(buyNowPrice.innerText).eql('$2.00')
    .click(buyButton)

  H.StepDescription('should confirm purchase of 2 lines of strike PYO')
  await t
    .expect(ticketSummaryDetails.exists).ok()
    .expect(numberOfStrikeLines.exists).ok()
    .expect(costOfStrikePerDraw.innerText).eql('$2.00')
    .expect(totalNumberOfDraws.exists).ok()
    .expect(totalNumberOfDraws.innerText).eql('x1')
    .expect(totalTitle.exists).ok()
    .expect(totalCost.exists).ok()
    .expect(totalCost.innerText).eql('$2.00')
    .expect(confirmPurchase.exists).ok()
    .click(confirmPurchase)

  H.StepDescription('should display the thanks page')
  await endAnimationWatcher();
  await t
    .wait(3000)
    .expect(thanksPageHeader.exists).ok()
    .expect(thanksIntroDescription.exists).ok()
    .expect(thanksIntroDescription.innerText).eql('Here is your ticket')
    .expect(purchasedTicketHeader.exists).ok()
    .expect(purchasedTicketHeader.innerText).contains('Draw happening:')
    .expect(drawDateOfPurchasedTicket.exists).ok()
    .expect(costOfPurchasedTicket.exists).ok()
    .expect(ticketSummaryThanksPage.exists).ok()
    .expect(ticketSummaryThanksPage.innerText).eql('2Strike lines')

  H.StepDescription('should view the details of purchased strike lines')
  await t
    .expect(viewDetailsButton.exists).ok()
    .click(viewDetailsButton)
    .expect(viewPurchasedTicketHeader.exists).ok()
    .expect(viewPurchasedTicketBody.exists).ok()

  H.StepDescription('should save the Strike PYO as Favourite')
  await t
    .expect(editNamePYO2Fav.exists).ok()
    .expect(saveFavName.hasAttribute('disabled')).ok()
    .expect(drawHappeningPYO.exists).ok()
    .expect(ticketBodyPYO.exists).ok()
    .expect(drawSummaryPYO.exists).ok()
    .click(editNamePYO2Fav)
    .typeText(editNamePYO2Fav, await H.makeFavName())
    .click(saveFavName)
    .expect(closeModal.exists).notOk()
})

test('Strike - PYO single draw', async t => {

  H.StepDescription('should check the browser mode and navigate to games accordingly')
  const gamesAtTopAvailable = Selector('.themeNavSecondary')
  let isSecondaryNavHidden = false
  await gamesAtTopAvailable.getStyleProperty('display').then((res) => {
    return isSecondaryNavHidden = res === 'none'
  })

  if( ! isSecondaryNavHidden) {
    await t
       .click(LottoStrikeLinkFromTop)

  }
  else {
    await t
     .click(burgerMenuIcon)
     .click(lottoStrikeLinkFromLeft)
  }
  await t
    .click(buyStrikeButton)
    .expect(strikeDipsSection.exists).ok()
    .expect(strikeDipsSlider.exists).ok()
    .expect(strikeDipsSlider.value).eql('0')
    .expect(strikeTicket.exists).ok()
    .expect(strikeNumbers.exists).ok()
    .click(strikeAutoFillLineA)
    .expect(strikeDipsSlider.value).eql('0')
    .expect(buyNowPrice.innerText).eql('$1.00')
    .click(buyButton)

  H.StepDescription('should preview the 1 line strike PYO and add 1 more line manually')
  await t
    .expect(saturdayDraw.exists).ok()
    .expect(wednesdayDraw.exists).ok()
    .expect(previewYourSelection.exists).ok()
    .click(previewYourSelection)
    .expect(strikeTicketPreviewModal.exists).ok()
    .expect(editStrikeTicketFromPreview.exists).ok()
    .expect(closeModal.exists).ok()
    .click(editStrikeTicketFromPreview)
    .expect(strikeDipsSlider.value).eql('0')
    .expect(buyNowPrice.innerText).eql('$1.00')
    .click(strikeRefresh.nth(0))
  await t.click(strikeNumber1)
    //.expect(strikeB1.innerText).eql('1\n')
  await t.click(strikeNumber2)
    //.expect(strikeB2.innerText).eql('2\n')
  await t.click(strikeNumber3)
    //.expect(strikeB3.innerText).eql('3\n')
  await t.click(strikeNumber4)
    //.expect(strikeB4.innerText).eql('4\n')
    .expect(strikeDipsSlider.value).eql('0')
    .expect(buyNowPrice.innerText).eql('$2.00')
    .click(buyButton)

  H.StepDescription('should confirm purchase of 2 lines of strike PYO')
  await t
    .expect(ticketSummaryDetails.exists).ok()
    .expect(numberOfStrikeLines.exists).ok()
    .expect(costOfStrikePerDraw.innerText).eql('$2.00')
    .expect(totalNumberOfDraws.exists).ok()
    .expect(totalNumberOfDraws.innerText).eql('x1')
    .expect(totalTitle.exists).ok()
    .expect(totalCost.exists).ok()
    .expect(totalCost.innerText).eql('$2.00')
    .expect(confirmPurchase.exists).ok()
    .click(confirmPurchase)

  H.StepDescription('should display the thanks page')
  await endAnimationWatcher();
  await t
    .wait(3000)
    .expect(thanksPageHeader.exists).ok()
    .expect(thanksIntroDescription.exists).ok()
    .expect(thanksIntroDescription.innerText).eql('Here is your ticket')
    .expect(purchasedTicketHeader.exists).ok()
    .expect(purchasedTicketHeader.innerText).contains('Draw happening:')
    .expect(drawDateOfPurchasedTicket.exists).ok()
    .expect(costOfPurchasedTicket.exists).ok()
    .expect(ticketSummaryThanksPage.exists).ok()
    .expect(ticketSummaryThanksPage.innerText).eql('2Strike lines')

  H.StepDescription('should view the details of purchased strike lines')
  await t
    .expect(viewDetailsButton.exists).ok()
    .click(viewDetailsButton)
    .expect(viewPurchasedTicketHeader.exists).ok()
    .expect(viewPurchasedTicketBody.exists).ok()

  H.StepDescription('should save the Strike PYO as Favourite')
  await t
    .expect(editNamePYO2Fav.exists).ok()
    .expect(saveFavName.hasAttribute('disabled')).ok()
    .expect(drawHappeningPYO.exists).ok()
    .expect(ticketBodyPYO.exists).ok()
    .expect(drawSummaryPYO.exists).ok()
    .click(editNamePYO2Fav)
    .typeText(editNamePYO2Fav, await H.makeFavName())
    .click(saveFavName)
    .expect(closeModal.exists).notOk()
})

test('Strike - Dips single draw', async t => {
  H.StepDescription('should check the browser mode and navigate to games accordingly')
    const gamesAtTopAvailable = Selector('.themeNavSecondary')
    let isSecondaryNavHidden = false
    await gamesAtTopAvailable.getStyleProperty('display').then((res) => {
      return isSecondaryNavHidden = res === 'none'
    })

    if( ! isSecondaryNavHidden) {
      await t
         .click(LottoStrikeLinkFromTop)

    }
    else {
      await t
       .click(burgerMenuIcon)
       .click(lottoStrikeLinkFromLeft)
    }
  H.StepDescription('should select Strike dips')
  await t
    .click(buyStrikeButton)
    .expect(strikeDipsSection.exists).ok()
    .expect(strikeDipsSlider.exists).ok()
    .expect(strikeDipsSlider.value).eql('0')
    .expect(strikeTicket.exists).ok()
    .expect(strikeNumbers.exists).ok()
    .expect(buyNowPrice.innerText).eql('$0.00')
    .typeText(strikeDipsSlider, '2')
    .expect(strikeDipsSlider.value).eql('2')
    .expect(buyNowPrice.innerText).eql('$2.00')
    .click(buyButton)

  H.StepDescription('should preview the 2 line strike dip')
  await t
    .expect(saturdayDraw.exists).ok()
    .expect(wednesdayDraw.exists).ok()
    .expect(previewYourSelection.exists).ok()
    .click(previewYourSelection)
    .expect(strikeTicketPreviewModal.exists).ok()
    .expect(editStrikeTicketFromPreview.exists).ok()
    .expect(closeModal.exists).ok()
    .click(editStrikeTicketFromPreview)
    .expect(strikeDipsSlider.value).eql('2')
    .expect(buyNowPrice.innerText).eql('$2.00')
    .typeText(strikeDipsSlider, '4')
    .expect(strikeDipsSlider.value).eql('4')
    .expect(buyNowPrice.innerText).eql('$4.00')
    .click(buyButton)

  H.StepDescription('should confirm purchase of 4 line strike dip')
  await t
    .expect(ticketSummaryDetails.exists).ok()
    .expect(numberOfStrikeLines.exists).ok()
    .expect(costOfStrikePerDraw.innerText).eql('$4.00')
    .expect(totalNumberOfDraws.exists).ok()
    .expect(totalNumberOfDraws.innerText).eql('x1')
    .expect(totalTitle.exists).ok()
    .expect(totalCost.exists).ok()
    .expect(totalCost.innerText).eql('$4.00')
    .expect(confirmPurchase.exists).ok()
    .click(confirmPurchase)

  H.StepDescription('should display the thanks page')
   await endAnimationWatcher();
   await t
    .wait(3000)
    .expect(thanksPageHeader.exists).ok()
    .expect(thanksIntroDescription.exists).ok()
    .expect(thanksIntroDescription.innerText).eql('Here is your ticket')
    .expect(purchasedTicketHeader.exists).ok()
    .expect(purchasedTicketHeader.innerText).contains('Draw happening:')
    .expect(drawDateOfPurchasedTicket.exists).ok()
    .expect(costOfPurchasedTicket.exists).ok()
    .expect(ticketSummaryThanksPage.exists).ok()
    .expect(ticketSummaryThanksPage.innerText).eql('4Strike lines')

  H.StepDescription('should view the details of purchased Lotto dip')
  await t
    .expect(viewDetailsButton.exists).ok()
    .click(viewDetailsButton)
    .expect(viewPurchasedTicketHeader.exists).ok()
    .expect(viewPurchasedTicketBody.exists).ok()
    .click(closeModal)
})

test('In purchase Favourites - Lotto and PB', async t => {
  const updatedFavouriteName = await H.makeFavName()
  const favName = await H.makeFavName()
  const favFromMyFavourites = Selector('.gameTicketFavouriteTitle').withText(favName)
  const viewTicketsForNewFav = Selector(favFromMyFavourites).parent('div').nth(6)
  const latestFavourite = Selector('.gameTicketFavouriteTitle').withText(updatedFavouriteName)
  const latestFavFromMyFavourites = Selector('.gameTicketFavouriteTitle').withText(updatedFavouriteName)
  const viewLatestFavourite = Selector(latestFavFromMyFavourites).parent('div').nth(6)

  H.StepDescription('should check the browser mode and navigate to games accordingly')
  const gamesAtTopAvailable = Selector('.themeNavSecondary')
  let isSecondaryNavHidden = false
  await gamesAtTopAvailable.getStyleProperty('display').then((res) => {
    return isSecondaryNavHidden = res === 'none'
  })

  if( ! isSecondaryNavHidden) {
    await t
       .click(LottoStrikeLinkFromTop)

  }
  else {
    await t
     .click(burgerMenuIcon)
     .click(lottoStrikeLinkFromLeft)
  }

  H.StepDescription('should select Pick your own')
  await t
     .click(lottoPYO)
  H.StepDescription('should auto select the first 4 lines')
  await t
    .expect(autoFillLine1.exists).ok()
    .click(autoFillLine1)
    .expect(autoFillLine1.exists).notOk()
    .expect(refreshPYONumbers.nth(0).exists).ok()
    .expect(a1Position.hasClass(emptyNumber)).notOk()
    .expect(a2Position.hasClass(emptyNumber)).notOk()
    .expect(a3Position.hasClass(emptyNumber)).notOk()
    .expect(a4Position.hasClass(emptyNumber)).notOk()
    .expect(a5Position.hasClass(emptyNumber)).notOk()
    .expect(a6Position.hasClass(emptyNumber)).notOk()
    .click(refreshPYONumbers.nth(0))
    .expect(deleteLine1.exists).ok()
    .click(deleteLine1)
    .expect(autoFillLine1.exists).ok()
    .click(autoFillLine1)
    .expect(autoFillLine2.exists).ok()
    .click(autoFillLine2)
    .expect(autoFillLine3.exists).ok()
    .click(autoFillLine3)
    .expect(autoFillLine4.exists).ok()
    .click(autoFillLine4)
  H.StepDescription('should tap BUY button')
  await t
    .expect(buyNowPrice.exists).ok()
    .expect(buyButton.exists).ok()
    .click(buyButton)
  H.StepDescription('should preview PYO Lotto ticket')
  await t
    .expect(strikeUpSell.exists).ok()
    .expect(saturdayDraw.exists).ok()
    .expect(wednesdayDraw.exists).ok()
    .expect(previewYourSelection.exists).ok()
    .click(previewYourSelection)
    .expect(ticketPreview.exists).ok()
    .expect(editTicketButton.exists).ok()
    .expect(closeModal.exists).ok()
    .click(closeModal)
  H.StepDescription('should confirm purchase of PYO')
  await t
    .expect(ticketSummaryDetails.exists).ok()
    .expect(ticketCostPerDraw.exists).ok()
    .expect(totalNumberOfDraws.exists).ok()
    .expect(totalNumberOfDraws.innerText).eql('x1')
    .expect(totalTitle.exists).ok()
    .expect(totalCost.exists).ok()
    .expect(totalCost.innerText).eql('$6.00')
    .expect(confirmPurchase.exists).ok()
    .click(confirmPurchase)
  H.StepDescription('should display the thanks page')
  await endAnimationWatcher();
  await t
    .wait(3000)
    .expect(thanksPageHeader.exists).ok()
    .expect(thanksIntroDescription.exists).ok()
    .expect(purchasedTicketHeader.exists).ok()
    .expect(purchasedTicketHeader.innerText).contains('Draw happening:')
    .expect(drawDateOfPurchasedTicket.exists).ok()
    .expect(typeOfPurchasedTicket.exists).notOk()
    .expect(costOfPurchasedTicket.exists).ok()
  H.StepDescription('should view the details of purchased Lotto PYO')
  await t
    .expect(viewDetailsButton.exists).ok()
    .click(viewDetailsButton)
  H.StepDescription('should save the PYO as Favourite')
  await t
    .expect(editNamePYO2Fav.exists).ok()
    .expect(drawHappeningPYO.exists).ok()
    .expect(ticketBodyPYO.exists).ok()
    .expect(drawSummaryPYO.exists).ok()
    .click(editNamePYO2Fav)
    .typeText(editNamePYO2Fav, favName)
    .click(saveFavName)
    .expect(closeModal.exists).notOk()
  H.StepDescription('should listed under fav tab')
  await t
    .click(myTickets)
    .click(favouritesTab)
    .expect(favFromMyFavourites.exists).ok()
    .expect(viewTicketsForNewFav.exists).ok()
  H.StepDescription('should open that favourite')
  await t
    .click(viewTicketsForNewFav.parent(0).sibling(0))
  H.StepDescription('should edit the favourite name')
  await t
    .click(editFavouriteName)
    .click(editNamePYO2Fav)
    .pressKey('ctrl+a delete')
    //.expect(saveFavName.hasAttribute('disabled')).ok() //TODO defect
    .typeText(editNamePYO2Fav, updatedFavouriteName)
    .click(saveFavName)

  H.StepDescription('should edit the favourite numbers')
  await t
    .click(viewLatestFavourite.parent(0).sibling(0))
    .click(editTicketButton)
    .click(autoFillLine5)
    .click(strikeAutoFillLineA)
    .expect(buyButton.innerText).eql('SAVE\n')
    .click(buyButton)
  H.StepDescription('should delete the latest favourite')
  await t
    .click(viewLatestFavourite.parent(0).sibling(0))
    .expect(latestFavFromMyFavourites.innerText).eql(updatedFavouriteName)
    .click(deleteFavourite)
    .click(myTickets)
    .click(favouritesTab)
    .expect(latestFavFromMyFavourites.exists).notOk()
})

test('Favourites - Lotto only - Create/View/Edit/Delete', async t => {
  const updatedFavouriteName = await H.makeFavName()
  const favName = await H.makeFavName()
  const favFromMyFavourites = Selector('.gameTicketFavouriteTitle').withText(favName)
  const viewTicketsForNewFav = Selector(favFromMyFavourites).parent('div').nth(6)
  const latestFavourite = Selector('.gameTicketFavouriteTitle').withText(updatedFavouriteName)
  const latestFavFromMyFavourites = Selector('.gameTicketFavouriteTitle').withText(updatedFavouriteName)
  const viewLatestFavourite = Selector(latestFavFromMyFavourites).parent('div').nth(6)

  H.StepDescription('should create Lotto favourites from My favourites')
  await t
    .click(myTickets)
    .click(favouritesTab)
    .click(createLottoFavourite.parent())
    .click(favouriteName)
    .typeText(favouriteName, favName)
  H.StepDescription('should auto select the first 4 lines')
  await t
    .click(powerBallToggle)
    .expect(autoFillLine1.exists).ok()
    .click(autoFillLine1)
    .expect(autoFillLine1.exists).notOk()
    .expect(refreshPYONumbers.nth(0).exists).ok()
    .expect(a1Position.hasClass(emptyNumber)).notOk()
    .expect(a2Position.hasClass(emptyNumber)).notOk()
    .expect(a3Position.hasClass(emptyNumber)).notOk()
    .expect(a4Position.hasClass(emptyNumber)).notOk()
    .expect(a5Position.hasClass(emptyNumber)).notOk()
    .expect(a6Position.hasClass(emptyNumber)).notOk()
    .click(refreshPYONumbers.nth(0))
    .expect(deleteLine1.exists).ok()
    .click(deleteLine1)
    .expect(autoFillLine1.exists).ok()
    .click(autoFillLine1)
    .expect(autoFillLine2.exists).ok()
    .click(autoFillLine2)
    .expect(autoFillLine3.exists).ok()
    .click(autoFillLine3)
    .expect(autoFillLine4.exists).ok()
    .click(autoFillLine4)
  H.StepDescription('should tap BUY button')
  await t
    .expect(buyNowPrice.exists).ok()
    .expect(buyButton.exists).ok()
    .expect(buyButton.innerText).eql('SAVE\n')
    .click(buyButton)
  H.StepDescription('should listed under fav tab')
  await t
    .click(myTickets)
    .click(favouritesTab)
    .expect(favFromMyFavourites.exists).ok()
    .expect(viewTicketsForNewFav.exists).ok()
  H.StepDescription('should open that favourite')
  await t
    .click(viewTicketsForNewFav.parent(0).sibling(0))
  H.StepDescription('should edit the favourite name')
  await t
    .click(editFavouriteName)
    .click(editNamePYO2Fav)
    .pressKey('ctrl+a delete')
    //.expect(saveFavName.hasAttribute('disabled')).ok() //TODO defect
    .typeText(editNamePYO2Fav, updatedFavouriteName)
    .click(saveFavName)

  H.StepDescription('should edit the favourite numbers')
  await t
    .click(viewLatestFavourite.parent(0).sibling(0))
    .click(editTicketButton)
    .expect(powerBallToggle.innerText).eql('OFF')
    //.click(autoFillLine5) // TODO Defect - Autofill selects the PB number as well
    .click(strikeAutoFillLineA)
    .expect(buyButton.innerText).eql('SAVE\n')
    .click(buyButton)
  H.StepDescription('should delete the latest favourite')
  await t
    .click(viewLatestFavourite.parent(0).sibling(0))
    .expect(latestFavFromMyFavourites.innerText).eql(updatedFavouriteName)
    .click(deleteFavourite)
    .click(myTickets)
    .click(favouritesTab)
    .expect(latestFavFromMyFavourites.exists).notOk()
})

test('Favourites - Lotto PB & Strike - Create/View/Edit/Delete', async t => {
  const updatedFavouriteName = await H.makeFavName()
  const favName = await H.makeFavName()
  const favFromMyFavourites = Selector('.gameTicketFavouriteTitle').withText(favName)
  const viewTicketsForNewFav = Selector(favFromMyFavourites).parent('div').nth(6)
  const latestFavourite = Selector('.gameTicketFavouriteTitle').withText(updatedFavouriteName)
  const latestFavFromMyFavourites = Selector('.gameTicketFavouriteTitle').withText(updatedFavouriteName)
  const viewLatestFavourite = Selector(latestFavFromMyFavourites).parent('div').nth(6)

  H.StepDescription('should create Lotto favourites from My favourites')
  await t
    .click(myTickets)
    .click(favouritesTab)
    .click(createLottoFavourite.parent())
    .click(favouriteName)
    .typeText(favouriteName, favName)
  H.StepDescription('should auto select the first 4 lines')
  await t
    .expect(powerBallToggle.innerText).eql('ON')
    .expect(autoFillLine1.exists).ok()
    .click(autoFillLine1)
    .expect(autoFillLine1.exists).notOk()
    .expect(refreshPYONumbers.nth(0).exists).ok()
    .expect(a1Position.hasClass(emptyNumber)).notOk()
    .expect(a2Position.hasClass(emptyNumber)).notOk()
    .expect(a3Position.hasClass(emptyNumber)).notOk()
    .expect(a4Position.hasClass(emptyNumber)).notOk()
    .expect(a5Position.hasClass(emptyNumber)).notOk()
    .expect(a6Position.hasClass(emptyNumber)).notOk()
    .click(refreshPYONumbers.nth(0))
    .expect(deleteLine1.exists).ok()
    .click(deleteLine1)
    .expect(autoFillLine1.exists).ok()
    .click(autoFillLine1)
    .expect(autoFillLine2.exists).ok()
    .click(autoFillLine2)
    .expect(autoFillLine3.exists).ok()
    .click(autoFillLine3)
    .expect(autoFillLine4.exists).ok()
    .click(autoFillLine4)
  H.StepDescription('should tap BUY button')
  await t
    .expect(buyNowPrice.exists).ok()
    .expect(buyButton.exists).ok()
    .expect(buyButton.innerText).eql('SAVE\n')
    .click(buyButton)
  H.StepDescription('should listed under fav tab')
  await t
    .click(myTickets)
    .click(favouritesTab)
    .expect(favFromMyFavourites.exists).ok()
    .expect(viewTicketsForNewFav.exists).ok()
  H.StepDescription('should open that favourite')
  await t
    .click(viewTicketsForNewFav.parent(0).sibling(0))
  H.StepDescription('should edit the favourite name')
  await t
    .click(editFavouriteName)
    .click(editNamePYO2Fav)
    .pressKey('ctrl+a delete')
    //.expect(saveFavName.hasAttribute('disabled')).ok() //TODO defect
    .typeText(editNamePYO2Fav, updatedFavouriteName)
    .click(saveFavName)

  H.StepDescription('should edit the favourite numbers')
  await t
    .click(viewLatestFavourite.parent(0).sibling(0))
    .click(editTicketButton)
    .expect(powerBallToggle.innerText).eql('ON')
    .click(autoFillLine5) // TODO Defect - Autofill selects the PB number as well
    .click(strikeAutoFillLineA)
    .expect(buyButton.innerText).eql('SAVE\n')
    .click(buyButton)
  H.StepDescription('should delete the latest favourite')
  await t
    .click(viewLatestFavourite.parent(0).sibling(0))
    .expect(latestFavFromMyFavourites.innerText).eql(updatedFavouriteName)
    .click(deleteFavourite)
    .click(myTickets)
    .click(favouritesTab)
    .expect(latestFavFromMyFavourites.exists).notOk()
})

test('Favourites - Lotto & PB - Create/View/Edit/Delete', async t => {
  const updatedFavouriteName = await H.makeFavName()
  const favName = await H.makeFavName()
  const favFromMyFavourites = Selector('.gameTicketFavouriteTitle').withText(favName)
  const viewTicketsForNewFav = Selector(favFromMyFavourites).parent('div').nth(6)
  const latestFavourite = Selector('.gameTicketFavouriteTitle').withText(updatedFavouriteName)
  const latestFavFromMyFavourites = Selector('.gameTicketFavouriteTitle').withText(updatedFavouriteName)
  const viewLatestFavourite = Selector(latestFavFromMyFavourites).parent('div').nth(6)

  H.StepDescription('should create Lotto favourites from My favourites')
  await t
    .click(myTickets)
    .click(favouritesTab)
    .click(createLottoFavourite.parent())
    .click(favouriteName)
    .typeText(favouriteName, favName)
  H.StepDescription('should auto select the first 4 lines')
  await t
    .expect(powerBallToggle.innerText).eql('ON')
    .expect(autoFillLine1.exists).ok()
    .click(autoFillLine1)
    .expect(autoFillLine1.exists).notOk()
    .expect(refreshPYONumbers.nth(0).exists).ok()
    .expect(a1Position.hasClass(emptyNumber)).notOk()
    .expect(a2Position.hasClass(emptyNumber)).notOk()
    .expect(a3Position.hasClass(emptyNumber)).notOk()
    .expect(a4Position.hasClass(emptyNumber)).notOk()
    .expect(a5Position.hasClass(emptyNumber)).notOk()
    .expect(a6Position.hasClass(emptyNumber)).notOk()
    .click(refreshPYONumbers.nth(0))
    .expect(deleteLine1.exists).ok()
    .click(deleteLine1)
    .expect(autoFillLine1.exists).ok()
    .click(autoFillLine1)
    .expect(autoFillLine2.exists).ok()
    .click(autoFillLine2)
    .expect(autoFillLine3.exists).ok()
    .click(autoFillLine3)
    .expect(autoFillLine4.exists).ok()
    .click(autoFillLine4)
  H.StepDescription('should tap BUY button')
  await t
    .expect(buyNowPrice.exists).ok()
    .expect(buyButton.exists).ok()
    .expect(buyButton.innerText).eql('SAVE\n')
    .click(buyButton)
  H.StepDescription('should listed under fav tab')
  await t
    .click(myTickets)
    .click(favouritesTab)
    .expect(favFromMyFavourites.exists).ok()
    .expect(viewTicketsForNewFav.exists).ok()
  H.StepDescription('should open that favourite')
  await t
    .click(viewTicketsForNewFav.parent(0).sibling(0))
  H.StepDescription('should edit the favourite name')
  await t
    .click(editFavouriteName)
    .click(editNamePYO2Fav)
    .pressKey('ctrl+a delete')
    //.expect(saveFavName.hasAttribute('disabled')).ok() //TODO defect
    .typeText(editNamePYO2Fav, updatedFavouriteName)
    .click(saveFavName)

  H.StepDescription('should edit the favourite numbers')
  await t
    .click(viewLatestFavourite.parent(0).sibling(0))
    .click(editTicketButton)
    .expect(powerBallToggle.innerText).eql('ON')
    .click(autoFillLine5) // TODO Defect - Autofill selects the PB number as well
    //.click(strikeAutoFillLineA)
    .expect(buyButton.innerText).eql('SAVE\n')
    .click(buyButton)
  H.StepDescription('should delete the latest favourite')
  await t
    .click(viewLatestFavourite.parent(0).sibling(0))
    .expect(latestFavFromMyFavourites.innerText).eql(updatedFavouriteName)
    .click(deleteFavourite)
    .click(myTickets)
    .click(favouritesTab)
    .expect(latestFavFromMyFavourites.exists).notOk()
})

test('Favourites - Strike only - Create/View/Edit/Delete', async t => {
  const updatedFavouriteName = await H.makeFavName()
  const favName = await H.makeFavName()
  const favFromMyFavourites = Selector('.gameTicketFavouriteTitle').withText(favName)
  const viewTicketsForNewFav = Selector(favFromMyFavourites).parent('div').nth(6)
  const latestFavourite = Selector('.gameTicketFavouriteTitle').withText(updatedFavouriteName)
  const latestFavFromMyFavourites = Selector('.gameTicketFavouriteTitle').withText(updatedFavouriteName)
  const viewLatestFavourite = Selector(latestFavFromMyFavourites).parent('div').nth(6)

  H.StepDescription('should create Strike favourites from My favourites')
  await t
    .click(myTickets)
    .click(favouritesTab)
    .click(createStrikeFavourite.parent())
    .click(favouriteName)
    .typeText(favouriteName, favName)
    .expect(strikeTicket.exists).ok()
    .expect(strikeNumbers.exists).ok()
    .click(strikeAutoFillLineA)
    .expect(buyNowPrice.innerText).eql('$1.00')
    .expect(buyButton.innerText).eql('SAVE\n')
    .click(buyButton)
  H.StepDescription('should listed under fav tab')
  await t
    .click(myTickets)
    .click(favouritesTab)
    .expect(favFromMyFavourites.exists).ok()
    .expect(viewTicketsForNewFav.exists).ok()
  H.StepDescription('should open that favourite')
  await t
    .click(viewTicketsForNewFav.parent(0).sibling(0))
  H.StepDescription('should edit the favourite name')
  await t
    .click(editFavouriteName)
    .click(editNamePYO2Fav)
    .pressKey('ctrl+a delete')
    //.expect(saveFavName.hasAttribute('disabled')).ok() //TODO defect
    .typeText(editNamePYO2Fav, updatedFavouriteName)
    .click(saveFavName)

  H.StepDescription('should edit the favourite numbers')
  await t
    .click(viewLatestFavourite.parent(0).sibling(0))
    .click(editStrikeTicketFromPreview)
    .click(strikeRefresh.nth(0))
    await t.click(strikeNumber1)
    //.expect(strikeB1.innerText).eql('1\n')
    await t.click(strikeNumber2)
    //.expect(strikeB2.innerText).eql('2\n')
    await t.click(strikeNumber3)
    //.expect(strikeB3.innerText).eql('3\n')
    await t.click(strikeNumber4)
    //.expect(strikeB4.innerText).eql('4\n')
    .expect(buyButton.innerText).eql('SAVE\n')
    .click(buyButton)
  H.StepDescription('should delete the latest favourite')
  await t
    .click(viewLatestFavourite.parent(0).sibling(0))
    .expect(latestFavFromMyFavourites.innerText).eql(updatedFavouriteName)
    .click(deleteFavourite)
    .click(myTickets)
    .click(favouritesTab)
    .expect(latestFavFromMyFavourites.exists).notOk()

})
