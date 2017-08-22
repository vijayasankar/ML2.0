import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { Field } from 'redux-form'
import { integerWithTwoDecimal, formatDollar } from './../../utils/helpers'

class DollarTextWithTwoDecimalField extends React.Component {
  constructor (props) {
    super(props)
    this.renderTextInput = this.renderTextInput.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      this.props.change(this.props.name, this.props.value)
    }
  }

  renderTextInput ({
    input,
    controlId,
    meta: { touched, error, warning },
    ...rest
  }) {
    return (
      <FormGroup controlId={controlId} validationState={(error) ? 'error' : null}>
        <FormControl {...input} {...rest} />
        {(error && <span className='error-message'>{error}</span>)}
      </FormGroup>
    )
  }

  render () {
    return (
      <div
        className={classnames(
          `${this.props.cssName}-field-wrapper`,
          `is-${this.props.name}`,
          { 'has-no-label': this.props.hasNoLabel }
        )}
      >
        <Field
          name={(this.props.member)
          ? `${this.props.member}.${this.props.fieldName}`
          : `${this.props.fieldName}`}
          className={classnames(
            `${this.props.cssName}-form-group-input`,
            ` is-${this.props.name}`,
            'text-right'
          )}
          component={this.renderTextInput}
          format={formatDollar}
          maxLength='12'
          normalize={integerWithTwoDecimal}
          placeholder={this.props.placeholderText}
          type='text'
        />
      </div>
    )
  }
}

DollarTextWithTwoDecimalField.propTypes = {
  change: PropTypes.func,
  cssName: PropTypes.string,
  fieldName: PropTypes.string,
  hasNoLabel: PropTypes.bool,
  member: PropTypes.string,
  name: PropTypes.string,
  placeholderText: PropTypes.string,
  value: PropTypes.string
}

export default DollarTextWithTwoDecimalField
