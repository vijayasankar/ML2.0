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
const dobField = Selector('input#rw_1_input')
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

// Procedure cost
const primaryProcedure = Selector('input[name="primaryProcedure"]')
const locationLeft = Selector('input[id="location-Left"]')
const locationRight = Selector('input[id="location-Right"]')
const locationNA = Selector('input[id="location-NotApplicable"]')
const specialistCost = Selector('input[name="specialistCost"]')
const dateOfProcedure = Selector(
  'div.request-pre-approval__procedure-cost-field-wrapper.is-proposed-date-of-procedure input'
)
const hospitalTime = Selector('input[name="hospitalTime"]')
const hospitalTimeMinus = Selector('button.is-hospital-time.is-minus')
const hospitalTimePlus = Selector('button.is-hospital-time.is-plus')
const theatreTime = Selector('input[name="theatreTime"]')
const theatreTimeMinus = Selector('button.is-theatre-time.is-minus')
const theatreTimePlus = Selector('button.is-theatre-time.is-plus')
const sharedRoomNo = Selector('input[id="shared-room-No"]')
const sharedRoomYes = Selector('input[id="shared-room-Yes"]')
const accRelatedNo = Selector('input[id="acc-related-No"]')
const accRelatedYes = Selector('input[id="acc-related-Yes"]')
const dateOfOnset = Selector(
  'div.request-pre-approval__procedure-cost-field-wrapper.is-date-of-onset input'
)
const nameOfHospital = Selector('input[name="nameOfHospital"]')
const primarySpecialist = Selector('input[name="nameOfSpecialist"]')
const addAnotherProcedure = Selector('a.is-add-another-procedure')

// Associated costs
const theatreCost = Selector('input[name="theatreCost"]')
const radiologyCost = Selector('input[name="radiologyCost"]')
const hospitalCost = Selector('input[name="hospitalCost"]')
const prosthesisDescr = Selector('input[name="prosthesisDescr"]')
const prosthesisCost = Selector('input[name="prosthesisCost"]')
const consultationCost = Selector('input[name="consultationCost"]')
const sundryCost = Selector('input[name="sundryCost"]')
const anaesthetistName = Selector('input[name="anaesthetistName"]')
const anaesthetistCost = Selector('input[name="anaesthetistCost"]')
const totalCostLabel = Selector('span.request-pre-approval__associated-costs-total-label')
const totalCostValue = Selector('span.request-pre-approval__associated-costs-total-cost')

// Attach documents, Declaration & Submit
const AccLetterForm = Selector('form#AccLetterForm')
const referralLetterForm = Selector('form#ReferralLetterForm')
const specialistReportForm = Selector('form#SpecialistReportForm')
const UnspecifiedForm = Selector('form#UnspecifiedForm')

const declarationAgree = Selector('input[name="declarationAgree"]')
const cancelSubmitBtn = Selector('button.request-pre-approval-trigger.is-cancel')
const submitBtn = Selector('button.request-pre-approval-trigger.is-submit')

fixture `***** Provider portal Request pre-approval tests`
  .page(config.domTestRootUrl)

test('Request pre-approval -- verify policy', async t => {
  H.BeginTest('Request pre-approval -- verify policy')

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

  H.StepDescription('successful verify policy with Policy # and DOB')
  await t
    .typeText(policyNumberField, '8')
    .expect(cancelVerifyBtn.hasAttribute('disabled'))
      .notOk('Cancel button should be enabled once the form is filled in')

  await H.verifyPolicyByNumberAndDob('88888888', '02/02/2016')
  await t
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
// TODO Verify policy with DOB + names
// TODO validation tests
})

test('Request pre-approval -- Procedure cost', async t => {
  H.BeginTest('Request pre-approval -- Procedure cost')

  await defaultLoginSteps(t)
  // const specialistName = await currentProviderName.textContent
  await t.expect(procedureCostSection.exists).ok('Should display Procedure cost section')

  H.StepDescription('Fields exists for Primary procedure')
  await t
    .expect(specialistCost.exists).ok()
    .expect(dateOfProcedure.exists).ok()
    .expect(sharedRoomNo.exists).ok()
    .expect(sharedRoomYes.exists).ok()
    .expect(dateOfOnset.exists).ok()
    .expect(nameOfHospital.exists).ok()
    .expect(accRelatedNo.exists).ok()
    .expect(accRelatedYes.exists).ok()

  H.StepDescription('Primary procedure typeahead')
  await t.expect(primaryProcedure.exists).ok()
  await H.enterTypeahead('input[name="primaryProcedure"]', 'he', 0)

  H.StepDescription('n/a is checked, but not Left nor Right')
  await t
    .expect(locationLeft.checked).notOk('Left should not be checked by default')
    .expect(locationRight.checked).notOk('Right should not be checked by default')
    .expect(locationNA.checked).ok('n/a should be checked by default')

  H.StepDescription('Primary procedure Name of specialist is pre-populated')
  await t
    .expect(primarySpecialist.value).match(/[A-z]/g)
    .click(primarySpecialist) // to bring up the dropdown

  const primarySpecialistDropDown = await primarySpecialist.parent().sibling('ul')
  await t
    .expect(primarySpecialistDropDown.tagName).eql('ul', 'the dropdown should exist as <ul>')
    .expect(primarySpecialistDropDown.childElementCount).eql(1, 'the dropdown should have just 1 item')

  H.StepDescription('Hospital time')
  await t
    .expect(hospitalTime.exists).ok()
    .expect(hospitalTimeMinus.exists).ok()
    .expect(hospitalTimePlus.exists).ok()
    .click(hospitalTimePlus)
    .expect(hospitalTime.value).eql('1')
    .click(hospitalTimeMinus)
    .expect(hospitalTime.value).eql('0')

  H.StepDescription('Theatre time')
  await t
    .expect(theatreTime.exists).ok()
    .expect(theatreTimeMinus.exists).ok()
    .expect(theatreTimePlus.exists).ok()
    .click(theatreTimePlus)
    .click(theatreTimePlus)
    .expect(theatreTime.value).eql('30')
    .click(theatreTimeMinus)
    .expect(theatreTime.value).eql('15')

  H.StepDescription('Name of hospital typeahead')
  await t.expect(nameOfHospital.exists).ok()
  await H.enterTypeahead('input[name="nameOfHospital"]', 'ho', 0)

  H.StepDescription('Add another procedure')
  await t
    .expect(addAnotherProcedure.exists).ok()
    .expect(addAnotherProcedure.innerText).eql('Add another procedure')
  // TODO add and remove secondary procedures
})

test('Request pre-approval -- Associated cost', async t => {
  H.BeginTest('Request pre-approval -- Associated cost')

  await defaultLoginSteps(t)
  await t.expect(associatedCostsSection.exists).ok('Should display Associated costs section')

  H.StepDescription('Fields exists')
  await t
    .expect(theatreCost.exists).ok()
    .expect(radiologyCost.exists).ok()
    .expect(hospitalCost.exists).ok()
    .expect(prosthesisDescr.exists).ok()
    .expect(prosthesisCost.exists).ok()
    .expect(consultationCost.exists).ok()
    .expect(sundryCost.exists).ok()
    .expect(anaesthetistName.exists).ok()
    .expect(anaesthetistCost.exists).ok()
    .expect(totalCostLabel.exists).ok()
    .expect(totalCostValue.exists).ok()

  H.StepDescription('Validation on Anaesthetist cost and Anaesthetist name')
  await t
    .expect(anaesthetistName.parent().hasClass('has-error')).notOk('should have no error initially')
    .typeText(anaesthetistCost, '1')
    .expect(anaesthetistName.parent().hasClass('has-error')).ok('should now fail validation')
    .typeText(anaesthetistName, 'x')
    .expect(anaesthetistName.parent().hasClass('has-error')).notOk('should not fail validation anymore')

  // TODO Prosthesis cost and descr validation
})

test('Request pre-approval -- Attach documents, Declaration & Submit', async t => {
  H.BeginTest('Request pre-approval -- Attach documents, Declaration & Submit')

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
    .expect(referralLetterForm.exists).ok()
    .expect(referralLetterForm.find('span').innerText).eql('Referral letter')
    .expect(specialistReportForm.exists).ok()
    .expect(specialistReportForm.find('span').innerText).eql('Specialist report')
    .expect(UnspecifiedForm.exists).ok()
    .expect(UnspecifiedForm.find('span').innerText).eql('Other supporting documents')
    .click(accRelatedYes.parent())
    .expect(AccLetterForm.exists).ok('ACC decision letter should be shown if ACC related = Yes')
    .click(accRelatedNo.parent())
    .expect(AccLetterForm.exists).notOk('ACC decision letter should not be shown if ACC related = No')

  H.StepDescription('Closer examine a document upload field')
  await t
    .expect(referralLetterForm.find('input[name="ReferralLetterCounts"]').value).eql('0')
    .expect(referralLetterForm.find('input#ReferralLetter').getAttribute('type')).eql('file')
    .setFilesToUpload('input#ReferralLetter', './test_utils/uploadDocument/1.pdf')
    // TODO error and disabled mode
})

/**
 * Local helper to quickly login and verify policy
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

  H.StepDescription('successful verify policy with Policy # and DOB')
  await H.verifyPolicyByNumberAndDob('88888888', '02/02/2016')
}
