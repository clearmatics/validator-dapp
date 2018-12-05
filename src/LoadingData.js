import React from 'react';
import { DrizzleContext } from 'drizzle-react';

const LoadingData = WrappedComponent => props => (
	<DrizzleContext.Consumer>
		{drizzleContext => {
			const { drizzle, drizzleState, initialized } = drizzleContext;

			if (initialized) {
				return (
					<WrappedComponent
						{...props}
						drizzle={drizzle}
						drizzleState={drizzleState}
					/>
				);
			}
		}}
	</DrizzleContext.Consumer>
);

export default LoadingData;
