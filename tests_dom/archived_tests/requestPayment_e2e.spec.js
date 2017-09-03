import { Selector } from 'testcafe'
import Helpers from '../test_utils/helpers'
import config from '../test_utils/config'

const H = new Helpers()

// entry points
const currentProviderName = Selector('h1.home-heading')

const reqPaymentLink = Selector('[href="/providerportal/request-payment"]')
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
const hospitalTime = Selector('input[name="hospitalTime"]')
const hospitalTimePlus = Selector('button.is-hospital-time.is-plus')
const anotherProcedure1 = Selector('input[name="otherProcedures[0].otherProcedure"]')
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
const AccLetter = Selector('input#AccLetter')
const SurgicalNotes = Selector('input#SurgicalNotes')
const SpecialistReport = Selector('input#SpecialistReport')
const OtherSupportingDocument = Selector('input#Unspecified')
const deleteDocument = Selector('.request-payment__attach-documents-delete')
const tncLink = Selector ('[href="https://www.nibfirstchoice.co.nz/terms-and-conditions"]')
const privacyPolicyLink = Selector ('[href="https://www.nibfirstchoice.co.nz/privacy-policy"]')
const declarationAgree = Selector('input[name="declarationAgree"]')
const submitBtn = Selector('button.request-payment-trigger.is-submit')
const submitConfirmationPageH2 = Selector('h2.request-payment-subheading')
const submitConfirmationText = Selector('.request-payment__submitted-text')
const requestAnotherPaymentButton = Selector('.request-payment__submitted-trigger.is-another')
const doneButton = Selector('.request-payment__submitted-trigger.is-done')

const homePagePaymentSubHeader = Selector('.home__payments-subheading')
const homePagePreApprovalSubHeader = Selector('.home__pre-approvals-subheading')
const viewAllPreapprovals = Selector('.home-trigger.is-view-all.is-pre-approvals')
const viewAllPayments = Selector('.home-trigger.is-view-all.is-payments')


// Invoice details
const dateOfProcedure = Selector('div.request-payment__invoice-details-field-wrapper.is-date-of-procedure input')
const invoiceNumber = Selector('input[name="invoiceNumber"]')
const sharedRoomYes = Selector('input[id="shared-room-Yes"]')
const theatreTime = Selector('input[name="theatreTime"]')
const theatreTimeMinus = Selector('button.is-theatre-time.is-minus')
const theatreTimePlus = Selector('button.is-theatre-time.is-plus')

const accRelatedNo = Selector('input[id="acc-related-No"]')
const accRelatedYes = Selector('input[id="acc-related-Yes"]')

// Costs
const locationLeft = Selector('input[id="location-Left"]')
const locationRight = Selector('input[id="location-Right"]')
const locationNA = Selector('input[id="location-NotApplicable"]')
const specialistCost = Selector('input[name="specialistCost"]')
const operatingTheatreCost = Selector('input[name="operatingTheatreCost"]')
const radiologyCost = Selector('input[name="radiologyCost"]')
const hospitalCost = Selector('input[name="hospitalCost"]')
const anaesthetistCost = Selector('input[name="anaesthetistCost"]')
const consultationCost = Selector('input[name="consultationCost"]')
const prosthesisCost = Selector('input[name="prosthesisCost"]')
const addAnotherCostDropdown = Selector('div.request-payment__costs-for-specialists-select-wrapper.is-cost select')
const addAnotherCostDropdownHospitals =
                  Selector('div.request-payment__costs-for-hospitals-select-wrapper.is-cost select')
const anotherSpecialistCost1 = Selector('input[name="otherCosts[0].otherCost"]')
const anotherSpecialistCost2 = Selector('input[name="otherCosts[1].otherCost"]')
const otherCostWrapper = Selector('div.is-other-cost')
const addAnotherProcedure = Selector('a.is-add-another-procedure')
const anotherProcedureCost1 = Selector('input[name="otherProcedures[0].specialistCost"]')
const timeBaseUnitsTime = Selector('input[name="timeBaseUnitsTime"]')
const timeBaseUnitsTimePlus = Selector('button.is-time-base-units-time.is-plus')
const timeBaseUnitsCost = Selector('input[name="timeBaseUnitsCost"]')
const timeUnitsTime = Selector('input[name="timeUnitsTime"]')
const timeUnitsTimePlus = Selector('button.is-time-units-time.is-plus')
const timeUnitsCost = Selector('input[name="timeUnitsCost"]')

const modifyingUnitsTime = Selector('input[name="modifyingUnitsTime"]')
const modifyingUnitsTimePlus = Selector('button.is-modifying-units-time.is-plus')
const modifyingUnitsCost = Selector('input[name="modifyingUnitsCost"]')
const gstCost = Selector('.request-payment__costs-for-specialists-gst-cost')
const anaesthetistGst = Selector('.request-payment__costs-for-anaesthetists-gst-cost')
const hospitalGst = Selector('.request-payment__costs-for-hospitals-gst-cost')
const totalCostValue = Selector('span.request-payment__costs-for-specialists-total-cost')
const totalCostValueAnaesthetist = Selector('span.request-payment__costs-for-anaesthetists-total-cost')
const totalCostValueHospital = Selector('span.request-payment__costs-for-hospitals-total-cost')



const submit = Selector('button.request-payment-trigger.is-submit')

const defaultLoginSteps = async function (t) {
  H.StepDescription('has logged in')
  await H.login('three-providers-all-user@example.org', '3-Providers')
  const chosenProviderName = await H.chooseProvider(1) // assume this is a specialist
  await t
    .expect(currentProviderName.exists).ok()
    .expect(currentProviderName.innerText).eql(chosenProviderName)

  H.StepDescription('click Request a payment menu')
  await t
    .expect(reqPaymentLink.exists).ok()
    .click(reqPaymentLink)
    .expect(reqPaymentHeading.textContent).eql('Request a payment')
    .expect(reqPaymentSubHeading.textContent).eql(chosenProviderName)
}
const loginAsSpecialist = async function (t) {
  H.StepDescription('Logging in as Specialist')
  await H.login('specialist-user@example.org', '1-Provider')
  const chosenProviderName = await H.chooseProvider(0) // assume this is a specialist
  await t
    .expect(currentProviderName.exists).ok()
    .expect(currentProviderName.innerText).eql(chosenProviderName)

  H.StepDescription('click Request a payment menu')
  await t
    .expect(reqPaymentLink.exists).ok()
    .click(reqPaymentLink)
    .expect(reqPaymentHeading.textContent).eql('Request a payment')
    .expect(reqPaymentSubHeading.textContent).eql(chosenProviderName)
  H.StepDescription('successful verify pre-approval')
  await H.verifyPreApproval('88888888/88/888', '01/01/1980')
}
const loginAsHospital = async function (t) {
  H.StepDescription('Logging in as Hospital User')
  await H.login('hospital-user@example.org', '1-Provider')
  const chosenProviderName = await H.chooseProvider(0) // assume this is a specialist
  await t
    .expect(currentProviderName.exists).ok()
    .expect(currentProviderName.innerText).eql(chosenProviderName)

  H.StepDescription('click Request a payment menu')
  await t
    .expect(reqPaymentLink.exists).ok()
    .click(reqPaymentLink)
    .expect(reqPaymentHeading.textContent).eql('Request a payment')
    .expect(reqPaymentSubHeading.textContent).eql(chosenProviderName)
  H.StepDescription('successful verify pre-approval')
  await H.verifyPreApproval('88888888/88/888', '01/01/1980')
}
const loginAsAnaesthetist = async function (t) {
  H.StepDescription('Logging in as Anaesthetist User')
  await H.login('anaesthetist-user@example.org', '1-Provider')
  const chosenProviderName = await H.chooseProvider(0) // assume this is a specialist
  await t
    .expect(currentProviderName.exists).ok()
    .expect(currentProviderName.innerText).eql(chosenProviderName)

  H.StepDescription('click Request a payment menu')
  await t
    .expect(reqPaymentLink.exists).ok()
    .click(reqPaymentLink)
    .expect(reqPaymentHeading.textContent).eql('Request a payment')
    .expect(reqPaymentSubHeading.textContent).eql(chosenProviderName)
  H.StepDescription('successful verify pre-approval')
  await H.verifyPreApproval('88888888/88/888', '01/01/1980')
}

fixture `***** Provider portal Request a payment End to End tests`
  .page(config.domTestRootUrl)

test('Request payment for Specialists -- Verify pre-approval - Field Validation', async t => {
  H.BeginTest('Request payment for Specialists -- Verify pre-approval - Field Validation')

  await defaultLoginSteps(t)

  H.StepDescription('Not entering any data - Checking the field error validation')

  // const policyNumberWrapper = Selector('.request-pre-approval__verify-policy-field-wrapper.is-policy-id')
 //  const dobWrapper = Selector('.request-pre-approval__verify-policy-field-wrapper.is-dob')
  const errorMessageField = Selector('.request-payment__pre-approval-form-group-error.is-dob')

  await t
    .click(verifyBtn)
    .expect(errorMessageField.exists).ok()
    .expect(errorMessageField.innerText).eql('We were unable to verify the pre-approval. Please try again with a valid pre-approval number and date of birth.')

  H.StepDescription('Checking the cancel button function')
  await t
    .expect(cancelVerifyBtn.hasAttribute('disabled')).ok()
    .typeText(preApprovalNumberField, '8')
    .expect(cancelVerifyBtn.hasAttribute('disabled')).notOk('Cancel button should be enabled once the form is filled in')
    .click(preApprovalNumberField)
    .pressKey('backspace')
    .expect(cancelVerifyBtn.hasAttribute('disabled')).ok()
    .typeText(dobField, '01/01/1980')
    .expect(cancelVerifyBtn.hasAttribute('disabled')).ok()
    .pressKey('ctrl+a')
    .pressKey('delete')
    // .expect(cancelVerifyBtn.hasAttribute('disabled')).ok()  // TODO Defect - Currently it doesnt get disabled
    .typeText(dobField, 'dlasdjsa')
    .pressKey('tab')
    .expect(dobField.value).eql('')
    .typeText(dobField, '~!@#$%^&*()')
    .pressKey('tab')
    .expect(dobField.value).eql('')
})

test('Request payment - Specialists View -- Request a payment form', async t => {
  H.BeginTest('Request payment - Specialists View -- Request a payment form')
  await defaultLoginSteps(t)
  H.StepDescription('Successful verify pre-approval')
  await H.verifyPreApproval('88888888/88/888', '01/01/1980')
  H.StepDescription('Checking the verified pre-approval section')
  await t
      .expect(preApprovalNumberSpan.exists).ok('Should display verified pre-approval number')
      .expect(preApprovalNumberSpan.textContent).eql('Pre-approval number')
      .expect(patientNameSpan.exists).ok('Should display verified Patient name')
      .expect(patientNameSpan.textContent).eql('Patient name')
      .expect(dobSpan.exists).ok('Should display verified DOB')
      .expect(dobSpan.textContent).eql('Patient date of birth')
      .expect(dateSubmittedSpan.exists).ok('Should display pre-approval submitted date')
      .expect(dateSubmittedSpan.textContent).eql('Date pre-approval was submitted')
      .expect(invoiceDetailsSection.exists).ok('Should display Invoice details section')
      .expect(costsSection.exists).ok('Should display Costs section')
      .expect(attachDocumentsSection.exists).ok('Should display Attach documents section')
      .expect(declarationSection.exists).ok('Should display Declaration section')
      .expect(submitSection.exists).ok('Should display Submit section')

  H.StepDescription('Checking - Date of procedure')
  await t
      .typeText(dateOfProcedure, '~!@#$%^&*()_+:";<>?,./')
      .pressKey('tab')
      .expect(dateOfProcedure.value).eql('')
      .typeText(dateOfProcedure, 'qwerty')
      .pressKey('tab')
      .expect(dateOfProcedure.value).eql('')
      .typeText(dateOfProcedure, '30/04/2017')
      .pressKey('tab')
      .expect(dateOfProcedure.value).eql('30/04/2017')

  H.StepDescription('Checking - Invoice number')
  const clearInvoiceNumber = Selector('.request-payment__invoice-details-form-group-clear-trigger.is-invoice-number')
  await t
        .typeText(invoiceNumber, '~!@#$%^&*()_+:";<>?,./')
        .pressKey('tab')
        .expect(invoiceNumber.value).eql('')
        .typeText(invoiceNumber, 'qwerty/123')
        .pressKey('tab')
        .expect(invoiceNumber.value).eql('qwerty123')
        .click(clearInvoiceNumber)
        .expect(invoiceNumber.value).eql('')
        .typeText(invoiceNumber, 'New\nInvoice\nnumber')

  H.StepDescription('Checking - Theatre time')
  await t
        .expect(theatreTime.exists).ok()
        .typeText(theatreTime, '~!@#$%^&*()')
        .click(theatreTimePlus)
        .expect(theatreTime.value).eql('15')
        .click(theatreTimeMinus)
        .expect(theatreTime.value).eql('')
        .pressKey('backspace')
        .typeText(theatreTime, 'kjasdkashdksakdha')
        .click(theatreTimePlus)
        .expect(theatreTime.value).eql('15')
        .click(theatreTime)
        .pressKey('backspace backspace')
        .typeText(theatreTime, '-5')
        .click(theatreTimeMinus)
        .expect(theatreTime.value).eql('')

  H.StepDescription('Checking - ACC related')
  const accSection = Selector('.request-payment__invoice-details-form-group.is-acc-related')
  await t
        .expect(accSection.exists).ok()// Checks acc section is available
        .expect(accRelatedYes.exists).ok()// Checks acc Yes option is available
        .expect(accRelatedNo.exists).ok() // Checks acc NO option is available
        .click(accRelatedNo.parent())// Click on N0
        .expect(accRelatedNo.checked).ok()// No should be selected
        .expect(accRelatedYes.checked).notOk()// Yes should not be selected
        .expect(AccLetterForm.exists).notOk() // ACC letter should not be requested
        .click(accRelatedYes.parent())// Click on Yes
        .expect(accRelatedYes.checked).ok()// Yes should be selected
        .expect(accRelatedNo.checked).notOk()// No should not be selected
        .expect(AccLetterForm.exists).ok()// Acc letter should be selected
        .click(accRelatedNo.parent())// Click on No

  H.StepDescription('Checking - Primary procedure drop down')
  await H.enterTypeahead('input[name="primaryProcedure"]', 'he', 0)

  H.StepDescription('Checking - Left-Right-N/A')
  await t
        .click(locationLeft.parent())
        .expect(locationLeft.checked).ok()
        .expect(locationRight.checked).notOk()
        .expect(locationNA.checked).notOk()
        .click(locationRight.parent())
        .click(locationNA.parent())
        .click(locationLeft.parent())

  H.StepDescription('Checking - Specialist cost ')
  await t
        .expect(specialistCost.exists).ok()
        .typeText(specialistCost, '!@#$%')
        .expect(specialistCost.value).eql('')
        .typeText(specialistCost, 'qweqwe')
        .expect(specialistCost.value).eql('')
        .typeText(specialistCost, '-100000')
        .expect(specialistCost.value).eql('$ 1000.00')
        .expect(gstCost.innerText).eql('$ 150.00')
        .expect(totalCostValue.innerText).eql('$ 1150.00')

  H.StepDescription('Checking - Consultation cost ')
  await t
        .expect(consultationCost.exists).ok()
        .typeText(consultationCost, '!@#$%')
        .expect(consultationCost.value).eql('')
        .typeText(consultationCost, 'qweqwe')
        .expect(consultationCost.value).eql('')
        .typeText(consultationCost, '-100000')
        .expect(consultationCost.value).eql('$ 1000.00')
        .expect(gstCost.innerText).eql('$ 300.00')
        .expect(totalCostValue.innerText).eql('$ 2300.00')

  H.StepDescription('Checking - Prosthesis drop down')
      // const procedureFromList = await primaryProcedure.parent().sibling(1)
      // TODO  User should be able to select primary procedures from the list.
      //    await t
      //      .typeText(primaryProcedure, '12')
      //      .expect(primaryProcedure.value).eql('')
  await H.enterTypeahead('input[name="prosthesisDescr"]', 'he', 1)

  H.StepDescription('Checking - Prosthesis cost ')
  await t
        .expect(prosthesisCost.exists).ok()
        .typeText(prosthesisCost, '!@#$%')
        .expect(prosthesisCost.value).eql('')
        .typeText(prosthesisCost, 'qweqwe')
        .expect(prosthesisCost.value).eql('')
        .typeText(prosthesisCost, '-100000')
        .expect(prosthesisCost.value).eql('$ 1000.00')
        .expect(gstCost.innerText).eql('$ 450.00')
        .expect(totalCostValue.innerText).eql('$ 3450.00')

  H.StepDescription('Checking - Add another cost')
//  const removeAnotherCost = Selector('.request-payment__costs-for-specialists-form-group-trigger.is-remove')
  await t
        .click(addAnotherCostDropdown)
        .click(addAnotherCostDropdown.child('option').nth(1))
        .expect(otherCostWrapper.count).eql(1, '1 other cost should have been added')
        .expect(otherCostWrapper.nth(0).find('input').exists).ok('should have an input field')
        .typeText(anotherSpecialistCost1, '!@#$%')
        .expect(anotherSpecialistCost1.value).eql('')
        .typeText(anotherSpecialistCost1, 'qweqwe')
        .expect(anotherSpecialistCost1.value).eql('')
        .typeText(anotherSpecialistCost1, '-20000')
        .expect(anotherSpecialistCost1.value).eql('$ 200.00')
        .expect(gstCost.innerText).eql('$ 480.00')
        .expect(totalCostValue.innerText).eql('$ 3680.00')
        .click(addAnotherCostDropdown)
        .click(addAnotherCostDropdown.child('option').nth(2))
        .expect(otherCostWrapper.count).eql(2, '1 other cost should have been added')
        .expect(otherCostWrapper.nth(1).find('input').exists).ok('should have an input field')
        .typeText(anotherSpecialistCost2, '!@#$%')
        .expect(anotherSpecialistCost2.value).eql('')
        .typeText(anotherSpecialistCost2, 'qweqwe')
        .expect(anotherSpecialistCost2.value).eql('')
        .typeText(anotherSpecialistCost2, '-10000')
        .expect(anotherSpecialistCost2.value).eql('$ 100.00')
        .expect(gstCost.innerText).eql('$ 495.00')
        .expect(totalCostValue.innerText).eql('$ 3795.00')
          // TODO Remove button is not working
//          const rowWrapper = await otherCostWrapper.nth(0).parent().parent()
//          await t.expect(rowWrapper.hasClass('row')).ok('other cost is wrapped by a row')
//          const removeButton = await rowWrapper.find('.request-payment__costs-for-specialists-form-group-trigger.form-link-icon.is-remove')
//          await t
//             .expect(removeButton.exists).ok('should have a remove button')
//             .click(removeButton)  // TODO not working
//             .expect(otherCostWrapper.count).eql(1, 'removed the other cost')

  H.StepDescription('Checking - Add another procedure')
  await t
        .click(addAnotherProcedure)
  await H.enterTypeahead(anotherProcedure1, 'he', 1)

  H.StepDescription('Checking - Add cost to another procedure')
  await t
        .click(anotherProcedureCost1)
        .typeText(anotherProcedureCost1, '!@#$%')
        .expect(anotherProcedureCost1.value).eql('')
        .typeText(anotherProcedureCost1, 'qweqwe')
        .expect(anotherProcedureCost1.value).eql('')
        .typeText(anotherProcedureCost1, '-30000')
        .expect(anotherProcedureCost1.value).eql('$ 300.00')
        .expect(gstCost.innerText).eql('$ 540.00')
        .expect(totalCostValue.innerText).eql('$ 4140.00')

  H.StepDescription('Checking - Document Section ')
  await t
        .expect(AccLetterForm.exists).notOk('ACC decision letter should be hidden by default')
        .expect(surgicalNotesForm.exists).ok()
        .expect(surgicalNotesForm.find('span').innerText).eql('Surgical notes')
        .expect(UnspecifiedForm.exists).ok()
        .expect(UnspecifiedForm.find('span').innerText).eql('Other supporting documents')
        .click(accRelatedYes.parent())
        .expect(AccLetterForm.exists).ok('ACC decision letter should be shown if ACC related = Yes')
        .click(accRelatedNo.parent())
        .expect(AccLetterForm.exists).notOk('ACC decision letter should not be shown if ACC related = No')

  H.StepDescription('Attach Documents')
    await t
        .expect(deleteDocument.exists).notOk('Should not display delete icon')
        .setFilesToUpload(surgicalNotesForm, '../test_utils/uploadDocument/1.pdf')

  H.StepDescription('Checking - Declaration Section ')
  await t
        .expect(declarationSection.exists).ok()
        .expect(declarationAgree.checked).notOk()
        .click(declarationAgree.sibling())
        .expect(declarationAgree.checked).ok()
})

test('Submit the Request a payment as Anaesthetist  User -- Happy path', async t => {
  H.BeginTest('Submit the Request a payment as Anaesthetist  User -- Happy path')

  await loginAsAnaesthetist(t)

  H.StepDescription('Entering Invoice Details')
  await t
    .typeText(dateOfProcedure, '10/05/2017')
    .expect(dateOfProcedure.value).eql('10/05/2017')
    .typeText(invoiceNumber, 'Invoice number')
    .expect(invoiceNumber.value).eql('Invoicenumber')
    .click(theatreTimePlus)
    .expect(theatreTime.value).eql('15')

  H.StepDescription('Entering details for Cost section')
  await H.enterTypeahead('input[name="primaryProcedure"]', 'he', 0)
  await t
    .click(locationRight.parent())
    .expect(locationRight.checked).ok()

  H.StepDescription('Time base units')
  await t
        .click(timeBaseUnitsTimePlus)
        .expect(timeBaseUnitsTime.value).eql('15')
        .typeText(timeBaseUnitsCost, '100000')
        .expect(timeBaseUnitsCost.value).eql('$ 1000.00')
        .expect(anaesthetistGst.innerText).eql('$ 150.00')
        .expect(totalCostValueAnaesthetist.innerText).eql('$ 1150.00')

  H.StepDescription('Time units')
  await t
    .click(timeUnitsTimePlus)
    .expect(timeUnitsTime.value).eql('15')
    .typeText(timeUnitsCost, '50000')
    .expect(timeUnitsCost.value).eql('$ 500.00')
    .expect(anaesthetistGst.innerText).eql('$ 225.00')
    .expect(totalCostValueAnaesthetist.innerText).eql('$ 1725.00')

  H.StepDescription('Modifying units')
  await t
    .click(modifyingUnitsTimePlus)
    .click(modifyingUnitsTimePlus)
    .expect(modifyingUnitsTime.value).eql('30')
    .typeText(modifyingUnitsCost, '30000')
    .expect(modifyingUnitsCost.value).eql('$ 300.00')
    .expect(anaesthetistGst.innerText).eql('$ 270.00')
    .expect(totalCostValueAnaesthetist.innerText).eql('$ 2070.00')

  H.StepDescription('Attaching documents')
  await t
    .setFilesToUpload(SurgicalNotes, '../test_utils/uploadDocument/1.pdf')
    .setFilesToUpload(OtherSupportingDocument, '../test_utils/uploadDocument/4.jpg')

  H.StepDescription('Accepting the terms and conditions in Declaration Section')
  await t
    .expect(tncLink.exists).ok()
    .expect(privacyPolicyLink.exists).ok()
    .click(declarationAgree.sibling())
    .expect(declarationAgree.checked).ok()

  H.StepDescription('Submitting the Request')
  const chosenProviderName = await H.chooseProvider(0)
  await t
    .click(submit)
    .expect(submitConfirmationPageH2.exists).ok()
    .expect(submitConfirmationPageH2.innerText).eql('Request submitted')
    .expect(submitConfirmationText.innerText).eql('Please monitor your dashboard for information about this payment request.')
    .expect(requestAnotherPaymentButton.exists).ok()
    .expect(doneButton.exists).ok()
    .click(doneButton)
    .expect(currentProviderName.exists).ok()
    .expect(currentProviderName.innerText).eql(chosenProviderName)
    .expect(homePagePaymentSubHeader.innerText).eql('Payments')
    .expect(viewAllPayments.exists).ok()
})

test('Submit the Request a payment as Specialist User -- Happy path', async t => {
  H.BeginTest('Submit the Request a payment as Specialist User -- Happy path')

  await loginAsSpecialist(t)

  H.StepDescription('Entering Invoice Details')
  await t
      .typeText(dateOfProcedure, '10/05/2017')
      .expect(dateOfProcedure.value).eql('10/05/2017')
      .typeText(invoiceNumber, 'Invoice number')
      .expect(invoiceNumber.value).eql('Invoicenumber')
      .click(theatreTimePlus)
      .click(theatreTimePlus)
      .expect(theatreTime.value).eql('30')
      .click(accRelatedYes.parent())
  H.StepDescription('Entering details for Cost section')
  await H.enterTypeahead('input[name="primaryProcedure"]', 'he', 0)
  await t
      .click(locationRight.parent())
      .expect(locationRight.checked).ok()
      .typeText(specialistCost, '100000')
      .expect(specialistCost.value).eql('$ 1000.00')
      .expect(gstCost.innerText).eql('$ 150.00')
      .expect(totalCostValue.innerText).eql('$ 1150.00')
      .typeText(consultationCost, '50000')
      .expect(consultationCost.value).eql('$ 500.00')
      .expect(gstCost.innerText).eql('$ 225.00')
      .expect(totalCostValue.innerText).eql('$ 1725.00')

  await H.enterTypeahead('input[name="prosthesisDescr"]', 'he', 1)
  await t
      .typeText(prosthesisCost, '30000')
      .expect(prosthesisCost.value).eql('$ 300.00')
      .expect(gstCost.innerText).eql('$ 270.00')
      .expect(totalCostValue.innerText).eql('$ 2070.00')
      .click(addAnotherCostDropdown)
      .click(addAnotherCostDropdown.child('option').nth(1))
      .typeText(anotherSpecialistCost1, '20000')
      .expect(anotherSpecialistCost1.value).eql('$ 200.00')
      .expect(gstCost.innerText).eql('$ 300.00')
      .expect(totalCostValue.innerText).eql('$ 2300.00')
      .click(addAnotherProcedure)

  await H.enterTypeahead(anotherProcedure1, 'he', 0)
  await t
      .typeText(anotherProcedureCost1, '120000')
      .expect(anotherProcedureCost1.value).eql('$ 1200.00')
      .expect(gstCost.innerText).eql('$ 480.00')
      .expect(totalCostValue.innerText).eql('$ 3680.00')

  H.StepDescription('Attaching documents')
  await t
      .setFilesToUpload(AccLetter, '../test_utils/uploadDocument/1.pdf')
      .setFilesToUpload(SurgicalNotes, '../test_utils/uploadDocument/1.pdf')
      .setFilesToUpload(OtherSupportingDocument, '../test_utils/uploadDocument/4.jpg')

  H.StepDescription('Accepting the terms and conditions in Declaration Section')
  await t
      .expect(tncLink.exists).ok()
      .expect(privacyPolicyLink.exists).ok()
      .click(declarationAgree.sibling())
      .expect(declarationAgree.checked).ok()

  H.StepDescription('Submitting the Request')
  const chosenProviderName = await H.chooseProvider(0)
  await t
      .click(submit)
      .expect(submitConfirmationPageH2.exists).ok()
      .expect(submitConfirmationPageH2.innerText).eql('Request submitted')
      .expect(submitConfirmationText.innerText).eql('Please monitor your dashboard for information about this payment request.')
      .expect(requestAnotherPaymentButton.exists).ok()
      .expect(doneButton.exists).ok()
      .click(doneButton)
      .expect(currentProviderName.exists).ok()
      .expect(currentProviderName.innerText).eql(chosenProviderName)
      .expect(homePagePreApprovalSubHeader.innerText).eql('Pre-approvals')
      .expect(homePagePaymentSubHeader.innerText).eql('Payments')
      .expect(viewAllPreapprovals.exists).ok()
      .expect(viewAllPayments.exists).ok()
})

test('Submit the Request a payment as Hospital User -- Happy path', async t => {
  H.BeginTest('Submit the Request a payment as Hospital User -- Happy path')
  const dateOfProcedureHospital = Selector('.request-payment__invoice-details-field-wrapper.is-date-of-procedure')

  await loginAsHospital(t)

  H.StepDescription('Entering Invoice Details')
  await t
      .typeText(dateOfProcedureHospital, '10/05/2017')
      // .expect(dateOfProcedureHospital.value).eql('10/05/2017')
      .typeText(invoiceNumber, 'Invoice number')
      .expect(invoiceNumber.value).eql('Invoicenumber')
      .click(hospitalTimePlus)
      .expect(hospitalTime.value).eql('1')
      .click(sharedRoomYes.parent())
      .expect(sharedRoomYes.checked).ok()
      .click(theatreTimePlus)
      .expect(theatreTime.value).eql('15')
      .click(accRelatedYes.parent())
      .expect(accRelatedYes.checked).ok()

  H.StepDescription('Entering Primary procedure details')
  await H.enterTypeahead('input[name="primaryProcedure"]', 'he', 0)
  await t
       .click(locationRight.parent())
       .expect(locationRight.checked).ok()
       .typeText(operatingTheatreCost, '100000')
       .expect(operatingTheatreCost.value).eql('$ 1000.00')
       .expect(hospitalGst.innerText).eql('$ 150.00')
       .expect(totalCostValueHospital.innerText).eql('$ 1150.00')
       .typeText(radiologyCost, '50000')
       .expect(radiologyCost.value).eql('$ 500.00')
       .expect(hospitalGst.innerText).eql('$ 225.00')
       .expect(totalCostValueHospital.innerText).eql('$ 1725.00')
       .typeText(hospitalCost, '35000')
       .expect(hospitalCost.value).eql('$ 350.00')
       .expect(hospitalGst.innerText).eql('$ 277.50')
       .expect(totalCostValueHospital.innerText).eql('$ 2127.50')
       .typeText(specialistCost, '20000')
       .expect(specialistCost.value).eql('$ 200.00')
       .expect(hospitalGst.innerText).eql('$ 307.50')
       .expect(totalCostValueHospital.innerText).eql('$ 2357.50')
       .typeText(consultationCost, '10000')
       .expect(consultationCost.value).eql('$ 100.00')
       .expect(hospitalGst.innerText).eql('$ 322.50')
       .expect(totalCostValueHospital.innerText).eql('$ 2472.50')
       .typeText(anaesthetistCost, '10000')
       .expect(anaesthetistCost.value).eql('$ 100.00')
       .expect(hospitalGst.innerText).eql('$ 337.50')
       .expect(totalCostValueHospital.innerText).eql('$ 2587.50')

  await H.enterTypeahead('input[name="prosthesisDescr"]', 'he', 1)
  await t
      .typeText(prosthesisCost, '10000')
      .expect(prosthesisCost.value).eql('$ 100.00')
      .expect(hospitalGst.innerText).eql('$ 352.50')
      .expect(totalCostValueHospital.innerText).eql('$ 2702.50')
      .click(addAnotherCostDropdownHospitals)
      .click(addAnotherCostDropdownHospitals.child('option').nth(1))
      .typeText(anotherSpecialistCost1, '500.32')
      .expect(anotherSpecialistCost1.value).eql('$ 500.32')
      .expect(hospitalGst.innerText).eql('$ 427.55')
      .expect(totalCostValueHospital.innerText).eql('$ 3277.87')
      .click(addAnotherProcedure)

  await H.enterTypeahead(anotherProcedure1, 'he', 1)
  await t
      .typeText(anotherProcedureCost1, '200.20')
      .expect(anotherProcedureCost1.value).eql('$ 200.20')
      .expect(hospitalGst.innerText).eql('$ 457.58')
      .expect(totalCostValueHospital.innerText).eql('$ 3508.10')

  H.StepDescription('Attaching documents')
  await t
      .setFilesToUpload(AccLetter, '../test_utils/uploadDocument/1.pdf')
      .setFilesToUpload(SurgicalNotes, '../test_utils/uploadDocument/1.pdf')
      .setFilesToUpload(OtherSupportingDocument, '../test_utils/uploadDocument/4.jpg')

  H.StepDescription('Accepting the terms and conditions in Declaration Section')
  await t
      .expect(tncLink.exists).ok()
      .expect(privacyPolicyLink.exists).ok()
      .click(declarationAgree.sibling())
      .expect(declarationAgree.checked).ok()

  H.StepDescription('Submitting the Request')
  const chosenProviderName = await H.chooseProvider(0)
  await t
      .click(submit)
      .expect(submitConfirmationPageH2.exists).ok()
      .expect(submitConfirmationPageH2.innerText).eql('Request submitted')
      .expect(submitConfirmationText.innerText).eql('Please monitor your dashboard for information about this payment request.')
      .expect(requestAnotherPaymentButton.exists).ok()
      .expect(doneButton.exists).ok()
      .click(doneButton)
      .expect(currentProviderName.exists).ok()
      .expect(currentProviderName.innerText).eql(chosenProviderName)
      .expect(homePagePaymentSubHeader.innerText).eql('Payments')
      .expect(viewAllPayments.exists).ok()
})
