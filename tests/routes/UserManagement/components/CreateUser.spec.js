import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'

import ReduxFormStub from '../../../ReduxFormStub'
import CreateUserReduxForm, { CreateUser } from 'routes/UserManagement/components/CreateUser'

describe('(Component) RequestPreApproval/ProcedureCost - shallow', () => {
  let props
  let wrapper

  const spyChange = sinon.spy()
  const spyHandleSubmit = sinon.spy()

  beforeEach(() => {
    props = {
      change: spyChange,
      cssName: '',
      handleSubmit: spyHandleSubmit,
      submitting: false
    }
    wrapper = shallow(<CreateUser {...props} />)
  })

  afterEach(() => {
    spyChange.reset()
    spyHandleSubmit.reset()
    // wrapper.instance().handleClick.reset()
  })

  it('renders correct title', () => {
    expect(wrapper.find('h3').text()).to.equal('Create user')
  })

  it('renders 4 unique TextField on initial render', () => {
    expect(wrapper.find('TextField')).to.have.length(4)

    expect(wrapper.find('TextField').get(0).props.fieldName).to.equal('firstName')
    expect(wrapper.find('TextField').get(0).props.name).to.equal('first-name')
    expect(wrapper.find('TextField').get(0).props.placeholderText).to.equal('First name')
    expect(wrapper.find('TextField').get(0).props.change).to.equal(props.change)
    expect(wrapper.find('TextField').get(0).props.cssName).to.equal(props.cssName)

    expect(wrapper.find('TextField').get(1).props.fieldName).to.equal('lastName')
    expect(wrapper.find('TextField').get(1).props.name).to.equal('last-name')
    expect(wrapper.find('TextField').get(1).props.placeholderText).to.equal('Last name')
    expect(wrapper.find('TextField').get(1).props.change).to.equal(props.change)
    expect(wrapper.find('TextField').get(1).props.cssName).to.equal(props.cssName)

    expect(wrapper.find('TextField').get(2).props.fieldName).to.equal('phoneNumber')
    expect(wrapper.find('TextField').get(2).props.name).to.equal('phone-number')
    expect(wrapper.find('TextField').get(2).props.placeholderText).to.equal('Phone number')
    expect(wrapper.find('TextField').get(2).props.change).to.equal(props.change)
    expect(wrapper.find('TextField').get(2).props.cssName).to.equal(props.cssName)

    expect(wrapper.find('TextField').get(3).props.fieldName).to.equal('email')
    expect(wrapper.find('TextField').get(3).props.name).to.equal('email')
    expect(wrapper.find('TextField').get(3).props.placeholderText).to.equal('Email')
    expect(wrapper.find('TextField').get(3).props.change).to.equal(props.change)
    expect(wrapper.find('TextField').get(3).props.cssName).to.equal(props.cssName)
  })

  it('renders a Button on initial render', () => {
    expect(wrapper.find('Button')).to.have.length(1)
    expect(wrapper.find('Button').get(0).props.className).to.equal(`${props.cssName}-trigger is-submit primary-btn`)
    expect(wrapper.find('Button').get(0).props.type).to.equal('submit')
  })

  it('renders a Button with prop className', () => {
    wrapper.setProps({ cssName: 'aaa' })
    expect(wrapper.find('Button').get(0).props.className).to.equal('aaa-trigger is-submit primary-btn')
    wrapper.setProps({ cssName: 'bbb' })
    expect(wrapper.find('Button').get(0).props.className).to.equal('bbb-trigger is-submit primary-btn')
  })

  it('renders a Button with prop disabled', () => {
    wrapper.setProps({ submitting: true })
    expect(wrapper.find('Button').get(0).props.disabled).to.equal(true)
    wrapper.setProps({ submitting: false })
    expect(wrapper.find('Button').get(0).props.disabled).to.equal(false)
  })
})
