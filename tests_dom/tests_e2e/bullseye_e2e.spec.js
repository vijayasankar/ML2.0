import { Selector } from 'testcafe'
import Helpers from '../test_utils/helpers'
import config from '../test_utils/config'
import { ClientFunction } from 'testcafe'

const H = new Helpers()
// entry points
//Lotto LandingPage components - Before login
const burgerMenuIcon = Selector('#nav-menu-main-menu')
const gamesAtTopAvailable = Selector('.themeNavSecondary')
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
const leftNavigationMenu = Selector('#nav-menu-main-menu-pulldown-wrapper')
const bullseyeFromTop = Selector('#navBullseyesecondary')
const bullseyeFromLeft = Selector('#navBullseyeleft')

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

//Bullseye Home Page
const bullseyeBuyADip = Selector('#buyADip')
const bullseyePYO = Selector('#pickYourOwn')
const bullseyeHowToPlay = Selector('#howToPlay')

//Bullseye Dips
const eCommerceBar = Selector('#ecommerceBar')
const ecommerceBarBuyButton = Selector('#buyButton')
const buyNowPrice = Selector('.buyNowPrice')
const buyButton = Selector('#buyButton')
const bullseyeDipsSection = Selector('.bullseyeDipSection')
const bullseyeDipsSlider = Selector('input[name="bullseyeDipSlider"]')
const bullseye$2Dip = Selector('#bullseyeDips0')
const bullseye$6Dip = Selector('#bullseyeDips1')
const bullseye$14Dip = Selector('#bullseyeDips2')
const bullseye$30Dip = Selector('#bullseyeDips3')
const bullseyeHowToPlayFromDips = Selector('#howToPlaySection')
const closeModal = Selector('#close-modal')
const ecommerceBarText  = Selector('.upSellWrapperText')
//Bullseye PYO
const bullseyeNumberPad = Selector('#bullseyeNumberSelector')
const bullseyeTicketSection = Selector('#bullseyeTicket')
const bullseyeRowA = Selector('.ticketRow').nth(0)
const bullseyeAutoFill = Selector('#bullseyeAutoFill')
const bullseyeRefresh = Selector('#bullseyeRefresh')
const bullseyeDeleteLineA = Selector('#deleteButton_0')
const bullseyeDeleteLineB = Selector('#deleteButton_1')

const bullseyeNumber1 = Selector('#bullseyeNumber1')
const bullseyeNumber2 = Selector('#bullseyeNumber2')
const bullseyeNumber3 = Selector('#bullseyeNumber3')
const bullseyeNumber4 = Selector('#bullseyeNumber4')
const bullseyeNumber5 = Selector('#bullseyeNumber5')
const bullseyeNumber6 = Selector('#bullseyeNumber6')
const bullseyeNumber7 = Selector('#bullseyeNumber7')
const bullseyeNumber8 = Selector('#bullseyeNumber8')
const bullseyeNumber9 = Selector('#bullseyeNumber9')
const bullseyeNumber0 = Selector('#bullseyeNumber10')
const bullseyeReset = Selector('#bullseyeResetSelector')
const bullseyeDelete = Selector('#bullseyeDeleteSelection')
const bullseyePositionA1 = Selector('.editLineNumber').nth(0)
const bullseyePositionA2 = Selector('.editLineNumber').nth(1)
const bullseyePositionA3 = Selector('.editLineNumber').nth(2)
const bullseyePositionA4 = Selector('.editLineNumber').nth(3)
const bullseyePositionA5 = Selector('.editLineNumber').nth(4)
const bullseyePositionA6 = Selector('.editLineNumber').nth(5)
const bullseyePositionB1 = Selector('.editLineNumber').nth(0)
const bullseyePositionB2 = Selector('.editLineNumber').nth(1)
const bullseyePositionB3 = Selector('.editLineNumber').nth(2)
const bullseyePositionB4 = Selector('.editLineNumber').nth(3)
const bullseyePositionB5 = Selector('.editLineNumber').nth(4)
const bullseyePositionB6 = Selector('.editLineNumber').nth(5)

//Bullseye Purchase confirmation
const bullseyeConfirmPurchasePage = Selector('#confirmation-form')
const bullseye1draw = Selector('input[name="drawCount1"]')
const bullseye3draws = Selector('input[name="drawCount3"]')
const bullseye7draws = Selector('input[name="drawCount7"]')
const bullseye14draws = Selector('input[name="drawCount14"]')
const previewYourSelection = Selector('#ticket')
const bullseyeTicketDetailsSummary = Selector('.ticket-totals')
const bullseyeTicketSummaryGameType = Selector('.lines')
const bullseyeTotalNumberOfDraws = Selector('.lines').child(1)
const bullseyeTotalTitle = Selector('.summary-box').nth(0)
const bullseyeTotalCost = Selector('.summary-box').nth(1)
const bullseyeConfirmPurchase = Selector('#keno-submit-button')
const bullseyePricePerDraw = Selector('.ticket-totals').nth(3)
const bullseyeTicketPreview = Selector('#bullseyeTicket')
const editBullseyeTicket = Selector('.edit')
const bullseyeTicketPreviewSummary = Selector('.previewTicketSummary')

//Bullseye Thanks Page
const thanksPageHeader = Selector('#thanksIntroTitle')
const thanksIntroDescription = Selector('#thanksIntroDescription')
const viewDetailsButton = Selector('.button.game-ticket-view-btn ')
const viewPurchasedTicketHeader = Selector('#myTicketHeader')
const viewPurchasedTicketBody = Selector('.viewFullTicketWrapper')
const purchasedTicketHeader = Selector('.gameTicketHeader')
const drawDateOfPurchasedTicket = Selector('.gameTicketDrawDate')
const typeOfPurchasedTicket = Selector('.gameTicketDipCostTxt').nth(0)
const costOfPurchasedTicket = Selector('.gameTicketDipCostTxt').nth(1)
const ticketSummaryThanksPage = Selector('.gameTicketPurchaseSummary')
const editNamePYO2Fav = Selector('#editNameYourFavourite')
const saveFavName = Selector ('#favouriteTicketSave')
const drawHappeningPYO = Selector('#ticketLottoTitleDrawHappening0')
const bullseyeTicketBodyPYO = Selector('#TicketRowBullseye')
const bullseyeDrawSummaryPYO = Selector('.gameTicketFooterSummaries')
const viewPurchasedTicketModal = Selector('.modalUnderlay.ticket-detail-modal')
const myTicketsDetails =  Selector('.ticketDetailModalHeader').nth(0)
const saveTheseTicketsForLater = Selector('.ticketDetailModalHeader').nth(1)

//Bullseye How to Play page
const bullseyeHowItWorks = Selector('.h2')
const bullseye3WaysToPlay = Selector('#threewaysTitle')
const bullseye3WaysToPlayDipButton = Selector('#playADipButton').nth(0)
const bullseye3WaysToPlayPyoButton = Selector('#buildATicketButton')
const bullseye3WaysToPlayFavButton = Selector('#playADipButton').nth(1) //TODO this is defect
const bullseyeWinningNumbers = Selector('.BullseyeWinningNumbersTable')

//Favourites Bullseye
const favouritesTab = Selector('#select-page-favourites')
const createBullseyeFavourite = Selector('#addYourFavourite_bullseye')
const favouriteName = Selector('#favouriteName')
const editFavouriteName = Selector('.favouriteTicketName.ticketDetailModalHeader')
const editTicketButton = Selector('#editYourBullseyeTicket')
const deleteFavourite = Selector('#favouriteTicketDelete')

fixture `***** Verify the games in Bullseye family *****`
  .page (config.domTestRootUrl)
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

test('Bullseye Dip - 2 dollar option', async t => {
  H.StepDescription('should check the browser mode and navigate to games accordingly')
  let isSecondaryNavHidden = false
  await gamesAtTopAvailable.getStyleProperty('display').then((res) => {
    return isSecondaryNavHidden = res === 'none'
  })

  if( ! isSecondaryNavHidden) {
    await t
     .click(bullseyeFromTop)

  }
  else {
    await t
     .click(burgerMenuIcon)
     .click(bullseyeFromLeft)
  }
  await t
    .click(bullseyeBuyADip)
    .click(bullseye$2Dip)
    .expect(buyNowPrice.innerText).eql('$2.00')
    .expect(buyButton.exists).ok()
    .click(buyButton)
  H.StepDescription('should preview $2 Bullseye dip')
  await t
    .expect(bullseyeConfirmPurchasePage.exists).ok()
    .expect(bullseye1draw.exists).ok()
    //.expect(bullseye1draw.hasClass('.check')).ok()
    .expect(bullseye3draws.exists).ok()
    .expect(bullseye7draws.exists).ok()
    .expect(bullseye14draws.exists).ok()
    .expect(previewYourSelection.exists).ok()
    .click(previewYourSelection)
    .expect(bullseyeTicketPreview.exists).ok()
    .expect(editBullseyeTicket.exists).ok()
    .expect(closeModal.exists).ok()
    .click(closeModal)

  H.StepDescription('should confirm purchase of $2 Bullseye dip')
  await t
    .expect(bullseyeTicketDetailsSummary.exists).ok()
    .expect(bullseyeTicketSummaryGameType.exists).ok()
    .expect(bullseyeTicketSummaryGameType.innerText).eql('Bullseye')
    //.expect(bullseyeTotalNumberOfDraws.innerText).eql('1 Line') //TODO Investigate
  //      .expect(bullseyePricePerDraw.exists).ok()
  //      .expect(bullseyePricePerDraw.innerText).eql('$2.00')
  //      .expect(bullseyeTotalCost.exists).ok()
  //      .expect(bullseyeTotalCost.innerText).eql('$2.00')
      .expect(bullseyeConfirmPurchase.exists).ok()
      .click(bullseyeConfirmPurchase)
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
    .expect(typeOfPurchasedTicket.innerText).contains('1 line')
    .expect(costOfPurchasedTicket.exists).ok()
    .expect(costOfPurchasedTicket.innerText).contains('$2.00')

  H.StepDescription('should view the details of $2 Bullseye dip')
  await t
    .expect(viewDetailsButton.exists).ok()
    .click(viewDetailsButton)
    .expect(viewPurchasedTicketHeader.exists).ok()
    .expect(viewPurchasedTicketBody.exists).ok()
    .click(closeModal)

})

test('Bullseye Dip - Dip slider option', async t => {
    H.StepDescription('should check the browser mode and navigate to games accordingly')
    let isSecondaryNavHidden = false
    await gamesAtTopAvailable.getStyleProperty('display').then((res) => {
      return isSecondaryNavHidden = res === 'none'
    })

    if( ! isSecondaryNavHidden) {
      await t
         .click(bullseyeFromTop)

    }
    else {
      await t
       .click(burgerMenuIcon)
       .click(bullseyeFromLeft)
    }
    await t
      .click(bullseyeBuyADip)
      .expect(bullseyeDipsSlider.exists).ok()
      .typeText(bullseyeDipsSlider, '1')
      .expect(buyNowPrice.innerText).eql('$2.00')
      .expect(buyButton.exists).ok()
      .click(buyButton)
    H.StepDescription('should preview 1-line Bullseye dip')
    await t
      .expect(bullseyeConfirmPurchasePage.exists).ok()
      .expect(bullseye1draw.exists).ok()
      //.expect(bullseye1draw.hasClass('.check')).ok()
      .expect(bullseye3draws.exists).ok()
      .expect(bullseye7draws.exists).ok()
      .expect(bullseye14draws.exists).ok()
      .expect(previewYourSelection.exists).ok()
      .click(previewYourSelection)
      .expect(bullseyeTicketPreview.exists).ok()
      .expect(editBullseyeTicket.exists).ok()
      .expect(closeModal.exists).ok()
      .click(closeModal)

    H.StepDescription('should add one more line')
    await t
      .click(previewYourSelection)
      .click(editBullseyeTicket)
      .typeText(bullseyeDipsSlider, '2')
      .expect(buyNowPrice.innerText).eql('$4.00')
      .click(buyButton)

    H.StepDescription('should confirm purchase of $2 Bullseye dip')
    await t
      .expect(bullseyeTicketDetailsSummary.exists).ok()
      .expect(bullseyeTicketSummaryGameType.exists).ok()
      .expect(bullseyeTicketSummaryGameType.innerText).eql('Bullseye')
      //.expect(bullseyeTotalNumberOfDraws.innerText).eql('1 Line') //TODO Investigate
  //      .expect(bullseyePricePerDraw.exists).ok()
  //      .expect(bullseyePricePerDraw.innerText).eql('$2.00')
  //      .expect(bullseyeTotalCost.exists).ok()
  //      .expect(bullseyeTotalCost.innerText).eql('$2.00')
    .expect(bullseyeConfirmPurchase.exists).ok()
    .click(bullseyeConfirmPurchase)
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
    .expect(typeOfPurchasedTicket.innerText).contains('2 lines')
    .expect(costOfPurchasedTicket.exists).ok()
    .expect(costOfPurchasedTicket.innerText).contains('$4.00')

  H.StepDescription('should view the details of $4 Bullseye dip')
  await t
    .expect(viewDetailsButton.exists).ok()
    .click(viewDetailsButton)
    .expect(viewPurchasedTicketHeader.exists).ok()
    .expect(viewPurchasedTicketBody.exists).ok()
  .click(closeModal)
})

test('Bullseye PYO - Autofill', async t => {
  H.StepDescription('should check the browser mode and navigate to games accordingly')
  let isSecondaryNavHidden = false
  await gamesAtTopAvailable.getStyleProperty('display').then((res) => {
    return isSecondaryNavHidden = res === 'none'
  })

  if( ! isSecondaryNavHidden) {
    await t
       .click(bullseyeFromTop)

  }
  else {
    await t
     .click(burgerMenuIcon)
     .click(bullseyeFromLeft)
  }
  await t
    .click(bullseyePYO.parent())
    .expect(bullseyeDipsSlider.exists).notOk()
    .expect(bullseyeNumberPad.exists).ok()
    .expect(bullseyeTicketSection.exists).ok()
    .expect(bullseyeRowA.exists).ok()
    .expect(bullseyeRefresh.exists).notOk()
    .expect(bullseyeDeleteLineA.exists).notOk()
    .click(bullseyeAutoFill)
  H.StepDescription('should refresh the auto-picked numbers')
  await t
    .expect(bullseyeRefresh.exists).ok()
    .click(bullseyeRefresh)
    .expect(bullseyeDeleteLineA.exists).ok()
    .expect(buyNowPrice.innerText).eql('$2.00')
    .expect(buyButton.exists).ok()
    .click(buyButton)
  H.StepDescription('should preview 1-line Bullseye dip')
  await t
    .expect(bullseyeConfirmPurchasePage.exists).ok()
    .expect(bullseye1draw.exists).ok()
    //.expect(bullseye1draw.hasClass('.check')).ok()
    .expect(bullseye3draws.exists).ok()
    .expect(bullseye7draws.exists).ok()
    .expect(bullseye14draws.exists).ok()
    .expect(previewYourSelection.exists).ok()
    .click(previewYourSelection)
    .expect(bullseyeTicketPreview.exists).ok()
    .expect(editBullseyeTicket.exists).ok()
    .expect(closeModal.exists).ok()
    .click(closeModal)

  H.StepDescription('should add one more line')
  await t
    .click(previewYourSelection)
    .click(editBullseyeTicket)
    .click(bullseyeAutoFill)
    .expect(buyNowPrice.innerText).eql('$4.00')
    .click(buyButton)

  H.StepDescription('should confirm purchase of $4 Bullseye dip')
  await t
    .expect(bullseyeTicketDetailsSummary.exists).ok()
    .expect(bullseyeTicketSummaryGameType.exists).ok()
    .expect(bullseyeTicketSummaryGameType.innerText).eql('Bullseye')
    //.expect(bullseyeTotalNumberOfDraws.innerText).eql('1 Line') //TODO Investigate
  //      .expect(bullseyePricePerDraw.exists).ok()
  //      .expect(bullseyePricePerDraw.innerText).eql('$2.00')
  //      .expect(bullseyeTotalCost.exists).ok()
  //      .expect(bullseyeTotalCost.innerText).eql('$2.00')
    .expect(bullseyeConfirmPurchase.exists).ok()
    .click(bullseyeConfirmPurchase)
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
    .expect(typeOfPurchasedTicket.innerText).contains('2 lines')
    .expect(costOfPurchasedTicket.exists).ok()
    .expect(costOfPurchasedTicket.innerText).contains('$4.00')

  H.StepDescription('should view the details of $4 Bullseye dip')
  await t
    .expect(viewDetailsButton.exists).ok()
    .click(viewDetailsButton)
    .expect(viewPurchasedTicketHeader.exists).ok()
    .expect(viewPurchasedTicketBody.exists).ok()
    .click(closeModal)

  H.StepDescription('should save the bullseye PYO as favourite')
  await t
    .click(viewDetailsButton)
    .expect(viewPurchasedTicketModal.exists).ok()
    .expect(myTicketsDetails.innerText).eql('My tickets details')
    .expect(saveTheseTicketsForLater.innerText).eql('Save these tickets for later')
    .click(editNamePYO2Fav)
    .typeText(editNamePYO2Fav, await H.makeFavName())
    .click(saveFavName)
    .expect(closeModal.exists).notOk()

})

test('Bullseye PYO - manual selection', async t => {
  H.StepDescription('should check the browser mode and navigate to games accordingly')
  let isSecondaryNavHidden = false
  await gamesAtTopAvailable.getStyleProperty('display').then((res) => {
  return isSecondaryNavHidden = res === 'none'
  })

  if( ! isSecondaryNavHidden) {
  await t
     .click(bullseyeFromTop)

  }
  else {
  await t
   .click(burgerMenuIcon)
   .click(bullseyeFromLeft)
  }
  await t
  .click(bullseyePYO.parent())
  .expect(bullseyeDipsSlider.exists).notOk()
  .expect(bullseyeNumberPad.exists).ok()
  .expect(bullseyeTicketSection.exists).ok()
  .expect(bullseyeRowA.exists).ok()
  .expect(bullseyeRefresh.exists).notOk()
  .expect(bullseyeDeleteLineA.exists).notOk()
  .click(bullseyeNumber1)
  .expect(bullseyePositionA1.innerText).eql('1')
  .click(bullseyeNumber2)
  .expect(bullseyePositionA2.innerText).eql('2')
  .click(bullseyeNumber3)
  .expect(bullseyePositionA3.innerText).eql('3')
  .click(bullseyeNumber4)
  .expect(bullseyePositionA4.innerText).eql('4')
  .click(bullseyeNumber5)
  .expect(bullseyePositionA5.innerText).eql('5')
  .click(bullseyeNumber6)
  .expect(bullseyePositionA6.innerText).eql('6')
  H.StepDescription('should manually pick numbers for line 2')
  await t
  .click(bullseyeNumber7)
  //.expect(bullseyePositionB1.innerText).eql('7')
  .click(bullseyeNumber8)
  //.expect(bullseyePositionB2.innerText).eql('8')
  .click(bullseyeNumber9)
  //.expect(bullseyePositionB3.innerText).eql('9')
  .click(bullseyeNumber0)
  //.expect(bullseyePositionB4.innerText).eql('0')
  .click(bullseyeNumber0)
  //.expect(bullseyePositionB5.innerText).eql('0')

  H.StepDescription('should reset the numbers in line 2')
  await t
  .expect(bullseyeReset.exists).ok()
  .click(bullseyeReset)

  H.StepDescription('should manually pick numbers again for line 2')
  await t
   .click(bullseyeNumber7)
   .click(bullseyeNumber5)
   .click(bullseyeNumber3)
   .click(bullseyeNumber6)
   .click(bullseyeNumber5)
  H.StepDescription('should delete the numbers in line 2')
  await t
  .expect(bullseyeDelete.exists).ok()
  .click(bullseyeDelete)
  //      .expect(bullseyePositionB6.innerText).eql('6')
  .click(bullseyeDelete)
  .click(bullseyeDelete)
  .click(bullseyeDelete)
  .click(bullseyeDelete)
  .expect(buyNowPrice.innerText).eql('$2.00')
  .click(buyButton)

  H.StepDescription('should preview 1-line Bullseye PYO')
  await t
  .expect(bullseyeConfirmPurchasePage.exists).ok()
  .expect(bullseye1draw.exists).ok()
  //.expect(bullseye1draw.hasClass('.check')).ok()
  .expect(bullseye3draws.exists).ok()
  .expect(bullseye7draws.exists).ok()
  .expect(bullseye14draws.exists).ok()
  .expect(previewYourSelection.exists).ok()
  .click(previewYourSelection)
  .expect(bullseyeTicketPreview.exists).ok()
  .expect(editBullseyeTicket.exists).ok()
  .expect(closeModal.exists).ok()
  .click(closeModal)

  H.StepDescription('should add one more line')
  await t
  .click(previewYourSelection)
  .click(editBullseyeTicket)
  .click(bullseyeNumber7)
  .click(bullseyeNumber4)
  .click(bullseyeNumber1)
  .click(bullseyeNumber2)
  .click(bullseyeNumber5)
  .click(bullseyeNumber8)
  .expect(buyNowPrice.innerText).eql('$4.00')
  .click(buyButton)

  H.StepDescription('should confirm purchase of Bullseye numbers')
  await t
  .expect(bullseyeTicketDetailsSummary.exists).ok()
  .expect(bullseyeTicketSummaryGameType.exists).ok()
  .expect(bullseyeTicketSummaryGameType.innerText).eql('Bullseye')
  //.expect(bullseyeTotalNumberOfDraws.innerText).eql('1 Line') //TODO Investigate
  //      .expect(bullseyePricePerDraw.exists).ok()
  //      .expect(bullseyePricePerDraw.innerText).eql('$2.00')
  //      .expect(bullseyeTotalCost.exists).ok()
  //      .expect(bullseyeTotalCost.innerText).eql('$2.00')
  .expect(bullseyeConfirmPurchase.exists).ok()
  .click(bullseyeConfirmPurchase)
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
  .expect(typeOfPurchasedTicket.innerText).contains('2 lines')
  .expect(costOfPurchasedTicket.exists).ok()
  .expect(costOfPurchasedTicket.innerText).contains('$4.00')

  H.StepDescription('should view the details of $4 Bullseye PYO')
  await t
  .expect(viewDetailsButton.exists).ok()
  .click(viewDetailsButton)
  .expect(viewPurchasedTicketHeader.exists).ok()
  .expect(viewPurchasedTicketBody.exists).ok()
  .click(closeModal)

  H.StepDescription('should save the bullseye PYO as favourite')
  await t
  .click(viewDetailsButton)
  .expect(viewPurchasedTicketModal.exists).ok()
  .expect(myTicketsDetails.innerText).eql('My tickets details')
  .expect(saveTheseTicketsForLater.innerText).eql('Save these tickets for later')
  .click(editNamePYO2Fav)
  .typeText(editNamePYO2Fav, await H.makeFavName())
  .click(saveFavName)
  .expect(closeModal.exists).notOk()
})

test('Bullseye - How to play', async t => {
    H.StepDescription('should check the browser mode and navigate to games accordingly')
    let isSecondaryNavHidden = false
    await gamesAtTopAvailable.getStyleProperty('display').then((res) => {
    return isSecondaryNavHidden = res === 'none'
    })

    if( ! isSecondaryNavHidden) {
    await t
       .click(bullseyeFromTop)

    }
    else {
    await t
     .click(burgerMenuIcon)
     .click(bullseyeFromLeft)
    }

    await t
    .click(bullseyeHowToPlay)
    .expect(bullseyeHowItWorks.exists).ok()
    .expect(bullseyeHowItWorks.innerText).eql('How it works')
    .expect(bullseye3WaysToPlay.exists).ok()
    .expect(bullseye3WaysToPlay.innerText).eql('Three ways to play')
    .expect(bullseyeWinningNumbers.exists).ok()

})

test('Bullseye - Favourites - Create/View/Edit/Delete', async t => {
    const updatedFavouriteName = await H.makeFavName()
    const favName = await H.makeFavName()
    const favFromMyFavourites = Selector('.gameTicketFavouriteTitle').withText(favName)
    const viewTicketsForNewFav = Selector(favFromMyFavourites).parent('div').nth(6)
    const latestFavourite = Selector('.gameTicketFavouriteTitle').withText(updatedFavouriteName)
    const latestFavFromMyFavourites = Selector('.gameTicketFavouriteTitle').withText(updatedFavouriteName)
    const viewLatestFavourite = Selector(latestFavFromMyFavourites).parent('div').nth(6)

    H.StepDescription('should create Play3 favourites from My favourites')
    await t
      .click(myTickets)
      .click(favouritesTab)
      .click(createBullseyeFavourite.parent())
      .click(favouriteName)
      .typeText(favouriteName, favName)
    H.StepDescription('should pick numbers for line A')
    await t
      .expect(ecommerceBarText.innerText).eql('Choose a number from 000000 to 999999. Need help?\n')
      .click(bullseyeNumber1)
      .expect(bullseyePositionA1.innerText).eql('1')
      .click(bullseyeNumber2)
      .expect(bullseyePositionA2.innerText).eql('2')
      .click(bullseyeNumber3)
      .expect(bullseyePositionA3.innerText).eql('3')
      .click(bullseyeNumber4)
      .expect(bullseyePositionA4.innerText).eql('4')
      .click(bullseyeNumber5)
      .expect(bullseyePositionA5.innerText).eql('5')
      .click(bullseyeNumber6)
      .expect(bullseyePositionA6.innerText).eql('6')
      .expect(ecommerceBarText.innerText).eql('Add another number or click \'save\' to continue\n')
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
      .click(bullseyeAutoFill)
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
