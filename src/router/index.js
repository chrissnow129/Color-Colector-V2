import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import routes from "./routes";

const AppRouter = (props) => {
  const gradientArr = [
    {
      id: 1,
      name: " Light & Colorful",
      value:
        "linear-gradient(58deg, rgba(255,162,237,1) 0%, rgba(255,222,160,1) 33%, rgba(191,253,255,1) 90%",
      textColor: "#FFF7E7",
    },
    {
      id: 2,
      name: " Ocean",
      value:
        "linear-gradient(219deg, rgba(105,48,195,1) 0%, rgba(78,168,222,1) 50%, rgba(128,255,219,1) 100%)",
      textColor: "#BAE6FD",
    },
    {
      id: 3,
      name: " Euphoric Sky",
      value: "linear-gradient(45deg, #8EC5FC 0%, #E0C3FC 50%, #FFE38B 100%)",
    },
  ];

  const [selectedGradient, setGradient] = useState(gradientArr[0].value);
  const [dark, setDark] = useState(true);

  return (
    <>
      <HashRouter>
        <Switch>
          {routes.map(({ Component, key, path }) => (
            <Route
              key={key}
              path={path}
              render={(props) => (
                <Component
                  {...props}
                  page={key}
                  dark={dark}
                  setDark={setDark}
                  selectedGradient={selectedGradient}
                  setGradient={setGradient}
                  gradientArr={gradientArr}
                />
              )}
            ></Route>
          ))}
        </Switch>
      </HashRouter>
    </>
  );
};

export default AppRouter;
