import React, { useState, useEffect } from "react";
import Rgb from "../components/Rgb";
import Nav from "../components/Nav";

export default function Home(props) {
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
    <div
      className="h-screen overflow-auto"
      // Differnt gradients I was trying out
      // style={{ background: "linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)" }}
      // style={{background: 'linear-gradient(219deg, rgba(105,48,195,1) 0%, rgba(78,168,222,1) 50%, rgba(128,255,219,1) 100%)'}}

      style={
        props.dark
          ? {
              background:
                "linear-gradient(58deg, rgba(255,203,242,1) 0%, rgba(255,234,195,1) 50%, rgba(192,253,255,1) 87%)",
            }
          : {
              background:
                "linear-gradient(58deg, rgba(107,15,158,1) 0%, rgba(255,103,246,1) 51%, rgba(255,193,109,1) 87%)",
            }
      }
    >
      <header>
        <h1
          id="title"
          className={props.dark ? "relative top-40 left-1/3 w-1/3 text-8xl font-bold tracking-wider text-yellow-50" : 'relative top-40 left-1/3 w-1/3 text-8xl font-bold tracking-wider text-gray-800 text-opacity-60'}
        >
          
          Color
          <br /> Collector
        </h1>
        <Nav dark={props.dark} />
      </header>
      <div>
        <div>
          {color ? (
            <div
              style={
                {
                  // borderColor: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0.3)`,
                }
              }
              className={
                props.dark
                  ? "flex flex-col justify-center bg-white max-w-xl bg-opacity-20 mx-auto mt-64 w-1/4 h-64 rounded-xl shadow-md"
                  : "flex flex-col justify-center bg-black max-w-xl bg-opacity-30 mx-auto mt-64 w-1/4 h-64 rounded-xl shadow-md"
              }
            >
              <h1 className={props.dark ? "text-center font-semibold text-xl pt-2 text-gray-300" : "text-center font-semibold text-xl pt-2 text-gray-700" }>
                Name: {color.name.value}
              </h1>
              <h3 className={props.dark ? "text-center text-md text-gray-300" : "text-center text-md text-gray-700"}>
                HEX Value: {color.hex.clean}
              </h3>
              <h3 className={props.dark ? "text-center text-md text-gray-300" : "text-center text-md text-gray-700"}>
                RGB Value: {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
              </h3>
              <img
                className="m-auto animate-wiggle rounded-3xl hover:shadow-xl hover:transition-shadow duration-300 ease-in-out"
                src={color.image.bare}
                alt=""
              />
              <button
                id="getcolor"
                className="m-auto mt-2 w-32 h-9 rounded-tl-2xl border-2 rounded-br-2xl text-white hover:shadow-xl hover:bg-purple-700 hover:transition-shadow duration-300 ease-in-out outline-none"
                style={{
                  borderColor: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0.3)`,
                  backgroundColor: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0)`,
                }}
                onClick={fetchColor}
              >
                Get New Color
              </button>
            </div>
          ) : null}
          <Rgb dark={props.dark} />
        </div>
      </div>
    </div>
  );
}
