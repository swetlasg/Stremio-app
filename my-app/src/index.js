import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { StremioApp } from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<StremioApp />, document.getElementById('root'));
registerServiceWorker();
