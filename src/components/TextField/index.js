import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import { alphanumericOnly, integerNoDecimal } from 'utils/helpers'

class TextField extends React.Component {
  constructor (props) {
    super(props)
    this.handleClearTextInput = this.handleClearTextInput.bind(this)
    this.renderTextInput = this.renderTextInput.bind(this)
  }

  handleClearTextInput (event) {
    this.props.change(this.props.fieldName, '')
  }

  renderTextInput ({ input, controlId, name, meta: { touched, error, warning }, ...rest }) {
    return (
      <FormGroup controlId={controlId} validationState={(error) ? 'error' : null}>
        {input.value !== '' &&
          <span
            className={`text-input-clear-trigger ${this.props.cssName}-form-group-clear-trigger is-${this.props.name}`}
            onClick={this.handleClearTextInput}
          />
        }
        <FormControl {...input}
          className={rest.className}
          placeholder={rest.placeholder}
          type='text'
        />
        {(
          (typeof error === 'string' || error instanceof String) &&
            <span className={`error-message ${rest.classNameError}`}>{error}</span>
          )}
      </FormGroup>
    )
  }

  render () {
    return (
      <div
        className={`${this.props.cssName}-field-wrapper is-${this.props.name}`}
      >
        <Field
          change={this.props.change}
          className={`${this.props.cssName}-form-group-input-text is-${this.props.name}`}
          classNameError={`${this.props.cssName}-form-group-error is-${this.props.name}`}
          component={this.renderTextInput}
          componentCssName={this.props.cssName}
          componentName={this.props.name}
          name={this.props.fieldName}
          normalize={this.props.normalize || undefined}
          placeholder={this.props.placeholderText}
          onChange={this.props.onChange}
          type='text'
        />
      </div>
    )
  }
}

TextField.propTypes = {
  change: PropTypes.func,
  cssName: PropTypes.string,
  fieldName: PropTypes.string,
  name: PropTypes.string,
  normalize: PropTypes.func,
  onChange: PropTypes.func,
  placeholderText: PropTypes.string
}

export default TextField
