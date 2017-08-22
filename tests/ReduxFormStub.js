import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm, reducer as formReducer} from 'redux-form';

import ProviderStub from './ProviderStub';

let Form = props => (
<form>
{props.children}
</form>
);

Form.propTypes = {
  children: PropTypes.node.isRequired
};

Form = reduxForm(
  {
    form: 'testForm'
  }
)(
  connect()(Form)
);

const TestForm = props => {
  const form = props.state && props.state.form || {};
  const state = Object.assign({}, props.state, {form: formReducer(form)});
  return (
    <ProviderStub state={state}>
      <Form>
        {React.cloneElement(props.children, {...props.fieldComponentProps})}
      </Form>
    </ProviderStub>
);
};

TestForm.propTypes = {
  children: PropTypes.node.isRequired,
  state: PropTypes.object
};

export default TestForm;
