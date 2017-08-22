import { Selector } from 'testcafe'
import Helpers from '../test_utils/helpers'
import config from '../test_utils/config'

const H = new Helpers()
// entry points

const home = Selector('.header-home-link')
const currentProviderName = Selector('h1.home-heading')
const homePagePaymentSubHeader = Selector('.home__payments-subheading')
const viewAllPreapprovals = Selector('.home-trigger.is-view-all.is-pre-approvals')
const viewAllPayments = Selector('.home-trigger.is-view-all.is-payments')
const preApprovalSubHeader = Selector('.pre-approvals-subheading')
const reqPaymentLink = Selector('[href="/providerportal/request-payment"]')
const paymentLink = Selector('[href="/providerportal/payments"]')
const preApprovalLink = Selector('[href="/providerportal/pre-approvals"]')
const userManagementLink = Selector('[href="/providerportal/user-management"]')
const userManagementHeading = Selector('.user-management-heading')
const userManagementPageSubHeader = Selector('.user-management-subheading')
const currentUser = Selector('.user-management__current_user-form-title')
const currentUserName = Selector('.user-management__current_user-valid-title.is-name')
const currentUserEmail = Selector('.user-management__current_user-valid-title.is-email')
const registeredUsers = Selector('.user-management__registered-users-form-title')
const registeredUsersNameHeader = Selector('.user-management__registered-users-row-heading.is-name')
const registeredUsersEmailHeader = Selector('.user-management__registered-users-row-heading.is-email')
const registeredUsersRoleHeader = Selector('.user-management__registered-users-row-heading.is-role')
const createUserSection = Selector('.user-management__create-user-wrapper')
const createUserTitle = Selector('.user-management__create-user-form-title')
const registeredUserName = Selector('.user-management__registered-users-row-col.is-name')
const registeredUserEmail = Selector('.user-management__registered-users-row-col is-email')
const registeredUserRole = Selector('.user-management__registered-users-row-col is-role')
const firstName = Selector('.user-management__create-user-form-group-input-text.is-first-name')
const lastName = Selector('.user-management__create-user-form-group-input-text.is-last-name')
const phoneNumber = Selector('.user-management__create-user-form-group-input-text.is-phone-number')
const Email = Selector('.user-management__create-user-form-group-input-text.is-email')
const createUserButton = Selector('.user-management__create-user-trigger.is-submit')
const logoutButton = Selector('.header-logout-link.btn.btn-default')
const logoutPage = Selector ('.form-explanation')

const loginAsHospitalAdmin = async function (t) {
  await H.login('hospital-admin@example.org', '1-Provider')
 }
const loginAsSpecialistAdmin = async function (t) {
  await H.login('specialist-admin@example.org', '1-Provider')
 }
const loginAsAnaesthetistAdmin  = async function (t) {
  await H.login('anaesthetist-admin@example.org', '1-Provider')
 }

fixture `***** Provider portal Dashboard View tests`
  .page(config.domTestRootUrl)


test('Hospital User Admin', async t => {
 H.BeginTest('Hospital User - Dashboard View')
  H.StepDescription('has logged in as Hospital User')
  await loginAsHospitalAdmin(t)

  H.StepDescription('Checking - Dashboard Contents for hospital view')
  const chosenProviderName = await H.chooseProvider(0)
  await t
      .expect(currentProviderName.exists).ok()
      .expect(currentProviderName.innerText).eql(chosenProviderName)
      .expect(homePagePaymentSubHeader.exists).ok()
      .expect(viewAllPayments.exists).ok()
      .expect(preApprovalSubHeader.exists).notOk()
      .expect(userManagementLink.exists).ok()

  H.StepDescription('Checking - User Management page contents')
  await t
      .click(userManagementLink)
      //.expect(userManagementLink.hasClass('.route--active')).ok()
      .expect(userManagementHeading.exists).ok()
      .expect(userManagementHeading.innerText).eql('User management')
      .expect(userManagementPageSubHeader.exists).ok()
      .expect(userManagementPageSubHeader.innerText).eql(chosenProviderName)
      .expect(currentUser.exists).ok()
      .expect(currentUserName.exists).ok()
      .expect(currentUserEmail.exists).ok()
      .expect(registeredUsers.exists).ok()
      .expect(registeredUsersNameHeader.exists).ok()
      .expect(registeredUsersEmailHeader.exists).ok()
      .expect(registeredUsersRoleHeader.exists).ok()
      .expect(createUserSection.exists).ok()

  H.StepDescription('Creating new user')
  const randomEmail = await H.makeEmail
  await t
      .typeText(firstName, 'Hospital')
      .typeText(lastName, 'Automated')
      //.typeText(Email, randomEmail)
      .typeText(Email, 'hospital@admin.com')
      .typeText(phoneNumber, '0225123453')
      .click(createUserButton.parent())
      //.expect(registeredUserName.innerText).eql('FirstName')

  H.StepDescription('Hospital Admin user has logged out')
  await H.logout()
  await t
      //.expect(logoutPage.exists).ok()
      //.expect(logoutPage.innerText).eql('You have been logged out.')

})

test('Anaesthetist User Admin', async t => {
 H.BeginTest('Anaesthetist User - Dashboard View')
  H.StepDescription('has logged in as Anaesthetist User')
  await loginAsAnaesthetistAdmin(t)

  H.StepDescription('Checking - Dashboard Contents for Anaesthetist view')
  const chosenProviderName = await H.chooseProvider(0)
  await t
      .expect(currentProviderName.exists).ok()
      .expect(currentProviderName.innerText).eql(chosenProviderName)
      .expect(homePagePaymentSubHeader.exists).ok()
      .expect(viewAllPayments.exists).ok()
      .expect(preApprovalSubHeader.exists).notOk()
      .expect(userManagementLink.exists).ok()

  H.StepDescription('Checking - User Management page contents')
  await t
      .click(userManagementLink)
      //.expect(userManagementLink.hasClass('.route--active')).ok()
      .expect(userManagementHeading.exists).ok()
      .expect(userManagementHeading.innerText).eql('User management')
      .expect(userManagementPageSubHeader.exists).ok()
      .expect(userManagementPageSubHeader.innerText).eql(chosenProviderName)
      .expect(currentUser.exists).ok()
      .expect(currentUserName.exists).ok()
      .expect(currentUserEmail.exists).ok()
      .expect(registeredUsers.exists).ok()
      .expect(registeredUsersNameHeader.exists).ok()
      .expect(registeredUsersEmailHeader.exists).ok()
      .expect(registeredUsersRoleHeader.exists).ok()
      .expect(createUserSection.exists).ok()

  H.StepDescription('Creating new user')
  const randomEmail = await H.makeEmail
  await t
      .typeText(firstName, 'Anaesthetist')
      .typeText(lastName, 'Automated')
      //.typeText(Email, randomEmail)
      .typeText(Email, 'Anaesthetist@admin.com')
      .typeText(phoneNumber, '0225123453')
      .click(createUserButton.parent())
      //.expect(registeredUserName.innerText).eql('FirstName')

  H.StepDescription('Anaesthetist Admin user has logged out')
  await H.logout()
  await t
      //.expect(logoutPage.exists).ok()
      //.expect(logoutPage.innerText).eql('You have been logged out.')

})

test('Specialist User Admin', async t => {
 H.BeginTest('Specialist User - Dashboard View')
  H.StepDescription('has logged in as Specialist User')
  await loginAsAnaesthetistAdmin(t)

  H.StepDescription('Checking - Dashboard Contents for Specialist view')
  const chosenProviderName = await H.chooseProvider(0)
  await t
      .expect(currentProviderName.exists).ok()
      .expect(currentProviderName.innerText).eql(chosenProviderName)
      .expect(homePagePaymentSubHeader.exists).ok()
      .expect(viewAllPayments.exists).ok()
      .expect(preApprovalSubHeader.exists).notOk()
      .expect(userManagementLink.exists).ok()

  H.StepDescription('Checking - User Management page contents')
  await t
      .click(userManagementLink)
      //.expect(userManagementLink.hasClass('.route--active')).ok()
      .expect(userManagementHeading.exists).ok()
      .expect(userManagementHeading.innerText).eql('User management')
      .expect(userManagementPageSubHeader.exists).ok()
      .expect(userManagementPageSubHeader.innerText).eql(chosenProviderName)
      .expect(currentUser.exists).ok()
      .expect(currentUserName.exists).ok()
      .expect(currentUserEmail.exists).ok()
      .expect(registeredUsers.exists).ok()
      .expect(registeredUsersNameHeader.exists).ok()
      .expect(registeredUsersEmailHeader.exists).ok()
      .expect(registeredUsersRoleHeader.exists).ok()
      .expect(createUserSection.exists).ok()

  H.StepDescription('Creating new user')
  const randomEmail = await H.makeEmail
  await t
      .typeText(firstName, 'Specialist')
      .typeText(lastName, 'Automated')
      //.typeText(Email, randomEmail)
      .typeText(Email, 'Specialist@admin.com')
      .typeText(phoneNumber, '0225123453')
      .click(createUserButton.parent())
      //.expect(registeredUserName.innerText).eql('FirstName')

  H.StepDescription('Specialist Admin user has logged out')
  await H.logout()
  await t
      //.expect(logoutPage.exists).ok()
      //.expect(logoutPage.innerText).eql('You have been logged out.')

})
