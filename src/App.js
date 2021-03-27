import React, { useState, useEffect } from "react";
import Rgb from "./components/Rgb";

export default function App() {
  ////////// FOR RANDOM SINGLE COLORS ///////////

  const [color, setColor] = useState();
  const [open, setOpen] = useState(false);

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

  const openClose = () => {
    setOpen(!open);
  };

  return (
    <html
      className="h-screen overflow-x-hidden overflow-y-auto"
      // Differnt gradients I was trying out
      // style={{ background: "linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)" }}
      // style={{background: 'linear-gradient(219deg, rgba(105,48,195,1) 0%, rgba(78,168,222,1) 50%, rgba(128,255,219,1) 100%)'}}
      style={{
        background:
          "linear-gradient(58deg, rgba(255,203,242,1) 0%, rgba(255,234,195,1) 50%, rgba(192,253,255,1) 87%)",
      }}
    >
      <header>
        <h1
          id="title"
          className="relative top-40 left-1/3 w-1/3 text-8xl font-bold tracking-wider text-yellow-50"
        >
          Color
          <br /> Collector
        </h1>
        <div>
          <input type="checkbox" className="hidden" id="navi-toggle" />
          <label
            for="navi-toggle"
            id="navigation__button"
            onClick={openClose}
            className="bg-yellow-50 h-14 w-14 fixed top-8 left-8 rounded-full shadow-xl"
          >
            <span style={{ marginTop: "5rem" }} id="navigation__icon"></span>
          </label>
          {/* <button onClick={openClose} className='bg-yellow-50 h-14 w-14 fixed top-8 left-8 rounded-full shadow-xl'><span style={{marginLeft:'.65rem', marginTop:'4.9rem'}} className="hover:bg-green-300" id='navigation__icon'></span></button> */}
        </div>
      </header>
      <body>
        <div className="bg-green-300 bg-opacity-50 hidden absolute -top-0 h-screen w-96">
          <nav></nav>
        </div>
        <div>
          {color ? (
            <div
              style={{
                borderColor: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0.3)`,
              }}
              className="flex flex-col justify-center border-4 mx-auto mt-64 w-1/4 h-64 rounded-xl shadow-md"
            >
              <h1 className="text-center text-xl pt-2 text-white">
                Name: {color.name.value}
              </h1>
              <h3 className="text-center text-md text-white">
                HEX Value: {color.hex.clean}
              </h3>
              <h3 className="text-center text-md text-white">
                RGB Value: {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
              </h3>
              <img
                className="m-auto rounded-3xl hover:shadow-xl hover:transition duration-300 ease-in-out"
                src={color.image.bare}
                alt=""
              />
              <button
                id="getcolor"
                className="m-auto mt-2 w-32 h-9 rounded-tl-2xl border-2 rounded-br-2xl text-white hover:shadow-xl hover:bg-purple-300 hover:transition duration-300 ease-in-out outline-none"
                style={{
                  borderColor: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0.3)`,
                }}
                onClick={fetchColor}
              >
                Get New Color
              </button>
            </div>
          ) : null}
          <Rgb />
        </div>
      </body>
    </html>
  );
}
