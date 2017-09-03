/**
 * Request a payment for Anaesthetists
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
  'div.request-payment__invoice-details-field-wrapper.is-date-of-procedure input'
)
const invoiceNumber = Selector('input[name="invoiceNumber"]')
const theatreTime = Selector('input[name="theatreTime"]')
const theatreTimeMinus = Selector('button.is-theatre-time.is-minus')
const theatreTimePlus = Selector('button.is-theatre-time.is-plus')

// Costs
const primaryProcedure = Selector('input[name="primaryProcedure"]')
const locationLeft = Selector('input[id="location-left"]')
const locationRight = Selector('input[id="location-right"]')
const locationNA = Selector('input[id="location-notAvailable"]')

const timeBaseUnitsTime = Selector('input[name="timeBaseUnitsTime"]')
const timeBaseUnitsTimeMinus = Selector('button.is-time-base-units-time.is-minus')
const timeBaseUnitsTimePlus = Selector('button.is-time-base-units-time.is-plus')
const timeBaseUnitsCost = Selector('input[name="timeBaseUnitsCost"]')

const timeUnitsTime = Selector('input[name="timeUnitsTime"]')
const timeUnitsTimeMinus = Selector('button.is-time-units-time.is-minus')
const timeUnitsTimePlus = Selector('button.is-time-units-time.is-plus')
const timeUnitsCost = Selector('input[name="timeUnitsCost"]')

const modifyingUnitsTime = Selector('input[name="modifyingUnitsTime"]')
const modifyingUnitsTimeMinus = Selector('button.is-modifying-units-time.is-minus')
const modifyingUnitsTimePlus = Selector('button.is-modifying-units-time.is-plus')
const modifyingUnitsCost = Selector('input[name="modifyingUnitsCost"]')

const totalCostLabel = Selector('span.request-payment__costs-for-anaesthetists-total-label')
const totalCostValue = Selector('span.request-payment__costs-for-anaesthetists-total-cost')

fixture `***** Provider portal Request a payment Anaesthetists tests`
  .page(config.domTestRootUrl)

test('Request payment for Anaesthetists -- Invoice details', async t => {
  H.BeginTest('Request payment for Anaesthetists -- Invoice details')

  await defaultLoginSteps(t)

  H.StepDescription('Sections should exist')
  await t
    .expect(invoiceDetailsSection.exists).ok('Should display Invoice details section')
    .expect(costsSectionForAnaesthetists.exists).ok('Should display Anaesthetists Costs section')
    .expect(costsSectionForSpecialists.exists).notOk('Should not display Specialists Costs section')
    .expect(costsSectionForHospitals.exists).notOk('Should not display Hospitals Costs section')
    .expect(attachDocumentsSection.exists).ok('Should display Attach documents section')
    .expect(declarationSection.exists).ok('Should display Declaration section')
    .expect(submitSection.exists).ok('Should display Submit button section')

  H.StepDescription('Fields should exist')
  await t
    .expect(dateOfProcedure.exists).ok('Should display Date of procedure field')
    .expect(invoiceNumber.exists).ok('Should display Invoice number field')

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
})

test('Request payment for Anaesthetists -- Costs', async t => {
  H.BeginTest('Request payment for Anaesthetists -- Costs')

  await defaultLoginSteps(t)

  H.StepDescription('Sections should exist')
  await t
    .expect(costsSectionForAnaesthetists.exists).ok('Should display Costs details section')
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

  H.StepDescription('Time base units')
  await t
    .expect(timeBaseUnitsCost.exists).ok()
    .expect(timeBaseUnitsTime.exists).ok()
    .expect(timeBaseUnitsTimeMinus.exists).ok()
    .expect(timeBaseUnitsTimePlus.exists).ok()
    .click(timeBaseUnitsTimePlus)
    .click(timeBaseUnitsTimePlus)
    .expect(timeBaseUnitsTime.value).eql('30')
    .click(timeBaseUnitsTimeMinus)
    .expect(timeBaseUnitsTime.value).eql('15')

  H.StepDescription('Time units')
  await t
    .expect(timeUnitsCost.exists).ok()
    .expect(timeUnitsTime.exists).ok()
    .expect(timeUnitsTimeMinus.exists).ok()
    .expect(timeUnitsTimePlus.exists).ok()
    .click(timeUnitsTimePlus)
    .click(timeUnitsTimePlus)
    .expect(timeUnitsTime.value).eql('30')
    .click(timeUnitsTimeMinus)
    .expect(timeUnitsTime.value).eql('15')

  H.StepDescription('Modifying units')
  await t
    .expect(modifyingUnitsCost.exists).ok()
    .expect(modifyingUnitsTime.exists).ok()
    .expect(modifyingUnitsTimeMinus.exists).ok()
    .expect(modifyingUnitsTimePlus.exists).ok()
    .click(modifyingUnitsTimePlus)
    .click(modifyingUnitsTimePlus)
    .expect(modifyingUnitsTime.value).eql('30')
    .click(modifyingUnitsTimeMinus)
    .expect(modifyingUnitsTime.value).eql('15')
})

/**
 * Local helper to quickly login and verify pre-approval
 *
 * @param {object} t TestCafe test controller
 */
const defaultLoginSteps = async function (t) {
  H.StepDescription('has logged in')
  await H.login('three-providers-all-user@example.org', '3-Providers')
  const chosenProviderName = await H.chooseProvider(0) // assume this is an Anaesthetist
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
