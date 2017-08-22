import CheckboxField from 'components/CheckboxField'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import React, { PropTypes } from 'react'
import { Field } from 'redux-form'

class DeclarationField extends React.Component {
  constructor (props) {
    super(props)
    this.renderDeclaration = this.renderDeclaration.bind(this)
  }

  renderDeclaration ({ input, controlId, name, meta: { touched, error, warning }, ...rest }) {
    return (
      <FormGroup controlId={controlId} validationState={(error) ? 'error' : null}>
        <CheckboxField
          cssName={`${this.props.cssName}-checkbox`}
          fieldName={input.name}
          name={this.props.name}
          value={this.props.value}
        >
          <span className={`checkbox-text ${this.props.cssName}-checkbox-text`}>
            {this.props.children}
          </span>
        </CheckboxField>
        {(
          (typeof error === 'string' || error instanceof String) &&
            <span className={`error-message ${rest.classNameError}`}>{error}</span>
        )}
      </FormGroup>
    )
  }

  render () {
    return (
      <div className={`${this.props.cssName}-field-wrapper is-${this.props.name}`}>
        <Field
          className={`${this.props.cssName}-form-group-input-checkbox is-${this.props.name}`}
          classNameError={`${this.props.cssName}-form-group-error is-${this.props.name}`}
          component={this.renderDeclaration}
          componentCssName={this.props.cssName}
          componentName={this.props.name}
          name={this.props.fieldName}
          value={this.props.value}
        />
      </div>
    )
  }
}

DeclarationField.propTypes = {
  children: PropTypes.any.isRequired,
  cssName: PropTypes.string,
  fieldName: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string
}

export default DeclarationField
