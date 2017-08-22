import Col from 'react-bootstrap/lib/Col'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import DateTimePickerField from 'components/DateTimePickerField'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import Moment from 'moment'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import TextField from 'components/TextField'
import apiRequest from 'utils/request'
import find from 'ramda/src/find'
import propEq from 'ramda/src/propEq'
import { SubmissionError, reduxForm } from 'redux-form'
import { isoDateTolocaleDate, localeDateToIsoDate, matchForPreApprovalRegExp } from 'utils/helpers.js'

export class RequestPaymentPreApproval extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: true,
      date: true
    }
    this.formSubmit = this.formSubmit.bind(this)
  }

  componentDidMount () {
    const query = (
      Boolean(this.props.query) &&
      Boolean(this.props.query.preApprovalNumber) &&
      (typeof this.props.query.preApprovalNumber === 'string') &&
      this.props.query.preApprovalNumber
    ) || ''
    if (query) {
      this.props.change('preApprovalNumber', query)
    }
  }

  verifyPreApproval ({ preApprovalNumber, dob }) {
    const link = find(propEq('rel', 'find-preapp-by-reference-and-dob'))(this.props.links)
    const url = `${link.url}?referenceNumber=${preApprovalNumber}&dateOfBirth=${dob}`
    return apiRequest(url)
    .then(result => {
      if (!(result && result.data)) {
        throw new Error()
      }
      this.props.verifyPreApprovalSuccess({ ...result.data, dob })
    })
    .catch(() => {
      throw new SubmissionError({
        preApprovalNumber: true,
        dob: [
          'We were unable to verify the pre-approval details.',
          'Please try again with a valid pre-approval number and date of birth.'
        ].join(' ')
      })
    })
  }

  formSubmit (values) {
    const { preApprovalNumber } = values
    const dob = localeDateToIsoDate(values.dob)
    if (!preApprovalNumber || !dob) {
      throw new SubmissionError({
        preApprovalNumber: true,
        dob: [
          'We were unable to verify the pre-approval.',
          'Please try again with a valid pre-approval number and date of birth.'
        ].join(' ')
      })
    }
    return this.verifyPreApproval({ preApprovalNumber, dob })
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
    }
  }

  render () {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <div className={`${this.props.cssName}`}>
        <form onSubmit={handleSubmit(this.formSubmit)}>
          <Row>
            <Col xs={12} md={3}>
              <h3 className={`${this.props.cssName}-form-title`}>Pre-approval</h3>
            </Col>

            {this.props.isValid &&
              <Col xs={12} md={9}>
                <Row className='pb-2'>
                  <Col xs={12} md={3}>
                    <span
                      className={`${this.props.cssName}-valid-title is-policy-number`}
                    >
                      Pre-approval number
                    </span>
                  </Col>
                  <Col xs={12} md={9}>
                    <span className={`${this.props.cssName}-valid-text is-policy-number`}>
                      {`${this.props.preApprovalNumber}`}
                    </span>
                  </Col>
                </Row>
                <Row className='pb-2'>
                  <Col xs={12} md={3}>
                    <span className={`${this.props.cssName}-valid-title is-patient-name`}>
                      Patient name
                    </span>
                  </Col>
                  <Col xs={12} md={9}>
                    <span className={`${this.props.cssName}-valid-text is-patient-name`}>
                      {`${this.props.name}`}
                    </span>
                  </Col>
                </Row>
                <Row className='pb-2'>
                  <Col xs={12} md={3}>
                    <span className={`${this.props.cssName}-valid-title is-patient-dob`}>
                      Patient date of birth
                    </span>
                  </Col>
                  <Col xs={12} md={9}>
                    <span className={`${this.props.cssName}-valid-text is-patient-dob`}>
                      {`${isoDateTolocaleDate(this.props.dob)}`}
                    </span>
                  </Col>
                </Row>
                <Row className='pb-2'>
                  <Col xs={12} md={3}>
                    <span className={`${this.props.cssName}-valid-title is-date-preapproval`}>
                      Date pre-approval was submitted
                    </span>
                  </Col>
                  <Col xs={12} md={9}>
                    <span className={`${this.props.cssName}-valid-text is-date-preapproval`}>
                      {`${isoDateTolocaleDate(this.props.proposedDateOfProcedure)}`}
                    </span>
                  </Col>
                </Row>
              </Col>
            }

            {!this.props.isValid &&
              <Col xs={12} md={9}>
                <Row className='pb-2'>
                  <Col xs={12} md={7}>
                    <label>
                      Pre-approval number
                    </label>
                    <span style={{ color: 'white' }}>88888888/88/888</span>
                    <TextField
                      cssName={this.props.cssName}
                      fieldName='preApprovalNumber'
                      onChange={(event, value) => this.inputOnChange(event, value, 'text')}
                      change={this.props.change}
                      name='pre-approval-number'
                      normalize={matchForPreApprovalRegExp}
                      placeholderText='Pre-approval number'
                    />
                  </Col>
                </Row>
                <Row className='pb-2'>
                  <Col xs={12} md={7}>
                    <FormGroup
                      controlId='dob'
                      className={`${this.props.cssName}-form-group is-dob`}
                    >
                      <ControlLabel>Patient's date of birth</ControlLabel>
                      <span style={{ color: 'white' }}> 01/01/1980 </span>
                      <DateTimePickerField
                        cssName={this.props.cssName}
                        fieldName='dob'
                        onChange={(event, value) => this.inputOnChange(event, value, 'date')}
                        name='dob'
                        untilToday
                      />
                      {this.props.err.dob.message &&
                        <span
                          className={`${this.props.cssName}-form-group-error is-dob`}
                        >
                          {`${this.props.err.dob.message}`}
                        </span>
                      }
                    </FormGroup>
                  </Col>
                </Row>

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
                            className={`link is-bold ${this.props.cssName}-form-trigger is-verify-pre-approval`}
                            type='submit'
                            disabled={submitting}>
                              Verify Pre-approval
                          </button>
                          <button
                            disabled={(this.state.date && this.state.text) || submitting || pristine}
                            onClick={reset}
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

RequestPaymentPreApproval.propTypes = {
  change: React.PropTypes.func,
  query: React.PropTypes.shape({
    preApprovalNumber: React.PropTypes.string
  }),
  cssName: React.PropTypes.string,
  dob: React.PropTypes.string,
  err: React.PropTypes.shape({
    preApprovalNumber: React.PropTypes.shape({
      isError: React.PropTypes.bool,
      message: React.PropTypes.string
    }),
    dob: React.PropTypes.shape({
      isError: React.PropTypes.bool,
      message: React.PropTypes.string
    })
  }),
  handleSubmit: React.PropTypes.func,
  isValid: React.PropTypes.bool,
  links: React.PropTypes.array,
  name: React.PropTypes.string,
  preApprovalNumber: React.PropTypes.string,
  pristine: React.PropTypes.bool,
  proposedDateOfProcedure: React.PropTypes.string,
  reset: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  verifyPreApprovalSuccess: React.PropTypes.func
}

export const validate = values => {
  const errors = {}
  if (Boolean(values.dob) && !Moment(values.dob).isBefore(Moment())) {
    errors.dob = "Patient's DOB is not valid"
  }
  return errors
}

const RequestPaymentPreApprovalReduxForm = reduxForm({
  form: 'requestPayment_preApproval',
  validate
})(RequestPaymentPreApproval)

export default RequestPaymentPreApprovalReduxForm
