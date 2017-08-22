import { Selector } from 'testcafe'
import Helpers from './test_utils/helpers'
import config from './test_utils/config'

const H = new Helpers()

// entry points
const currentProviderName = Selector('h1.home-heading')
const reqPaymentLink = Selector('[href="/request-payment"]')
const reqPaymentHeading = Selector('h1.request-payment-heading')
const reqPaymentSubHeading = Selector('h2.request-payment-subheading')

// Verify pre-approval
const preApprovalNumberField = Selector('input[name=preApprovalNumber]')
const dobField = Selector('div.request-payment__pre-approval-field-wrapper.is-dob input')
const verifyBtn = Selector('.request-payment__pre-approval-form-trigger.is-verify-pre-approval')
const cancelVerifyBtn = Selector('.request-payment__pre-approval-form-trigger.is-cancel')
const preApprovalNumberSpan = Selector('span.request-payment__pre-approval-valid-title.is-policy-number')
const patientNameSpan = Selector('span.request-payment__pre-approval-valid-title.is-patient-name')
const dobSpan = Selector('span.request-payment__pre-approval-valid-title.is-patient-dob')
const dateSubmittedSpan = Selector('span.request-payment__pre-approval-valid-title.is-date-preapproval')

// Sections
const invoiceDetailsSection = Selector('section.request-payment__invoice-details-wrapper')
const costsSection = Selector('section[class^="request-payment__costs-for-"]')
const attachDocumentsSection = Selector('section.request-payment__attach-documents-wrapper')
const declarationSection = Selector('section.request-payment__declaration-wrapper')
const submitSection = Selector('section.request-payment-trigger-wrapper')

// Attach documents, Declaration & Submit
const AccLetterForm = Selector('form#AccLetterForm')
const surgicalNotesForm = Selector('form#SurgicalNotesForm')
const specialistReportForm = Selector('form#SpecialistReportForm')
const UnspecifiedForm = Selector('form#UnspecifiedForm')
const declarationAgree = Selector('input[name="declarationAgree"]')
const cancelSubmitBtn = Selector('button.request-payment-trigger.is-cancel')
const submitBtn = Selector('button.request-payment-trigger.is-submit')

fixture `***** Provider portal Request a payment generic tests`
  .page(config.domTestRootUrl)

test('Request payment -- verify pre-approval', async t => {
  H.BeginTest('Request payment -- verify pre-approval')

  H.StepDescription('has logged in')
  await H.login('three-providers-all-user@example.org', '3-Providers')
  await t.expect(currentProviderName.exists).ok()

  H.StepDescription('click Request a payment menu')
  await t
    .expect(reqPaymentLink.exists).ok()
    .click(reqPaymentLink)
    .expect(reqPaymentHeading.textContent).eql('Request a payment')
    .expect(reqPaymentSubHeading.exists).ok()

  H.StepDescription('initially displays Pre-approval section with Pre-approval # and DOB')
  await t
    .expect(preApprovalNumberField.exists).ok('Pre-approval number field should exist')
    .expect(dobField.exists).ok('Date of birth field should exist')

    .expect(preApprovalNumberSpan.exists).notOk('Should not display verified Pre-approval number')
    .expect(patientNameSpan.exists).notOk('Should not display verified Patient name')
    .expect(dobSpan.exists).notOk('Should not display verified Date of birth')
    .expect(dateSubmittedSpan.exists).notOk('Should not display verified Date pre-approval was submitted')

    .expect(verifyBtn.exists).ok('Verify button should exist')
    .expect(verifyBtn.textContent).eql('Verify Pre-approval')
    .expect(verifyBtn.hasAttribute('disabled')).notOk('Verify button should be enabled initially')

    .expect(cancelVerifyBtn.exists).ok('Cancel button should exist (for Verify pre-approval)')
    .expect(cancelVerifyBtn.textContent).eql('Cancel')
    .expect(cancelVerifyBtn.hasAttribute('disabled')).ok('Cancel button should be disabled initially')

    .expect(invoiceDetailsSection.exists).notOk('Should not display Invoice details section')
    .expect(costsSection.exists).notOk('Should not display Costs section')
    .expect(attachDocumentsSection.exists).notOk('Should not display Attach documents section')
    .expect(declarationSection.exists).notOk('Should not display Declaration section')
    .expect(submitSection.exists).notOk('Should not display Submit section')

  H.StepDescription('successful verify pre-approval')
  await t
    .typeText(preApprovalNumberField, '8')
    .expect(cancelVerifyBtn.hasAttribute('disabled'))
      .notOk('Cancel button should be enabled once the form is filled in')

  await H.verifyPreApproval('88888888/88/888', '01/01/1980')
  await t
    .expect(preApprovalNumberSpan.exists).ok('Should display verified pre-approval number')
    .expect(preApprovalNumberSpan.textContent).eql('Pre-approval number')
    .expect(patientNameSpan.exists).ok('Should display verified Patient name')
    .expect(patientNameSpan.textContent).eql('Patient Name')
    .expect(dobSpan.exists).ok('Should display verified DOB')
    .expect(dobSpan.textContent).eql('Patient Date of Birth')
    .expect(dateSubmittedSpan.exists).ok('Should display pre-approval submitted date')
    .expect(dateSubmittedSpan.textContent).eql('Date pre-approval was submitted')

    .expect(invoiceDetailsSection.exists).ok('Should display Invoice details section')
    .expect(costsSection.exists).ok('Should display Costs section')
    .expect(attachDocumentsSection.exists).ok('Should display Attach documents section')
    .expect(declarationSection.exists).ok('Should display Declaration section')
    .expect(submitSection.exists).ok('Should display Submit section')
})

test('Request payment -- Attach documents, Declaration & Submit', async t => {
  H.BeginTest('Request payment -- Attach documents, Declaration & Submit')

  await defaultLoginSteps(t)

  H.StepDescription('Sections should exist')
  await t
    .expect(attachDocumentsSection.exists).ok('Should display Attach documents section')
    .expect(declarationSection.exists).ok('Should display Declaration section')
    .expect(submitSection.exists).ok('Should display Submit button section')

  H.StepDescription('Declaration tick should exist')
  await t.expect(declarationAgree.exists).ok()

  H.StepDescription('Cancel and Submit buttons should exist')
  await t
    .expect(cancelSubmitBtn.exists).ok()
    .expect(cancelSubmitBtn.innerText).eql('Cancel')
    .expect(submitBtn.exists).ok()
    .expect(submitBtn.innerText).eql('Submit')

  H.StepDescription('Referral letter, Specialist report & Other supporting documents should exist')
  await t
    .expect(AccLetterForm.exists).notOk('ACC decision letter should be hidden by default')
    .expect(surgicalNotesForm.exists).ok()
    .expect(surgicalNotesForm.find('span').innerText).eql('Surgical notes')
    .expect(specialistReportForm.exists).ok()
    .expect(specialistReportForm.find('span').innerText).eql('Specialist report')
    .expect(UnspecifiedForm.exists).ok()
    .expect(UnspecifiedForm.find('span').innerText).eql('Other supporting documents')
})

/**
 * Local helper to quickly login and verify pre-approval
 *
 * @param {object} t TestCafe test controller
 */
const defaultLoginSteps = async function (t) {
  H.StepDescription('has logged in')
  await H.login('three-providers-all-user@example.org', '3-Providers')
  await t.expect(currentProviderName.exists).ok()

  H.StepDescription('click Request a payment menu')
  await t
    .expect(reqPaymentLink.exists).ok()
    .click(reqPaymentLink)
    .expect(reqPaymentHeading.textContent).eql('Request a payment')

  H.StepDescription('successful verify pre-approval')
  await H.verifyPreApproval('88888888/88/888', '01/01/1980')
}
