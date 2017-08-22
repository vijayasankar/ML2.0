import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { Field } from 'redux-form'

class CheckboxField extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {
    return (
      <div className={classnames(
        'checkbox',
        `${this.props.cssName}-form-group`,
        `is-${this.props.name}`,
        { 'has-no-label': this.props.hasNoLabel }
      )}>
        <Field
          component='input'
          id={`${this.props.name}-${this.props.value}`}
          name={`${this.props.fieldName}`}
          type='checkbox'
          value={this.props.value}
        />
        <label htmlFor={`${this.props.name}-${this.props.value}`}>{this.props.children}</label>
      </div>
    )
  }
}

CheckboxField.propTypes = {
  children: PropTypes.any.isRequired,
  cssName: PropTypes.string,
  fieldName: PropTypes.string,
  hasNoLabel: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string
}

export default CheckboxField
