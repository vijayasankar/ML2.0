import Col from 'react-bootstrap/lib/Col'
import DollarTextField from 'components/DollarTextWithTwoDecimalsField'
import NumberDialField from 'components/NumberDialField'
import RadioGroupField from 'components/RadioGroupField'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import TypeaheadField from 'components/TypeaheadField'
import { Field, reduxForm } from 'redux-form'
import { calculateTotalIncludingGst, calculateGst, roundToNearest, roundTwoDecimal } from 'utils/helpers'

export class CostsForAnaesthetist extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      timeBaseUnitsTime: '',
      timeUnitsTime: '',
      modifyingUnitsTime: ''
    }
  }

  componentDidMount () {
    this.props.change('location', 'NotApplicable')
  }

  minusClick (type, step) {
    if (type === 'timeBaseUnitsTime') {
      this.setState(prevState => ({
        timeBaseUnitsTime: roundToNearest('-', prevState.timeBaseUnitsTime, step, true)
      }))
    } else if (type === 'timeUnitsTime') {
      this.setState(prevState => ({
        timeUnitsTime: roundToNearest('-', prevState.timeUnitsTime, step, true)
      }))
    } else {
      this.setState(prevState => ({
        modifyingUnitsTime: roundToNearest('-', prevState.modifyingUnitsTime, step, true)
      }))
    }
  }

  plusClick (type, step) {
    if (type === 'timeBaseUnitsTime') {
      this.setState(prevState => ({
        timeBaseUnitsTime: roundToNearest('+', prevState.timeBaseUnitsTime, step, true)
      }))
    } else if (type === 'timeUnitsTime') {
      this.setState(prevState => ({
        timeUnitsTime: roundToNearest('+', prevState.timeUnitsTime, step, true)
      }))
    } else {
      this.setState(prevState => ({
        modifyingUnitsTime: roundToNearest('+', prevState.modifyingUnitsTime, step, true)
      }))
    }
  }

  textChange (event, type) {
    if (type === 'timeBaseUnitsTime') {
      this.setState(prevState => ({
        timeBaseUnitsTime: event.target.value
      }))
    } else if (type === 'timeUnitsTime') {
      this.setState(prevState => ({
        timeUnitsTime: event.target.value
      }))
    } else {
      this.setState(prevState => ({
        modifyingUnitsTime: event.target.value
      }))
    }
  }

  render () {
    return (
      <div className={`${this.props.cssName}`}>
        <Row>
          <Col xs={12} md={3}>
            <h3 className={`${this.props.cssName}-form-title`}>Costs</h3>
          </Col>
          <Col xs={12} md={9}>
            <Row>
              <Col xs={12} md={12}>
                <h4 className={`${this.props.cssName}-form-section-title`}>
                  Primary procedure (Excluding GST)
                </h4>
              </Col>
            </Row>
            <Row className='pb-4'>
              <Col xs={12} md={6}>
                <TypeaheadField
                  cssName={this.props.cssName}
                  fieldName='primaryProcedure'
                  links={this.props.links}
                  name='primary-procedure'
                  placeholderText='Primary procedure'
                  section='primaryProcedure'
                />
              </Col>
              <Col xs={12} md={3}>
                <div className={`${this.props.cssName}-form-group`}>
                  <RadioGroupField
                    cssName={`${this.props.cssName}`}
                    fieldName='location'
                    name='location'
                    radioList={[
                      { text: 'Left', value: 'Left' },
                      { text: 'Right', value: 'Right' },
                      { text: 'n/a', value: 'NotApplicable' }
                    ]}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={3} />
          <Col xs={12} md={9}>
            <Row>
              <Col xs={12} md={12}>
                <h4 className={`${this.props.cssName}-form-section-title`}>
                  Cost (Excluding GST)
                </h4>
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={6}><span className={`${this.props.cssName}-label`}>Time base units</span></Col>
              <Col xs={3} md={3} className='text-right'>
                <NumberDialField
                  change={this.props.change}
                  cssName={`${this.props.cssName}`}
                  fieldName='timeBaseUnitsTime'
                  name='time-base-units-time'
                  placeholderText='Mins'
                  value={`${this.state.timeBaseUnitsTime}`}
                  handleMinusClick={() => this.minusClick('timeBaseUnitsTime', 15)}
                  handlePlusClick={() => this.plusClick('timeBaseUnitsTime', 15)}
                  handleTextChange={(event) => this.textChange(event, 'timeBaseUnitsTime')}
                />
              </Col>
              <Col xs={3} md={3}>
                <DollarTextField
                  cssName={this.props.cssName}
                  fieldName='timeBaseUnitsCost'
                  name='time-base-units-cost'
                  placeholderText='$ 0.00'
                />
              </Col>
            </Row>
            <hr className='line-item' />
            <Row>
              <Col xs={6} md={6}>
                <span className={`${this.props.cssName}-label`}>
                  Time units <em>(15 mins increments)</em>
                </span>
              </Col>
              <Col xs={3} md={3} className='text-right'>
                <NumberDialField
                  change={this.props.change}
                  cssName={`${this.props.cssName}`}
                  fieldName='timeUnitsTime'
                  name='time-units-time'
                  placeholderText='Mins'
                  value={`${this.state.timeUnitsTime}`}
                  handleMinusClick={() => this.minusClick('timeUnitsTime', 15)}
                  handlePlusClick={() => this.plusClick('timeUnitsTime', 15)}
                  handleTextChange={(event) => this.textChange(event, 'timeUnitsTime')}
                />
              </Col>
              <Col xs={3} md={3}>
                <DollarTextField
                  cssName={this.props.cssName}
                  fieldName='timeUnitsCost'
                  name='time-units-cost'
                  placeholderText='$ 0.00'
                />
              </Col>
            </Row>
            <hr className='line-item' />
            <Row>
              <Col xs={6} md={6}><span className={`${this.props.cssName}-label`}>Modifying units</span></Col>
              <Col xs={3} md={3} className='text-right'>
                <NumberDialField
                  change={this.props.change}
                  cssName={`${this.props.cssName}`}
                  fieldName='modifyingUnitsTime'
                  name='modifying-units-time'
                  placeholderText='Mins'
                  value={`${this.state.modifyingUnitsTime}`}
                  handleMinusClick={() => this.minusClick('modifyingUnitsTime', 15)}
                  handlePlusClick={() => this.plusClick('modifyingUnitsTime', 15)}
                  handleTextChange={(event) => this.textChange(event, 'modifyingUnitsTime')}
                />
              </Col>
              <Col xs={3} md={3}>
                <DollarTextField
                  cssName={this.props.cssName}
                  fieldName='modifyingUnitsCost'
                  name='modifying-units-cost'
                  placeholderText='$ 0.00'
                />
              </Col>
            </Row>
            <hr className='line-item' />
            <Row>
              <Col xs={12} md={12} className='text-right'>
                <span className={`${this.props.cssName}-gst-label`}>GST</span>
                <span className={`${this.props.cssName}-gst-cost`}>$ {calculateGst(parseFloat(this.props.totalCost)).toFixed(2)}</span>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12} className='text-right'>
                <span className={`${this.props.cssName}-total-label`}>Total</span>
                <span className={`${this.props.cssName}-total-cost`}>
                  $ { calculateTotalIncludingGst(this.props.totalCost).toFixed(2) || '0.00'}
                </span>
                <Field name='totalCostErr' component={totalCost => {
                  return (<div>
                    { totalCost.meta.invalid && <span className='error-message'>{totalCost.meta.error}</span> }
                  </div>)
                }} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

CostsForAnaesthetist.propTypes = {
  change: React.PropTypes.func,
  cssName: React.PropTypes.string,
  links: React.PropTypes.array,
  totalCost: React.PropTypes.number
}

CostsForAnaesthetist.defaultProps = {
  // cssName: 'associated-costs'
}

const CostsForAnaesthetistReduxForm = reduxForm({
  form: 'requestPayment'
})(CostsForAnaesthetist)

export default CostsForAnaesthetistReduxForm
