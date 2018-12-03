import React, { Component } from 'react';
import Footer from './Footer';
import Router from './router';
import clearmaticsLogo from './assets/clearmatics-logo.png';

import './App.css';

class App extends Component {
	render() {
		return (
			<div>
				<img id="logo" alt="" src={clearmaticsLogo} />
				<div className="App">
					<Router />
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
