import Button from 'react-bootstrap/lib/Button'
import Col from 'react-bootstrap/lib/Col'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import TextField from 'components/TextField'
import { reduxForm } from 'redux-form'
import { alphanumericOnly } from 'utils/helpers'

export class CreateUser extends React.Component {
  render () {
    const { submitting } = this.props
    return (
      <div className={`${this.props.cssName}`}>
        <Row>
          <Col xs={12} md={3}>
            <h3 className={`${this.props.cssName}-form-title`}>Create user</h3>
          </Col>
          <Col xs={12} md={9}>
            <Row className='pb-2'>
              <Col xs={12} md={5}>
                <span className={`${this.props.cssName}-valid-text is-first-name`}>
                  <TextField
                    change={this.props.change}
                    cssName={this.props.cssName}
                    fieldName='firstName'
                    name='first-name'
                    placeholderText='First name'
                  />
                </span>
              </Col>
            </Row>
            <Row className='pb-2'>
              <Col xs={12} md={5}>
                <span className={`${this.props.cssName}-valid-text is-last-name`}>
                  <TextField
                    change={this.props.change}
                    cssName={this.props.cssName}
                    fieldName='lastName'
                    name='last-name'
                    placeholderText='Last name'
                    normalize={alphanumericOnly}
                  />
                </span>
              </Col>
            </Row>
            <Row className='pb-2'>
              <Col xs={12} md={5}>
                <span className={`${this.props.cssName}-valid-text is-phone-number`}>
                  <TextField
                    change={this.props.change}
                    cssName={this.props.cssName}
                    fieldName='phoneNumber'
                    name='phone-number'
                    placeholderText='Phone number'
                    normalize={alphanumericOnly}
                  />
                </span>
              </Col>
            </Row>
            <Row className='pb-2'>
              <Col xs={12} md={5}>
                <span className={`${this.props.cssName}-valid-text is-email`}>
                  <TextField
                    change={this.props.change}
                    cssName={this.props.cssName}
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
                className={`${this.props.cssName}-form-trigger-wrapper text-right`}
              >
                <Button
                  className={`${this.props.cssName}-trigger is-submit primary-btn`}
                  type='submit'
                  disabled={submitting}
                >
                  <span
                    className={`${this.props.cssName}-trigger-text is-submit`}
                  >
                    Create user
                  </span>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

CreateUser.propTypes = {
  change: React.PropTypes.func,
  cssName: React.PropTypes.string,
  submitting: React.PropTypes.bool
}

CreateUser.defaultProps = {
  // cssName: 'associated-costs'
}

const CreateUserReduxForm = reduxForm({
  form: 'userManagement'
})(CreateUser)

export default CreateUserReduxForm
