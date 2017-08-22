import { Selector } from 'testcafe'
import Helpers from '../test_utils/helpers'
import config from '../test_utils/config'

const H = new Helpers()

// entry points
const currentProviderName = Selector('h1.home-heading')
const reqPreApprovalLink = Selector('[href="/request-pre-approval"]')
const reqPreApprovalHeading = Selector('h1.request-pre-approval-heading')

// Verify policy
// const policyNumberField = Selector('input[name=policyId]')
// const dobField = Selector('input#rw_1_input')
// const firstNameField = Selector('input[name=firstName]')
// const lastNameField = Selector('input[name=lastName]')
const verifyBtn = Selector('.request-pre-approval__verify-policy button.is-verify-policy')
// const cancelVerifyBtn = Selector('.request-pre-approval__verify-policy button.is-cancel')
const dobWrapper = Selector('.request-pre-approval__verify-policy-field-wrapper.is-dob')
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
// const locationRight = Selector('input[id="location-Right"]')
// const locationNA = Selector('input[id="location-NotApplicable"]')
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
// const primarySpecialist = Selector('input[name="nameOfSpecialist"]')
const addAnotherProcedure = Selector('a.is-add-another-procedure')
const otherProcedure1 = Selector('input[name = "otherProcedures[0].otherProcedure"]')
const otherProcedureNameofSpecialist1 = Selector('input[name="otherProcedures[0].nameOfSpecialist"]')
const otherProcedureSpecialistCost1 = Selector('input[name="otherProcedures[0].specialistCost"]')

// Associated Cost Section
const operatingTheatreCost = Selector('input[name="operatingTheatreCost"]')
const radiologyCost = Selector('input[name="radiologyCost"]')
const hospitalCost = Selector('input[name="hospitalCost"]')
const prosthesisDescription = Selector('input[name="prosthesisDescr"]')
const prosthesisCost = Selector('input[name="prosthesisCost"]')
const consultationCost = Selector('input[name="consultationCost"]')
const sundryCost = Selector('input[name="sundryCost"]')
const anaesthetistName = Selector('input[name="anaesthetistName"]')
const anaesthetistCost = Selector('input[name="anaesthetistCost"]')
const totalCost = Selector('.request-pre-approval__associated-costs-total-cost')

// Attach Document Section
const AccLetterForm = Selector('input#AccLetter')
const referralLetterForm = Selector('input#ReferralLetter')
// const specialistReportForm = Selector('form#SpecialistReportForm')
// const UnspecifiedForm = Selector('form#UnspecifiedForm')
const deleteDocument = Selector('.request-pre-approval__attach-documents-delete')

// Declaration Section
const declarationAgree = Selector('input[name="declarationAgree"]')

// Submit and Cancel
const cancel = Selector('button.request-pre-approval-trigger.is-cancel')
const submit = Selector('button.request-pre-approval-trigger.is-submit')

fixture `***** Provider portal Request end to end pre-approval tests`
  .page (config.domTestRootUrl)

test('Verify the valid input for request pre-approval form', async t => {
  H.BeginTest('Verify the valid input for request pre-approval form')

  H.StepDescription('has logged in')
  await H.login('specialist-user@example.org', '1-Provider')
  await t.expect(currentProviderName.exists).ok()

  H.StepDescription('click Request a pre-approval menu for Specialists')
  await t
      .click(reqPreApprovalLink)
      .expect(reqPreApprovalHeading.textContent).eql('Request a pre-approval')

  H.StepDescription('successful verify policy with Policy # and DOB')

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

  H.StepDescription('Checking - Primary procedure and Specialist cost fields')

    // TODO  User should be able to select primary procedures from the list.
//    await t
//      .typeText(primaryProcedure, '12')
//      .expect(primaryProcedure.value).eql('')
  await H.enterTypeahead('input[name="primaryProcedure"]', 'he', 0)
  await t
      .click(locationLeft.parent())
      .typeText(specialistCost, '!@#$%')
      .expect(specialistCost.value).eql('')
      .typeText(specialistCost, 'qweqwe')
      .expect(specialistCost.value).eql('')
      .typeText(specialistCost, '-3000')
      .expect(specialistCost.value).eql('$ 3000')
      .expect(totalCost.innerText).eql('$ 3000')

  H.StepDescription('Checking - Date of procedure')
  await t
      .typeText(dateOfProcedure, '~!@#$%^&*()_+:";<>?,./')
      .pressKey('tab')
      .expect(dateOfProcedure.value).eql('')
      .typeText(dateOfProcedure, 'qwerty')
      .pressKey('tab')
      .expect(dateOfProcedure.value).eql('')
      // TODO test the warning message if the Date of procedure is less than 5 days
     // .typeText(dateOfProcedure, Date()+5)
     // .pressKey('tab')
     // .expect(dateOfProcedure.value).eql(Date())
      .typeText(dateOfProcedure, '30/06/2017')
      .pressKey('tab')
      .expect(dateOfProcedure.value).eql('30/06/2017')

  H.StepDescription('Checking - Name of the Specialist ')
  const primarySpecialistName = Selector('input[name="nameOfSpecialist"]')
  const chosenProviderName = Selector('.header-provider-select option:checked')
   // const chosenProviderName = await Selector('.header-provider-select option:checked').textContent
  await t
      .expect(primarySpecialistName.exists).ok()
      .expect(chosenProviderName.exists).ok()
      // .expect(primarySpecialistName.value).contains(chosenProviderName)
      .expect(primarySpecialistName.value).eql('Bob\'s Bits')
      .expect(chosenProviderName.textContent).eql('Bob\'s Bits')

  H.StepDescription('Checking - Hospital time ')
  await t
      .expect(hospitalTime.exists).ok()
      .typeText(hospitalTime, '~!@#$%^&*()')
      .click(hospitalTimePlus)
      .expect(hospitalTime.value).eql('1')
      .typeText(hospitalTime, 'kjasdkashdksakdha')
      .click(hospitalTimePlus)
      .expect(hospitalTime.value).eql('2')
      .typeText(hospitalTime, '-22')
      .click(hospitalTimePlus)
      .expect(hospitalTime.value).eql('3')
      .click(hospitalTimePlus)
      .expect(hospitalTime.value).eql('4')
      .click(hospitalTimeMinus)
      .expect(hospitalTime.value).eql('3')
      .click(hospitalTimeMinus)
      .expect(hospitalTime.value).eql('2')
      .click(hospitalTimeMinus)
      .expect(hospitalTime.value).eql('1')
      .click(hospitalTimeMinus)
      .expect(hospitalTime.value).eql('0')
      .click(hospitalTimeMinus)
      .expect(hospitalTime.value).eql('0')

  H.StepDescription('Checking - Shared Room ')
  const sharedRoom = Selector('.request-pre-approval__procedure-cost-form-group.is-shared-room')
  const sharedRoomError = Selector('.request-pre-approval__procedure-cost-form-group-error.is-shared-room')
  await t
      .expect(sharedRoom.exists).ok()
      .expect(sharedRoomYes.exists).ok()
      .expect(sharedRoomNo.exists).ok()
      .click(hospitalTimePlus)
      .expect(hospitalTime.value).eql('1')
      .expect(sharedRoom.child(0).hasClass('has-error')).ok()
      .expect(sharedRoomError.exists).ok()
      .expect(sharedRoomError.innerText).eql('required')
      .click(hospitalTime)
      .pressKey('backspace')
      .expect(sharedRoom.child(0).hasClass('has-error')).notOk()
      .expect(sharedRoomError.exists).notOk()
      .click(hospitalTimePlus)
      .expect(hospitalTime.value).eql('1')
      .click(sharedRoomYes.parent())
      .expect(sharedRoom.child(0).hasClass('has-error')).notOk()
      .expect(sharedRoomError.exists).notOk()
      .click(sharedRoomNo.parent())
      .expect(sharedRoomNo.checked).ok()
      .expect(sharedRoomYes.checked).notOk()
      .click(sharedRoomYes.parent())
      .expect(sharedRoomYes.checked).ok()
      .expect(sharedRoomNo.checked).notOk()

  H.StepDescription('Checking - Theatre time ')
  await t
      .expect(theatreTime.exists).ok()
      .typeText(theatreTime, '~!@#$%^&*()')
      .click(theatreTimePlus)
      .expect(theatreTime.value).eql('15')
      .click(theatreTimeMinus)
      .expect(theatreTime.value).eql('0')
      .pressKey('backspace')
      .typeText(theatreTime, 'kjasdkashdksakdha')
      .click(theatreTimePlus)
      .expect(theatreTime.value).eql('15')
      .click(theatreTime)
      .pressKey('backspace backspace')
      .typeText(theatreTime, '-5')
      .click(theatreTimeMinus)
      // .expect(theatreTime.value).eql('0')  // TODO Defect

  H.StepDescription('Checking - ACC related')
  const accSection = Selector('.request-pre-approval__procedure-cost-form-group.is-acc-related')
  const accLetterOption = Selector('form#AccLetterForm')

  await t
      .expect(accSection.exists).ok()// Checks acc section is available
      .expect(accRelatedYes.exists).ok()// Checks acc Yes option is available
      .expect(accRelatedNo.exists).ok() // Checks acc NO option is available
      .click(accRelatedNo.parent())// Click on N0
      .expect(accRelatedNo.checked).ok()// No should be selected
      .expect(accRelatedYes.checked).notOk()// Yes should not be selected
      .expect(accLetterOption.exists).notOk() // ACC letter should not be requested
      .click(accRelatedYes.parent())// Click on Yes
      .expect(accRelatedYes.checked).ok()// Yes should be selected
      .expect(accRelatedNo.checked).notOk()// No should not be selected
      .expect(accLetterOption.exists).ok()// Acc letter should be selected
      .click(accRelatedNo.parent())// Click on No

  H.StepDescription('Checking -  Date of onset')
  await t
       .typeText(dateOfOnset, '~!@#$%^&*()_+:";<>?,./')
       .pressKey('tab')
       .expect(dateOfOnset.value).eql('')
       .typeText(dateOfOnset, 'qwerty')
       .pressKey('tab')
       .expect(dateOfOnset.value).eql('')
       // TODO Defect : Date of Onset cannot be in future
       // .typeText(dateOfOnset, Date()+1)
      //  .pressKey('tab')
       // .expect(dateOfOnset.value).eql(Date())
       .typeText(dateOfOnset, '30/06/2016')
       .pressKey('tab')
       .expect(dateOfOnset.value).eql('30/06/2016')

  H.StepDescription('Checking -  Name of the Hospital')
  await H.enterTypeahead('input[name="nameOfHospital"]', 'ho', 1)
  await t
        .expect(nameOfHospital.value).eql('Christoffs Chopshop')
    // TODO Defect - User should be able to select from the drop down

  H.StepDescription('Checking -  Another procedure fields')

  await t
        .click(addAnotherProcedure)
        .expect(otherProcedure1.exists).ok()
        .expect(otherProcedureSpecialistCost1.exists).ok()
        .expect(otherProcedureNameofSpecialist1.exists).ok()
        .click(primaryProcedure)// to delete the existing value from the primary procedure
        .pressKey('ctrl+a')
        .pressKey('delete')

  await H.enterTypeahead('input[name="primaryProcedure"]', 'he', 0)
  await t
        .expect(otherProcedure1.exists).notOk()
        .expect(otherProcedureSpecialistCost1.exists).notOk()
        .expect(otherProcedureNameofSpecialist1.exists).notOk()
        .click(addAnotherProcedure)

  await H.enterTypeahead(otherProcedure1, 'he', 1)
    // TODO Defect - User should be able to select from the drop down
  await t
         .typeText(otherProcedureSpecialistCost1, '!@#$%')
         .expect(otherProcedureSpecialistCost1.value).eql('')
         .typeText(otherProcedureSpecialistCost1, 'qweqwe')
         .expect(otherProcedureSpecialistCost1.value).eql('')
         .typeText(otherProcedureSpecialistCost1, '-3000')
         .expect(otherProcedureSpecialistCost1.value).eql('$ 3000')
         .expect(totalCost.innerText).eql('$ 6000')

  H.StepDescription('Checking - Name of the another procedure Specialist ')
  await t
     .expect(primarySpecialistName.exists).ok()
     .expect(otherProcedureNameofSpecialist1.exists).ok()
     .expect(chosenProviderName.exists).ok()
     .expect(primarySpecialistName.value).eql('Bob\'s Bits')
     .expect(otherProcedureNameofSpecialist1.value).eql('Bob\'s Bits')
     .expect(chosenProviderName.textContent).eql('Bob\'s Bits')

  H.StepDescription('Checking - Operating theatre cost ')
  await t
     .expect(operatingTheatreCost.exists).ok()
     .typeText(operatingTheatreCost, '!@#$%')
     .expect(operatingTheatreCost.value).eql('')
     .typeText(operatingTheatreCost, 'qweqwe')
     .expect(operatingTheatreCost.value).eql('')
     .typeText(operatingTheatreCost, '-1000')
     .expect(operatingTheatreCost.value).eql('$ 1000')
     .expect(totalCost.innerText).eql('$ 7000')

  H.StepDescription('Checking - Radiology cost ')
  await t
     .expect(radiologyCost.exists).ok()
     .typeText(radiologyCost, '!@#$%')
     .expect(radiologyCost.value).eql('')
     .typeText(radiologyCost, 'qweqwe')
     .expect(radiologyCost.value).eql('')
     .typeText(radiologyCost, '-1000')
     .expect(radiologyCost.value).eql('$ 1000')
     .expect(totalCost.innerText).eql('$ 8000')

  H.StepDescription('Checking - Hospital cost ')
  await t
     .expect(hospitalCost.exists).ok()
     .typeText(hospitalCost, '!@#$%')
     .expect(hospitalCost.value).eql('')
     .typeText(hospitalCost, 'qweqwe')
     .expect(hospitalCost.value).eql('')
     .typeText(hospitalCost, '-500')
     .expect(hospitalCost.value).eql('$ 500')
     .expect(totalCost.innerText).eql('$ 8500')

  H.StepDescription('Checking - Prosthesis Desc and  cost ')
  await t
     .expect(prosthesisDescription.exists).ok()
     .expect(prosthesisCost.exists).ok()
     .typeText(prosthesisCost, '500')
     .click(prosthesisCost)
     .pressKey('ctrl+a')
     .pressKey('delete')
     // TODO Defect USer should be select the values from the prosthesis cost
  await H.enterTypeahead(prosthesisDescription, 'pr', 1)
  await t
     .typeText(prosthesisCost, '!@#$%')
     .expect(prosthesisCost.value).eql('')
     .typeText(prosthesisCost, 'qweqwe')
     .expect(prosthesisCost.value).eql('')
     .typeText(prosthesisCost, '-500')
     .expect(prosthesisCost.value).eql('$ 500')
     .expect(totalCost.innerText).eql('$ 9000')

  H.StepDescription('Checking - Consultation cost ')
  await t
     .expect(consultationCost.exists).ok()
     .typeText(consultationCost, '!@#$%')
     .expect(consultationCost.value).eql('')
     .typeText(consultationCost, 'qweqwe')
     .expect(consultationCost.value).eql('')
     .typeText(consultationCost, '-500')
     .expect(consultationCost.value).eql('$ 500')
     .expect(totalCost.innerText).eql('$ 9500')

  H.StepDescription('Checking - Sundry cost ')
  await t
     .expect(sundryCost.exists).ok()
     .typeText(sundryCost, '!@#$%')
     .expect(sundryCost.value).eql('')
     .typeText(sundryCost, 'qweqwe')
     .expect(sundryCost.value).eql('')
     .typeText(sundryCost, '-500')
     .expect(sundryCost.value).eql('$ 500')
     .expect(totalCost.innerText).eql('$ 10000')

  H.StepDescription('Checking - Anaesthetist Name and cost ')
  const clearAnaesthetistName = Selector('.text-input-clear-trigger.request-pre-approval__associated-costs-form-group-clear-trigger.is-anaesthetist-name')
  const anaesthetistNameSection = Selector('.request-pre-approval__associated-costs-form-group-input-text.is-anaesthetist-name')
  await t
      .expect(anaesthetistNameSection.exists).ok()
      .expect(anaesthetistCost.exists).ok()
      .expect(clearAnaesthetistName.exists).notOk()
      .typeText(anaesthetistName, 'Test Anaesthetist')
      .expect(clearAnaesthetistName.exists).ok()
      .click(clearAnaesthetistName)
      .expect(anaesthetistName.value).eql('')
      .typeText(anaesthetistName, 'Test Anaesthetist Again')
      .typeText(anaesthetistCost, '!@#$%')
      .expect(anaesthetistCost.value).eql('')
      .typeText(anaesthetistCost, 'qweqwe')
      .expect(anaesthetistCost.value).eql('')
      .typeText(anaesthetistCost, '-500')
      .expect(anaesthetistCost.value).eql('$ 500')
      .expect(totalCost.innerText).eql('$ 10500')

  H.StepDescription('Checking - Document Section ')

  const referralLetterOption = Selector('form#ReferralLetterForm')
  const specialistReportOption = Selector('form#SpecialistReportForm')
  const otherSupportingDocumentsOption = Selector('form#UnspecifiedForm')
  await t
      .expect(accLetterOption.exists).notOk('ACC decision letter should be hidden by default')
      .expect(referralLetterOption.exists).ok()
      .expect(referralLetterOption.find('span').innerText).eql('Referral letter')
      .expect(specialistReportOption.exists).ok()
      .expect(specialistReportOption.find('span').innerText).eql('Specialist report')
      .expect(otherSupportingDocumentsOption.exists).ok()
      .expect(otherSupportingDocumentsOption.find('span').innerText).eql('Other supporting documents')
      .click(accRelatedYes.parent())
      .expect(accLetterOption.exists).ok('ACC decision letter should be shown if ACC related = Yes')
      .click(accRelatedNo.parent())
      .expect(accLetterOption.exists).notOk('ACC decision letter should not be shown if ACC related = No')


  H.StepDescription('Checking - Declaration Section ')
  await t
      .expect(declarationSection.exists).ok()
      .expect(declarationAgree.checked).notOk()
      .click(declarationAgree.sibling())
      .expect(declarationAgree.checked).ok()

  H.StepDescription('Checking the Submit and Cancel')
  await t
      .expect(cancel.exists).ok()
      .expect(submit.exists).ok()
})

test('Request pre-approval -- Multiple matching policies', async t => {
  H.BeginTest('Request pre-approval -- Multiple matching policies')

  H.StepDescription('has logged in')
  await H.login('specialist-user@example.org', '1-Provider')
  await t.expect(currentProviderName.exists).ok()

  H.StepDescription('click Request a pre-approval menu for Specialists')
  await t
      .click(reqPreApprovalLink)
      .expect(reqPreApprovalHeading.textContent).eql('Request a pre-approval')

  H.StepDescription('verify policy return multiple matching')
  const secondMatchingUser = Selector('input[id="policy-user-1"]')

  await H.verifyPolicyMultipleMatching('88888888', '30/12/2009')
  await t
      .click(secondMatchingUser.sibling())
})

test('Verify policy with Policy # and DOB - Error Validation', async t => {
  H.BeginTest('Verify policy with Policy # and DOB - Error Validation')

  H.StepDescription('has logged in')
  await H.login('specialist-user@example.org', '1-Provider')
  await t.expect(currentProviderName.exists).ok()

  H.StepDescription('click Request a pre-approval menu for Specialists')
  await t
      .expect(reqPreApprovalLink.exists).ok('assuming the first provider is a specialist for this login')
      .click(reqPreApprovalLink)
      .expect(reqPreApprovalHeading.textContent).eql('Request a pre-approval')

  H.StepDescription('Validate the error state for Policy Number field and DOB')
  const policyNumberWrapper = Selector('.request-pre-approval__verify-policy-field-wrapper.is-policy-id')
  const verifyPolicyErrorMessage = Selector('.error-message.request-pre-approval__verify-policy-form-group-error.is-dob')
  await t
      .click(verifyBtn)
      .expect(policyNumberWrapper.child(0).hasClass('has-error')).ok()
      .expect(dobWrapper.child(0).hasClass('has-error')).ok()
      .expect(verifyPolicyErrorMessage.exists).ok()
      .expect(verifyPolicyErrorMessage.innerText).eql('We were unable to verify the policy details. Please try again with a valid policy number or name, plus date of birth.')
})

test('Verify policy with DOB and Name - Error Validation', async t => {
  H.BeginTest('Verify policy with DOB and Name - Error Validation')
  H.StepDescription('has logged in')
  await H.login('specialist-user@example.org', '1-Provider')
  await t.expect(currentProviderName.exists).ok()

  H.StepDescription('click Request a pre-approval menu for Specialists')
  await t
      .expect(reqPreApprovalLink.exists).ok('assuming the first provider is a specialist for this login')
      .click(reqPreApprovalLink)
      .expect(reqPreApprovalHeading.textContent).eql('Request a pre-approval')

  H.StepDescription('Validate the error state for Policy Number field and DOB')

  const firstNameWrapper = Selector('.request-pre-approval__verify-policy-field-wrapper.is-first-name')
  const lastNameWrapper = Selector('.request-pre-approval__verify-policy-field-wrapper.is-last-name')
  const verifyPolicyErrorMessage = Selector('.error-message.request-pre-approval__verify-policy-form-group-error.is-dob')
  await t
      .click(link)
      .click(verifyBtn)
      .expect(dobWrapper.child(0).hasClass('has-error')).ok()
      .expect(firstNameWrapper.child(0).hasClass('has-error')).ok()
      .expect(lastNameWrapper.child(0).hasClass('has-error')).ok()
      .expect(verifyPolicyErrorMessage.exists).ok()
      .expect(verifyPolicyErrorMessage.innerText).eql('We were unable to verify the policy details. Please try again with a valid policy number or name, plus date of birth.')
})

test('Verify policy with Multiple matching records - Error Validation', async t => {
  H.BeginTest('Verify policy with Multiple matching records - Error Validation')

  H.StepDescription('has logged in')
  await H.login('specialist-user@example.org', '1-Provider')
  await t.expect(currentProviderName.exists).ok()

  H.StepDescription('click Request a pre-approval menu for Specialists')
  await t
      .expect(reqPreApprovalLink.exists).ok('assuming the first provider is a specialist for this login')
      .click(reqPreApprovalLink)
      .expect(reqPreApprovalHeading.textContent).eql('Request a pre-approval')

    //  const link = Selector('.request-pre-approval__verify-policy a')
    //  const multipleRecordListWrapper = Selector('.request-pre-approval__verify-policy__policy-user-form-group-list')
  const verifyPolicyErrorMessage = Selector('.error-message.request-pre-approval__verify-policy-form-group-error.is-dob')
  H.StepDescription('verify policy return multiple matching')

  await H.verifyPolicyMultipleMatching('88888888', '30/12/2009')
  const firstMatchingUser = Selector('input[id="policy-user-0"]')
  const secondMatchingUser = Selector('input[id="policy-user-1"]')

  await t
      .expect(firstMatchingUser.exists).ok()
      .expect(secondMatchingUser.exists).ok()
      .click(verifyBtn)
      .expect(verifyPolicyErrorMessage.exists).ok()
      .expect(verifyPolicyErrorMessage.innerText).eql('We found multiple names on the policy with the same date of birth. Please select who this pre-approval is for.')
})

test('Request pre-approval -- I dont have policy number', async t => {
  H.BeginTest('Request pre-approval -- I dont have policy number')

  H.StepDescription('has logged in')
  await H.login('specialist-user@example.org', '1-Provider')
  await t.expect(currentProviderName.exists).ok()

  H.StepDescription('click Request a pre-approval menu for Specialists')
  await t
      .expect(reqPreApprovalLink.exists).ok('assuming the first provider is a specialist for this login')
      .click(reqPreApprovalLink)
      .expect(reqPreApprovalHeading.textContent).eql('Request a pre-approval')

  H.StepDescription('successful verify policy with First Name, Last Name and DOB')
  await t
    .click('.request-pre-approval__verify-policy-form-group-trigger.is-policy-number')
  await H.verifyPolicyByNameAndDob('02/02/2016',
    'SingleMatchingPolicy', 'LastNamebad900c0-eda4-4c47-88c5-a0ba2fa2e3f3')
})
test('Request pre-approval -- verify policy', async t => {
  H.BeginTest('Request pre-approval -- verify policy')

  H.StepDescription('has logged in')
  await H.login('specialist-user@example.org', '1-Provider')
   // await t.expect(currentProviderName.exists).ok()

  H.StepDescription('click Request a pre-approval menu for Specialists')
  await t
      .expect(reqPreApprovalLink.exists).ok('assuming the first provider is a specialist for this login')
      .click(reqPreApprovalLink)
      .expect(reqPreApprovalHeading.textContent).eql('Request a pre-approval')

  H.StepDescription('successful verify policy with Policy # and DOB')

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

// TODO Verify policy with multiple names - DONE
// TODO Verify policy with DOB + names - DONE
// TODO validation tests - DONE

  H.StepDescription('Fill in the primary procedure details')

  await H.enterTypeahead('input[name="primaryProcedure"]', 'he', 0)
  await t
      .click(locationLeft.parent())
      .typeText(specialistCost, '1000')
      .typeText(dateOfProcedure, '30/06/2017')
      .click(hospitalTimePlus)
      .expect(hospitalTime.value).eql('1')
      .click(sharedRoomYes.parent())
      .click(theatreTimePlus)
      .expect(theatreTime.value).eql('15')
      .click(accRelatedYes.parent())
      .typeText(dateOfOnset, '01/01/2000')

  await H.enterTypeahead('input[name="nameOfHospital"]', 'ho', 0)

  H.StepDescription('Adding another procedure details')

  await t
     .click(addAnotherProcedure)
  await H.enterTypeahead(otherProcedure1, 'he', 1)
  await t
     .typeText(otherProcedureSpecialistCost1, '700')

  H.StepDescription('Adding associated costs')
  await t
    .typeText(operatingTheatreCost, '2000')
    .typeText(radiologyCost, '1000')
    .typeText(hospitalCost, '1000')
    //  TODO prosthesis is broken atm
  await H.enterTypeahead(prosthesisDescription, 'pr', 1)
  await t
    .typeText(prosthesisCost, '2000')
    .typeText(consultationCost, '500')
    .typeText(sundryCost, '300')
    .typeText(anaesthetistName, 'Jim Taylor')
    .typeText(anaesthetistCost, '500')
    .expect(totalCost.innerText).eql('$ 9000')

  H.StepDescription('Attach Documents')
  await t
    .expect(deleteDocument.exists).notOk('Should not display delete icon')
    .setFilesToUpload(AccLetterForm, '../test_utils/uploadDocument/1.pdf')
    .setFilesToUpload(referralLetterForm, '../test_utils/uploadDocument/1.pdf')
    .setFilesToUpload('input#SpecialistReport', '../test_utils/uploadDocument/4.jpg')

  H.StepDescription('Tick the declaration section')
  await t
    .click(declarationAgree.sibling())

  H.StepDescription('Submit the pre-approval')
  await t
    .click(submit)
    // .expect(ConfirmPage.exists).ok()
})
