import { Selector } from 'testcafe'
import Helpers from './test_utils/helpers'
import config from './test_utils/config'

const H = new Helpers()

const logoutBtn = Selector('button.header-logout-link')
const menuLinks = Selector('.header-main-menu a')
const headerLogo = Selector('img.header-logo')
const reqPreApprovalLink = Selector('[href="/request-pre-approval"]')
const preApprovalsLink = Selector('[href="/pre-approvals"]')
const reqPaymentLink = Selector('[href="/request-payment"]')
const paymentsLink = Selector('[href="/payments"]')
const currentProviderName = Selector('h1.home-heading')
const providerSelect = Selector('select.header-provider-select')

fixture `***** Provider portal header tests`
  .page(config.domTestRootUrl)

test('Header', async t => {
  H.BeginTest('Header')

  H.StepDescription('has logged in')
  await H.login('three-providers-all-user@example.org', '3-Providers')
  await t.expect(currentProviderName.exists).ok()

  H.StepDescription('has header logo')
  await t.expect(headerLogo.exists).ok()

  H.StepDescription('has Logout button')
  await t
    .expect(logoutBtn.exists).ok()
    .expect(logoutBtn.textContent).eql('Logout')

  H.StepDescription('has menu items as links')
  await t
    .expect(menuLinks.exists).ok()
    .expect(menuLinks.count).eql(3, 'assuming the first provider is not a specialist for this login')

  H.StepDescription('does not display Request a pre-approval menu for non-Specialists')
  await t.expect(reqPreApprovalLink.exists).notOk()

  H.StepDescription('does not display Pre-approvals menu for non-Specialists')
  await t.expect(preApprovalsLink.exists).notOk()

  H.StepDescription('displays Request a payment menu')
  await t.expect(reqPaymentLink.exists).ok()

  H.StepDescription('displays Payments menu')
  await t.expect(paymentsLink.exists).ok()

  H.StepDescription('has provider selection dropdown')
  await t.expect(providerSelect.exists).ok()

  H.StepDescription('Specialists')
  await H.chooseProvider(1) // assuming a Specialist
  await t
    .expect(reqPreApprovalLink.exists).ok('should display Request a pre-approval menu')
    .expect(preApprovalsLink.exists).ok('should display Pre-approvals menu')
    .expect(reqPaymentLink.exists).ok('should still display Request a payment menu')
    .expect(paymentsLink.exists).ok('should still display Payments menu')
})
