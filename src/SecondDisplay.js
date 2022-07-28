
import React from 'react';
import { Provider } from 'react-redux';
import App from '../App';
import { store } from '../src/Redux/store';

const SecondDisplay = () => {


  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};


export default SecondDisplay;
