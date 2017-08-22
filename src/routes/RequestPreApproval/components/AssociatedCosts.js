import Col from 'react-bootstrap/lib/Col'
import DollarTextField from 'components/DollarTextField'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import React from 'react'
import Row from 'react-bootstrap/lib/Row'
import TextField from 'components/TextField'
import TypeaheadField from 'components/TypeaheadField'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import { Field, reduxForm } from 'redux-form'

export class AssociatedCosts extends React.Component {
  constructor (props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.renderMenuItemChildren = this.renderMenuItemChildren.bind(this)
  }

  handleSearch (query) {
    console.debug('===> _handleSearch:', query, this.props)
    if (!query) {
      return
    }
    this.props.searchProstheses(query)
  }

  renderMenuItemChildren (option, props, index) {
    // console.debug('===> _renderMenuItemChildren:', option, props, index)
    return (
      <div>
        <span>{option.name}</span>
      </div>
    )
  }

  render () {
    const {
      cssName,
      prosthesesOptions,
      totalCost
    } = this.props

    return (
      <div className={`${this.props.cssName}`}>
        <Row>
          <Col xs={12} md={3}>
            <h3 className={`${this.props.cssName}-form-title`}>Associated costs</h3>
          </Col>
          <Col xs={12} md={9}>
            <Row>
              <Col xs={12} md={12}>
                <h4 className={`${this.props.cssName}-form-section-title`}>
                  Cost (including GST)
                </h4>
              </Col>
            </Row>
            <Row>
              <Col xs={9} md={9}><span className={`${cssName}-label`}>Operating theatre</span></Col>
              <Col xs={3} md={3}>
                <DollarTextField
                  cssName={`${cssName} is-theatre-cost`}
                  fieldName='operatingTheatreCost'
                  name='operating-theatre-cost'
                  placeholderText='$ 0'
                />
              </Col>
            </Row>
            <hr className='line-item' />
            <Row>
              <Col xs={9} md={9}><span className={`${cssName}-label`}>Radiology eg. X-ray, MRI, CT etc</span></Col>
              <Col xs={3} md={3}>
                <DollarTextField
                  cssName={`${cssName} is-radiology-cost`}
                  fieldName='radiologyCost'
                  name='radiology-cost'
                  placeholderText='$ 0'
                />
              </Col>
            </Row>
            <hr className='line-item' />
            <Row>
              <Col xs={9} md={9}><span className={`${cssName}-label`}>Hospital</span></Col>
              <Col xs={3} md={3}>
                <DollarTextField
                  cssName={`${cssName} is-hospital-cost`}
                  fieldName='hospitalCost'
                  name='hospital-cost'
                  placeholderText='$ 0'
                />
              </Col>
            </Row>
            <hr className='line-item' />
            <Row>
              <Col xs={4} md={4}><span className={`${cssName}-label`}>Prosthesis</span></Col>
              <Col xs={5} md={5}>
                {/* <TypeaheadField */}
                {/*   cssName={`${cssName} is-prosthesis-description`} */}
                {/*   fieldName='prosthesisDescription' */}
                {/*   links={this.props.links} */}
                {/*   name='prosthesis-description' */}
                {/*   placeholderText='Prosthesis description' */}
                {/*   section='primaryProcedure' */}
                {/* /> */}
                <Field name='prosthesisDescr'
                  controlId='prosthesisDescr'
                  component={renderAsyncTypeahead}
                  labelKey='name'
                  onSearch={this.handleSearch}
                  options={prosthesesOptions}
                  useCache={false}
                  placeholder='Prosthesis Description'
                  renderMenuItemChildren={this.renderMenuItemChildren}
                />
              </Col>
              <Col xs={3} md={3}>
                <DollarTextField
                  cssName={`${cssName}-prosthesis-cost`}
                  fieldName='prosthesisCost'
                  name='prosthesis-cost'
                  placeholderText='$ 0'
                />
              </Col>
            </Row>
            <hr className='line-item' />
            <Row>
              <Col xs={9} md={9}><span className={`${cssName}-label`}>Consultation (pre or post)</span></Col>
              <Col xs={3} md={3}>
                <DollarTextField
                  cssName={`${cssName}-consultation-cost`}
                  fieldName='consultationCost'
                  name='consultation-cost'
                  placeholderText='$ 0'
                />
              </Col>
            </Row>
            <hr className='line-item' />
            <Row>
              <Col xs={9} md={9}><span className={`${cssName}-label`}>Sundry</span></Col>
              <Col xs={3} md={3}>
                <DollarTextField
                  cssName={`${cssName}-sundry-cost`}
                  fieldName='sundryCost'
                  name='sundryCost'
                  placeholderText='$ 0'
                />
              </Col>
            </Row>
            <hr className='line-item' />
            <Row>
              <Col xs={4} md={4}><span className={`${cssName}-label`}>Anaesthetist</span></Col>
              <Col xs={5} md={5}>
                <TextField
                  change={this.props.change}
                  cssName={this.props.cssName}
                  fieldName='anaesthetistName'
                  name='anaesthetist-name'
                  placeholderText='Anaesthetist Name'
                />
                {/* <Field name='anaesthetistName' */}
                {/*   controlId='anaesthetistName' */}
                {/*   className={`${cssName}-anaesthetist-name`} */}
                {/*   component={renderTextInput} */}
                {/*   type='text' */}
                {/*   maxLength='50' */}
                {/*   placeholder='Anaesthetist Name' */}
                {/* /> */}
              </Col>
              <Col xs={3} md={3}>
                <DollarTextField
                  cssName={`${cssName}-anaesthetist-cost`}
                  fieldName='anaesthetistCost'
                  name='anaesthetistCost'
                  placeholderText='$ 0'
                />
              </Col>
            </Row>
            <hr className='line-item' />
            <Row>
              <Col xs={12} md={12} className='text-right'>
                <span className={`${cssName}-total-label`}>Total</span>
                <span className={`${cssName}-total-cost`}>$ {totalCost}</span>
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

// const renderTextInput = ({ input, controlId, meta: { touched, error, warning }, ...rest }) => {
//   return (
//     <FormGroup controlId={controlId} validationState={(error) ? 'error' : null}>
//       <FormControl {...input} {...rest} />
//       {(error && <span className='error-message'>{error}</span>)}
//     </FormGroup>
//   )
// }
//
const renderAsyncTypeahead = ({ input, controlId, meta: { touched, error, warning }, ...rest }) => {
  return (
    <FormGroup controlId={controlId} validationState={(error) ? 'error' : null}>
      <AsyncTypeahead {...input} {...rest}
        onBlur={(...args) => {
          // magic -- do nothing otherwise value object is overwritten by Redux Form's blur
          console.log('##### renderAsyncTypeahead BLUR', args)
        }}
      />
      {(error && <span className='error-message'>{error}</span>)}
    </FormGroup>
  )
}

AssociatedCosts.propTypes = {
  change: React.PropTypes.func,
  cssName: React.PropTypes.string,
  prosthesesOptions: React.PropTypes.array,
  links: React.PropTypes.array,
  meta: React.PropTypes.array,
  searchProstheses: React.PropTypes.func,
  totalCost: React.PropTypes.number
}

AssociatedCosts.defaultProps = {
  // cssName: 'associated-costs'
}

export default reduxForm({
  form: 'requestPreApproval'
})(AssociatedCosts)
