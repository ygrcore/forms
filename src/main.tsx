import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import store from './store/store.tsx';
import { Provider } from 'react-redux';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
