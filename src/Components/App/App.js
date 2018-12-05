import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Validators from '../Validators';
import loadingImg from '../../assets/loadingIcon.svg';

import './App.css';

class App extends Component {
	state = { loading: true, drizzleState: null };

	componentDidMount() {
		const { drizzle } = this.props;

		// subscribe to changes in the store
		this.unsubscribe = drizzle.store.subscribe(() => {
			// every time the store updates, grab the state from drizzle
			const drizzleState = drizzle.store.getState();

			// check to see if it's ready, if so, update local component state
			if (drizzleState.drizzleStatus.initialized) {
				this.setState({ loading: false, drizzleState });
			}
		});
	}

	compomentWillUnmount() {
		this.unsubscribe();
	}
	render() {
		if (this.state.loading) return <img id="onLoad" src={loadingImg} alt="" />;

		return (
			<div className="App">
				<div className="main">
					<h2>Validators Network Permissioning</h2>
					<Validators
						drizzle={this.props.drizzle}
						drizzleState={this.state.drizzleState}
					/>
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
