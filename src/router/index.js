import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
const AppRouter = () => {
	return (
		<Router>
			<Switch>
				{routes.map(({ Component, key, path }) => (
					<Route
						key={key}
						path={path}
						component={props => <Component {...props} page={key} />}
					></Route>
				))}
			</Switch>
		</Router>
	);
};

export default AppRouter;
