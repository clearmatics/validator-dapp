import React, { Component } from 'react';
import Footer from './Components/Footer';
import Router from './Components/Router';

import './App.css';

class App extends Component {
	render() {
		return (
			<div>
				<div className="App">
					<Router />
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
