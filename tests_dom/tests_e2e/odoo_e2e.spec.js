import { Selector } from 'testcafe'
import Helpers from '../test_utils/helpers'
import config from '../test_utils/config'

const H = new Helpers()
// entry points
//Odoo LandingPage components - Before login
const signIn = Selector('[href="/web/login"]')
const email = Selector('#login')
const password = Selector('#password')
const loginSubmit = Selector('.btn.btn-primary')
//Dashboard
const applicationDashboard = Selector('.o_apps')
const userMenu = Selector('.o_user_menu')
const logout = Selector('.dropdown-menu').withText('Log out\n')
//Dashboard
const purchasesIcon = Selector('.o_caption').withText('Purchases')
//Quotation
const createQuotation = Selector('.o_list_button_add')
const backToQuotationsSummaryPage = Selector('o_back_button')
const saveQuotation = Selector('.o_form_button_save')
const cancelQuotation = Selector('.o_form_button_cancel')
const vendorDropdown = Selector('#o_field_input_4')
const addItem = Selector('[href="#"]').withText('Add an item')
const productSection = Selector('.o_list_editable.o-editing')
const product = Selector('.o_form_input_dropdown').nth(6)
const confirmOrder = Selector('.o_statusbar_buttons').child(2)
const shipment = Selector('.o_stat_text').withText('Shipment')
const invoices = Selector('.o_stat_text').withText('Invoices')
const validateQuotation = Selector('.o_statusbar_buttons').child(4)
const validateInvoice = Selector('.o_statusbar_buttons').child(0)
const applyImmediateTransfer = Selector('body > div.modal.in > div > div > div.modal-footer > div > footer > button.btn.btn-sm.btn-primary')
const purchaseOrderNumber = Selector('.o_back_button')
const newQuotationNavigationHeader = Selector('.breadcrumb').child(1)
const newQuotationFormHeader = Selector('.o_form_field.o_form_required')
const vendorDetails = Selector('.o_group')
const productDetails = Selector('.o_notebook')
const subTotalSection = Selector('.oe_subtotal_footer')
const productQuantity = Selector('.o_form_field_number').nth(0)
const unitPrice = Selector('.o_form_input.o_form_field.o_form_required.o_form_field_number').nth(1)


fixture `***** Odoo - Smoke tests *****`
  .page (config.odooUrl)
  .beforeEach( async t => {
    H.StepDescription('should go to home page')
    H.StepDescription('should navigate to login page')
    await t
        .click(signIn)
    H.StepDescription('should login with valid credentials')
    await t
        .expect(email.exists).ok()
        .expect(password.exists).ok()
        .expect(loginSubmit.exists).ok()
        .typeText(email, config.odooUser)
        .typeText(password, config.odooPassword)
        .click(loginSubmit)
        .wait(5000)
        .expect(applicationDashboard.exists).ok()
        .expect(userMenu.exists).ok()
  })
  .afterEach(async t => {
    H.StepDescription('User logs out')
    await t
      .click(userMenu)
      .expect(logout.exists).ok()
      .pressKey('tab down down down down down down enter')
      .expect(userMenu.exists).notOk()
    })

test('Create purchase order ', async t => {
  H.StepDescription('should go to purchases home page')
  await t
      .click(purchasesIcon)
  H.StepDescription('should create new quotation')
  const subTotalPrice = Selector('.o_readonly.o_list_number').nth(0)
  const untaxedAmount = Selector('.o_form_field_number').nth(5)
  const taxes = Selector('.o_form_field_number').nth(6)
  const totalAmount = Selector('.o_form_field_number').nth(7)
  await t
      .expect(createQuotation.exists).ok()
      .expect(saveQuotation.exists).notOk()
      .click(createQuotation)
      .click(vendorDropdown)
      .pressKey('enter')
      .click(addItem)
      .click(product)
      .typeText(product,'super')
      .wait(1000)
      .pressKey('down down enter')
      .expect(productQuantity.value).eql('1')
      .click(subTotalSection)
      .expect(unitPrice.exists).ok()
      .expect(unitPrice.value).eql('396.1900')
      .expect(subTotalPrice.exists).ok()
      .expect(subTotalPrice.innerText).eql('396.19')
      .expect(untaxedAmount.innerText).eql('$396.19')
      .expect(taxes.innerText).eql('$59.43')
      .expect(totalAmount.innerText).eql('$455.62')
      .click(saveQuotation)
      .wait(3000)
  H.StepDescription('should confirm the order')
  await t
      .click(confirmOrder)
      .wait(3000)
      .expect(shipment.exists).ok()
  H.StepDescription('should validate the quotation')
  await t
      .click(shipment)
      .wait(3000)
      .click(validateQuotation)
      .click(applyImmediateTransfer)
  H.StepDescription('should validate the invoice')
  await t
      .click(purchaseOrderNumber)
      .click(invoices)
      .click(validateInvoice)
})
