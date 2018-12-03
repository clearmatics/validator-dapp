import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers';

// import drizzle functions and contract artifact
import { Drizzle, generateStore } from 'drizzle';
import { DrizzleContext } from 'drizzle-react';

import Glienicke from './contracts/Glienicke.json';

// get the contract
const options = { contracts: [Glienicke] };

// setup the Drizzle store and Drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

// setup Redux store and Redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);
// pass in the drizzle and redux instance
ReactDOM.render(
	<DrizzleContext.Provider drizzle={drizzle}>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</DrizzleContext.Provider>,
	document.getElementById('root')
);
serviceWorker.unregister();
