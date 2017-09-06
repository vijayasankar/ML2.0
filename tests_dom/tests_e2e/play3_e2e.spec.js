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
const leftNavigationMenu = Selector('#nav-menu-main-menu-pulldown-wrapper')
const play3FromTop = Selector('#navPlay3secondary')
const play3FromLeft = Selector('#navPlay3left')

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

//Play3 Home Page
const playFor$1 = Selector('.button.default').nth(0)
const play3HowToPlay = Selector('#howToPlay')

//play3 HowtoPlay
const play3HowItWorks = Selector('.h2').nth(0)
const play3Pick3Numbers = Selector('.h3').nth(0)
const play3PickPlayType = Selector('.h3').nth(1)
const play3PlayNowButton = Selector('#playNow')
const play3HowMuchCanIWin = Selector('.play3HowMuchCanIWin')
const play3DescriptionTable = Selector('.play3DescriptionTable')



const eCommerceBar = Selector('#ecommerceBar')
const ecommerceBarBuyButton = Selector('#buyButton')
const buyNowPrice = Selector('.buyNowPrice')
const buyButton = Selector('#buyButton')



const closeModal = Selector('#close-modal')




const play3ConfirmPurchasePage = Selector('#confirmation-form')

const previewYourSelection = Selector('#ticket')
const play3TicketDetailsSummary = Selector('.ticket-totals')
const play3TicketSummaryGameType = Selector('.lines')
const play3TotalNumberOfDraws = Selector('.lines').child(1)
const play3TotalTitle = Selector('.summary-box').nth(0)
const play3TotalCost = Selector('.summary-box').nth(1)
const play3ConfirmPurchase = Selector('#keno-submit-button')
const play3PricePerDraw = Selector('.ticket-totals').nth(3)
const play3TicketPreview = Selector('#play3Ticket')
const editplay3Ticket = Selector('.edit')
const play3TicketPreviewSummary = Selector('.previewTicketSummary')


//PLay3 Thanks Page
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
const play3TicketBodyPYO = Selector('#TicketRowBullseye')
const bullseyeDrawSummaryPYO = Selector('.gameTicketFooterSummaries')
const viewPurchasedTicketModal = Selector('.modalUnderlay.ticket-detail-modal')
const myTicketsDetails =  Selector('.ticketDetailModalHeader').nth(0)
const saveTheseTicketsForLater = Selector('.ticketDetailModalHeader').nth(1)



fixture `***** Verify the games in Bullseye family *****`
  .page (config.domTestRootUrl)

test('Play3 - How to play', async t => {
    H.StepDescription('has navigated to Lotto SIT 1 environment')
    H.StepDescription('should login with valid credentials')
    await t
      .click(login)
      .click(loginButton)
      .typeText(email, 'lotto1@test.com')
      .typeText(password, 'password1')
      .click(loginSubmit)
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
    H.StepDescription('should check the contents in Play3 - how to play page')
    if(play3FromTop.exists)
        {  await t
              .click(play3FromTop)
              .click(play3HowToPlay)
        }
    else
    {
           await t
              .click(leftNavigationMenu)
              .click(play3FromLeft)
              .click(play3HowToPlay)
    }
    await t
      .expect(play3HowItWorks.exists).ok()
      .expect(play3HowItWorks.innerText).eql('How it works')
      .expect(play3Pick3Numbers.exists).ok()
      .expect(play3Pick3Numbers.innerText).eql('1. Pick a 3-digit number')
      .expect(play3PickPlayType.exists).ok()
      .expect(play3PickPlayType.innerText).eql('2. Pick a Play Type')
      .expect(play3PlayNowButton.exists).ok()
      .expect(play3PlayNowButton.innerText).eql('PLAY NOW')
      .expect(play3HowMuchCanIWin.exists).ok()
      .expect(play3DescriptionTable.exists).ok()
    H.StepDescription('User logs out')
    await t
      .click(rightMenuLoggedIn.child(1))
      .click(logout)
      .expect(tickets.exists).notOk()
})

test('Play3 - Exact order', async t => {
    H.StepDescription('has navigated to Lotto SIT 1 environment')
    H.StepDescription('should login with valid credentials')
    await t
      .click(login)
      .click(loginButton)
      .typeText(email, 'lotto1@test.com')
      .typeText(password, 'password1')
      .click(loginSubmit)
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
    H.StepDescription('should check the contents in - Play now ')
const ecommerceBarText  = Selector('.upSellWrapperText')
const play3NumberSection = Selector('#play3NumberSelector')
const play3PlayTypeSection = Selector('.play3TypeSelectorWrapper.form')
const play3TicketSection = Selector('#play3Ticket')

const play3NumberInput1 = Selector('#play3NumberInput_0')
const play3NumberInput2 = Selector('#play3NumberInput_1')
const play3NumberInput3 = Selector('#play3NumberInput_2')

const play3Number1 = Selector('#play3Number_1')
const play3Number2 = Selector('#play3Number_2')
const play3Number3 = Selector('#play3Number_3')
const play3Number4 = Selector('#play3Number_4')
const play3Number5 = Selector('#play3Number_5')
const play3Number6 = Selector('#play3Number_6')
const play3Number7 = Selector('#play3Number_7')
const play3Number8 = Selector('#play3Number_8')
const play3Number9 = Selector('#play3Number_9')
const play3Number0 = Selector('#play3Number_10')
const play3Reset = Selector('#play3_reset')
const play3AutoFill = Selector('#play3_auto_pick')

const play3Exact = Selector('#play3Type_Exact')
const play3Any = Selector('#play3Type_Any')
const play3Pairs = Selector('#play3Type_Pairs')
const play3ExactAny = Selector('#play3Type_ExactAny')
const play3ExactPairs = Selector('#play3Type_ExactPairs')
const play3ExactAnyPairs = Selector('#play3Type_ExactAnyPairs')
const play3Combo = Selector('#play3Type_Combo')

const play3PositionA1 = Selector('.editLineNumber').nth(0)
const play3PositionA2 = Selector('.editLineNumber').nth(1)
const play3PositionA3 = Selector('.editLineNumber').nth(2)
const play3PositionB1 = Selector('.editLineNumber').nth(3)
const play3PositionB2 = Selector('.editLineNumber').nth(4)
const play3PositionB3 = Selector('.editLineNumber').nth(5)

const play3Line1PlayType = Selector('.playType').nth(0)
const play3Line2PlayType = Selector('.playType').nth(1)
const play3Line3PlayType = Selector('.playType').nth(2)

const play3DeleteLineA = Selector('#deleteButton_0')
const play3DeleteLineB = Selector('#deleteButton_1')
const play3DeleteLineC = Selector('#deleteButton_2')
const play3DeleteLineD = Selector('#deleteButton_3')

const whatsPlayTypeTab = Selector('#react-tabs-8')
const howCanIwinTab = Selector('#react-tabs-10')
const play3OddsTable = Selector('.play3OddsTable')

const play3Draw1 = Selector('input[name="drawCount1"]')
const play3Draw2 = Selector('input[name="drawCount2"]')
const play3Draw5 = Selector('input[name="drawCount5"]')
const play3Draw7 = Selector('input[name="drawCount7"]')
const play3Draw10 = Selector('input[name="drawCount10"]')
const play3Draw14 = Selector('input[name="drawCount14"]')


    if(play3FromTop.exists)
        {  await t
              .click(play3FromTop)
              .click(playFor$1)
        }
    else
    {
           await t
              .click(leftNavigationMenu)
              .click(play3FromLeft)
              .click(playFor$1)
    }
    await t
      .expect(play3NumberSection.exists).ok()
      .expect(play3PlayTypeSection.exists).ok()
      .expect(play3TicketSection.exists).ok()

    H.StepDescription('should input the number for line A')
    await t
      .expect(ecommerceBarText.innerText).eql('Choose a 3 digit number. Need help?\n')
      .typeText(play3NumberInput1, '1')
      .typeText(play3NumberInput2, '2')
      .typeText(play3NumberInput3, '3')
      .expect(ecommerceBarText.innerText).eql('Choose a Play Type\n')

    H.StepDescription('should select EXACT ORDER type')
    await t
      .click(play3Exact)
      .expect(ecommerceBarText.innerText).eql('Add another number or click \'buy\' to continue\n')
      .expect(play3PositionA1.innerText).eql('1')
      .expect(play3PositionA2.innerText).eql('2')
      .expect(play3PositionA3.innerText).eql('3')
      .expect(play3Line1PlayType.innerText).eql('Exact order')
      .expect(play3DeleteLineA.exists).ok()
       .expect(buyNowPrice.innerText).eql('$1.00')
       .click(buyButton)

    H.StepDescription('should preview 1-line Play3 ')
    await t
      .expect(play3ConfirmPurchasePage.exists).ok()
      .expect(play3Draw1.exists).ok()
      .expect(play3Draw1.value).eql('1')
      .expect(play3Draw2.exists).ok()
      .expect(play3Draw2.value).eql('2')
      .expect(play3Draw5.exists).ok()
      .expect(play3Draw5.value).eql('5')
      .expect(play3Draw7.exists).ok()
      .expect(play3Draw7.value).eql('7')
      .expect(play3Draw10.exists).ok()
      .expect(play3Draw10.value).eql('10')
      .expect(play3Draw14.exists).ok()
      .expect(play3Draw14.value).eql('14')
      .expect(previewYourSelection.exists).ok()
      .click(previewYourSelection)
      .expect(play3TicketPreview.exists).ok()
      .expect(editplay3Ticket.exists).ok()
      .expect(closeModal.exists).ok()
      .click(closeModal)

    H.StepDescription('should confirm purchase of Play3')
    await t
      .expect(play3TicketDetailsSummary.exists).ok()
      .expect(play3TicketSummaryGameType.exists).ok()
      .expect(play3TicketSummaryGameType.innerText).eql('Line 1')
      //.expect(bullseyeTotalNumberOfDraws.innerText).eql('1 Line') //TODO Investigate
//      .expect(bullseyePricePerDraw.exists).ok()
//      .expect(bullseyePricePerDraw.innerText).eql('$2.00')
//      .expect(bullseyeTotalCost.exists).ok()
//      .expect(bullseyeTotalCost.innerText).eql('$2.00')
      .expect(play3ConfirmPurchase.exists).ok()
      .click(play3ConfirmPurchase)
    H.StepDescription('should display the thanks page')
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

    H.StepDescription('should view the details of Play3 Ticket')
    await t
      .expect(viewDetailsButton.exists).ok()
      .click(viewDetailsButton)
      .expect(viewPurchasedTicketHeader.exists).ok()
      .expect(viewPurchasedTicketBody.exists).ok()
      .click(closeModal)

    H.StepDescription('should save the play3 PYO as favourite')
    await t
      .click(viewDetailsButton)
      .expect(viewPurchasedTicketModal.exists).ok()
      .expect(myTicketsDetails.innerText).eql('My tickets details')
      .expect(saveTheseTicketsForLater.innerText).eql('Save these tickets for later')
      .click(editNamePYO2Fav)
      .typeText(editNamePYO2Fav, await H.makeFavName())
      .click(saveFavName)
      .expect(closeModal.exists).notOk()

    H.StepDescription('User logs out')
    await t
      .click(rightMenuLoggedIn.child(1))
      .click(logout)
      .expect(tickets.exists).notOk()
})
