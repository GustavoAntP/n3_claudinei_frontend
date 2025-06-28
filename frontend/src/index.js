// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importe createRoot do 'react-dom/client'
import App from './App'; // Importe seu componente App

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);