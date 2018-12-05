import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import drizzle functions and contract artifact
import { Drizzle, generateStore } from 'drizzle';
import { DrizzleContext } from 'drizzle-react';

import Soma from './contract/Soma.json';

// get the contract
const options = { contracts: [Soma] };

// setup the Drizzle store and Drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

// pass in the drizzle instance
ReactDOM.render(
	<DrizzleContext.Provider drizzle={drizzle}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</DrizzleContext.Provider>,
	document.getElementById('root')
);
serviceWorker.unregister();
