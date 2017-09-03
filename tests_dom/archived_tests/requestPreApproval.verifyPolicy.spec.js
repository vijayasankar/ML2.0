/**
 * Request a payment verify policy variations
 */

import { Selector } from 'testcafe'
import Helpers from './test_utils/helpers'
import config from './test_utils/config'

const H = new Helpers()

// entry points
const currentProviderName = Selector('h1.home-heading')
const reqPreApprovalLink = Selector('[href="/request-pre-approval"]')
const reqPreApprovalHeading = Selector('h1.request-pre-approval-heading')

// Verify policy
const policyNumberField = Selector('input[name=policyId]')
const dobField = Selector('div.request-pre-approval__verify-policy-field-wrapper.is-dob input')
const firstNameField = Selector('input[name=firstName]')
const lastNameField = Selector('input[name=lastName]')
const verifyBtn = Selector('.request-pre-approval__verify-policy button.is-verify-policy')
const cancelVerifyBtn = Selector('.request-pre-approval__verify-policy button.is-cancel')
const link = Selector('.request-pre-approval__verify-policy a')
const policyNumberSpan = Selector('span.request-pre-approval__verify-policy-valid-title.is-policy-number')
const dobSpan = Selector('span.request-pre-approval__verify-policy-valid-title.is-dob')
const patientNameSpan = Selector('span.request-pre-approval__verify-policy-valid-title.is-patient-name')

// Sections
const procedureCostSection = Selector('section.request-pre-approval__procedure-cost-wrapper')
const associatedCostsSection = Selector('section.request-pre-approval__associated-costs-wrapper')
const attachDocumentsSection = Selector('section.request-pre-approval__attach-documents-wrapper')
const declarationSection = Selector('section.request-pre-approval__declaration-wrapper')
const submitSection = Selector('section.request-pre-approval-trigger-wrapper')

fixture `***** Provider portal Request pre-approval verify policy tests`
  .page(config.domTestRootUrl)

test('Request pre-approval -- verify policy by DOB and names', async t => {
  H.BeginTest('Request pre-approval -- verify policy by DOB and names')

  await defaultLoginSteps(t)

  H.StepDescription('initially displays Verify policy section with Policy # and DOB')
  await t
    .expect(policyNumberField.exists).ok('Policy number field should exist')
    .expect(dobField.exists).ok('Date of birth field should exist')
    .expect(firstNameField.exists).notOk('First name field should not exist')
    .expect(lastNameField.exists).notOk('Last name field should not exist')

    .expect(policyNumberSpan.exists).notOk('Should not display verified Policy number')
    .expect(dobSpan.exists).notOk('Should not display verified Date of birth')
    .expect(patientNameSpan.exists).notOk('Should not display verified Patient name')

    .expect(verifyBtn.exists).ok('Verify policy button should exist')
    .expect(verifyBtn.textContent).eql('Verify policy')
    .expect(verifyBtn.hasAttribute('disabled')).notOk('Verify policy button should be enabled initially')

    .expect(cancelVerifyBtn.exists).ok('Cancel button should exist (for Verify policy)')
    .expect(cancelVerifyBtn.textContent).eql('Cancel')
    .expect(cancelVerifyBtn.hasAttribute('disabled')).ok('Cancel button should be disabled initially')

    .expect(link.exists).ok('A link should exist')
    .expect(link.textContent).eql('I don\'t have the policy number')

    .expect(procedureCostSection.exists).notOk('Should not display Procedure cost section')
    .expect(associatedCostsSection.exists).notOk('Should not display Associated costs section')
    .expect(attachDocumentsSection.exists).notOk('Should not display Attach documents section')
    .expect(declarationSection.exists).notOk('Should not display Declaration section')
    .expect(submitSection.exists).notOk('Should not display Submit section')

  H.StepDescription('choose to verify policy with DOB and names')
  await t
    .click(link)
    .expect(policyNumberField.exists).notOk('Policy number field should not exist')
    .expect(dobField.exists).ok('Date of birth field should exist')
    .expect(firstNameField.exists).ok('First name field should exist')
    .expect(lastNameField.exists).ok('Last name field should exist')

    .expect(policyNumberSpan.exists).notOk('Should not display verified Policy number')
    .expect(dobSpan.exists).notOk('Should not display verified Date of birth')
    .expect(patientNameSpan.exists).notOk('Should not display verified Patient name')

    .expect(link.exists).ok('A link should exist')
    .expect(link.textContent).eql('I have the policy number')

    .expect(cancelVerifyBtn.exists).ok('Cancel button should exist (for Verify policy)')
    .expect(cancelVerifyBtn.textContent).eql('Cancel')
    .expect(cancelVerifyBtn.hasAttribute('disabled')).ok('Cancel button should be disabled initially')

    .click(link)
    .expect(link.textContent).eql('I don\'t have the policy number')
    .click(link)

    .typeText(firstNameField, 'S')
    .expect(cancelVerifyBtn.hasAttribute('disabled'))
      .notOk('Cancel button should be enabled once the form is filled in')

  H.StepDescription('successful verify policy with DOB and names')
  await H.putText(firstNameField, 'SingleMatchingPolicy')
  await t.click(lastNameField)
  await H.putText(lastNameField, 'LastNamebad900c0-eda4-4c47-88c5-a0ba2fa2e3f3')
  await t
    .typeText(dobField, '02/02/2016')
    .click(verifyBtn)

    .expect(policyNumberSpan.exists).ok('Should display verified Policy number')
    .expect(policyNumberSpan.textContent).eql('Policy number')
    .expect(dobSpan.exists).ok('Should display verified Date of birth')
    .expect(dobSpan.textContent).eql('Date of birth')
    .expect(patientNameSpan.exists).ok('Should display verified Patient name')
    .expect(patientNameSpan.textContent).eql('Patient name')

    .expect(procedureCostSection.exists).ok('Should display Procedure cost section')
    .expect(associatedCostsSection.exists).ok('Should display Associated costs section')
    .expect(attachDocumentsSection.exists).ok('Should display Attach documents section')
    .expect(declarationSection.exists).ok('Should display Declaration section')
    .expect(submitSection.exists).ok('Should display Submit section')

// TODO Verify policy with multiple names
// TODO validation tests
})

/**
 * Local helper to quickly login
 *
 * @param {object} t TestCafe test controller
 */
const defaultLoginSteps = async function (t) {
  H.StepDescription('has logged in')
  await H.login('three-providers-all-user@example.org', '3-Providers')
  const chosenProviderName = await H.chooseProvider(1) // assume this is a specialist
  await t
    .expect(currentProviderName.exists).ok()
    .expect(currentProviderName.innerText).eql(chosenProviderName)

  H.StepDescription('click Request a pre-approval menu for Specialists')
  await t
    .expect(reqPreApprovalLink.exists).ok('assuming the chosen provider is a specialist for this login')
    .click(reqPreApprovalLink)
    .expect(reqPreApprovalHeading.textContent).eql('Request a pre-approval')
}
