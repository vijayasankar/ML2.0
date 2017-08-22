import Button from 'react-bootstrap/lib/Button'
import Col from 'react-bootstrap/lib/Col'
import CurrentUser from './CurrentUser'
import React from 'react'
import RegisteredUsers from './RegisteredUsers'
import Row from 'react-bootstrap/lib/Row'
import TextField from 'components/TextField'
import apiRequest from 'utils/request'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'
import { SubmissionError, reduxForm } from 'redux-form'
import { checkNumbersOnly, checkObjectIsEmpty, decodeJwtToken } from 'utils/helpers'

export class UserManagement extends React.Component {
  constructor (props) {
    super(props)
    this.currentUser = decodeJwtToken(this.props.token)
    this.formSubmit = this.formSubmit.bind(this)
  }

  componentDidMount () {
    this.props.loadUserManagementRegisteredUsersList()
  }

  validateFormValues (values) {
    return {
      ...(
        (Boolean(values.firstName) === false) &&
        { firstName: 'Please enter first name.' }
      ),
      ...(
        (Boolean(values.lastName) === false) &&
        { lastName: 'Please enter last name.' }
      ),
      ...(
        (Boolean(values.phoneNumber) === false) &&
        { phoneNumber: 'Please enter phone number.' }
      ),
      ...(
        (Boolean(values.email) === false) &&
        { email: 'Please enter email.' }
      )
    }
  }

  formSubmit (values) {
    console.log('UserManagement:index:formSubmit', values)
    const err = this.validateFormValues(values)
    if (!checkObjectIsEmpty(err)) {
      console.log('%c FORM SUBMIT ERROR!!!!', 'color: orange', err)
      throw new SubmissionError(err)
    }
    console.log('%c SUBMIT FORM VIA API - Start', 'color: red')
    // ------------------------------------------------------------------------
    // Prepare formData - No validation errors
    // ------------------------------------------------------------------------
    const formData = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber
    }
    console.log('formData', formData)
    console.log('%c SUBMIT FORM VIA API - End', 'color: red')
    const link = find(propEq('rel', 'add-provider-user'))(this.props.currentProviderLinks)
    if (!link) { return }
    try {
      this.props.formSubmit('userManagementRegisteredUser')
      apiRequest(link.url, link.method, formData).then(result => {
        console.log('formSubmit:result', result)
        this.props.formSubmitSuccess('userManagementRegisteredUser')
        this.props.reset()
        this.props.loadUserManagementRegisteredUsersList()
      })
    } catch (err) {
      console.error('formSubmit:apiRequest:err', err)
      this.props.formSubmitError('userManagementRegisteredUser', err)
    }
  }

  render () {
    const { handleSubmit, submitting } = this.props
    return (
      <section className={`${this.props.cssName}-wrapper`}>
        <div className={`${this.props.cssName}`}>
          <h1 className={`${this.props.cssName}-heading text-center`}>
            User management
          </h1>
          <h2 className={`${this.props.cssName}-subheading text-center`}>
            {this.props.currentProviderName}
          </h2>
          <hr className={`${this.props.cssName}-heading-hr`} />
          <section className={`${this.props.cssName}__current-user-wrapper`}>
            <CurrentUser
              {...this.currentUser}
              cssName={`${this.props.cssName}__current_user`}
            />
          </section>
          <hr />
          <section className={`${this.props.cssName}__registered-users-wrapper`}>
            <RegisteredUsers
              createUserManagementRegisteredUser={this.props.createUserManagementRegisteredUser}
              cssName={`${this.props.cssName}__registered-users`}
              listOfInvitedUsers={this.props.listOfInvitedUsers}
              listOfUsers={this.props.listOfUsers}
            />
          </section>
          <hr />
          <section className={`${this.props.cssName}__create-user-wrapper`}>
            <form onSubmit={handleSubmit(this.formSubmit)}>
              <Row>
                <Col xs={12} md={3}>
                  <h3 className={`${this.props.cssName}__create-user-form-title`}>Create user</h3>
                </Col>
                <Col xs={12} md={9}>
                  <Row className='pb-2'>
                    <Col xs={12} md={5}>
                      <span className={`${this.props.cssName}__create-user-valid-text is-first-name`}>
                        <TextField
                          change={this.props.change}
                          cssName={`${this.props.cssName}__create-user`}
                          fieldName='firstName'
                          name='first-name'
                          placeholderText='First name'
                        />
                      </span>
                    </Col>
                  </Row>
                  <Row className='pb-2'>
                    <Col xs={12} md={5}>
                      <span className={`${this.props.cssName}__create-user-valid-text is-last-name`}>
                        <TextField
                          change={this.props.change}
                          cssName={`${this.props.cssName}__create-user`}
                          fieldName='lastName'
                          name='last-name'
                          placeholderText='Last name'
                        />
                      </span>
                    </Col>
                  </Row>
                  <Row className='pb-2'>
                    <Col xs={12} md={5}>
                      <span className={`${this.props.cssName}__create-user-valid-text is-phone-number`}>
                        <TextField
                          change={this.props.change}
                          cssName={`${this.props.cssName}__create-user`}
                          fieldName='phoneNumber'
                          name='phone-number'
                          placeholderText='Phone number'
                          normalize={checkNumbersOnly}
                        />
                      </span>
                    </Col>
                  </Row>
                  <Row className='pb-2'>
                    <Col xs={12} md={5}>
                      <span className={`${this.props.cssName}__create-user-valid-text is-email`}>
                        <TextField
                          change={this.props.change}
                          cssName={`${this.props.cssName}__create-user`}
                          fieldName='email'
                          name='email'
                          placeholderText='Email'
                        />
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      xs={12}
                      md={5}
                      className={`${this.props.cssName}__create-user-form-trigger-wrapper text-right`}
                    >
                      <Button
                        className={`${this.props.cssName}__create-user-trigger is-submit primary-btn`}
                        type='submit'
                        disabled={submitting}
                      >
                        <span
                          className={`${this.props.cssName}__create-user-trigger-text is-submit`}
                        >
                          Create user
                        </span>
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </form>
          </section>
        </div>
      </section>
    )
  }
}

UserManagement.propTypes = {
  change: React.PropTypes.func,
  createUserManagementRegisteredUser: React.PropTypes.func,
  cssName: React.PropTypes.string,
  currentProviderLinks: React.PropTypes.array,
  currentProviderName: React.PropTypes.string,
  formSubmit: React.PropTypes.func,
  formSubmitError: React.PropTypes.func,
  formSubmitSuccess: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  listOfInvitedUsers: React.PropTypes.array,
  listOfUsers: React.PropTypes.array,
  loadUserManagementRegisteredUsersList: React.PropTypes.func,
  reset: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  token: React.PropTypes.string
}

UserManagement.defaultProps = {
  cssName: 'user-management'
}

const validate = values => {
  console.log('validate', values)
  console.log('validate', (Boolean(values.phoneNumber) && values.phoneNumber.length) || 0)
  const errors = {}
  if (Boolean(values.email) && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))) {
    errors.email = 'Not an email'
  }
  if (Boolean(values.phoneNumber) &&
    !(
      values.phoneNumber.length >= 7 &&
      values.phoneNumber.length <= 11
    )
  ) {
    errors.phoneNumber = 'Phone number is not valid'
  }
  if (Boolean(values.phoneNumber) && !values.phoneNumber.match(/^(02)/)) {
    errors.phoneNumber = 'Phone number area code is not valid'
  }
  console.log('errors', errors)
  return errors
}

const UserManagementReduxForm = reduxForm({
  form: 'userManagement',
  validate
})(UserManagement)

export default UserManagementReduxForm
