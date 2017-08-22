import Col from 'react-bootstrap/lib/Col'
import DollarTextField from 'components/DollarTextWithTwoDecimalsField'
import RadioGroupField from 'components/RadioGroupField'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import TypeaheadField from 'components/TypeaheadField'
import classnames from 'classnames'
import { Field, FieldArray, arrayRemoveAll, reduxForm } from 'redux-form'
import { calculateTotalIncludingGst, calculateGst, roundTwoDecimal } from 'utils/helpers'

export class CostsForHospital extends React.Component {
  constructor (props) {
    super(props)
    this.renderOtherCosts = this.renderOtherCosts.bind(this)
    this.renderOtherProcedures = this.renderOtherProcedures.bind(this)
    this.state = {
      otherCosts: [],
      otherProcedures: []
    }
  }

  componentDidMount () {
    this.props.change('location', 'NotApplicable')
    this.props.loadRequestPaymentCostList()
  }

  renderOtherCosts ({ fields, meta: { touched, error, submitFailed }, ...rest }) {
    return (
      <div>
        { fields.map((member, index) => (
          <div key={index}>
            <Row>
              <Col xs={12} md={6}>
                <span className={`${this.props.cssName}-label`}>
                  {`${this.state.otherCosts[index].key}`}
                </span>
              </Col>
              <Col xs={12} md={3}>
                <div className={`${this.props.cssName}-form-group`}>
                  <div
                    className={classnames(
                      `${this.props.cssName}-form-group-trigger`,
                      'form-link-icon',
                      'is-remove'
                    )}
                    title='Remove'
                    onClick={(event) => {
                      this.setState({
                        otherCosts: [
                          ...this.state.otherCosts.slice(0, index),
                          ...this.state.otherCosts.slice(index + 1)
                        ]
                      })
                      return fields.remove(index)
                    }}
                  />
                </div>
              </Col>
              <Col xs={12} md={3}>
                <DollarTextField
                  cssName={this.props.cssName}
                  fieldName='otherCost'
                  member={member}
                  name='other-cost'
                  placeholderText='$ 0.00'
                />
              </Col>
            </Row>
            <hr className='form-section-repeat-divider' />
          </div>
        ))}
        <Row className='pb-4'>
          <Col xs={12} md={6}>
            <div
              className={classnames(
                'select-wrapper',
                `${this.props.cssName}-select-wrapper`,
                'is-cost'
              )}
            >
              <select
                value={`${this.state.otherCosts}`}
                onChange={(event) => {
                  this.setState({
                    otherCosts: [...this.state.otherCosts, {
                      key: event.target.options[event.target.selectedIndex].text,
                      claimCostTypeId: event.target.value
                    }]
                  })
                  return fields.push({
                    // id: this.state.otherCosts.length,
                    key: event.target.options[event.target.selectedIndex].text,
                    claimCostTypeId: event.target.value
                  })
                }}
              >
                <option value=''>Add another cost</option>
                {
                  this.props.list.length > 0 && this.props.list.map((item, index) => {
                    return (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    )
                  })
                }
              </select>
            </div>
            {(touched || submitFailed) && error && <span>{error}</span>}
          </Col>
        </Row>
      </div>
    )
  }

  renderOtherProcedures ({ fields, meta: { touched, error, submitFailed } }) {
    return (
      <div>
        { fields.map((member, index) => (
          <div key={index}>
            <Row>
              <Col xs={12} md={6}>
                <TypeaheadField
                  {...this.props}
                  cssName={this.props.cssName}
                  fieldName='otherProcedure'
                  links={(
                    Array.isArray(this.props.primaryProcedure) &&
                    this.props.primaryProcedure.length > 0 &&
                    this.props.primaryProcedure[0].links
                  ) || []}
                  member={member}
                  name='otherProcedure'
                  placeholderText={`Other procedure ${index + 1}`}
                  section='otherProcedure'
                  stateValue={(this.state.otherProcedures[index] && this.state.otherProcedures[index].name) || ''}
                  onChange={(event, value) => {
                    if (value) {
                      this.setState({
                        otherProcedures: [
                          ...this.state.otherProcedures.slice(0, index),
                          value[0],
                          ...this.state.otherProcedures.slice(index + 1)
                        ]
                      })
                    }
                  }}
                />
              </Col>
              <Col xs={12} md={3}>
                <div className={`${this.props.cssName}-form-group`}>
                  <div
                    className={classnames(
                      `${this.props.cssName}-form-group-trigger`,
                      'form-link-icon',
                      'is-remove'
                    )}
                    title='Remove'
                    onClick={(event) => {
                      this.setState({
                        otherProcedures: [
                          ...this.state.otherProcedures.slice(0, index),
                          ...this.state.otherProcedures.slice(index + 1)
                        ]
                      })
                      return fields.remove(index)
                    }}
                  />
                </div>
              </Col>
              <Col xs={12} md={3}>
                <DollarTextField
                  cssName={this.props.cssName}
                  fieldName='specialistCost'
                  member={member}
                  name='specialist-cost'
                  placeholderText='$ Specialist cost'
                />
              </Col>
            </Row>
            <hr className='form-section-repeat-divider' />
          </div>
        ))}
        <Row>
          <Col xs={12} md={6}>
            <a href='#' className={`form-link-plus ${this.props.cssName}-form-link is-add-another-procedure`}
              onClick={(event) => {
                event.preventDefault()
                this.setState({
                  otherProcedures: [...this.state.otherProcedures, '']
                })
                return fields.push({})
              }}
            >Add another procedure</a>
            {(touched || submitFailed) && error && <span>{error}</span>}
          </Col>
        </Row>
      </div>
    )
  }

  render () {
    console.log('STATE: ', this.state)
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
                  Primary procedure
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
                  onInputChange={() => {
                    return this.props.dispatch(
                      arrayRemoveAll('requestPayment', 'otherProcedures')
                    )
                  }}
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
              <Col xs={9} md={9}><span className={`${this.props.cssName}-label`}>Operating theatre</span></Col>
              <Col xs={3} md={3}>
                <DollarTextField
                  cssName={this.props.cssName}
                  fieldName='operatingTheatreCost'
                  name='operating-theatre-cost'
                  placeholderText='$ 0.00'
                />
              </Col>
            </Row>
            <hr className='form-section-repeat-divider' />
            <Row>
              <Col xs={9} md={9}><span className={`${this.props.cssName}-label`}>Radiology</span></Col>
              <Col xs={3} md={3}>
                <DollarTextField
                  cssName={this.props.cssName}
                  fieldName='radiologyCost'
                  name='radiology-cost'
                  placeholderText='$ 0.00'
                />
              </Col>
            </Row>
            <hr className='form-section-repeat-divider' />
            <Row>
              <Col xs={9} md={9}><span className={`${this.props.cssName}-label`}>Hospital</span></Col>
              <Col xs={3} md={3}>
                <DollarTextField
                  cssName={this.props.cssName}
                  fieldName='hospitalCost'
                  name='hospital-cost'
                  placeholderText='$ 0.00'
                />
              </Col>
            </Row>
            <hr className='form-section-repeat-divider' />
            <Row>
              <Col xs={9} md={9}>
                <span className={`${this.props.cssName}-label`}>
                  Specialist
                  {' '}
                  <em>(if not separately claimed by provider)</em>
                </span>
              </Col>
              <Col xs={3} md={3}>
                <DollarTextField
                  cssName={this.props.cssName}
                  fieldName='specialistCost'
                  name='specialist-cost'
                  placeholderText='$ 0.00'
                />
              </Col>
            </Row>
            <hr className='form-section-repeat-divider' />
            <Row>
              <Col xs={9} md={9}><span className={`${this.props.cssName}-label`}>Consultation</span></Col>
              <Col xs={3} md={3}>
                <DollarTextField
                  cssName={this.props.cssName}
                  fieldName='consultationCost'
                  name='consultation-cost'
                  placeholderText='$ 0.00'
                />
              </Col>
            </Row>
            <hr className='form-section-repeat-divider' />
            <Row>
              <Col xs={9} md={9}><span className={`${this.props.cssName}-label`}>
                  Anaesthetist
                  {' '}
                  <em>(if not separately claimed by provider)</em>
                  </span></Col>
              <Col xs={3} md={3}>
                <DollarTextField
                  cssName={this.props.cssName}
                  fieldName='anaesthetistCost'
                  name='anaesthetist-cost'
                  placeholderText='$ 0.00'
                />
              </Col>
            </Row>
            <hr className='form-section-repeat-divider' />
            <Row>
              <Col xs={4} md={4}><span className={`${this.props.cssName}-label`}>Prosthesis</span></Col>
              <Col xs={5} md={5}>
                <TypeaheadField
                  cssName={this.props.cssName}
                  fieldName='prosthesisDescr'
                  links={this.props.links}
                  name='prosthesis-description'
                  placeholderText='Prosthesis description'
                  section='prosthesisDescr'
                />
              </Col>
              <Col xs={3} md={3}>
                <DollarTextField
                  cssName={`${this.props.cssName}-prosthesis-cost`}
                  fieldName='prosthesisCost'
                  name='prosthesisCost'
                  placeholderText='$ 0.00'
                />
              </Col>
            </Row>
            <hr className='form-section-repeat-divider' />
            {/* Repeating - Start */}
            <FieldArray name='otherCosts' component={this.renderOtherCosts} />
            <Row>
              <Col xs={12} md={12}>
                <h4 className={`${this.props.cssName}-form-section-title`}>
                  Other procedures (Excluding GST)
                </h4>
              </Col>
            </Row>
            {/* Repeating - Start */}
            <FieldArray name='otherProcedures' component={this.renderOtherProcedures} />
            {/* Repeating - End */}
            <hr className='form-section-repeat-divider' />
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

CostsForHospital.propTypes = {
  change: React.PropTypes.func,
  cssName: React.PropTypes.string,
  dispatch: React.PropTypes.func,
  links: React.PropTypes.array,
  list: React.PropTypes.array,
  loadRequestPaymentCostList: React.PropTypes.func,
  primaryProcedure: React.PropTypes.array,
  totalCost: React.PropTypes.number
}

CostsForHospital.defaultProps = {
  // cssName: 'associated-costs'
}

const CostsForHospitalReduxForm = reduxForm({
  form: 'requestPayment'
})(CostsForHospital)

export default CostsForHospitalReduxForm
