import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './app';
import { UserProvider } from './utils/UserContext'


ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
