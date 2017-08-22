// import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Col from 'react-bootstrap/lib/Col'
import DateTimePickerField from 'components/DateTimePickerField'
import DollarTextField from 'components/DollarTextField'
import Moment from 'moment'
import NumberDialField from 'components/NumberDialField'
import RadioGroupField from 'components/RadioGroupField'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import TypeaheadField from 'components/TypeaheadField'
import classnames from 'classnames'
import { FieldArray, arrayRemoveAll, reduxForm } from 'redux-form'
import { stepCounter, roundToNearest } from 'utils/helpers.js'

export class RequestPreApprovalProcedureCost extends React.Component {
  constructor (props) {
    super(props)
    this.renderOtherProcedures = this.renderOtherProcedures.bind(this)
    this.otherProcedures = []
    this.specialistNames = []
    this.shouldDefaultNameOfSpecialist = true
    this.state = {
      hospitalTime: '',
      theatreTime: '',
      removingOtherProceduresRow: false,
      otherProceduresFocusIdx: -1,
      specialistNamesFocusIdx: -1
    }
  }

  componentDidMount () {
    this.props.change('location', 'NotApplicable')
  }

  renderOtherProcedures ({ fields, meta: { touched, error, submitFailed } }) {
    return (
      <div>
        { fields.map((member, index) => {
          /* deal with other procedure field */
          this.procedureElementRef || (this.procedureElementRef = [])
          const currentProcedureOpts = {}
          if (this.otherProcedures[index] && this.otherProcedures[index].name) {
            // currentProcedureOpts['default'] = [this.otherProcedures[index]]
            const valueInTypeahead = this.procedureElementRef[index].props.value

            if (Array.isArray(valueInTypeahead) && valueInTypeahead.length === 1 &&
              valueInTypeahead[0].id === this.otherProcedures[index].id) {
            } else {
              setTimeout(() => {
                if (this.procedureElementRef[index]) {
                  this.procedureElementRef[index].getInstance()._handleTextChange(
                    this.otherProcedures[index].name)
                  if (index !== this.state.otherProceduresFocusIdx) {
                    this.procedureElementRef[index].getInstance()._hideDropdown()
                  }
                }
              }, 0)
            }
          }

          /* deal with specialist field */
          this.specialistElementRef || (this.specialistElementRef = [])
          const currentSpecialistOpts = {}
          if (this.specialistNames[index] && this.specialistNames[index].name && this.specialistElementRef[index] &&
          (this.specialistElementRef !== null)) {
            // currentSpecialistOpts['stateValue'] = [this.specialistNames[index]]
            const valueInTypeahead = this.specialistElementRef[index].props.value

            if (Array.isArray(valueInTypeahead) && valueInTypeahead.length === 1 &&
              valueInTypeahead[0].id === this.specialistNames[index].id) {
            } else {
              setTimeout(() => {
                if (Boolean(this.specialistElementRef[index]) && Boolean(this.specialistNames[index])) {
                  this.specialistElementRef[index].getInstance()._handleTextChange(
                    this.specialistNames[index].name)
                  if (index !== this.state.specialistNamesFocusIdx) {
                    this.specialistElementRef[index].getInstance()._hideDropdown()
                  }
                }
              }, 0)
            }
          } else {
            currentSpecialistOpts['stateValue'] = this.specialistNames[index]
            setTimeout(() => {
              if (Boolean(this.specialistElementRef[index]) && Boolean(this.specialistNames[index]) &&
              (this.specialistNames[index] !== undefined)) {
                this.specialistElementRef[index].getInstance()._handleTextChange(
                  this.props.currentProvider.name)
                if (index !== this.state.specialistNamesFocusIdx) {
                  this.specialistElementRef[index].getInstance()._hideDropdown()
                }
                // setTimeout(() => {
                //   this.specialistElementRef[index]._handleChange([this.props.currentProvider])
                // }, 500)
              }
            }, 0)
          }

          // last item, unlock to empower onChange, clear focus index
          if (index + 1 >= fields.length) {
            setTimeout(() => {
              this.setState({ removingOtherProceduresRow: false })
            }, 0)
          }
          setTimeout(() => {
            this.setState({
              otherProceduresFocusIdx: -1,
              specialistNamesFocusIdx: -1
            })
          }, 20)
          // UF-222 cause: inputRef={(el) => { this.specialistElementRef[index] = el } inside TypeaheadField for name of specialist

          return (
            <div key={index}>
              <Row className='pb-1'>
                <Col xs={12} md={6}>
                  <label>Other procedure</label>
                  <TypeaheadField
                    {...currentProcedureOpts}
                    {...this.props}
                    cssName={this.props.cssName}
                    fieldName='otherProcedure'
                    links={(
                      Array.isArray(this.props.primaryProcedure) &&
                      this.props.primaryProcedure.length > 0 &&
                      this.props.primaryProcedure[0].links
                    ) || []}
                    member={member}
                    name='other-procedure'
                    placeholderText={`Other procedure ${index + 1}`}
                    section='otherProcedure'
                    inputRef={(el) => { this.procedureElementRef[index] = el }}
                    onChange={(event, value) => {
                      // rows are being removed, do not update
                      if (this.state.removingOtherProceduresRow) return

                      this.otherProcedures = [
                        ...this.otherProcedures.slice(0, index),
                        value ? value[0] : {},
                        ...this.otherProcedures.slice(index + 1)
                      ]

                      this.setState({ otherProceduresFocusIdx: -1 })
                    }}
                    onFocus={(...args) => {
                      setTimeout(() => {
                        this.setState({ otherProceduresFocusIdx: index })
                      }, 0)
                    }}
                  />
                </Col>
                <Col xs={12} md={3}>
                  <div className={`${this.props.cssName}-form-group has-no-label`}>
                    <div
                      className={classnames(
                        `${this.props.cssName}-form-group-trigger`,
                        'form-link-icon',
                        'is-remove'
                      )}
                      title='Remove'
                      onClick={(event) => {
                        this.otherProcedures = [
                          ...this.otherProcedures.slice(0, index),
                          ...this.otherProcedures.slice(index + 1)
                        ]
                        this.specialistNames = [
                          ...this.specialistNames.slice(0, index),
                          ...this.specialistNames.slice(index + 1)
                        ]
                        this.setState({
                          removingOtherProceduresRow: true
                        })

                        if (index < fields.length) {
                          setTimeout(() => {
                            for (let i = fields.length - 1; i >= index; i--) {
                              if (this.procedureElementRef[i]) {
                                this.procedureElementRef[i].getInstance().clear()
                              }

                              if (this.specialistElementRef[i]) {
                                this.specialistElementRef[i].getInstance().clear()
                              }
                            }
                          }, 0)
                        }

                        // console.log('remove:index', index)
                        return fields.remove(index)
                      }}
                    />
                  </div>
                </Col>
                <Col xs={12} md={3}>
                  <DollarTextField
                    cssName={this.props.cssName}
                    fieldName='specialistCost'
                    hasNoLabel
                    member={member}
                    name='specialist-cost'
                    placeholderText='$ Specialist cost'
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <label>Name of specialist</label>
                  <TypeaheadField
                    {...currentSpecialistOpts}
                    {...this.props}
                    cssName={this.props.cssName}
                    fieldName='nameOfSpecialist'
                    links={this.props.links}
                    member={member}
                    inputRef={(el) => { this.specialistElementRef[index] = el }}
                    name='name-of-specialist'
                    placeholderText={`Name of specialist ${index + 1}`}
                    section='nameOfSpecialist'
                    onChange={(event, value) => {
                      // rows are being removed, do not update
                      if (this.state.removingOtherProceduresRow) return

                      this.specialistNames = [
                        ...this.specialistNames.slice(0, index),
                        value ? value[0] : {},
                        ...this.specialistNames.slice(index + 1)
                      ]

                      this.setState({ specialistNamesFocusIdx: -1 })
                    }}
                    onFocus={(...args) => {
                      this.setState({ specialistNamesFocusIdx: -1 })
                    }}
                  />
                </Col>
              </Row>
              <hr className='form-section-repeat-divider' />
            </div>
          )
        }) }
        <Row>
          <Col xs={12} md={6}>
            <a href='#' className={`form-link-plus ${this.props.cssName}-form-link is-add-another-procedure`}
              onClick={(event) => {
                event.preventDefault()
                this.otherProcedures = [...this.otherProcedures, undefined]
                this.specialistNames = [...this.specialistNames, this.props.currentProvider]
                return fields.push({})
              }}
            >Add another procedure</a>
            {(touched || submitFailed) && error && <span>{error}</span>}
          </Col>
        </Row>
      </div>
    )
  }

  handleClick (time, type, step) {
    console.log('handleClick:+')
    if (type === '-') {
      if (time === 'hospital') {
        this.setState(prevState => {
          console.log('prevState:hospital')
          console.log(prevState.hospital)
          if (
            prevState.hospitalTime === 0 ||
            prevState.hospitalTime === 1 ||
            parseInt(prevState.hospitalTime, 10) <= 1 ||
            prevState.hospitalTime === '' ||
            prevState.hospitalTime === '0' ||
            prevState.hospitalTime === '1'
          ) {
            return {
              hospitalTime: ''
            }
          }
          return {
            hospitalTime:
              (prevState.hospitalTime > 1)
                ? stepCounter(type, prevState.hospitalTime, step, true)
                : 1
          }
        })
      } else if (time === 'theatre') {
        this.setState(prevState => {
          console.log('prevState:theatreTime')
          console.log(prevState.theatreTime)
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
      }
    } else if (type === '+') {
      if (time === 'hospital') {
        this.setState(prevState => ({
          hospitalTime: stepCounter(type, prevState.hospitalTime || 0, step, true)
        }))
      } else if (time === 'theatre') {
        this.setState(prevState => ({
          theatreTime: roundToNearest(type, prevState.theatreTime || 0, step, true)
        }))
      }
    }
  }

  textChange (event, time) {
    if (parseInt(event.target.value, 10) < 1) return
    if (time === 'hospital') {
      this.setState(prevState => ({
        hospitalTime: event.target.value
      }))
    } else if (time === 'theatre') {
      this.setState(prevState => ({
        theatreTime: event.target.value
      }))
    }
  }

  render () {
    const opts = {}
    if (this.shouldDefaultNameOfSpecialist && this.props.currentProvider && this.props.currentProvider.name) {
      // opts['stateValue'] = this.props.currentProvider

      // eslint-disable-next-line
      const currentNameOfSpecialistFormValue = this.props.nameOfSpecialistFormValue
      if (Array.isArray(currentNameOfSpecialistFormValue) && currentNameOfSpecialistFormValue.length === 0) {
        this.shouldDefaultNameOfSpecialist = false
      } else {
        if (this.nameOfSpecialist) {
          opts['stateValue'] = this.props.currentProvider
          setTimeout(() => {
            this.nameOfSpecialist.getInstance()._handleTextChange(
              this.props.currentProvider.name)
            this.nameOfSpecialist.getInstance()._hideDropdown()

            // setTimeout(() => {
            //   this.nameOfSpecialist._handleChange([this.props.currentProvider])
            // }, 500)

            this.shouldDefaultNameOfSpecialist = false
          }, 0)
        }
      }
    }

    return (
      <div className={`${this.props.cssName}`}>
        <Row>
          <Col xs={12} md={3}>
            <h3 className={`${this.props.cssName}-form-title`}>Procedure cost</h3>
          </Col>
          <Col xs={12} md={9}>
            <Row>
              <Col xs={12} md={12}>
                <h4 className={`${this.props.cssName}-form-section-title`}>
                  Primary procedure (including GST)
                </h4>
              </Col>
            </Row>
            <Row className='pb-1'>
              <Col xs={12} md={6}>
                <TypeaheadField
                  cssName={this.props.cssName}
                  fieldName='primaryProcedure'
                  links={this.props.links}
                  name='primary-procedure'
                  onInputChange={() => {
                    this.otherProcedures = []
                    this.specialistNames = []
                    return this.props.dispatch(
                      arrayRemoveAll('requestPreApproval', 'otherProcedures')
                    )
                  }}
                  placeholderText='Primary procedure'
                  section='primaryProcedure'
                />
              </Col>
              <Col xs={12} md={3}>
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
              </Col>
              <Col xs={12} md={3}>
                <DollarTextField
                  cssName={this.props.cssName}
                  fieldName='specialistCost'
                  name='specialist-cost'
                  placeholderText='$ Specialist cost'
                />
              </Col>
            </Row>
            {/* Other - Start */}
            <Row className='pb-1'>
              <Col xs={12} md={6}>
                <label>Proposed date of procedure</label>
                <DateTimePickerField
                  cssName={this.props.cssName}
                  fieldName='proposedDateOfProcedure'
                  name='proposed-date-of-procedure'
                  fromToday
                />
              </Col>
            </Row>
            <Row className='pb-1'>
              <Col xs={12} md={6}>
                <label>Name of specialist</label>
                <TypeaheadField
                  cssName={this.props.cssName}
                  fieldName='nameOfSpecialist'
                  links={this.props.links}
                  name='name-of-specialist'
                  placeholderText='Name of specialist'
                  section='nameOfSpecialist'
                  inputRef={(el) => { this.nameOfSpecialist = el }}
                  {...opts}
                  {...this.props}
                />
              </Col>
            </Row>
            {/* Other - End */}
            <hr className='form-section-divider' />
            <Row className='pb-1'>
              <Col xs={12} md={3}>
                <label>Hospital time</label>
                <NumberDialField
                  change={this.props.change}
                  cssName={`${this.props.cssName}`}
                  fieldName='hospitalTime'
                  name='hospital-time'
                  placeholderText='Nights'
                  value={`${this.state.hospitalTime}`}
                  handleMinusClick={() => this.handleClick('hospital', '-', 1)}
                  handlePlusClick={() => this.handleClick('hospital', '+', 1)}
                  handleTextChange={(event) => this.textChange(event, 'hospital')}
                />
              </Col>
              <Col xs={12} md={3}>
                <label>Shared room?</label>
                <RadioGroupField
                  cssName={`${this.props.cssName}`}
                  fieldName='sharedRoom'
                  name='shared-room'
                  radioList={[
                    { text: 'No', value: 'No' },
                    { text: 'Yes', value: 'Yes' }
                  ]}
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
                  placeholderText='Minutes'
                  value={`${this.state.theatreTime}`}
                  handleMinusClick={() => this.handleClick('theatre', '-', 15)}
                  handlePlusClick={() => this.handleClick('theatre', '+', 15)}
                  handleTextChange={(event) => this.textChange(event, 'theatre')}
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
            <Row className='pb-1'>
              <Col xs={12} md={6}>
                <label>Date of onset</label>
                <div
                  className={`${this.props.cssName}-form-group is-date-of-onset`}
                >
                  <DateTimePickerField
                    cssName={this.props.cssName}
                    fieldName='dateOfOnset'
                    name='date-of-onset'
                    untilToday
                  />
                </div>
              </Col>
            </Row>
            <Row className='pb-4'>
              <Col xs={12} md={6}>
                <label>Name of hospital</label>
                <TypeaheadField
                  cssName={this.props.cssName}
                  fieldName='nameOfHospital'
                  links={this.props.links}
                  name='name-of-hospital'
                  placeholderText='Hospital name'
                  section='nameOfHospital'
                />
              </Col>
            </Row>
            <Row className='pb-1'>
              <Col xs={12} md={12}>
                <h4 className={`${this.props.cssName}-form-section-title`}>
                  Other procedure (including GST)
                </h4>
              </Col>
            </Row>
            {/* Repeating - Start */}
            <FieldArray name='otherProcedures' component={this.renderOtherProcedures} />
            {/* Repeating - End */}
          </Col>
        </Row>
      </div>
    )
  }
}

RequestPreApprovalProcedureCost.propTypes = {
  change: React.PropTypes.func,
  cssName: React.PropTypes.string,
  currentProvider: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  links: React.PropTypes.array,
  primaryProcedure: React.PropTypes.array
}

RequestPreApprovalProcedureCost.defaultProps = {
  cssName: 'request-pre-approval'
}

const RequestPreApprovalProcedureCostReduxForm = reduxForm({
  form: 'requestPreApproval'
})(RequestPreApprovalProcedureCost)

export default RequestPreApprovalProcedureCostReduxForm
