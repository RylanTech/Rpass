import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserProvider } from './contexts/UserContext';
import { PassProvider } from './contexts/PassContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PassProvider>
    <UserProvider>
      <App />
    </UserProvider>
    </PassProvider>
  </React.StrictMode>
);