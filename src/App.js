import React, { useState, useEffect } from "react";
import Rgb from "./components/Rgb";
import Nav from './components/Nav';
import AppRouter from './router/index'

export default function App() {
  ////////// FOR RANDOM SINGLE COLORS ///////////

  const [color, setColor] = useState();

  const fetchColor = async () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    try {
      const response = await fetch(
        `https://www.thecolorapi.com/id?rgb=${r},${g},${b}`
      );
      const data = await response.json();
      console.log(data);
      setColor(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchColor();
  }, []);

  return (
    <AppRouter/>
  );
}
