import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import { integerNoDecimal } from './../../utils/helpers'

class NumberDialField extends React.Component {
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.props.change(this.props.fieldName, this.props.value)
    }
  }

  renderTextInput ({ input, controlId, name, meta: { touched, error, warning }, ...rest }) {
    // ------------------------------------------------------------------------
    // #providerportal
    // ------------------------------------------------------------------------
    return (
      <FormGroup controlId={controlId} validationState={(error) ? 'error' : null}>
        <FormControl {...input}
          className={rest.className}
          placeholder={rest.placeholder}
          type='text'
        />
        <button
          className={`input-button is-minus ${rest.componentCssName}-form-group-input-button is-${rest.componentName}`}
          onClick={rest.handleMinusClick}
        >
          <img src='/providerportal/img/icon-minus-grey.svg' alt='minus' width='14' height='14' />
        </button>
        <button
          className={`input-button is-plus ${rest.componentCssName}-form-group-input-button is-${rest.componentName}`}
          onClick={rest.handlePlusClick}
        >
          <img src='/providerportal/img/icon-plus-grey.svg' alt='plus' width='14' height='14' />
        </button>
        {(error && <span className='error-message'>{error}</span>)}
      </FormGroup>
    )
  }

  render () {
    return (
      <div
        className={`${this.props.cssName}-field-wrapper is-${this.props.name}`}
      >
        <Field
          className={`input-button-text ${this.props.cssName}-form-group-input-text is-${this.props.name}`}
          component={this.renderTextInput}
          name={this.props.fieldName}
          componentName={this.props.name}
          componentCssName={this.props.cssName}
          onChange={this.props.handleTextChange}
          handleMinusClick={this.props.handleMinusClick}
          handlePlusClick={this.props.handlePlusClick}
          placeholder={this.props.placeholderText}
          type='text'
          normalize={integerNoDecimal}
        />
      </div>
    )
  }
}

NumberDialField.propTypes = {
  change: PropTypes.func,
  cssName: PropTypes.string,
  fieldName: PropTypes.string,
  handleMinusClick: PropTypes.func,
  handlePlusClick: PropTypes.func,
  handleTextChange: PropTypes.func,
  name: PropTypes.string,
  placeholderText: PropTypes.string,
  value: PropTypes.string
}

export default NumberDialField
