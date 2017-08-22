import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'

import ReduxFormStub from '../../../ReduxFormStub'
import ComponentReduxForm, { UserManagement } from 'routes/UserManagement/components/index'
import * as request from 'utils/request'

const sandbox = sinon.sandbox.create()

describe('(View) UserManagement - instantiate', () => {
  let component
  let props

  beforeEach(() => {
    props = {
      change: () => {},
      createUserManagementRegisteredUser: () => {},
      cssName: '',
      currentProviderLinks: [],
      currentProviderName: '',
      formSubmit: () => {},
      formSubmitError: () => {},
      formSubmitSuccess: () => {},
      handleSubmit: () => {},
      listOfInvitedUsers: [],
      listOfUsers: [],
      loadUserManagementRegisteredUsersList: () => {},
      reset: () => {},
      submitting: undefined,
      token: ''
    }

    component = new UserManagement(props)
  })

  it('validates required form values', () => {
    const values = {}
    expect(component.validateFormValues(values)).to.deep.equal({
      firstName: 'Please enter first name.',
      lastName: 'Please enter last name.',
      phoneNumber: 'Please enter phone number.',
      email: 'Please enter email.'
    })
  })

  it('validates required form value - firstName', () => {
    const values = {
      firstName: 'name'
    }
    expect(component.validateFormValues(values)).to.deep.equal({
      lastName: 'Please enter last name.',
      phoneNumber: 'Please enter phone number.',
      email: 'Please enter email.'
    })
  })

  it('validates required form value - lastName', () => {
    const values = {
      lastName: 'name'
    }
    expect(component.validateFormValues(values)).to.deep.equal({
      firstName: 'Please enter first name.',
      phoneNumber: 'Please enter phone number.',
      email: 'Please enter email.'
    })
  })

  it('validates required form value - phoneNumber', () => {
    const values = {
      phoneNumber: '123'
    }
    expect(component.validateFormValues(values)).to.deep.equal({
      firstName: 'Please enter first name.',
      lastName: 'Please enter last name.',
      email: 'Please enter email.'
    })
  })

  it('validates required form value - email', () => {
    const values = {
      email: '@'
    }
    expect(component.validateFormValues(values)).to.deep.equal({
      firstName: 'Please enter first name.',
      lastName: 'Please enter last name.',
      phoneNumber: 'Please enter phone number.',
    })
  })
})

describe('(View) UserManagement - shallow', () => {
  let wrapper
  let props
  let stub

  const spyChange = sinon.spy()
  const spyCreateUserManagementResigeredUser = sinon.spy()
  const spyFormSubmit = sinon.spy()
  const spyFormSubmitError = sinon.spy()
  const spyFormSubmitSuccess = sinon.spy()
  const spyHandleSubmit = sinon.spy()
  const spyLoadUserManagementRegisteredUsersList = sinon.spy()
  const spyReset = sinon.spy()
  const spySubmit = sinon.spy(UserManagement.prototype, 'formSubmit')
  const spyValidateFormValues = sinon.spy(UserManagement.prototype, 'validateFormValues')

  beforeEach(() => {
    stub = sandbox.stub(request, 'default')
    props = {
      change: spyChange,
      createUserManagementRegisteredUser: spyCreateUserManagementResigeredUser,
      cssName: '',
      currentProviderLinks: [],
      currentProviderName: '',
      formSubmit: spyFormSubmit,
      formSubmitError: spyFormSubmitError,
      formSubmitSuccess: spyFormSubmitSuccess,
      handleSubmit: spyHandleSubmit,
      listOfInvitedUsers: [],
      listOfUsers: [],
      loadUserManagementRegisteredUsersList: spyLoadUserManagementRegisteredUsersList,
      reset: spyReset,
      submitting: undefined,
      token: ''
    }

    wrapper = shallow(<UserManagement {...props} />)
  })

  afterEach(() => {
    spyChange.reset()
    spyCreateUserManagementResigeredUser.reset()
    spyFormSubmit.reset()
    spyFormSubmitError.reset()
    spyFormSubmitSuccess.reset()
    spyHandleSubmit.reset()
    spyLoadUserManagementRegisteredUsersList.reset()
    spyReset.reset()
    spySubmit.reset()
    spyValidateFormValues.reset()
    sandbox.restore()
  })

  it('should render', () => {
    expect(wrapper).to.exist
  })

  it('renders section', () => {
    expect(wrapper.find(`section.${props.cssName}-wrapper`)).to.have.length(1)
  })

  it('renders title', () => {
    expect(wrapper.find('h1').text()).to.equal('User management')
  })

  it('renders sub title correctly', () => {
    wrapper.setProps({
      currentProviderName: 'current'
    })
    expect(wrapper.find('h2').text()).to.equal('current')
  })

  it('renders single CurrentUser component', () => {
    expect(wrapper.find('CurrentUser')).to.have.length(1)
  })

  it('renders single RegisteredUsers component', () => {
    expect(wrapper.find({ cssName: `${props.cssName}__registered-users` })).to.have.length(1)
  })

  it('renders 4 unique TextFields', () => {
    expect(wrapper.find('TextField').get(0).props.fieldName).to.equal('firstName')
    expect(wrapper.find('TextField').get(1).props.fieldName).to.equal('lastName')
    expect(wrapper.find('TextField').get(2).props.fieldName).to.equal('phoneNumber')
    expect(wrapper.find('TextField').get(3).props.fieldName).to.equal('email')
    expect(wrapper.find('TextField')).to.have.length(4)
  })

  it('renders a single button', () => {
    expect(wrapper.find('Button')).to.have.length(1)
  })

  it('formSubmit triggers validateFormValues', () => {
    expect(spySubmit.callCount).to.equal(0)
    expect(spyValidateFormValues.callCount).to.equal(0)
    wrapper.instance().formSubmit({ firstName: 'first', lastName: 'last', phoneNumber: '1', email: '@' })
    expect(spySubmit.callCount).to.equal(1)
    expect(spyValidateFormValues.callCount).to.equal(1)
  })

  it('formSubmit throws error', () => {
    expect(() => wrapper.instance().formSubmit()).to.throw()
  })

  it('formSubmit triggers formSubmit', () => {
    wrapper.setProps({ currentProviderLinks: [{ rel: 'add-provider-user', url: 'http://www.google.com' }] })
    expect(spyFormSubmit.callCount).to.equal(0)
    wrapper.instance().formSubmit({ firstName: 'first', lastName: 'last', phoneNumber: '1', email: '@' })
    expect(spyFormSubmit.callCount).to.equal(1)
  })

  it('formSubmit triggers formSubmitSuccess', () => {
    wrapper.setProps({ currentProviderLinks: [{ rel: 'add-provider-user', url: 'http://www.google.com' }] })
    expect(spyFormSubmit.callCount).to.equal(0)
    expect(spyFormSubmitSuccess.callCount).to.equal(0)
    stub.resolves({ data: { persons: [1, 2, 3] } })().then((value) => {
      expect(spyFormSubmitSuccess.callCount).to.equal(1)
    })
    wrapper.instance().formSubmit({ firstName: 'first', lastName: 'last', phoneNumber: '1', email: '@' })
    expect(spyFormSubmit.callCount).to.equal(1)
  })

  it('formSubmit triggers reset', () => {
    wrapper.setProps({ currentProviderLinks: [{ rel: 'add-provider-user', url: 'http://www.google.com' }] })
    expect(spyFormSubmit.callCount).to.equal(0)
    expect(spyReset.callCount).to.equal(0)
    stub.resolves({ data: { persons: [1, 2, 3] } })().then((value) => {
      expect(spyReset.callCount).to.equal(1)
    })
    wrapper.instance().formSubmit({ firstName: 'first', lastName: 'last', phoneNumber: '1', email: '@' })
    expect(spyFormSubmit.callCount).to.equal(1)
  })

  it('formSubmit triggers loadUserManagementRegisteredUsersList', () => {
    wrapper.setProps({ currentProviderLinks: [{ rel: 'add-provider-user', url: 'http://www.google.com' }] })
    expect(spyFormSubmit.callCount).to.equal(0)
    expect(spyLoadUserManagementRegisteredUsersList.callCount).to.equal(0)
    stub.resolves({ data: { persons: [1, 2, 3] } })().then((value) => {
      expect(spyLoadUserManagementRegisteredUsersList.callCount).to.equal(1)
    })
    wrapper.instance().formSubmit({ firstName: 'first', lastName: 'last', phoneNumber: '1', email: '@' })
    expect(spyFormSubmit.callCount).to.equal(1)
  })
})

describe('(View) UserManagement - mount', () => {
  let props

  beforeEach(() => {
    props = {
      change: () => {},
      createUserManagementRegisteredUser: () => {},
      cssName: '',
      currentProviderLinks: [],
      currentProviderName: '',
      formSubmit: () => {},
      formSubmitError: () => {},
      formSubmitSuccess: () => {},
      handleSubmit: () => {},
      listOfInvitedUsers: [],
      listOfUsers: [],
      loadUserManagementRegisteredUsersList: () => {},
      reset: () => {},
      submitting: undefined,
      token: ''
    }
  })

  it('componentDidMount gets called upon mount', () => {
    const spyComponentDidMount = sinon.spy(UserManagement.prototype, 'componentDidMount')
    expect(spyComponentDidMount.callCount).to.equal(0)
    mount(<ReduxFormStub><ComponentReduxForm {...props} /></ReduxFormStub>)
    expect(spyComponentDidMount.callCount).to.equal(1)
  })
})
