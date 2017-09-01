import { ClientFunction, Selector, t } from 'testcafe'

export default class Helpers {
  constructor () {
    this.steps = 0
  }

  BeginTest (s) {
    this.steps = 0
    console.info('*** ' + s)
  }

  StepDescription (s) {
    this.steps++
    console.info(this.steps + ' ' + s)
  }

  async login (usr, pwd) {
    await this.putText('.form-control.conjoint-first', usr)
    await this.putText('.form-control.conjoint-last', pwd)
    await t.click('button.btn.btn-default')
  }

  async logout() {
    await t
      .click('.header-logout-link.btn.btn-default')
      .click('.btn.btn-default')

  }

  async verifyPolicyByNumberAndDob (policyNumber, dob) {
    await t.click('input[name=policyId]')
    await this.putText('input[name=policyId]', policyNumber)
    await t
      .typeText('input#rw_1_input', dob) // cannot use H.putText
      .click('.request-pre-approval__verify-policy button.is-verify-policy')
  }

  async verifyPolicyByNameAndDob (dob, firstName, lastName) {
    await t
      .typeText('input#rw_1_input', dob)
      .typeText('input[name=firstName]', firstName)
      .typeText('input[name=lastName]', lastName)
      .click('.request-pre-approval__verify-policy button.is-verify-policy')
    }

  async verifyPolicyMultipleMatching (policyNumber, dob) {
    await t.click('input[name=policyId]')
    await this.putText('input[name=policyId]', policyNumber)
    await t
      .typeText('input#rw_1_input', dob)
      .click('.request-pre-approval__verify-policy button.is-verify-policy')
  }

  async verifyPreApproval (preApprovalNumber, dob) {
    await t.click('input[name=preApprovalNumber]')
    await this.putText('input[name=preApprovalNumber]', preApprovalNumber)
    await t
      .typeText('div.request-payment__pre-approval-field-wrapper.is-dob input', dob) // cannot use H.putText
      .click('.request-payment__pre-approval-form-trigger.is-verify-pre-approval')
  }

  /**
   * Type in a typeahead field and select a search result
   *
   * @param {string} selector
   * @param {string} searchStr search string to enter
   * @param {number} idx index of the drop down, starting from 0, assuming there is search result
   */
  async enterTypeahead (selector, searchStr, idx) {
    const field = Selector(selector)
    await t
      .expect(field.exists).ok()
      .typeText(field, searchStr)

    const dropdown = await field.parent().sibling('ul')
    await t.expect(dropdown.tagName).eql('ul', 'the dropdown should exist as <ul>')

    const option = await dropdown.child(idx)
    await t.expect(option.tagName).eql('li', 'the option should exist as <li>')

    const text = await option.find('span').innerText
    await t
      .click(option.child('a'))
      .expect(field.value).eql(text)
  }

  /**
   * Enter an entire string at once. For plain text fields only.
   * Not suitable for complex fields such as datepickers, typeaheads - use t.typeText()
   *
   * @param {String} selector
   * @param {String} text text to enter
   */
  async putText (selector, text) {
    const field = Selector(selector)
    await field()
    await ClientFunction(() => { field().value = text }, {
      dependencies: { field, text }
    })()
  }

  /**
   * Select a provider from the dropdown.
   *
   * @param {number} idx index of the drop down, starting from 0
   * @returns {string} Name of provider
   */
  async chooseProvider (idx) {
    const loadingModal = Selector('.modal__loading')
    await t.expect(loadingModal.exists).notOk()
    const providerSelect = Selector('select.header-provider-select')
    await t.click(providerSelect)
    const option = await providerSelect.child('option').nth(idx)
    await t.click(option)
    return await option.innerText
  }

  async chooseSecurityQuestion (idx) {
    const newSecurityQuestion = Selector('#securityQuestion')
    await t.click(newSecurityQuestion)
    const option = await newSecurityQuestion.child('option').nth(idx)
    await t.click(option)
    return await option.innerText
  }
 async makeEmail() {
    var strValues = "abcdefg12345";
    var strEmail = "";
    var strTmp;
    for (var i = 0; i < 10; i++) {
        strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + strTmp;
        }
        strTmp = "";
        strEmail = strEmail + "@";
    for (var j = 0; j < 8; j++) {
        strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
        strEmail = strEmail + strTmp;
        }
        strEmail = strEmail + ".com"
    return strEmail;

}

async userLogin(email, password)
{
 await t.click('input[id="nav-menu-account--link"]')
 await t
    .click('.login')
    .typeText('input[id="email"]', email)
    .typeText('input[id="password"]', password)
    .click('.button.primay.block')
}

async makeFavName() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
   }   }
