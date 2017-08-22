import React from 'react';
import PropTypes from 'prop-types';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

export const createMockStore = (initialState = {}) => (
  createStore((state = initialState) => (state))
);

const TestProvider = props => {
  const store = createMockStore(props.state);
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  );
};

TestProvider.propTypes = {
  children: PropTypes.node.isRequired,
  state: PropTypes.object
};

export default TestProvider;
