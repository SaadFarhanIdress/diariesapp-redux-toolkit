import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { setupServer } from './services/mirage/server';
import store from './store';
import { Provider } from 'react-redux';

if (process.env.NODE_ENV === 'development') {
  setupServer();
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);