import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
const AppRouter = () => {
	const [dark, setDark] = useState(true)

	const darky = () => {
		setDark(!dark);
	  };

	return (
		<>
		{dark ? (
          <button
            id="light"
            className="bg-white w-14 h-14 py-2 rounded-full shadow-xl"
            style={{ backgroundColor: "rgb(255,247,231)" }}
            onClick={darky}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 mx-auto w-6 transform hover:rotate-180 transition duration-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.606 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>
        ) : (
          <button
            id="dark"
            className="bg-gray-700 w-14 h-14 py-2 fixed rounded-full shadow-2xl"
            onClick={darky}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 mx-auto w-6 transform hover:rotate-180 transition duration-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.606 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>
        )}
		
		<Router>
			<Switch>
				{routes.map(({ Component, key, path }) => (
					<Route
						key={key}
						path={path}
						component={props => <Component {...props} page={key} dark={dark} setDark={setDark} darky={darky} />}
					></Route>
				))}
			</Switch>
		</Router>
		</>
	);
};

export default AppRouter;
