import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App.jsx';

ReactDOM.createRoot(document.querySelector('#main')).render(
    <React.StrictMode> {/* Fixed ReactStrictMode */}
        <App />
    </React.StrictMode>
);
