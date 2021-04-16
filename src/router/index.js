import React, { useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import routes from './routes';
const AppRouter = (props) => {
	const [dark, setDark] = useState(true)

	return (
		<>
		
		<HashRouter>
			<Switch>
				{routes.map(({ Component, key, path }) => (
					<Route
						key={key}
						path={path}
						component={props => <Component {...props} page={key} dark={dark} setDark={setDark} />}
					></Route>
				))}
			</Switch>
		</HashRouter>
		</>
	);
};

export default AppRouter;
