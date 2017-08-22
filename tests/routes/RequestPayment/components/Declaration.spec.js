import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { RequestPaymentDeclaration } from 'routes/RequestPayment/components/Declaration'

describe('(Component) Declaration - shallow', () => {
  let wrapper
  let props

  beforeEach(() => {
    props = {
      cssName: 'request-payment__declaration'
    }
    wrapper = shallow(<RequestPaymentDeclaration {...props} />)
  })

  it('renders correct title', () => {
    expect(wrapper.find('h3').text()).to.equal('Declaration')
  })

  it('renders a section for declaration texts', () => {
    expect(wrapper.find(`div.${props.cssName}-text`)).to.have.length(1)
    expect(wrapper.find('p')).to.have.length(3)
  })

  it('renders two unique links', () => {
    expect(wrapper.find(`a.${props.cssName}-link`).get(0).props.href).to.equal('https://www.nibfirstchoice.co.nz/terms-and-conditions')
    expect(wrapper.find(`a.${props.cssName}-link`).get(1).props.href).to.equal('https://www.nibfirstchoice.co.nz/privacy-policy')
  })

  it('renders DeclarationField', () => {
    expect(wrapper.find('DeclarationField')).to.have.length(1)
  })
})
