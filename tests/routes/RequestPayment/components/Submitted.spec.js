import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import RequestPaymentSubmitted from 'routes/RequestPayment/components/Submitted'

const spyHandleFormReset = sinon.spy(RequestPaymentSubmitted.prototype, 'handleFormReset')
const spyFormReset = sinon.spy()

describe('(Component) Submitted - shallow', () => {
  let wrapper
  let props

  beforeEach(() => {
    props = {
      cssName: '',
      formReset: spyFormReset
    }
    wrapper = shallow(<RequestPaymentSubmitted {...props} />)
  })

  afterEach(() => {
    spyHandleFormReset.reset()
    spyFormReset.reset()
  })

  it('renders something', () => {
    expect(wrapper).to.exist
  })

  it('has handleFormReset binded', () => {
    expect(wrapper.instance().handleFormReset).to.exist
  })

  it('renders a button', () => {
    expect(wrapper.find('Button')).to.have.length(1)
  })

  // todo: is this in Request a Pre-approval? - by Bobby
  it('renders a link', () => {
    expect(wrapper.find('Link')).to.have.length(1)
  })

  it('clicking a button triggers handleFormReset', () => {
    expect(spyHandleFormReset.callCount).to.equal(0)
    wrapper.find('Button').simulate('click')
    expect(spyHandleFormReset.callCount).to.equal(1)
  })

  it('clicking a button also triggers formReset props', () => {
    expect(spyFormReset.callCount).to.equal(0)
    wrapper.find('Button').simulate('click')
    expect(spyFormReset.callCount).to.equal(1)
  })
})
