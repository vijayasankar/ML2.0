import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import CurrentUser from 'routes/UserManagement/components/CurrentUser'

describe('(Component) UserManagement/CurrentUser - shallow', () => {
  let props
  let wrapper

  beforeEach(() => {
    props = {
      cssName: '',
      email: '',
      name: ''
    }
    wrapper = shallow(<CurrentUser {...props} />)
  })

  it('successfully shallowed', () => {
    expect(wrapper).to.exist
  })

  it('renders with prop className', () => {
    wrapper.setProps({ cssName: 'aaa' })
    expect(wrapper.find('.aaa')).to.have.length(1)
    expect(wrapper.find('.aaa-form-title')).to.have.length(1)
    expect(wrapper.find('.aaa-valid-title.is-name')).to.have.length(1)
    expect(wrapper.find('.aaa-valid-text.is-name')).to.have.length(1)
    expect(wrapper.find('.aaa-valid-title.is-email')).to.have.length(1)
    expect(wrapper.find('.aaa-valid-text.is-email')).to.have.length(1)
    wrapper.setProps({ cssName: 'bbb' })
    expect(wrapper.find('.aaa')).to.have.length(0)
    expect(wrapper.find('.aaa-form-title')).to.have.length(0)
    expect(wrapper.find('.aaa-valid-title.is-name')).to.have.length(0)
    expect(wrapper.find('.aaa-valid-text.is-name')).to.have.length(0)
    expect(wrapper.find('.aaa-valid-title.is-email')).to.have.length(0)
    expect(wrapper.find('.aaa-valid-text.is-email')).to.have.length(0)
    expect(wrapper.find('.bbb')).to.have.length(1)
    expect(wrapper.find('.bbb-form-title')).to.have.length(1)
    expect(wrapper.find('.bbb-valid-title.is-name')).to.have.length(1)
    expect(wrapper.find('.bbb-valid-text.is-name')).to.have.length(1)
    expect(wrapper.find('.bbb-valid-title.is-email')).to.have.length(1)
    expect(wrapper.find('.bbb-valid-text.is-email')).to.have.length(1)
  })

  it('renders correct title', () => {
    expect(wrapper.find('h3').text()).to.equal('Current user')
  })

  it('renders props name', () => {
    wrapper.setProps({ cssName: 'aaa' })
    expect(wrapper.find('.aaa-valid-text.is-name').text()).to.equal('')
    wrapper.setProps({ name: 'abc def' })
    expect(wrapper.find('.aaa-valid-text.is-name').text()).to.equal('abc def')
  })

  it('renders props email', () => {
    wrapper.setProps({ cssName: 'aaa' })
    expect(wrapper.find('.aaa-valid-text.is-email').text()).to.equal('')
    wrapper.setProps({ email: 'abc' })
    expect(wrapper.find('.aaa-valid-text.is-email').text()).to.equal('abc')
  })
})
