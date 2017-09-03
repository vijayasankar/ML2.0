import { Selector } from 'testcafe'
import Helpers from '../test_utils/helpers'
import config from '../test_utils/config'

const H = new Helpers()
// entry points

const home = Selector('.header-home-link')
const currentProviderName = Selector('h1.home-heading')
const reqPaymentLink = Selector('[href="/request-payment"]')
const paymentLink = Selector('[href="/providerportal/payments"]')
const preApprovalLink = Selector('[href="/pre-approvals"]')
const userManagementLink = Selector('[href="/user-management"]')
const preApprovalHeading = Selector('.pre-approvals-heading')
const preApprovalSubHeader = Selector('.pre-approvals-subheading')
const paymentHeading = Selector('.payments-heading')
const paymentPageSubHeader = Selector('.payments-subheading')
const homePagePaymentSubHeader = Selector('.home__payments-subheading')
const homePagePreApprovalSubHeader = Selector('.home__pre-approvals-subheading')
const viewAllPreapprovals = Selector('.home-trigger.is-view-all.is-pre-approvals')
const viewAllPayments = Selector('.home-trigger.is-view-all.is-payments')
const logoutPage = Selector ('.form-explanation')

const loginAsHospital = async function (t) {
  await H.login('hospital-user@example.org', '1-Provider')
 }
const loginAsSpecialist = async function (t) {
  await H.login('specialist-user@example.org', '1-Provider')
 }
const loginAsAnaesthetist  = async function (t) {
  await H.login('anaesthetist-user@example.org', '1-Provider')
 }

fixture `***** Provider portal Dashboard View tests`
  .page(config.domTestRootUrl)


test('Hospital User - Dashboard View', async t => {
 H.BeginTest('Hospital User - Dashboard View')
  H.StepDescription('has logged in as Hospital User')
  await loginAsHospital(t)

  H.StepDescription('Checking - Dashboard Contents for hospital view')
  const chosenProviderName = await H.chooseProvider(0)
  await t
      .expect(currentProviderName.exists).ok()
      .expect(currentProviderName.innerText).eql(chosenProviderName)
      .expect(homePagePaymentSubHeader.exists).ok()
      .expect(viewAllPayments.exists).ok()
      .expect(preApprovalSubHeader.exists).notOk()

  H.StepDescription('Checking - View more Payments')
  await t
      .click(viewAllPayments)
      .expect(paymentLink.exists).ok()
      //.expect(paymentLink.hasClass('.route--active')).ok()
      .expect(paymentHeading.exists).ok()
      .expect(paymentPageSubHeader.exists).ok()
      .expect(paymentPageSubHeader.innerText).eql(chosenProviderName)
  H.StepDescription('Hospital user has logged out')
  await H.logout()
  await t
      .expect(logoutPage.exists).ok()
      .expect(logoutPage.innerText).eql('You have been logged out.')

})

test('Anaesthetist  User - Dashboard View', async t => {
 H.BeginTest('Anaesthetist  User - Dashboard View')
  H.StepDescription('has logged in as Anaesthetist  User')
  await loginAsAnaesthetist(t)

  H.StepDescription('Checking - Dashboard Contents for anaesthetist view')
  const chosenProviderName = await H.chooseProvider(0)
  await t
      .expect(currentProviderName.exists).ok()
      .expect(currentProviderName.innerText).eql(chosenProviderName)
      .expect(homePagePaymentSubHeader.exists).ok()
      .expect(viewAllPayments.exists).ok()
      .expect(preApprovalSubHeader.exists).notOk()

  H.StepDescription('Checking - View more Payments')
  await t
      .click(viewAllPayments)
      .expect(paymentLink.exists).ok()
      //.expect(paymentLink.hasClass('route--active')).ok()
      .expect(paymentHeading.exists).ok()
      .expect(paymentPageSubHeader.exists).ok()
      .expect(paymentPageSubHeader.innerText).eql(chosenProviderName)
  H.StepDescription('Anaesthetist user has logged out')
  await H.logout()
  await t
      .expect(logoutPage.exists).ok()
      .expect(logoutPage.innerText).eql('You have been logged out.')
})

test('Specialist User - Dashboard View', async t => {
 H.BeginTest('Specialist User - Dashboard View')
  H.StepDescription('has logged in as Specialist User')
  await loginAsSpecialist(t)

  H.StepDescription('Checking - Dashboard Contents for specialist view')
  const chosenProviderName = await H.chooseProvider(0)
  await t
      .expect(currentProviderName.exists).ok()
      .expect(currentProviderName.innerText).eql(chosenProviderName)
      .expect(homePagePreApprovalSubHeader.innerText).eql('Pre-approvals')
      .expect(homePagePaymentSubHeader.innerText).eql('Payments')
      .expect(viewAllPreapprovals.exists).ok()
      .expect(viewAllPayments.exists).ok()

  H.StepDescription('Checking - View more Pre-approvals')
  await t
      .click(viewAllPreapprovals)
      //.expect(preApprovalLink.hasClass('route--active')).ok()
      .expect(preApprovalHeading.exists).ok()
      .expect(preApprovalSubHeader.exists).ok()
      .expect(preApprovalSubHeader.innerText).eql(chosenProviderName)

  H.StepDescription('Checking - View more Pre-approvals')
  await t
    .click(home)
    .expect(currentProviderName.exists).ok()
    .expect(homePagePreApprovalSubHeader.exists).ok()
    .expect(homePagePaymentSubHeader.exists).ok()
    .click(viewAllPayments)
    //.expect(paymentLink.hasClass('route--active')).ok()
    .expect(paymentHeading.exists).ok()
    .expect(paymentPageSubHeader.exists).ok()
    .expect(paymentPageSubHeader.innerText).eql(chosenProviderName)

  H.StepDescription('Specialist user has logged out')
  await H.logout()
  await t
    .expect(logoutPage.exists).ok()
    .expect(logoutPage.innerText).eql('You have been logged out.')
})
