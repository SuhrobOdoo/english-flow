import React from 'react';
import ReactDOM from 'react-dom/client';
import Popup from './Popup';
import './styles/theme.css';
import './styles/global.css';
import './styles/components.css';
import './styles/pages.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
