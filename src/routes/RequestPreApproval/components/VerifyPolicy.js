import Col from 'react-bootstrap/lib/Col'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import DateTimePickerField from 'components/DateTimePickerField'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import Moment from 'moment'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import TextField from 'components/TextField'
import apiRequest from 'utils/request'
import classnames from 'classnames'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'
import { Field, SubmissionError, reduxForm } from 'redux-form'
import { alphanumericOnly, isoDateTolocaleDate, localeDateToIsoDate } from 'utils/helpers'

export class RequestPreApprovalVerifyPolicy extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: true,
      text: true,
      name: true
    }
    this.handleHideAdditional = this.handleHideAdditional.bind(this)
    this.handleShowAdditional = this.handleShowAdditional.bind(this)
    this.clearPolicy = this.clearPolicy.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
  }

  handleShowAdditional (event) {
    event.preventDefault()
    this.props.formReset('requestPreApproval')
    this.props.reset()
    this.props.showAdditionalFormSection('verifyPolicy', 'policyUserName')
  }

  handleHideAdditional (event) {
    event.preventDefault()
    this.props.formReset('requestPreApproval')
    this.props.reset()
    this.props.hideAdditionalFormSection('verifyPolicy')
  }

  clearPolicy (event) {
    event.preventDefault()
    this.props.formReset('requestPreApproval')
    this.props.reset()
  }

  verifyPolicyByPolicyIdAndDob ({ policyId, dob }) {
    const link = find(propEq('rel', 'find-insured-person-by-policy-and-dob'))(this.props.links)
    const url = `${link.url}?policyNumber=${policyId}&dateOfBirth=${dob}`
    return apiRequest(url)
    .then(result => {
      console.log('RES: ', result)
      if (!(result && result.data && (result.data.persons.length > 0))) {
        throw new Error()
      }
      this.props.verifyPolicySuccess({ ...result.data, dob })
    })
    .catch(() => {
      this.setState({ error: true })
      throw new SubmissionError({
        policyId: true,
        dob: [
          'We were unable to verify the policy details.',
          'Please try again with a valid policy number or name, plus date of birth.'
        ].join(' ')
      })
    })
  }

  verifyPolicyByNameAndDob ({ firstName, lastName, dob }) {
    const link = find(propEq('rel', 'find-insured-person-by-name-and-dob'))(this.props.links)
    const url = `${link.url}?firstName=${firstName}&lastName=${lastName}&dateOfBirth=${dob}`
    return apiRequest(url)
    .then(result => {
      if (!(result && result.data)) {
        throw new Error()
      }
      this.props.verifyPolicySuccess({
        persons: [result.data],
        dob
      })
    })
    .catch(() => {
      this.setState({ error: true })
      throw new SubmissionError({
        firstName: true,
        lastName: true,
        dob: [
          'Please try again with a valid date of birth, first name and last name.',
          'Alternatively select "I have the policy number."'
        ].join(' ')
      })
    })
  }

  formSubmit (values) {
    const dob = localeDateToIsoDate(values.dob)
    if (this.props.additionalFormSection.policyUserName.isShowing) {
      const { firstName, lastName } = values
      return this.verifyPolicyByNameAndDob({ firstName, lastName, dob })
    } else if (this.props.additionalFormSection.policyUser.list.length > 1) {
      const policyUserIndex = parseInt(values.policyUserIndex, 10)
      const policyUser = this.props.additionalFormSection.policyUser.list[policyUserIndex]
      const persons = [ policyUser ]
      console.log('policyUserIndex', policyUserIndex)
      console.log('policyUser', policyUser)
      console.log('persons', persons)
      if (!policyUser) { return }
      return this.props.verifyPolicySuccess({ persons, dob })
    } else {
      const { policyId } = values
      if (!policyId || !dob) {
        throw new SubmissionError({
          policyId: true,
          dob: [
            'We were unable to verify the policy details.',
            'Please try again with a valid policy number and date of birth.',
            'Alternatively select "I don\'t have the policy number".'
          ].join(' ')
        })
      }
      return this.verifyPolicyByPolicyIdAndDob({ policyId, dob })
    }
  }

  inputOnChange (event, input, type) {
    if (type === 'date') {
      if (input === null || input === '') {
        this.setState({ date: true })
        return ''
      }
      this.setState({ date: false })
      return ''
    } else if (type === 'text') {
      if (input === null || input === '') {
        this.setState({ text: true })
        return ''
      }
      this.setState({ text: false })
      return ''
    } else if (type === 'name') {
      if (input === null || input === '') {
        this.setState({ name: true })
        return ''
      }
      this.setState({ name: false })
      return ''
    }
  }

  render () {
    const { handleSubmit, reset, submitting, pristine } = this.props
    return (
      <div className={`${this.props.cssName}`}>
        <form onSubmit={handleSubmit(this.formSubmit)}>
          <Row>
            <Col xs={12} md={3}>
              <h3 className={`${this.props.cssName}-form-title`}>Verify policy</h3>
            </Col>
            {this.props.isValid &&
              <Col xs={12} md={9}>
                <Row className='pb-2'>
                  <Col xs={12} md={3}>
                    <span
                      className={`${this.props.cssName}-valid-title is-policy-number`}
                    >
                      Policy number
                    </span>
                  </Col>
                  <Col xs={12} md={9}>
                    <span className={`${this.props.cssName}-valid-text is-policy-number`}>
                      {`${this.props.policyId}`}
                    </span>
                  </Col>
                </Row>
                <Row className='pb-2'>
                  <Col xs={12} md={3}>
                    <span className={`${this.props.cssName}-valid-title is-dob`}>
                      Date of birth
                    </span>
                  </Col>
                  <Col xs={12} md={9}>
                    <span className={`${this.props.cssName}-valid-text is-dob`}>
                      {`${isoDateTolocaleDate(this.props.dob)}`}
                    </span>
                  </Col>
                </Row>
                <Row className='pb-1'>
                  <Col xs={12} md={3}>
                    <span className={`${this.props.cssName}-valid-title is-patient-name`}>
                      Patient name
                    </span>
                  </Col>
                  <Col xs={12} md={9}>
                    <span className={`${this.props.cssName}-valid-text is-patient-name`}>
                      {`${this.props.firstName}`} {`${this.props.lastName}`}
                    </span>
                  </Col>
                </Row>
              </Col>}
            {!this.props.isValid &&
              <Col xs={12} md={9}>
                {!this.props.additionalFormSection.policyUserName.isShowing &&
                  <Row className='pb-2'>
                    <Col xs={12} md={7}>
                      <label>
                        Policy number
                      </label>
                      <span
                        className={`${this.props.cssName}-form-group-or is-policy-number`}
                      >
                        {' '}
                        or
                        {' '}
                        <a
                          href='#'
                          className={`${this.props.cssName}-form-group-trigger is-policy-number`}
                          onClick={this.handleShowAdditional}
                        >
                          I don't have the policy number
                        </a>
                      </span>
                      <span style={{ color: 'white' }}> 88888888 </span>
                      <TextField
                        change={this.props.change}
                        cssName={this.props.cssName}
                        fieldName='policyId'
                        name='policy-id'
                        normalize={alphanumericOnly}
                        placeholderText='e.g 00123456'
                        onChange={(event, text) => this.inputOnChange(event, text, 'text')}
                      />
                    </Col>
                  </Row>
                }
                <Row className='pb-2'>
                  <Col xs={12} md={7}>
                    <FormGroup
                      controlId='dob'
                      className={`${this.props.cssName}-form-group is-dob`}
                    >
                      <ControlLabel>Date of birth</ControlLabel>
                      {this.props.additionalFormSection.policyUserName.isShowing &&
                        <span
                          className={`${this.props.cssName}-form-group-or is-dob`}
                        >
                          {' '}
                          or
                          {' '}
                          <a
                            href='#'
                            className={`${this.props.cssName}-form-group-trigger is-dob`}
                            onClick={this.handleHideAdditional}
                          >
                            I have the policy number
                          </a>
                        </span>
                      }
                      <span style={{ color: 'white' }}> 02/02/2016 </span>
                      {' '}
                      <span style={{ color: 'white' }}> 30/12/2009 </span>
                      <DateTimePickerField
                        cssName={this.props.cssName}
                        fieldName='dob'
                        name='dob'
                        onChange={(event, date) => this.inputOnChange(event, date, 'date')}
                        untilToday
                      />
                      {this.props.err.dob.message &&
                        <span
                          className={`error-message ${this.props.cssName}-form-group-error is-dob`}
                        >
                          {`${this.props.err.dob.message}`}
                        </span>
                      }
                    </FormGroup>
                  </Col>
                </Row>

                {/* Additional - Policy User Name - Start */}
                {this.props.additionalFormSection.policyUserName.isShowing &&
                  <div
                    className={`${this.props.cssName}__policy-user-name-form-group-wrapper`}
                  >
                    <Row className='pb-2'>
                      <Col xs={12} md={7}>
                        <label>First name</label>
                        <span style={{ color: 'white' }}> SingleMatchingPolicy </span>
                        <TextField
                          change={this.props.change}
                          cssName={this.props.cssName}
                          fieldName='firstName'
                          name='first-name'
                          placeholderText='First name'
                          onChange={(event, text) => this.inputOnChange(event, text, 'text')}
                        />
                      </Col>
                    </Row>
                    <Row className='pb-2'>
                      <Col xs={12} md={7}>
                        <label>Last name</label>
                        <span style={{ color: 'white' }}> LastNamebad900c0-eda4-4c47-88c5-a0ba2fa2e3f3 </span>
                        <TextField
                          change={this.props.change}
                          cssName={this.props.cssName}
                          fieldName='lastName'
                          name='last-name'
                          placeholderText='Last name'
                          onChange={(event, text) => this.inputOnChange(event, text, 'name')}
                        />
                      </Col>
                    </Row>
                  </div>}
                {/* Additional - Policy User Name - End */}

                {/* Additional - Policy User - Start */}
                {this.props.additionalFormSection.policyUser.isShowing &&
                  <Row
                    className={`${this.props.cssName}__policy-user-form-group-wrapper`}
                  >
                    <Col xs={12} md={7}>
                      <ul
                        className={`${this.props.cssName}__policy-user-form-group-list`}
                      >
                        {this.props.additionalFormSection.policyUser.list.length !== 0 &&
                          this.props.additionalFormSection.policyUser.list.map(
                            (person, index) => {
                              return (
                                <li
                                  className={`${this.props.cssName}__policy-user-form-group-list-item-wrapper`}
                                  key={index}
                                >
                                  <div
                                    className={classnames(
                                      'checkbox-button',
                                      `${this.props.cssName}__policy-user-form-group-list-item-button`
                                    )}
                                  >
                                    {/* value={`${person.policyId}|${person.firstName}|${person.lastName}`} */}
                                    <Field
                                      component='input'
                                      id={`policy-user-${index}`}
                                      name='policyUserIndex'
                                      type='radio'
                                      value={`${index}`}
                                    />
                                    <label htmlFor={`policy-user-${index}`}>
                                      {`${person.firstName} ${person.lastName}`}
                                    </label>
                                  </div>
                                </li>
                              )
                            }
                          )}
                      </ul>
                    </Col>
                  </Row>
                }
                {/* Additional - Policy User - End */}

                {!this.props.isValid &&
                  <Row>
                    <Col xs={12} md={12}>
                      <Row>
                        <Col
                          xs={12}
                          md={7}
                          className={`${this.props.cssName}-form-trigger-wrapper text-right`}
                        >
                          <button
                            className={`link is-bold ${this.props.cssName}-form-trigger is-verify-policy`}
                            type='submit'
                            disabled={submitting}>
                              Verify policy
                          </button>
                          <button
                            disabled={(this.state.date && this.state.text && this.state.name) || submitting || pristine}
                            onClick={this.clearPolicy}
                            className={`link ${this.props.cssName}-form-trigger is-cancel`}
                          >
                            Cancel
                          </button>
                          <span
                            className={`${this.props.cssName}-form-trigger-separator`}
                          >
                            |
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                }
              </Col>
            }
          </Row>
        </form>
      </div>
    )
  }
}

RequestPreApprovalVerifyPolicy.propTypes = {
  additionalFormSection: React.PropTypes.shape({
    policyUser: React.PropTypes.shape({
      isShowing: React.PropTypes.bool,
      selected: React.PropTypes.number,
      list: React.PropTypes.array
    }),
    policyUserName: React.PropTypes.shape({
      isShowing: React.PropTypes.bool
    })
  }),
  change: React.PropTypes.func,
  cssName: React.PropTypes.string,
  dob: React.PropTypes.string,
  err: React.PropTypes.shape({
    policyId: React.PropTypes.shape({
      isError: React.PropTypes.bool,
      message: React.PropTypes.string
    }),
    dob: React.PropTypes.shape({
      isError: React.PropTypes.bool,
      message: React.PropTypes.string
    })
  }),
  firstName: React.PropTypes.string,
  handleSubmit: React.PropTypes.func,
  hideAdditionalFormSection: React.PropTypes.func,
  isValid: React.PropTypes.bool,
  lastName: React.PropTypes.string,
  links: React.PropTypes.array,
  policyId: React.PropTypes.string,
  pristine: React.PropTypes.bool,
  reset: React.PropTypes.func,
  showAdditionalFormSection: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  verifyPolicySuccess: React.PropTypes.func,
  formReset: React.PropTypes.func
}

export const validate = values => {
  const errors = {}
  if (Boolean(values.dob) && !Moment(values.dob).isBefore(Moment())) {
    errors.dob = "Patient's DOB is not valid"
  }
  return errors
}

const RequestPreApprovalVerifyPolicyReduxForm = reduxForm({
  form: 'requestPreApproval_verifyPolicy',
  validate
})(RequestPreApprovalVerifyPolicy)

export default RequestPreApprovalVerifyPolicyReduxForm
