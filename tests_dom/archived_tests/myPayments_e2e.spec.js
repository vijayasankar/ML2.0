import { Selector } from 'testcafe'
import Helpers from '../test_utils/helpers'
import config from '../test_utils/config'

const H = new Helpers()
// entry points
const currentProviderName = Selector('h1.home-heading')
const paymentLink = Selector('[href="/providerportal/payments"]')
const paymentHeading = Selector('.payments-heading')
const paymentSubHeading = Selector('h2.payments-subheading')
const paymentTableView = Selector('.rt-table')
const tableHeaders = Selector('.rt-tr')
const tableContent = Selector('.rt-tbody')
const name = Selector('.is-name')
const nameAscOrder = Selector('.is-name.rt-resizable-header.-sort-asc.-cursor-pointer.rt-th')
const nameDescOrder = Selector('.is-name.rt-resizable-header.-sort-desc.-cursor-pointer.rt-th')
const submitted = Selector('.is-submitted')
const submittedAscOrder = Selector('.is-submitted.rt-resizable-header.-sort-asc.-cursor-pointer.rt-th')
const submittedDescOrder = Selector('.is-submitted.rt-resizable-header.-sort-desc.-cursor-pointer.rt-th')
const datePaid = Selector('.is-date-paid')
const datePaidAscOrder = Selector('.is-date-paid.rt-resizable-header.-sort-asc.-cursor-pointer.rt-th')
const datePaidDescOrder = Selector('.is-date-paid.rt-resizable-header.-sort-desc.-cursor-pointer.rt-th')
const status = Selector('.is-status')
const statusAscOrder = Selector('.is-status.rt-resizable-header.-sort-asc.-cursor-pointer.rt-th')
const statusDescOrder = Selector('.is-status.rt-resizable-header.-sort-desc.-cursor-pointer.rt-th')
const preApprovalNumber = Selector('.is-pre-approval-number')
const preApprovalNumberAscOrder = Selector('.is-pre-approval-number.rt-resizable-header.-sort-asc.-cursor-pointer.rt-th')
const preApprovalNumberDescOrder = Selector('.is-pre-approval-number.rt-resizable-header.-sort-desc.-cursor-pointer.rt-th')
const payment = Selector('.is-payment')
const paymentAscOrder = Selector('.is-payment.rt-resizable-header.-sort-asc.-cursor-pointer.rt-th')
const paymentDescOrder = Selector('.is-payment.rt-resizable-header.-sort-desc.-cursor-pointer.rt-th')
const viewMore = Selector('.is-view-more')
// TODO Click Preapproval link
// TODO Submit a payment and check it here
fixture `***** Provider portal My Payments page tests`
  .page(config.domTestRootUrl)

test('My Payments', async t => {
  H.BeginTest('My Payments')
  H.StepDescription('has logged in as Specialist')
  await H.login('specialist-user@example.org', '1-Provider')
  await t.expect(currentProviderName.exists).ok()

  H.StepDescription('Navigates to My payments page')
  await t
      .expect(paymentLink.exists).ok()
      .click(paymentLink)

  H.StepDescription('Checking - The number of default rows')
  await t
      .expect(tableContent.childElementCount).eql(50, 'There should be 50 rows as default view')

  H.StepDescription('Checking -  The content of the My payments page')
  await t
      .expect(paymentHeading.exists).ok()
      .expect(paymentSubHeading.exists).ok()
      .expect(paymentTableView.exists).ok()
      .expect(tableHeaders.exists).ok()
      .expect(name.exists).ok()
      .expect(submitted.exists).ok()
      .expect(datePaid.exists).ok()
      .expect(status.exists).ok()
      .expect(preApprovalNumber.exists).ok()
      .expect(payment.exists).ok()
      .expect(viewMore.exists).ok()

  H.StepDescription('Checking - Sort by Name')
  await t
      .expect(nameAscOrder.exists).notOk()
      .click(name)
      .expect(nameAscOrder.exists).ok()
      .expect(nameDescOrder.exists).notOk()
      .click(name)
      .expect(nameDescOrder.exists).ok()
      .expect(nameAscOrder.exists).notOk()

  H.StepDescription('Checking - Sort by Submitted date')
  await t
      .expect(submittedAscOrder.exists).notOk()
      .click(submitted)
      .expect(submittedAscOrder.exists).ok()
      .expect(submittedDescOrder.exists).notOk()
      .click(submitted)
      .expect(submittedDescOrder.exists).ok()
      .expect(submittedAscOrder.exists).notOk()

  H.StepDescription('Checking - Sort by Paid date')
  await t
      .expect(datePaidAscOrder.exists).notOk()
      .click(datePaid)
      .expect(datePaidAscOrder.exists).ok()
      .expect(datePaidDescOrder.exists).notOk()
      .click(datePaid)
      .expect(datePaidDescOrder.exists).ok()
      .expect(datePaidAscOrder.exists).notOk()

  H.StepDescription('Checking - Sort by Status')
  await t
      .expect(statusAscOrder.exists).notOk()
      .click(status)
      .expect(statusAscOrder.exists).ok()
      .expect(statusDescOrder.exists).notOk()
      .click(status)
      .expect(statusDescOrder.exists).ok()
      .expect(statusAscOrder.exists).notOk()

  H.StepDescription('Checking - Sort by Pre-approval number')
  await t
      .expect(preApprovalNumberAscOrder.exists).notOk()
      .click(preApprovalNumber)
      .expect(preApprovalNumberAscOrder.exists).ok()
      .expect(preApprovalNumberDescOrder.exists).notOk()
      .click(preApprovalNumber)
      .expect(preApprovalNumberDescOrder.exists).ok()
      .expect(preApprovalNumberAscOrder.exists).notOk()

  H.StepDescription('Checking - Sort by Payment')
  await t
      .expect(paymentAscOrder.exists).notOk()
      .click(payment)
      .expect(paymentAscOrder.exists).ok()
      .expect(paymentDescOrder.exists).notOk()
      .click(payment)
      .expect(paymentDescOrder.exists).ok()
      .expect(paymentAscOrder.exists).notOk()

  H.StepDescription('Checking - View More')
  await t
      .expect(tableContent.childElementCount).eql(50, 'There should be 50 rows as default view')
      .click(viewMore)
      .expect(tableContent.childElementCount).eql(100, 'There should be 100 records')
      .click(viewMore)
      .expect(tableContent.childElementCount).eql(150, 'There should be 150 records. ')
})
