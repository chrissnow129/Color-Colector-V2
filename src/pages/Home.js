import React, { useState, useEffect } from "react";
import Rgb from "../components/Rgb";
import Nav from "../components/Nav";
import api from '../api'

export default function Home(props) {
  ////////// FOR RANDOM SINGLE COLORS ///////////

  const [color, setColor] = useState();
  const [dark, setDark] = useState(true);

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

  const handleSave = async (newColor) => {
    try {
      const response = await fetch(api.url + "/api/colorcol", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hex: newColor.hex.value,
          image: newColor.image.bare,
          name: newColor.name.value,
          r: newColor.rgb.r,
          g: newColor.rgb.g,
          b: newColor.rgb.b,
          h: newColor.hsl.h,
          s: newColor.hsl.s,
          l: newColor.hsl.l,
        }),
      });
      const data = await response.json();
      console.log(response);
      console.log(data);
    } catch (error) {
      console.error(error);
    } 
  };

  useEffect(() => {
    fetchColor();
  }, []);

  const darky = () => {
		setDark(!dark);
	  };

  return (
    <div
      className="h-screen overflow-auto bg-repeat-y"
      // Differnt gradients I was trying out
      // style={{ background: "linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)" }}
      // style={{background: 'linear-gradient(219deg, rgba(105,48,195,1) 0%, rgba(78,168,222,1) 50%, rgba(128,255,219,1) 100%)'}}

      style={
        dark
          ? {
              background:
                "linear-gradient(58deg, rgba(255,162,237,1) 0%, rgba(255,222,160,1) 43%, rgba(168,252,255,1)",
            }
          : {
              background:
                "linear-gradient(58deg, rgba(107,15,158,1) 10%, rgba(255,103,246,1) 51%, rgba(255,193,109,1) 87%)",
            }
      }
    >
      <header>
        <h1
          id="title"
          className={
            dark
              ? "relative top-40 left-1/3 w-1/3 text-8xl font-bold tracking-wider"
              : "relative top-40 left-1/3 w-1/3 text-8xl font-bold tracking-wider text-gray-800 text-opacity-60"
          }
          style={dark ? {color: 'rgb(255,247,231)'} : {}}
        >
          Color
          <br /> Collector
        </h1>
        <Nav dark={props.dark} />
        {dark ? (
        <button
          id="light"
          className="bg-white w-14 h-14 rounded-full shadow-xl"
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
                dark
                  ? "flex flex-col justify-center bg-white max-w-xl bg-opacity-30 bg-clip-padding border-solid border border-white border-opacity-10 backdrop-filter backdrop-blur-lg mx-auto mt-64 w-80 h-64 rounded-xl shadow-md"
                  : "flex flex-col justify-center bg-black max-w-xl bg-opacity-30 mx-auto mt-64 w-80 h-64 rounded-xl shadow-md"
              }
            >
              <h1
                className={
                  dark
                    ? "text-center font-semibold text-xl pt-2 text-indigo-200"
                    : "text-center font-semibold text-xl pt-2 text-gray-700"
                }
              >
                Name: {color.name.value}
              </h1>
              <h3
                className={
                  dark
                    ? "text-center text-md text-indigo-200"
                    : "text-center text-md text-gray-700"
                }
              >
                HEX Value: {color.hex.clean}
              </h3>
              <h3
                className={
                  dark
                    ? "text-center text-md text-indigo-200"
                    : "text-center text-md text-gray-700"
                }
              >
                RGB Value: {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
              </h3>
              <img
                style={
                  dark
                    ? {}
                    : {
                        boxShadow: `1px 1px 5px 0px rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 2)`,
                      }
                }
                className="m-auto mt-4 rounded-3xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
                src={color.image.bare}
                alt=""
              />
              <button
                id="getcolor"
                className="w-32 h-9 rounded-tl-2xl border-2 rounded-br-2xl text-white hover:shadow-xl hover:transition-shadow duration-300 ease-in-out focus:outline-none"
                style={
                  dark
                    ? {
                        borderColor: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0.3)`,
                      }
                    : {
                        borderColor: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
                        filter: "brightness(110%) staturate(110%)",
                        boxShadow: `1px 1px 5px 0px rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 1.7)`,
                        color: 'rgb(55, 65, 81)'
                      }
                }
                onClick={fetchColor}
              >
                Get New Color
              </button>
              <button
                onClick={() => handleSave(color)}
                style={
                  dark
                    ? {
                        borderColor: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0.3)`,
                      }
                    : {
                        borderColor: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
                        filter: "brightness(110%) staturate(110%)",
                        boxShadow: `1px 1px 5px 0px rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 1.7)`,
                        color:'rgb(55, 65, 81)'
                      }
                }
                className="bg-transparent relative left-44 -top-3 border-2 border-white rounded-bl-2xl rounded-tr-2xl text-white bottom-52 w-32 h-9 hover:shadow-xl hover:transition-shadow duration-300 ease-in-out focus:outline-none"
              >
                Save This Color
              </button>
            </div>
          ) : null}
          <Rgb dark={props.dark} />
        </div>
      </div>
    </div>
  );
}
