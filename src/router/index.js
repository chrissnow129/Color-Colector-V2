import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
const AppRouter = (props) => {
	const [dark, setDark] = useState(true)


	return (
		<>
		
		
		<Router>
			<Switch>
				{routes.map(({ Component, key, path }) => (
					<Route
						key={key}
						path={path}
						component={props => <Component {...props} page={key} dark={dark} setDark={setDark} />}
					></Route>
				))}
			</Switch>
		</Router>
		</>
	);
};

export default AppRouter;
