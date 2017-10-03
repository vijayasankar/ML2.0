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

//instantPlay Page components
const currentGamesTab = Selector('#select-page-current-games')
const pastGamesTab = Selector('.past-games')
const allGame = Selector('.game-null')
const oneDollarGame = Selector('.game-1')
const twoDollarGame = Selector('.game-2')
const threeDollarGame = Selector('.game-3')
const fiveDollarGame = Selector('.game-5')
const sevenDollarGame = Selector('.game-7')
const nineDollarGame = Selector('.game-9')
const tenDollarGame = Selector('.game-10')
const currentGameFilter = Selector('#InstantKiwiGameFilter')
const latestGame = Selector(currentGameFilter).child(0)
const oldestGame = Selector(currentGameFilter).child(1)
const searchPastGame = Selector('.form')
const pastGamesTable = Selector('.pastGamesTable')
const viewCurrentIKGame = Selector('.icon-expand')
const currentIKTicketSummary = Selector('.ticketSummary')
const currentIKTicket = Selector('.ticket')
const currentIKTicketModal = Selector('.modalTicket')
const closeModal = Selector('#close-modal')
const ticketHeaderInModal = Selector('.ticketHeader')
const ticketTitleInModal = Selector('.ticketTitle')
const ticketInfo = Selector('.ticketInfo')
const ticketImageInModal = Selector('.imageloader.loaded.frontImage ')
const ticketSummaryInModal= Selector('.ticketSummary')
const bigWinnersInModal = Selector('.bigWinners')
const prizeBreakDownInModal = Selector('.prizeBreakdown')
const viewPastGameLink = Selector('[href="#"]').nth(2)
const ticketClosedWarning = Selector('.ticketClosed')
fixture `***** User setup *****`
  .page (config.domTestRootUrl)

test('Check the Instant Kiwi games ', async t => {
  H.StepDescription('should go to MyLotto home page')
  H.StepDescription('should navigate to IK home page')
  await t
      .click(instantKiwiGame)
  H.StepDescription('should check the current Instant Kiwi Game')
  await t
      .expect(currentGamesTab.exists).ok()
      .expect(pastGamesTab.exists).ok()
      .expect(allGame.exists).ok()
      .expect(oneDollarGame.exists).ok()
      .expect(twoDollarGame.exists).ok()
      .expect(threeDollarGame.exists).ok()
      .expect(fiveDollarGame.exists).ok()
      .expect(tenDollarGame.exists).ok()
      .expect(currentGameFilter.exists).ok()
      .click(allGame)
      .click(oneDollarGame)
      .click(twoDollarGame)
      .click(threeDollarGame)
      .click(fiveDollarGame)
      .click(tenDollarGame)
      .click(allGame)
      .click(currentGameFilter)
      .expect(latestGame.exists).ok()
      .expect(oldestGame.exists).ok()
      .pressKey('enter')
      .expect(currentIKTicket.exists).ok()
      .expect(currentIKTicketSummary.exists).ok()
      .expect(viewCurrentIKGame.exists).ok()
      .click(viewCurrentIKGame.nth(1))
      .expect(closeModal.exists).ok()
      .expect(ticketHeaderInModal.exists).ok()
      .expect(ticketTitleInModal.exists).ok()
      .expect(ticketInfo.exists).ok()
      .expect(ticketSummaryInModal.exists).ok()
      .click(closeModal)
      .click(instantKiwiGame)
      .click(currentGameFilter)
      .click(oldestGame)
      .expect(currentIKTicket.exists).ok()
      .expect(currentIKTicketSummary.exists).ok()
      .expect(viewCurrentIKGame.exists).ok()
      .click(viewCurrentIKGame)
      .expect(closeModal.exists).ok()
      .expect(ticketHeaderInModal.exists).ok()
      .expect(ticketTitleInModal.exists).ok()
      .expect(ticketInfo.exists).ok()
      .expect(ticketSummaryInModal.exists).ok()
      .click(closeModal)
  H.StepDescription('should check the past Instant Kiwi Game')
  await t
      .click(instantKiwiGame)
      .click(pastGamesTab)
      .expect(allGame.exists).ok()
      .expect(oneDollarGame.exists).ok()
      .expect(sevenDollarGame.exists).ok()
      .expect(nineDollarGame.exists).ok()
      .expect(tenDollarGame.exists).ok()
      .expect(searchPastGame.exists).ok()
      .click(allGame)
      .click(oneDollarGame)
      .click(sevenDollarGame)
      .click(nineDollarGame)
      .click(tenDollarGame)
      .click(allGame)
      .click(searchPastGame)
      .typeText(searchPastGame, 'Cash')
      .expect(pastGamesTable.innerText).contains('Cash')
      .click(searchPastGame)
      .pressKey('ctrl+a delete')
      .typeText(searchPastGame, 'Live')
      .expect(pastGamesTable.innerText).contains('Live')
      .click(searchPastGame)
      .pressKey('ctrl+a delete')
      .typeText(searchPastGame, 'Gift')
      .expect(pastGamesTable.innerText).contains('Gift')
      //.click(viewPastGameLink)
      .pressKey('tab enter')
      .expect(ticketClosedWarning.exists).ok()
      .expect(closeModal.exists).ok()
      .expect(ticketHeaderInModal.exists).ok()
      .expect(ticketTitleInModal.exists).ok()
      .expect(ticketInfo.exists).ok()
      //.expect(ticketImageInModal.exists).ok()
      .expect(ticketSummaryInModal.exists).ok()
      //.expect(bigWinnersInModal.exists).ok()
      //.expect(prizeBreakDownInModal.exists).ok()
      .click(closeModal)
})
