/**
 * Request a payment for Hospitals
 */

import { Selector } from 'testcafe'
import Helpers from './test_utils/helpers'
import config from './test_utils/config'

const H = new Helpers()

// entry points
const currentProviderName = Selector('h1.home-heading')
const reqPaymentLink = Selector('[href="/request-payment"]')
const reqPaymentHeading = Selector('h1.request-payment-heading')
const reqPaymentSubHeading = Selector('h2.request-payment-subheading')

// Sections
const invoiceDetailsSection = Selector('section.request-payment__invoice-details-wrapper')
const costsSectionForAnaesthetists = Selector('section.request-payment__costs-for-anaesthetists-wrapper')
const costsSectionForSpecialists = Selector('section.request-payment__costs-for-specialists-wrapper')
const costsSectionForHospitals = Selector('section.request-payment__costs-for-hospitals-wrapper')
const attachDocumentsSection = Selector('section.request-payment__attach-documents-wrapper')
const declarationSection = Selector('section.request-payment__declaration-wrapper')
const submitSection = Selector('section.request-payment-trigger-wrapper')

// Invoice details
const dateOfProcedure = Selector(
  'div.request-payment__invoice-details-field-wrapper.is-dateOfProcedure input'
)
const invoiceNumber = Selector('input[name="invoiceNumber"]')

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

// Costs
const primaryProcedure = Selector('input[name="primaryProcedure"]')
const locationLeft = Selector('input[id="location-left"]')
const locationRight = Selector('input[id="location-right"]')
const locationNA = Selector('input[id="location-notAvailable"]')

const operatingTheatreCost = Selector('input[name="operatingTheatreCost"]')
const radiologyCost = Selector('input[name="radiologyCost"]')
const hospitalCost = Selector('input[name="hospitalCost"]')
const specialistCost = Selector('input[name="specialistCost"]')
const consultationCost = Selector('input[name="consultationCost"]')
const anaesthetistCost = Selector('input[name="anaesthetistCost"]')
const prosthesisCost = Selector('input[name="prosthesisCost"]')
const prosthesisDescription = Selector('input[name="prosthesisDescription"]')

const addAnotherCostDropdown = Selector(
  'div.request-payment__costs-for-hospitals-select-wrapper.is-cost select'
)
const otherCostWrapper = Selector('div.is-other-cost')

const addAnotherProcedure = Selector('a.is-add-another-procedure')

const totalCostLabel = Selector('span.request-payment__costs-for-hospitals-total-label')
const totalCostValue = Selector('span.request-payment__costs-for-hospitals-total-cost')

// Attach documents
const AccLetterForm = Selector('form#AccLetterForm')

fixture `***** Provider portal Request a payment Hospitals tests`
  .page(config.domTestRootUrl)

test('Request payment for Hospitals -- Invoice details', async t => {
  H.BeginTest('Request payment for Hospitals -- Invoice details')

  await defaultLoginSteps(t)

  H.StepDescription('Sections should exist')
  await t
    .expect(invoiceDetailsSection.exists).ok('Should display Invoice details section')
    .expect(costsSectionForHospitals.exists).ok('Should display Hospitals Costs section')
    .expect(costsSectionForAnaesthetists.exists).notOk('Should not display Anaesthetists Costs section')
    .expect(costsSectionForSpecialists.exists).notOk('Should not display Specialists Costs section')
    .expect(attachDocumentsSection.exists).ok('Should display Attach documents section')
    .expect(declarationSection.exists).ok('Should display Declaration section')
    .expect(submitSection.exists).ok('Should display Submit button section')

  H.StepDescription('Fields should exist')
  await t
    .expect(dateOfProcedure.exists).ok('Should display Date of procedure field')
    .expect(invoiceNumber.exists).ok('Should display Invoice number field')
    .expect(sharedRoomNo.exists).ok()
    .expect(sharedRoomYes.exists).ok()

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

  H.StepDescription('ACC decision letter')
  await t
    .expect(accRelatedNo.exists).ok()
    .expect(accRelatedYes.exists).ok()
    .expect(AccLetterForm.exists).notOk('ACC decision letter should be hidden by default')
    .click(accRelatedYes.parent())
    .expect(AccLetterForm.exists).ok('ACC decision letter should be shown if ACC related = Yes')
    .click(accRelatedNo.parent())
    .expect(AccLetterForm.exists).notOk('ACC decision letter should not be shown if ACC related = No')
})

test('Request payment for Hospitals -- Costs', async t => {
  H.BeginTest('Request payment for Hospitals -- Costs')

  await defaultLoginSteps(t)

  H.StepDescription('Sections should exist')
  await t
    .expect(costsSectionForHospitals.exists).ok('Should display Costs details section')
    .expect(totalCostLabel.exists).ok()
    .expect(totalCostValue.exists).ok()

  H.StepDescription('Primary procedure typeahead')
  await t.expect(primaryProcedure.exists).ok()
  await H.enterTypeahead('input[name="primaryProcedure"]', 'he', 0)

  H.StepDescription('n/a is checked, but not Left nor Right')
  await t
    .expect(locationLeft.checked).notOk('Left should not be checked by default')
    .expect(locationRight.checked).notOk('Right should not be checked by default')
    .expect(locationNA.checked).ok('n/a should be checked by default')

  H.StepDescription('Cost fields should exist')
  await t
    .expect(operatingTheatreCost.exists).ok()
    .expect(radiologyCost.exists).ok()
    .expect(hospitalCost.exists).ok()
    .expect(specialistCost.exists).ok()
    .expect(consultationCost.exists).ok()
    .expect(anaesthetistCost.exists).ok()
    .expect(prosthesisCost.exists).ok()
    .expect(addAnotherCostDropdown.exists).ok('Add another cost dropdown')
    .expect(addAnotherProcedure.exists).ok('Add another procedure link')

  H.StepDescription('Prosthesis description typeahead')
  await t.expect(prosthesisDescription.exists).ok()
  await H.enterTypeahead('input[name="prosthesisDescription"]', 'ac', 0)

  H.StepDescription('Add another cost')
  await t
    .expect(otherCostWrapper.count).eql(0, 'initially no other costs')
    .click(addAnotherCostDropdown)
    .click(addAnotherCostDropdown.child('option').nth(1))
    .expect(otherCostWrapper.count).eql(1, '1 other cost should have been added')
    .expect(otherCostWrapper.nth(0).find('input').exists).ok('should have an input field')

  const rowWrapper = await otherCostWrapper.nth(0).parent().parent()
  await t.expect(rowWrapper.hasClass('row')).ok('other cost is wrapped by a row')

  const removeButton = await rowWrapper.find('div.is-remove')
  await t
    .expect(removeButton.exists).ok('should have a remove button')
    // .click(removeButton)  // TODO not working
    // .expect(otherCostWrapper.count).eql(0, 'removed the other cost')

  // TODO Add another procedure link
})

/**
 * Local helper to quickly login and verify pre-approval
 *
 * @param {object} t TestCafe test controller
 */
const defaultLoginSteps = async function (t) {
  H.StepDescription('has logged in')
  await H.login('three-providers-all-user@example.org', '3-Providers')
  const chosenProviderName = await H.chooseProvider(2) // assume this is a hospital
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
