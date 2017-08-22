import Button from 'react-bootstrap/lib/Button'
import Col from 'react-bootstrap/lib/Col'
import FormControl from 'react-bootstrap/lib/FormControl'
import Link from 'react-router/lib/Link'
import React, { PropTypes } from 'react'
import Row from 'react-bootstrap/lib/Row'
import contains from 'ramda/src/contains'
import find from 'ramda/src/find'
import logo from './assets/nibFirstChoice.svg'
import oidcUserManager from 'utils/oidcUserManager'
import propEq from 'ramda/src/propEq'
import { loadClaimsHomeStart } from 'store/claimsHome'
import { selectCurrentProvider } from 'store/myProviders'

class Header extends React.Component {
  // constructor (props) {   super(props) }

  componentWillMount = () => {
    // console.debug('Header: componentWillMount', this.props)
    this.props.dispatch(loadClaimsHomeStart())
  }

  componentDidMount = () => {
    // console.debug('Header: componentDidMount: props', this.props) console.debug('Header: componentDidMount:
    // state', this.state)
  }

  onLoginButtonClick = (event) => {
    event.preventDefault()
    oidcUserManager.signinRedirect()
  }

  onLogoutButtonClicked = (event) => {
    event.preventDefault()
    oidcUserManager.removeUser() // also removes the user data from sessionStorage
    oidcUserManager.signoutRedirect() // also removes the user data from sessionStorage
  }

  onDropdownSelected = (event) => {
    console.log('==> onDropdownSelected', event.target.value)
    const myProviders = this.props.myProviders
    const currentProvider = find(propEq('id', event.target.value))(myProviders)
    this.props.dispatch(selectCurrentProvider(currentProvider))
  }

  createSelectItems = () => {
    let items = []
    try {
      const myProviders = this.props.myProviders
      for (let i = 0; i < myProviders.length; i++) {
        const aProvider = myProviders[i]
        items.push(
          <option key={aProvider.id} value={aProvider.id}>{aProvider.name}</option>
        )
      }
    } catch (err) {
      // console.log('createSelectItems ERROR:', err)
    }
    return items
  }

  isSpecialist = () => {
    return this.props.currentProviderDetails && this.props.currentProviderDetails.serviceTypes && contains('Specialist', this.props.currentProviderDetails.serviceTypes)
  }

  render() {
    console.log('PROPS: ', this.props)
    const {cssName} = this.props

    const getWidth = () => {
      if (this.isSpecialist() && this.props.isUserManagement) {
        return '20'
      } else if (this.isSpecialist() && !this.props.isUserManagement) {
        return '25'
      } else if (!this.isSpecialist() && this.props.isUserManagement) {
        return '33'
      }
      return '50'
    }
    // ------------------------------------------------------------------------
    // #providerportal
    // ------------------------------------------------------------------------
    return (
      <div className={`${cssName}`}>
        <Row className='is-header container'>
          <Col className='logo-col' xs={6} md={6}>
            {this.props.router.location.pathname !== '/providerportal/' && <Link to='/providerportal/' className={`${cssName}-home-link`}>
                <img className={`${cssName}-logo`} src={logo}/>
              </Link>
            }
            {this.props.router.location.pathname === '/providerportal/' && <img className={`${cssName}-logo`} src={logo}/>
            }
          </Col>
          <Col className='log-out-col' xs={6} md={6} style={{
            textAlign: 'right'
          }}>
            <div className='header-provider-select-wrapper'>
              <FormControl
                className={`${cssName}-provider-select`}
                componentClass='select'
                placeholder='current-provider-select'
                onChange={this.onDropdownSelected}>
                {this.createSelectItems()}
              </FormControl>
            </div>
            {/* <Button className='header-link' onClick={this.onLoginButtonClick}>Login</Button> */}
            <Button className={`${cssName}-logout-link`} onClick={this.onLogoutButtonClicked}>Logout</Button>
          </Col>
        </Row>

        <div className={`text-center ${cssName}-main-menu`}>
          <div className='container'>
            {this.isSpecialist() && <Link to='/providerportal/request-pre-approval' activeClassName='route--active' className={`nav is-width-${getWidth()}`}>
                Request a pre-approval
              </Link>
            }
            <Link to='/providerportal/request-payment' activeClassName='route--active' className={`nav is-width-${getWidth()}`}>
              Request a payment
            </Link>
            {this.isSpecialist() && <Link to='/providerportal/pre-approvals' activeClassName='route--active' className={`nav is-width-${getWidth()}`}>
                Pre-approvals
              </Link>
            }
            <Link to='/providerportal/payments' activeClassName='route--active' className={`nav is-width-${getWidth()}`}>
              Payments
            </Link>
            {this.props.isUserManagement && <Link to='/providerportal/user-management' activeClassName='route--active' className={`nav is-width-${getWidth()}`}>
                User management
              </Link>
            }
          </div>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  cssName: PropTypes.string,
  currentProviderDetails: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  isUserManagement: PropTypes.bool,
  myProviders: PropTypes.array,
  router: PropTypes.object
}

Header.defaultProps = {
  cssName: 'header'
}

export default Header
