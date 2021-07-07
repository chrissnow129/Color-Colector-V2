import React, { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Dark from "../components/DarkSwitch";
import Rgb from "../components/Rgb";
import Nav from "../components/Nav";
import api from "../api";

export default function Home(props) {
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

  return (
    <div
      className="h-screen overflow-auto bg-repeat-y"
      // Differnt gradients I was trying out
      // style={{ background: "linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)" }}
      // style={{background: 'linear-gradient(219deg, rgba(105,48,195,1) 0%, rgba(78,168,222,1) 50%, rgba(128,255,219,1) 100%)'}}

      style={
        props.dark
          ? {
              background: `${props.selectedGradient}`,
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
            props.dark
              ? "relative top-40 left-1/3 w-1/3 text-8xl font-bold tracking-wider"
              : "relative top-40 left-1/3 w-1/3 text-8xl font-bold tracking-wider text-gray-800 text-opacity-60"
          }
          style={props.dark ? { color: "rgb(255,247,231)" } : {}}
        >
          Color
          <br /> Collector
        </h1>
        <Nav dark={props.dark} />

        <Dark dark={props.dark} setDark={props.setDark} />

        <Listbox value={props.selectedGradient} onChange={props.setGradient}>
          <Listbox.Button
            className={`${
              props.dark ? "bg-white" : "bg-gray-700"
            } bg-opacity-50 h-[2.3rem] pr-10 pl-3 pt-1.5 absolute right-[10.5rem] top-[1.5rem] rounded-lg shadow-lg focus:outline-none`}
          >
            Change Background
            {props.dark ? (
              <ChevronDownIcon className="w-6 h-6 relative left-[9.5rem] top-[-1.4rem]" />
            ) : (
              <ChevronDownIcon className="text-white w-6 h-6 relative left-[9.5rem] top-[-1.4rem]" />
            )}
          </Listbox.Button>
          <Listbox.Options
            className={`w-[10.3rem] fixed right-[11rem] top-[4.3rem] py-1 pl-0.5 pr-0.5 ${
              props.dark ? "bg-white" : "bg-gray-700"
            } bg-opacity-50 rounded-lg shadow-md focus:outline-none`}
          >
            {props.gradientArr.map((grad) => (
              <Listbox.Option
                className={`rounded-md ${
                  props.dark
                    ? "hover:text-cyan-500 hover:bg-[#BFFDFB]"
                    : "hover:text-white hover:bg-gray-500 hover:bg-opacity-50"
                } hover:shadow-inner cursor-pointer`}
                key={grad.id}
                value={grad.value}
              >
                {grad.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </header>
      <div>
        <div>
          {color ? (
            <div
              className={
                props.dark
                  ? "flex flex-col justify-center bg-white max-w-xl bg-opacity-30 bg-clip-padding border-solid border border-white border-opacity-10 backdrop-filter backdrop-blur-lg relative top-[18rem] w-80 h-64 rounded-xl shadow-md"
                  : "flex flex-col justify-center bg-black max-w-xl bg-opacity-30 mx-auto mt-64 w-80 h-64 rounded-xl shadow-md"
              }
            >
              <h1
                className={
                  props.dark
                    ? "text-center font-semibold text-xl pt-2 text-indigo-200"
                    : "text-center font-semibold text-xl pt-2 text-gray-700"
                }
              >
                Name: {color.name.value}
              </h1>
              <h3
                className={
                  props.dark
                    ? "text-center text-md text-indigo-200"
                    : "text-center text-md text-gray-700"
                }
              >
                HEX Value: {color.hex.clean}
              </h3>
              <h3
                className={
                  props.dark
                    ? `text-center text-md text-indigo-200`
                    : "text-center text-md text-gray-700"
                }
              >
                RGB Value: {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
              </h3>
              <img
                style={
                  props.dark
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
                  props.dark
                    ? {
                        borderColor: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0.3)`,
                      }
                    : {
                        borderColor: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
                        filter: "brightness(110%) staturate(110%)",
                        boxShadow: `1px 1px 5px 0px rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 1.7)`,
                        color: "rgb(55, 65, 81)",
                      }
                }
                onClick={fetchColor}
              >
                Get New Color
              </button>
              <button
                onClick={() => handleSave(color)}
                style={
                  props.dark
                    ? {
                        borderColor: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 0.3)`,
                      }
                    : {
                        borderColor: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
                        filter: "brightness(110%) staturate(110%)",
                        boxShadow: `1px 1px 5px 0px rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, 1.7)`,
                        color: "rgb(55, 65, 81)",
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
