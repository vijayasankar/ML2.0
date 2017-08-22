import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { Field } from 'redux-form'

class DateTimePickerField extends React.Component {
  constructor (props) {
    super(props)
    this.renderDateTimePicker = this.renderDateTimePicker.bind(this)
  }

  renderDateTimePicker ({
    input: { onChange, value },
    meta: { error, warning, dirty, pristine },
    ...rest
  }) {
    const props = {
      format: 'DD/MM/YYYY',
      onChange: onChange,
      placeholder: 'DD / MM / YYYY',
      time: false,
      value: (pristine && !dirty) ? null : value,
      ...((this.props.fromToday) && { min: new Date() }),
      ...((this.props.untilToday) && { max: new Date() })
    }
    console.log('props', this.props)
    console.log('warning', warning)
    console.log('error', error)
    return (
      <FormGroup validationState={(error) ? 'error' : null}>
        <DateTimePicker {...props} />
        {(error && <span className={`error-message ${rest.classNameError}`}>{error}</span>) ||
         (warning && <span className={`warning-message ${rest.classNameWarning}`}>{warning[0]}<b>{warning[1]}</b><span className={`warning-message ${rest.classNameWarning} nib-number`}>{warning[2]}</span></span>)}
      </FormGroup>
    )
  }

  render () {
    return (
      <div className={classnames(
        `${this.props.cssName}-field-wrapper`,
        `is-${this.props.name}`,
        { 'has-no-label': this.props.hasNoLabel }
      )}>
        <Field
          className={`${this.props.cssName}-form-group-datetime-picker is-${this.props.name}`}
          classNameError={`${this.props.cssName}-form-group-error is-${this.props.name}`}
          classNameWarning={`${this.props.cssName}-form-group-warning is-${this.props.name}`}
          component={this.renderDateTimePicker}
          name={this.props.fieldName}
          onChange={this.props.onChange}
        />
      </div>
    )
  }
}

DateTimePickerField.propTypes = {
  cssName: PropTypes.string,
  fieldName: PropTypes.string,
  fromToday: PropTypes.bool,
  hasNoLabel: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  untilToday: PropTypes.bool
}

export default DateTimePickerField
