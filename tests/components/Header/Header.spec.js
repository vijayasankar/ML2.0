import React from 'react'
import { Link } from 'react-router'
import { shallow } from 'enzyme'
import Header from 'components/Header/Header'

describe('(Component) Header', () => {
  it('should exists', () => {
    expect(Header).to.not.be.undefined
  })

  // it('Renders a welcome message', () => {
  //   const welcome = _wrapper.find('h1')
  //   expect(welcome).to.exist
  //   expect(welcome.text()).to.match(/React Redux Starter Kit/)
  // })

  describe('Navigation links with User Management link', () => {
    const props = {
      currentProviderDetails: {
        serviceTypes: ['Specialist'],
        name: 'Knobbies Knees'
      },
      dispatch: function () {},
      isUserManagement: true,
      myProviders: [
        {
          id: 'one',
          name: 'A Specialist'
        },
        {
          id: 'two',
          name: 'A Hospital'
        },
        {
          id: 'three',
          name: 'An Anaesthetist'
        }
      ],
      router: {
        location: {
          pathname: '/payments'
        }
      }
    }

    let _wrapper

    beforeEach(() => {
      _wrapper = shallow(<Header {...props} />)
    })

    // it('Should render a Link to Request a pre-approval route', () => {
    //   expect(_wrapper.contains(
    //     <Link activeClassName='route--active' to='/request-pre-approval'>
    //       Request a pre-approval
    //     </Link>
    //   )).to.be.true
    // })
    //
    // it('Should render a Link to Request a payment route', () => {
    //   expect(_wrapper.contains(
    //     <Link activeClassName='route--active' to='/request-payment'>
    //       Request a payment
    //     </Link>
    //   )).to.be.true
    // })
    //
    // it('Should render a Link to Pre-approvals route', () => {
    //   expect(_wrapper.contains(
    //     <Link activeClassName='route--active' to='/pre-approvals'>
    //       Pre-approvals
    //     </Link>
    //   )).to.be.true
    // })
    //
    // it('Should render a Link to Payments route', () => {
    //   expect(_wrapper.contains(
    //     <Link activeClassName='route--active' to='/payments'>
    //       Payments
    //     </Link>
    //   )).to.be.true
    // })

    // it('Should render a Link to User management route', () => {
    //   expect(_wrapper.contains(
    //     <Link activeClassName='route--active' to='/user-management'>
    //       User management
    //     </Link>
    //   )).to.be.true
    // })

    it('Should not render Pre-approval related menus for non-Specialist', () => {
      props.currentProviderDetails.serviceTypes = ['Hospital']
      _wrapper.setProps(props)
      expect(_wrapper.contains(
        <Link activeClassName='route--active' to='/request-pre-approval'>
          Request a pre-approval
        </Link>
      )).to.be.false

      expect(_wrapper.contains(
        <Link activeClassName='route--active' to='/pre-approvals'>
          Pre-approvals
        </Link>
      )).to.be.false

      props.currentProviderDetails.serviceTypes = ['Anaesthetist']
      _wrapper.setProps(props)
      expect(_wrapper.contains(
        <Link activeClassName='route--active' to='/request-pre-approval'>
          Request a pre-approval
        </Link>
      )).to.be.false

      expect(_wrapper.contains(
        <Link activeClassName='route--active' to='/pre-approvals'>
          Pre-approvals
        </Link>
      )).to.be.false
    })

    it('Should render the Provider select dropdown', () => {
      console.log(_wrapper.html())
    })
  })

  describe('Navigation links without User Management link', () => {
    const props = {
      currentProviderDetails: {
        serviceTypes: ['Specialist'],
        name: 'Knobbies Knees'
      },
      dispatch: function () {},
      isUserManagement: false,
      myProviders: [
        {
          id: 'one',
          name: 'A Specialist'
        },
        {
          id: 'two',
          name: 'A Hospital'
        },
        {
          id: 'three',
          name: 'An Anaesthetist'
        }
      ],
      router: {
        location: {
          pathname: '/'
        }
      }
    }

    let _wrapper

    beforeEach(() => {
      _wrapper = shallow(<Header {...props} />)
    })

    it('Should render a Link to User management route', () => {
      expect(_wrapper.contains(
        <Link activeClassName='route--active' to='/user-management'>
          User management
        </Link>
      )).to.be.false
    })

  })
})
