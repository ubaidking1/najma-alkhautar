import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css'; // optional, if you still use App.css
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';

// create root and render App once
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
