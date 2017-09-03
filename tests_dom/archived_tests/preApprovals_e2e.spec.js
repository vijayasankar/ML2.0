import { Selector } from 'testcafe'
import Helpers from '../test_utils/helpers'
import config from '../test_utils/config'

const H = new Helpers()
// entry points
const currentProviderName = Selector('h1.home-heading')
const preApprovalLink = Selector('[href="/providerportal/pre-approvals"]')
const preApprovalHeading = Selector('.pre-approvals-heading')
const preApprovalSubHeading = Selector('h2.pre-approvals-subheading')
const preApprovalTableView = Selector('.rt-table')
const tableHeaders = Selector('.rt-tr')
const tableContent = Selector('.rt-tbody')
const name = Selector('.is-name')
const nameAscOrder = Selector('.is-name.rt-resizable-header.-sort-asc.-cursor-pointer.rt-th')
const nameDescOrder = Selector('.is-name.rt-resizable-header.-sort-desc.-cursor-pointer.rt-th')
const submitted = Selector('.is-submitted')
const submittedAscOrder = Selector('.is-submitted.rt-resizable-header.-sort-asc.-cursor-pointer.rt-th')
const submittedDescOrder = Selector('.is-submitted.rt-resizable-header.-sort-desc.-cursor-pointer.rt-th')
const proposedDate = Selector('.is-proposed-date')
const proposedDateAscOrder = Selector('.is-proposed-date.rt-resizable-header.-sort-asc.-cursor-pointer.rt-th')
const proposedDateDescOrder = Selector('.is-proposed-date.rt-resizable-header.-sort-desc.-cursor-pointer.rt-th')
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
// TODO Click Request Payment

fixture `***** Provider portal My Pre-approval page tests`
  .page(config.domTestRootUrl)

test('My Pre-approvals', async t => {
  H.BeginTest('My Pre-approvals')
  H.StepDescription('has logged in as Specialist')
  await H.login('specialist-user@example.org', '1-Provider')
  await t.expect(currentProviderName.exists).ok()

  H.StepDescription('Navigates to My Pre-approvals page')
  await t
      .expect(preApprovalLink.exists).ok()
      .click(preApprovalLink)

  H.StepDescription('Checking - The number of default rows')
  await t
      .expect(tableContent.childElementCount).eql(50, 'There should be 50 rows as default view')

  H.StepDescription('Checking -  The content of the My pre-approval page')
  await t
      .expect(preApprovalHeading.exists).ok()
      .expect(preApprovalSubHeading.exists).ok()
      .expect(preApprovalTableView.exists).ok()
      .expect(tableHeaders.exists).ok()
      .expect(name.exists).ok()
      .expect(submitted.exists).ok()
      .expect(proposedDate.exists).ok()
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

  H.StepDescription('Checking - Sort by Proposed date')
  await t
      .expect(proposedDateAscOrder.exists).notOk()
      .click(proposedDate)
      .expect(proposedDateAscOrder.exists).ok()
      .expect(proposedDateDescOrder.exists).notOk()
      .click(proposedDate)
      .expect(proposedDateDescOrder.exists).ok()
      .expect(proposedDateAscOrder.exists).notOk()

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
