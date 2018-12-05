import React from 'react';
import Validators from './Validators';
import LoadingData from '../LoadingData';
import clearmaticsLogo from '../assets/clearmatics-logo.png';

import {
	BrowserRouter as Router,
	Route,
	NavLink,
	Switch,
	Redirect
} from 'react-router-dom';

class Routes extends React.Component {
	render() {
		return (
			<Router>
				<div id="main">
					<div className="nav">
						<img id="logo" alt="" src={clearmaticsLogo} />
						<div className="nav-tabs">
							<NavLink
								activeClassName="active"
								to="/validators"
								className="link"
							>
								Validators
							</NavLink>
						</div>
					</div>
					<div className="main-content">
						<Switch>
							<Route path="/validators" component={Validators} />
							<Redirect from="/" to="/validators" />
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default LoadingData(Routes);
