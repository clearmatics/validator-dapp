import React from 'react';
import Observers from './Observers';
import Validators from './Validators';
import LoadingData from './LoadingData';

import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect
} from 'react-router-dom';

class Routes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			valTapSelected: true,
			obsTapSelected: false
		};
	}

	validatorTab = e => {
		this.setState({ valTapSelected: true, obsTapSelected: false });
	};
	observersTab = e => {
		this.setState({ valTapSelected: false, obsTapSelected: true });
	};

	render() {
		return (
			<Router>
				<div>
					<div className="nav">
						<div className="nav-tabs">
							<Link
								className={this.state.valTapSelected ? 'active-link' : 'link'}
								to="/validators"
								onClick={this.validatorTab}
							>
								Validators
							</Link>
							<Link
								className={this.state.obsTapSelected ? 'active-link' : 'link'}
								to="/observers"
								onClick={this.observersTab}
							>
								Observers
							</Link>
						</div>
					</div>
					<div className="main-content">
						<Switch>
							<Route path="/validators" component={Validators} />
							<Route path="/observers" component={Observers} />
							<Redirect from="/" to="/validators" />
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default LoadingData(Routes);
