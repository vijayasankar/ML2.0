import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import RequestPaymentSubmitted from 'routes/RequestPreApproval/components/Submitted'

describe('(Component) Submitted - shallow', () => {
  let wrapper
  let props

  beforeEach(() => {
    props = {
      cssName: '',
      formReset: () => {}
    }
    wrapper = shallow(<RequestPaymentSubmitted {...props} />)
  })

  const spyHandleFormReset = sinon.spy(RequestPaymentSubmitted.prototype, 'handleFormReset')

  it('renders something', () => {
    expect(wrapper).to.exist
  })

  it('renders a button', () => {
    expect(wrapper.find('Button')).to.have.length(1)
  })

  it('renders a link', () => {
    expect(wrapper.find('Link')).to.have.length(1)
  })

  it('link has a property "to" directing to home', () => {
    expect(wrapper.find('Link').find({ to: '/providerportal/' })).to.have.length(1)
  })

  it('clicking a button triggers handleFormReset', () => {
    expect(spyHandleFormReset.callCount).to.equal(0)
    wrapper.find('Button').simulate('click')
    expect(spyHandleFormReset.callCount).to.equal(1)
  })

  it('clicking a button also triggers formReset props', () => {
    const spyFormReset = sinon.spy(RequestPaymentSubmitted.prototype.formReset)
    wrapper.setProps({ formReset: spyFormReset })
    expect(spyFormReset.callCount).to.equal(0)
    wrapper.find('Button').simulate('click')
    expect(spyFormReset.callCount).to.equal(1)
  })
})
