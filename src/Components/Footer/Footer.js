import React from 'react';
import clearmaticsLogo from '../../assets/clearmatics-logo.png';
import './Footer.css';

class Footer extends React.Component {
	render() {
		return (
			<div className="footer">
				<img id="footer-logo" alt="" src={clearmaticsLogo} />
				<span id="copy-right">
					© 2018 Clearmatics Technologies LTD - All rights reserved.
				</span>
			</div>
		);
	}
}

export default Footer;
