import React, { PropTypes } from 'react'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import classnames from 'classnames'
import { Field } from 'redux-form'

class RadioGroupField extends React.Component {
  constructor (props) {
    super(props)
    this.renderRadioGroup = this.renderRadioGroup.bind(this)
  }

  renderRadioGroup ({ input, controlId, name, meta: { touched, error, warning }, ...rest }) {
    return (
      <FormGroup controlId={controlId} validationState={(error) ? 'error' : null}>
        { this.props.radioList.map((radio, index) => (
          <div key={index} className={`button-group radio ${this.props.cssName}-form-group`}>
            <Field
              component='input'
              id={`${this.props.name}-${radio.value}`}
              name={`${this.props.fieldName}`}
              type='radio'
              value={radio.value}
            />
            <label htmlFor={`${this.props.name}-${radio.value}`}>{`${radio.text}`}</label>
          </div>
        )) }
        {(
          (typeof error === 'string' || error instanceof String) &&
            <span className={`error-message ${rest.classNameError}`}>{error}</span>
          )}
      </FormGroup>
    )
  }

  render () {
    return (
      <div className={classnames(
        `${this.props.cssName}-form-group`,
        `is-${this.props.name}`,
        `is-col-${this.props.radioList.length || 1}`,
        { 'has-no-label': this.props.hasNoLabel }
      )}>
        <Field
          className={`${this.props.cssName}-form-group-input-radio-group is-${this.props.name}`}
          classNameError={`${this.props.cssName}-form-group-error is-${this.props.name}`}
          component={this.renderRadioGroup}
          componentCssName={this.props.cssName}
          componentName={this.props.name}
          name={this.props.fieldName}
        />
      </div>
    )
  }
}

RadioGroupField.propTypes = {
  cssName: PropTypes.string,
  fieldName: PropTypes.string,
  hasNoLabel: PropTypes.bool,
  name: PropTypes.string,
  radioList: PropTypes.array
}

export default RadioGroupField
