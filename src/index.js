import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import * as serviceWorker from './serviceWorker';

// import drizzle functions and contract artifact
import { Drizzle, generateStore } from 'drizzle';
import Soma from './contract/Soma.json';

// get the contract
const options = { contracts: [Soma] };

// setup the Drizzle store and Drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

// pass in the drizzle instance
ReactDOM.render(<App drizzle={drizzle} />, document.getElementById('root'));
serviceWorker.unregister();
