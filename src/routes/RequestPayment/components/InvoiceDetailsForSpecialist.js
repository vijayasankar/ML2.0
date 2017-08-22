import Col from 'react-bootstrap/lib/Col'
import DateTimePickerField from 'components/DateTimePickerField'
import NumberDialField from 'components/NumberDialField'
import RadioGroupField from 'components/RadioGroupField'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import TextField from 'components/TextField'
import { alphanumericOnly, roundToNearest } from 'utils/helpers'
import { reduxForm } from 'redux-form'

export class RequestPaymentInvoiceDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      theatreTime: ''
    }
  }

  handleClick (type, step) {
    if (type === '-') {
      this.setState(prevState => {
        if (
          prevState.theatreTime === 0 ||
          prevState.theatreTime === 1 ||
          parseInt(prevState.theatreTime, 10) === 1 ||
          prevState.theatreTime <= step ||
          prevState.theatreTime === '' ||
          prevState.theatreTime === '0' ||
          prevState.theatreTime === '1'
        ) {
          return {
            theatreTime: ''
          }
        }
        return {
          theatreTime: roundToNearest(type, prevState.theatreTime, step, true)
        }
      })
    } else if (type === '+') {
      this.setState(prevState => ({
        theatreTime: roundToNearest(type, prevState.theatreTime || 0, step, true)
      }))
    }
  }

  textChange (event) {
    this.setState(prevState => ({
      theatreTime: event.target.value
    }))
  }

  render () {
    return (
      <div className={`${this.props.cssName}`}>
        <Row>
          <Col xs={12} md={3}>
            <h3 className={`${this.props.cssName}-form-title`}>{`${this.props.title}`}</h3>
          </Col>
          <Col xs={12} md={9}>
            <Row className='pb-1'>
              <Col xs={12} md={6}>
                <label>Date of procedure</label>
                <DateTimePickerField
                  cssName={this.props.cssName}
                  fieldName='dateOfProcedure'
                  name='date-of-procedure'
                  untilToday
                />
              </Col>
            </Row>
            <Row className='pb-1'>
              <Col xs={12} md={6}>
                <label>Invoice number</label>
                <TextField
                  change={this.props.change}
                  cssName={this.props.cssName}
                  fieldName='invoiceNumber'
                  name='invoice-number'
                  placeholderText='Invoice number'
                  normalize={alphanumericOnly}
                />
              </Col>
            </Row>
            <Row className='pb-1'>
              <Col xs={12} md={3}>
                <label>Theatre time</label>
                <NumberDialField
                  change={this.props.change}
                  cssName={`${this.props.cssName}`}
                  fieldName='theatreTime'
                  name='theatre-time'
                  placeholderText='Mins'
                  value={`${this.state.theatreTime}`}
                  handleMinusClick={() => this.handleClick('-', 15)}
                  handlePlusClick={() => this.handleClick('+', 15)}
                  handleTextChange={(event) => this.textChange(event)}
                />
              </Col>
              <Col xs={12} md={3}>
                <label>Is this ACC related?</label>
                <RadioGroupField
                  cssName={`${this.props.cssName}`}
                  fieldName='accRelated'
                  name='acc-related'
                  radioList={[
                    { text: 'No', value: 'No' },
                    { text: 'Yes', value: 'Yes' }
                  ]}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

RequestPaymentInvoiceDetails.propTypes = {
  change: React.PropTypes.func,
  cssName: React.PropTypes.string,
  title: React.PropTypes.string
}

RequestPaymentInvoiceDetails.defaultProps = {
  cssName: 'request-pre-approval',
  title: 'Invoice Details'
}

const RequestPaymentInvoiceDetailsReduxForm = reduxForm({
  form: 'requestPayment'
})(RequestPaymentInvoiceDetails)

export default RequestPaymentInvoiceDetailsReduxForm
