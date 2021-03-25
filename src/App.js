import React, { useState, useEffect } from "react";
import Rgb from "./components/Rgb";

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
    <html className="h-full overflow-y-auto" style={{background:'linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)'}}>
      <header>
        <h1 className='absolute top-20 left-1/3 text-8xl font-bold tracking-widest text-white'>Color<br/> Collector</h1>
      </header>
      <body>
        <div>
          {color ? (
            <div
              style={{
                backgroundColor: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0.3)`,
              }}
              className="flex flex-col justify-center mx-auto mt-80 w-1/4 h-64 rounded-xl shadow-md"
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
                className="m-auto mt-2 w-32 h-9 rounded-tl-2xl rounded-br-2xl text-white hover:shadow-xl hover:transition duration-300 ease-in-out outline-none"
                style={{ backgroundColor: `${color.hex.value}` }}
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
