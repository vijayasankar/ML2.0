import { Selector } from 'testcafe'
import Helpers from '../test_utils/helpers'
import config from '../test_utils/config'
import { ClientFunction } from 'testcafe';

const H = new Helpers()
// entry points
//Lotto LandingPage components - Before login
const burgerMenuIcon = Selector('#nav-menu-main-menu')
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
const kenoFromTop = Selector('#navKenosecondary')
const kenoFromLeft = Selector('#navKenoleft')


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

//Keno Home Page
const kenoBuyADip = Selector('#buyADip')
const kenoPYO = Selector('#pickYoursNow')
const ecommerceBarText  = Selector('.upSellWrapperText')
//Keno Dips
const eCommerceBar = Selector('#ecommerceBar')
const eCommerceMaximize = Selector('#maximiseBar')
const ecommerceBarBuyButton = Selector('#buyButton')
const buyNowPrice = Selector('.buyNowPrice')
const buyButton = Selector('#buyButton')
const kenoOneDollarDip = Selector('#kenoDip-1')
const keno84DollarDip = Selector('#kenoDip-12')
const kenoNextDraw = Selector('#allDraws')
//const keno10amDraw = Selector('.box-time-right').withText('10am')
const keno10amDraw = Selector('input[value="10"]')
const keno1pmDraw = Selector('input[value="13"]')
const keno3pmDraw = Selector('input[value="15"]')
const keno6pmDraw = Selector('input[value="18"]')
const previewYourSelection = Selector('#ticket')
const kenoTicketPreview = Selector('#kenoTicket')
const editKenoTicket = Selector('.edit')
const kenoTicketPreviewSummary = Selector('.previewTicketSummary')
const closeModal = Selector('#close-modal')

//Keno PYO
const kenoStepOne = Selector('#kenoStepOne')
const kenoStepOneDropDown = Selector('#KenoNumbersToPlayDropdown')
const kenoStepOnePlusButton = Selector('#next_KenoNumbersToPlayDropdown')
const kenoStepOnePlusButtonDisabled = Selector('.next-select.disabled')
const kenoStepOneMinusButtonDisabled = Selector('.prev-select.disabled')
const kenoStepOneMinusButton = Selector('#prev_KenoNumbersToPlayDropdown')
const kenoStepTwo = Selector('#kenoStepTwo')
const kenoStepTwoDropDown = Selector('#KenoSpendAmountDropdown')
const kenoStepTwoPlusButton = Selector('#next_KenoSpendAmountDropdown')
const kenoStepTwoPlusButtonDisabled = Selector('.next-select.disabled')
const kenoStepTwoMinusButtonDisabled = Selector('.prev-select.disabled')
const kenoStepTwoMinusButton = Selector('#prev_KenoSpendAmountDropdown')
const kenoAutoFill = Selector('#kenoAutoFill')
const kenoAutoConfirmLine = Selector('#kenoAutoConfirm')
const kenoNumber1 = Selector('#kenoNumber1')
const kenoNumber2 = Selector('#kenoNumber2')
const kenoNumber3 = Selector('#kenoNumber3')
const kenoNumber4 = Selector('#kenoNumber4')
const kenoNumber5 = Selector('#kenoNumber5')
const kenoNumber6 = Selector('#kenoNumber6')
const kenoNumber7 = Selector('#kenoNumber7')
const kenoNumber8 = Selector('#kenoNumber8')
const kenoNumber9 = Selector('#kenoNumber9')
const kenoNumber10 = Selector('#kenoNumber10')
const kenoLineA = Selector('#line_A')
const kenoLineB = Selector('#line_B')
const kenoLineC = Selector('#line_C')
const kenoPosition1 = Selector('#kenoPosition1')
const kenoPosition2 = Selector('#kenoPosition2')
const kenoPosition3 = Selector('#kenoPosition3')
const kenoDeleteLineA = Selector('#delete_0')
const kenoDeleteLineB =Selector('#delete_1')
const kenoGameInfoSection = Selector('.right-options')
const kenoViewOdds = Selector('.odds')
const kenoGroupA = Selector('#groupA')
const kenoGroupB = Selector('#groupB')
//Keno Purchase confirmation
const kenoTicketDetailsSummary = Selector('.ticket-totals')
const kenoTicketTypeInSummary = Selector('.multi-draw-table')
const kenoTotalNumberOfDraws = Selector('#totals-number-of-draws').nth(0)
const kenoPricePerDraw = Selector('#totals-number-of-draws').nth(1)
const kenoTotalCost = Selector('.summary-box').nth(1)
const kenoConfirmPurchase = Selector('#keno-submit-button')

//Keno Thanks Page
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
const kenoTicketBodyPYO = Selector('#TicketRowKeno')
const kenoDrawSummaryPYO = Selector('.gameTicketFooterSummaries')

//Favourites play3
const favouritesTab = Selector('#select-page-favourites')
const createKenoFavourite = Selector('#addYourFavourite_keno')
const favouriteName = Selector('#favouriteName')
const editFavouriteName = Selector('.favouriteTicketName.ticketDetailModalHeader')
const editTicketButton = Selector('#editYourKenoTicket')
const deleteFavourite = Selector('#favouriteTicketDelete')

fixture `***** Verify the games in Keno family *****`
  .page (config.domTestRootUrl)
  .before(async t => {await H.updateWalletBalance})
  .after(async t => {await H.resetSpendingLimit})
  .beforeEach( async t => {
    //await H.resetSpendingLimit()
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

test('Keno Dip', async t => {
  H.StepDescription('should check the browser mode and navigate to games accordingly')
  const gamesAtTopAvailable = Selector('.themeNavSecondary')
  let isSecondaryNavHidden = false
  await gamesAtTopAvailable.getStyleProperty('display').then((res) => {
    return isSecondaryNavHidden = res === 'none'
  })

  if( ! isSecondaryNavHidden) {
    await t
       .click(kenoFromTop)

  }
  else {
    await t
     .click(burgerMenuIcon)
     .click(kenoFromLeft)
  }
  await t
    //TODO Should add validation to check the intended dip has been selected.
    .click(kenoBuyADip)
    .click(kenoOneDollarDip)
    //.expect(kenoOneDollarDip.child('.dip-selector').hasAttribute('selected')).ok()
    .expect(kenoOneDollarDip.child('.dip-selector.selected').exists).ok()
    .expect(buyNowPrice.innerText).eql('$1.00')
    .expect(buyButton.exists).ok()
    .click(buyButton)
  H.StepDescription('should preview $1 Keno dip')
  await t
    .expect(kenoNextDraw.exists).ok()
    .expect(keno10amDraw.exists).ok()
    .expect(previewYourSelection.exists).ok()
    .click(previewYourSelection)
    .expect(kenoTicketPreview.exists).ok()
    .expect(editKenoTicket.exists).ok()
    .expect(closeModal.exists).ok()
    .click(closeModal)
  H.StepDescription('should confirm the purchase of 1 dollar Keno dip')
  await t
    .expect(kenoTicketDetailsSummary.exists).ok()
    .expect(kenoTicketTypeInSummary.exists).ok()
    .expect(kenoTotalNumberOfDraws.innerText).eql('$1 x 1 draw')
    .expect(kenoPricePerDraw.exists).ok()
    .expect(kenoPricePerDraw.innerText).eql('$1.00')
    .expect(kenoTotalCost.exists).ok()
    .expect(kenoTotalCost.innerText).eql('$1.00')
    .expect(kenoConfirmPurchase.exists).ok()
    .click(kenoConfirmPurchase)
  H.StepDescription('should display the thanks page')
  await endAnimationWatcher();
  await t
    .expect(thanksPageHeader.exists).ok()
    .expect(thanksIntroDescription.exists).ok()
    .expect(purchasedTicketHeader.exists).ok()
    .expect(purchasedTicketHeader.innerText).contains('Draw happening:')
    .expect(drawDateOfPurchasedTicket.exists).ok()
    .expect(typeOfPurchasedTicket.exists).ok()
    .expect(typeOfPurchasedTicket.innerText).contains('1 line')
    .expect(costOfPurchasedTicket.exists).ok()
    .expect(costOfPurchasedTicket.innerText).contains('$1.00')

  H.StepDescription('should view the details of purchased Keno dip')
  await t
    .expect(viewDetailsButton.exists).ok()
    .click(viewDetailsButton)
    .expect(viewPurchasedTicketHeader.exists).ok()
    .expect(viewPurchasedTicketBody.exists).ok()
    .click(closeModal)
})

test('Keno PYO - AutoFill', async t => {
    H.StepDescription('should check the browser mode and navigate to games accordingly')
    const gamesAtTopAvailable = Selector('.themeNavSecondary')
    let isSecondaryNavHidden = false
    await gamesAtTopAvailable.getStyleProperty('display').then((res) => {
      return isSecondaryNavHidden = res === 'none'
    })

    if( ! isSecondaryNavHidden) {
      await t
         .click(kenoFromTop)

    }
    else {
      await t
       .click(burgerMenuIcon)
       .click(kenoFromLeft)
    }
    await t
      .click(kenoPYO)
      .expect(kenoStepOne.exists).ok()
      .expect(kenoStepOneMinusButtonDisabled.exists).ok()
      .expect(kenoStepTwo.exists).ok()
      .expect(kenoStepTwoMinusButtonDisabled).ok()
      .expect(kenoStepTwoPlusButtonDisabled).ok('should be disabled by default')
      .expect(kenoGameInfoSection.exists).ok()
      .expect(kenoViewOdds.exists).notOk()
      .expect(kenoAutoFill.hasAttribute('disabled')).ok()
      .expect(kenoAutoConfirmLine.hasAttribute('disabled')).ok()
      .expect(kenoLineA.exists).ok()
      //.expect(kenoPosition1.hasClass('.editLineNoNumber')).notOk()
      .expect(kenoDeleteLineA.exists).notOk()
      .expect(buyNowPrice.innerText).eql('$0.00')
      .expect(buyButton.exists).ok()

    H.StepDescription('should select 3 numbers - step 1')
    await t
      .click(kenoStepOneDropDown)
      .click(kenoStepOneDropDown.child(3))
      .expect(kenoStepOneDropDown.value).eql('3')
      .expect(kenoGroupA.innerText).eql('Prize Group 3')
      .expect(kenoDeleteLineA.exists).ok()
      .expect(kenoPosition1.exists).ok()
      .expect(kenoPosition2.exists).ok()
      .expect(kenoPosition3.exists).ok()
      .expect(kenoViewOdds.exists).notOk()
      .expect(kenoAutoFill.hasAttribute('disabled')).ok()
    H.StepDescription('should select amountToSpend - step 2')
    await t
      .click(kenoStepTwoDropDown)
      .click(kenoStepTwoDropDown.child(3))
      .expect(kenoStepTwoDropDown.value).eql('3')
      .expect(kenoViewOdds.exists).ok()
      .expect(kenoAutoFill.hasAttribute('disabled')).notOk()
    H.StepDescription('should auto fill the numbers - step 3')
    await t
      .click(kenoAutoFill)
      .click(kenoAutoConfirmLine)
      .expect(kenoDeleteLineA.exists).ok()
      .expect(buyNowPrice.innerText).eql('$3.00')
      .expect(buyButton.exists).ok()
      .click(buyButton)
    H.StepDescription('should select number of draws')
    const kenoNumbersDraws = Selector('#KenoNumbersDraws')
    const kenoNumbersDrawsMinus = Selector('#prev_KenoNumbersDraws')
    const kenoNumbersDrawsPlus = Selector('#next_KenoNumbersDraws')
    const kenoTextHeader = Selector('.text-header').nth(1)
    await t
      .expect(kenoNumbersDraws.exists).ok()
      .click(kenoNumbersDraws)
      .click(kenoNumbersDraws.child(3))
      .expect(kenoNumbersDraws.value).eql('4')
      .click(kenoNumbersDrawsPlus)
      .expect(kenoNumbersDraws.value).eql('5')
      .click(kenoNumbersDrawsMinus)
      .expect(kenoNumbersDraws.value).eql('4')
      .click(kenoNumbersDrawsMinus)
      .expect(kenoNumbersDraws.value).eql('3')
      .expect(kenoTextHeader.innerText).eql('What times do you want your 3 draws?')
      .expect(kenoNextDraw.exists).ok()
      .expect(keno10amDraw.exists).ok()
      .expect(previewYourSelection.exists).ok()
      .click(previewYourSelection)
      .expect(kenoTicketPreview.exists).ok()
      .expect(editKenoTicket.exists).ok()
      .expect(closeModal.exists).ok()
      .click(closeModal)
    H.StepDescription('should confirm the purchase')
    await t
      .expect(kenoTicketDetailsSummary.exists).ok()
      .expect(kenoTicketTypeInSummary.exists).ok()
      .expect(kenoTotalNumberOfDraws.innerText).eql('x3')
      .expect(kenoTotalNumberOfDraws.innerText).eql('x3')
      .expect(kenoTotalCost.exists).ok()
      .expect(kenoTotalCost.innerText).eql('$9.00')
      .expect(kenoConfirmPurchase.exists).ok()
      .click(kenoConfirmPurchase)
      .wait(1000)
    H.StepDescription('should display the Keno thanks page')
    await endAnimationWatcher();
    await t
      .expect(thanksPageHeader.exists).ok()
      .expect(thanksIntroDescription.exists).ok()
      .expect(purchasedTicketHeader.exists).ok()
      .expect(purchasedTicketHeader.innerText).contains('Next draw happening:')
      .expect(drawDateOfPurchasedTicket.exists).ok()
      .expect(typeOfPurchasedTicket.exists).ok()
      .expect(typeOfPurchasedTicket.innerText).contains('1 line')
      .expect(costOfPurchasedTicket.exists).ok()
      .expect(costOfPurchasedTicket.innerText).contains('$3.00')
    H.StepDescription('should view the details of purchased Keno PYO')
    await t
      .expect(viewDetailsButton.exists).ok()
      .click(viewDetailsButton)
      .expect(viewPurchasedTicketHeader.exists).ok()
      .expect(viewPurchasedTicketBody.exists).ok()
    H.StepDescription('should save the Keno PYO as Favourite')
    await t
      .expect(editNamePYO2Fav.exists).ok()
      .expect(saveFavName.hasAttribute('disabled')).ok()
      .expect(drawHappeningPYO.exists).ok()
      .expect(kenoTicketBodyPYO.exists).ok()
      .expect(kenoDrawSummaryPYO.exists).ok()
      .click(editNamePYO2Fav)
      .typeText(editNamePYO2Fav, await H.makeFavName())
      .click(saveFavName)
      .expect(closeModal.exists).notOk()

})

test('Keno PYO - Manual number selection', async t => {
  H.StepDescription('should check the browser mode and navigate to games accordingly')
  const gamesAtTopAvailable = Selector('.themeNavSecondary')
  let isSecondaryNavHidden = false
  await gamesAtTopAvailable.getStyleProperty('display').then((res) => {
    return isSecondaryNavHidden = res === 'none'
  })

  if( ! isSecondaryNavHidden) {
    await t
       .click(kenoFromTop)

  }
  else {
    await t
     .click(burgerMenuIcon)
     .click(kenoFromLeft)
  }
  await t
    .click(kenoPYO)
    .expect(kenoStepOne.exists).ok()
    .expect(kenoStepOneMinusButtonDisabled.exists).ok()
    .expect(kenoStepTwo.exists).ok()
    .expect(kenoStepTwoMinusButtonDisabled).ok()
    .expect(kenoStepTwoPlusButtonDisabled).ok('should be disabled by default')
    .expect(kenoGameInfoSection.exists).ok()
    .expect(kenoViewOdds.exists).notOk()
    .expect(kenoAutoFill.hasAttribute('disabled')).ok()
    .expect(kenoAutoConfirmLine.hasAttribute('disabled')).ok()
    .expect(kenoLineA.exists).ok()
    //.expect(kenoPosition1.hasClass('.editLineNoNumber')).notOk()
    .expect(kenoDeleteLineA.exists).notOk()
    .expect(buyNowPrice.innerText).eql('$0.00')
    .expect(buyButton.exists).ok()

  H.StepDescription('should select 3 numbers - step 1')

  await t
    .click(kenoStepOneDropDown)
    .click(kenoStepOneDropDown.child(3))
    .expect(kenoStepOneDropDown.value).eql('3')
    .expect(kenoGroupA.innerText).eql('Prize Group 3')
    .expect(kenoDeleteLineA.exists).ok()
    .expect(kenoPosition1.exists).ok()
    .expect(kenoPosition2.exists).ok()
    .expect(kenoPosition3.exists).ok()
    .expect(kenoViewOdds.exists).notOk()
    .expect(kenoAutoFill.hasAttribute('disabled')).ok()
  H.StepDescription('should select amountToSpend - step 2')
  await t
    .click(kenoStepTwoDropDown)
    .click(kenoStepTwoDropDown.child(3))
    .expect(kenoStepTwoDropDown.value).eql('3')
    .expect(kenoViewOdds.exists).ok()
    .expect(kenoAutoFill.hasAttribute('disabled')).notOk()
  H.StepDescription('should auto fill the numbers - step 3')
  await t
    .click(kenoNumber1)
    .click(kenoNumber2)
    .click(kenoNumber3)
    .click(kenoAutoConfirmLine)
    .expect(kenoDeleteLineA.exists).ok()
    .expect(buyNowPrice.innerText).eql('$3.00')
    .expect(buyButton.exists).ok()
    .click(buyButton)

  H.StepDescription('should select number of draws')
  const kenoNumbersDraws = Selector('#KenoNumbersDraws')
  const kenoNumbersDrawsMinus = Selector('#prev_KenoNumbersDraws')
  const kenoNumbersDrawsPlus = Selector('#next_KenoNumbersDraws')
  const kenoTextHeader = Selector('.text-header').nth(1)
  await t
    .expect(kenoNumbersDraws.exists).ok()
    .click(kenoNumbersDraws)
    .click(kenoNumbersDraws.child(1))
    .expect(kenoNumbersDraws.value).eql('2')
    .click(kenoNumbersDrawsMinus)
    .expect(kenoNumbersDraws.value).eql('1')
    .expect(kenoTextHeader.innerText).eql('What time do you want your 1 draw?')
    .expect(kenoNextDraw.exists).ok()
    .expect(keno10amDraw.exists).ok()
    .click(keno10amDraw.parent())
    .click(keno1pmDraw.parent())
    .click(keno3pmDraw.parent())
    .click(keno6pmDraw.parent())
    .expect(previewYourSelection.exists).ok()
    .click(previewYourSelection)
    .expect(kenoTicketPreview.exists).ok()
    .expect(editKenoTicket.exists).ok()
    .expect(closeModal.exists).ok()
    .click(closeModal)
  H.StepDescription('should confirm the purchase')
  await t
    .expect(kenoTicketDetailsSummary.exists).ok()
    .expect(kenoTicketTypeInSummary.exists).ok()
  //      .expect(kenoPricePerDraw.exists).ok()
  //      .expect(kenoPricePerDraw.innerText).eql('$3.00')
    .expect(kenoTotalNumberOfDraws.innerText).eql('x1')
    .expect(kenoTotalCost.exists).ok()
    .expect(kenoTotalCost.innerText).eql('$3.00')
    .expect(kenoConfirmPurchase.exists).ok()
    .click(kenoConfirmPurchase)
    .wait(1000)
  H.StepDescription('should display the Keno thanks page')
  await endAnimationWatcher();
  await t
    .wait(2000)
    .expect(thanksPageHeader.exists).ok()
    .expect(thanksIntroDescription.exists).ok()
    .expect(purchasedTicketHeader.exists).ok()
    .expect(purchasedTicketHeader.innerText).contains('Draw happening:')
    .expect(drawDateOfPurchasedTicket.exists).ok()
    .expect(typeOfPurchasedTicket.exists).ok()
    .expect(typeOfPurchasedTicket.innerText).contains('1 line')
    .expect(costOfPurchasedTicket.exists).ok()
    .expect(costOfPurchasedTicket.innerText).contains('$3.00')

  H.StepDescription('should view the details of purchased Keno PYO')
  await t
    .expect(viewDetailsButton.exists).ok()
    .click(viewDetailsButton)
    .expect(viewPurchasedTicketHeader.exists).ok()
    .expect(viewPurchasedTicketBody.exists).ok()
    .click(closeModal)

})

test('Keno - Favourites - Create/View/Edit/Delete', async t => {
  const updatedFavouriteName = await H.makeFavName()
  const favName = await H.makeFavName()
  const favFromMyFavourites = Selector('.gameTicketFavouriteTitle').withText(favName)
  const viewTicketsForNewFav = Selector(favFromMyFavourites).parent('div').nth(6)
  const latestFavourite = Selector('.gameTicketFavouriteTitle').withText(updatedFavouriteName)
  const latestFavFromMyFavourites = Selector('.gameTicketFavouriteTitle').withText(updatedFavouriteName)
  const viewLatestFavourite = Selector(latestFavFromMyFavourites).parent('div').nth(6)

  H.StepDescription('should create Keno favourites from My favourites')
  await t
    .click(myTickets)
    .click(favouritesTab)
    .click(createKenoFavourite.parent())
    .click(favouriteName)
    .typeText(favouriteName, favName)

  H.StepDescription('should select 3 numbers - step 1')
  const kenoGroupA = Selector('#groupA')
  await t
    .expect(ecommerceBarText.innerText).eql('Choose how many numbers you want to play\n')
    .click(kenoStepOneDropDown)
    .click(kenoStepOneDropDown.child(5))
    .expect(kenoStepOneDropDown.value).eql('5')
    .expect(kenoGroupA.innerText).eql('Prize Group 5')
    .expect(ecommerceBarText.innerText).eql('Choose how much you want to spend on this line\n')

  H.StepDescription('should select amountToSpend - step 2')
  await t
    .click(kenoStepTwoDropDown)
    .click(kenoStepTwoDropDown.child(4))
    .expect(kenoStepTwoDropDown.value).eql('4')
    .expect(buyButton.innerText).eql('SAVE\n')

  H.StepDescription('should pick the numbers manually - step 3')
  await t
    .click(kenoNumber1)
    .click(kenoNumber2)
    .click(kenoNumber3)
    .click(kenoNumber4)
    .click(kenoNumber5)
    .click(kenoAutoConfirmLine)
    .expect(kenoDeleteLineA.exists).ok()
    .expect(buyNowPrice.innerText).eql('$4.00')
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
      .click(kenoStepOneDropDown)
      .click(kenoStepOneDropDown.child(4))
      .expect(kenoStepOneDropDown.value).eql('4')
      .expect(kenoGroupB.innerText).eql('Prize Group 4')
      .click(kenoStepTwoDropDown)
      .click(kenoStepTwoDropDown.child(3))
      .expect(kenoStepTwoDropDown.value).eql('3')
      .click(kenoNumber6)
      .click(kenoNumber7)
      .click(kenoNumber8)
      .click(kenoNumber9)
      .click(kenoAutoConfirmLine)
      .expect(kenoDeleteLineB.exists).ok()
      .expect(buyNowPrice.innerText).eql('$7.00')
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
