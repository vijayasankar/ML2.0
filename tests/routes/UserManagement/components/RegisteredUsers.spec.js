import React from 'react'
import { expect } from 'chai'
import { render, shallow, mount } from 'enzyme'

import ReduxFormStub from '../../../ReduxFormStub'
import RegisteredUsersReduxForm, { RegisteredUsers } from 'routes/UserManagement/components/RegisteredUsers'

describe('(Component) UserManagement/RegisteredUsers - shallow', () => {
  let props
  let wrapper

  beforeEach(() => {
    props = {
      cssName: '',
      listOfInvitedUsers: [],
      listOfUsers: []
    }
    wrapper = shallow(<RegisteredUsers {...props} />)
  })

  it('successfully shallowed', () => {
    expect(wrapper).to.exist
  })

  it('has registeredUsersList as state', () => {
    expect(wrapper.state('registeredUsersList')).to.exist
    expect(wrapper.state('registeredUsersList')).to.deep.equal([])
  })

  it('calls componentWillReceiveProps', () => {
    const spyComponentWillReceiveProps = sinon.spy(RegisteredUsers.prototype, 'componentWillReceiveProps')
    expect(spyComponentWillReceiveProps.called).to.equal(false)
    wrapper.setProps({})
    expect(spyComponentWillReceiveProps.called).to.equal(true)
    wrapper.setProps({
      listOfUsers: [],
      listOfInvitedUsers: [ 'aaa', 'bbb' ]
    })
    expect(wrapper.state('registeredUsersList')).to.deep.equal(['aaa', 'bbb'])
    wrapper.setProps({
      listOfUsers: ['yyy', 'zzz'],
      listOfInvitedUsers: []
    })
    expect(wrapper.state('registeredUsersList')).to.deep.equal(['yyy', 'zzz'])
    wrapper.setProps({
      listOfUsers: ['yyy', 'zzz'],
      listOfInvitedUsers: ['aaa', 'bbb']
    })
    expect(wrapper.state('registeredUsersList')).to.deep.equal([
      'yyy',
      'zzz',
      'aaa',
      'bbb'
    ])
  })

  it('renders with prop className', () => {
    wrapper.setProps({ cssName: 'aaa' }).setState({registeredUsersList: ['abc']})
    expect(wrapper.find('.aaa-row').not('.is-user')).to.have.length(1)
    expect(wrapper.find('.aaa-row-heading.is-name')).to.have.length(1)
    expect(wrapper.find('.aaa-row-heading.is-email')).to.have.length(1)
    expect(wrapper.find('.aaa-row-heading.is-role')).to.have.length(1)
    expect(wrapper.find('.aaa-row.is-user')).to.have.length(1)
    expect(wrapper.find('.aaa-row-col.is-name')).to.have.length(1)
    expect(wrapper.find('.aaa-row-col.is-email')).to.have.length(1)
    expect(wrapper.find('.aaa-row-col.is-role')).to.have.length(1)
    wrapper.setProps({ cssName: 'bbb' }).setState({registeredUsersList: ['abc']})
    expect(wrapper.find('.aaa-row').not('.is-user')).to.have.length(0)
    expect(wrapper.find('.aaa-row-heading.is-name')).to.have.length(0)
    expect(wrapper.find('.aaa-row-heading.is-email')).to.have.length(0)
    expect(wrapper.find('.aaa-row-heading.is-role')).to.have.length(0)
    expect(wrapper.find('.aaa-row.is-user')).to.have.length(0)
    expect(wrapper.find('.aaa-row-col.is-name')).to.have.length(0)
    expect(wrapper.find('.aaa-row-col.is-email')).to.have.length(0)
    expect(wrapper.find('.aaa-row-col.is-role')).to.have.length(0)
    expect(wrapper.find('.bbb-row').not('.is-user')).to.have.length(1)
    expect(wrapper.find('.bbb-row-heading.is-name')).to.have.length(1)
    expect(wrapper.find('.bbb-row-heading.is-email')).to.have.length(1)
    expect(wrapper.find('.bbb-row-heading.is-role')).to.have.length(1)
    expect(wrapper.find('.bbb-row.is-user')).to.have.length(1)
    expect(wrapper.find('.bbb-row-col.is-name')).to.have.length(1)
    expect(wrapper.find('.bbb-row-col.is-email')).to.have.length(1)
    expect(wrapper.find('.bbb-row-col.is-role')).to.have.length(1)
  })

  it('renders correct title', () => {
    expect(wrapper.find('h3').text()).to.equal('Registered users')
  })

  it('renders 3 unique row-heading on initial render', () => {
    expect(wrapper.find(`.${props.cssName}-row`)).to.have.length(1)
    expect(wrapper.find(`.${props.cssName}-row-heading.is-name`)).to.have.length(1)
    expect(wrapper.find(`.${props.cssName}-row-heading.is-email`)).to.have.length(1)
    expect(wrapper.find(`.${props.cssName}-row-heading.is-role`)).to.have.length(1)
  })

  it('renders rows of user from state registeredUsersList', () => {
    wrapper.setProps({
      listOfUsers: [{
        firstName: 'a1',
        lastName: 'a2',
        email: 'a3',
        roleName: 'a4'
      }, {
        firstName: 'b1',
        lastName: 'b2',
        email: 'b3',
        roleName: 'b4'
      }],
      listOfInvitedUsers: [{
        firstName: 'c1',
        lastName: 'c2',
        email: 'c3',
        roleName: 'c4'
      }, {
        firstName: 'd1',
        lastName: 'd2',
        email: 'd3',
        roleName: 'd4'
      }]
    })
    expect(wrapper.find(`.${props.cssName}-row-col.is-name`)).to.have.length(4)
    expect(wrapper.find(`.${props.cssName}-row-col.is-email`)).to.have.length(4)
    expect(wrapper.find(`.${props.cssName}-row-col.is-role`)).to.have.length(4)

    expect(render(wrapper.find(`.${props.cssName}-row-col.is-name`).get(0)).text()).to.equal('a1 a2')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-email`).get(0)).text()).to.equal('a3')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-role`).get(0)).text()).to.equal('a4')

    expect(render(wrapper.find(`.${props.cssName}-row-col.is-name`).get(1)).text()).to.equal('b1 b2')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-email`).get(1)).text()).to.equal('b3')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-role`).get(1)).text()).to.equal('b4')

    expect(render(wrapper.find(`.${props.cssName}-row-col.is-name`).get(2)).text()).to.equal('c1 c2')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-email`).get(2)).text()).to.equal('c3')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-role`).get(2)).text()).to.equal('c4')

    expect(render(wrapper.find(`.${props.cssName}-row-col.is-name`).get(3)).text()).to.equal('d1 d2')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-email`).get(3)).text()).to.equal('d3')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-role`).get(3)).text()).to.equal('d4')
  })

  it('renders rows of user from state registeredUsersList with missing data', () => {
    wrapper.setProps({
      listOfUsers: [{
        lastName: 'lastName1',
      }, {
        firstName: 'firstName1',
      }, {
        email: 'email1',
      }, {
        roleName: 'role1'
      }, { }],
      listOfInvitedUsers: [{
        lastName: 'lastName2',
      }, {
        firstName: 'firstName2',
      }, {
        email: 'email2',
      }, {
        roleName: 'role2'
      }]
    })

    expect(wrapper.find(`.${props.cssName}-row-col.is-name`)).to.have.length(9)

    expect(render(wrapper.find(`.${props.cssName}-row-col.is-name`).get(0)).text()).to.equal('lastName1')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-email`).get(0)).text()).to.equal('')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-role`).get(0)).text()).to.equal('')

    expect(render(wrapper.find(`.${props.cssName}-row-col.is-name`).get(1)).text()).to.equal('firstName1')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-email`).get(1)).text()).to.equal('')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-role`).get(1)).text()).to.equal('')

    expect(render(wrapper.find(`.${props.cssName}-row-col.is-name`).get(2)).text()).to.equal('')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-email`).get(2)).text()).to.equal('email1')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-role`).get(2)).text()).to.equal('')

    expect(render(wrapper.find(`.${props.cssName}-row-col.is-name`).get(3)).text()).to.equal('')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-email`).get(3)).text()).to.equal('')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-role`).get(3)).text()).to.equal('role1')

    expect(render(wrapper.find(`.${props.cssName}-row-col.is-name`).get(4)).text()).to.equal('')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-email`).get(4)).text()).to.equal('')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-role`).get(4)).text()).to.equal('')

    expect(render(wrapper.find(`.${props.cssName}-row-col.is-name`).get(5)).text()).to.equal('lastName2')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-email`).get(5)).text()).to.equal('')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-role`).get(5)).text()).to.equal('')

    expect(render(wrapper.find(`.${props.cssName}-row-col.is-name`).get(6)).text()).to.equal('firstName2')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-email`).get(6)).text()).to.equal('')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-role`).get(6)).text()).to.equal('')

    expect(render(wrapper.find(`.${props.cssName}-row-col.is-name`).get(7)).text()).to.equal('')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-email`).get(7)).text()).to.equal('email2')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-role`).get(7)).text()).to.equal('')

    expect(render(wrapper.find(`.${props.cssName}-row-col.is-name`).get(8)).text()).to.equal('')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-email`).get(8)).text()).to.equal('')
    expect(render(wrapper.find(`.${props.cssName}-row-col.is-role`).get(8)).text()).to.equal('role2')
  })
})
