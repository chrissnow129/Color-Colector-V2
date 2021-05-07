import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Grad from '../components/Grad'
import Nav from "../components/Nav";
import Dark from "../components/DarkSwitch";
import api from "../api";

export default function SavedColors(props) {
  const [rgbSaved, setRgbSaved] = useState([]);

  useEffect(() => {
    // Immediately Invoked Function Expression
    (async () => {
      try {
        const response = await fetch(api.url + "/api/colorcol");
        const data = await response.json();
        console.log(data);
        setRgbSaved(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div
      className="h-screen overflow-auto"
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
      <Nav />
      <Dark dark={props.dark} setDark={props.setDark} />
      <Listbox value={props.selectedGradient} onChange={props.setGradient}>
          <Listbox.Button
            className={`${
              props.dark ? "bg-white" : "bg-gray-700"
            } bg-opacity-50 h-[2.3rem] pr-10 pl-3 pt-1.5 absolute right-[10.5rem] top-[1.5rem] rounded-lg shadow-md focus:outline-none`}
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
      <h1
        className={
          props.dark
            ? "relative left-14 top-28 text-6xl font-extralight text-center text-white"
            : "relative left-14 top-28 text-6xl font-extralight text-center text-gray-700"
        }
      >
        Saved Colors
      </h1>
      <div className="grid gap-x-20 grid-cols-4 px-16 mt-48">
        {rgbSaved.map((rgbb) => {
          return (
            <div key={rgbb.hex}>
              <div
                key={rgbb.hex}
                style={
                  props.dark
                    ? {
                        backgroundColor: `rgba(${rgbb.r}, ${rgbb.g}, ${rgbb.b}, 0.3)`,
                      }
                    : { backgroundColor: `rgba(0, 0, 0, 0.3)` }
                }
                className={
                  props.dark
                    ? "flex flex-col justify-center mt-10 w-56 h-60 rounded-xl shadow-md text-white"
                    : "flex flex-col justify-center mt-10 w-56 h-60 rounded-xl shadow-md text-gray-700"
                }
              >
                <h1 className="text-center font-semibold text-xl pt-4">
                  {rgbb.name}
                </h1>
                <h2 className="text-center text-md font-light">
                  RGB: {rgbb.r}, {rgbb.g}, {rgbb.b}
                </h2>
                <h2 className="text-center text-md font-light">
                  HEX: {rgbb.hex}
                </h2>
                {props.dark ? (
                  <img
                    className="mx-auto mt-3 rounded-3xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
                    src={rgbb.image}
                    alt=""
                  />
                ) : (
                  <img
                    style={{
                      boxShadow: `1px 1px 5px 0px rgba(${rgbb.r}, ${rgbb.g}, ${rgbb.b}, 2)`,
                    }}
                    className="mx-auto mt-3 rounded-3xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
                    src={rgbb.image}
                    alt=""
                  />
                )}
                <Link to={`/${rgbb._id}`}>
                  <button
                    style={
                      props.dark
                        ? {
                            borderColor: `rgba(${rgbb.r}, ${rgbb.g}, ${rgbb.b}, 0.4)`,
                          }
                        : {
                            borderColor: `rgba(${rgbb.r}, ${rgbb.g}, ${rgbb.b}, 0.8)`,
                            boxShadow: `1px 1px 5px 0px rgba(${rgbb.r}, ${rgbb.g}, ${rgbb.b}, 2)`,
                          }
                    }
                    className={
                      props.dark
                        ? "flex justify-center my-4 m-auto w-32 rounded-tl-2xl border-2 rounded-br-2xl font-extralight text-white hover:shadow-xl hover:transition duration-300 ease-in-out focus:outline-none"
                        : "flex justify-center my-4 m-auto w-32 rounded-tl-2xl border-2 rounded-br-2xl font-extralight text-gray-800 hover:shadow-xl hover:transition duration-300 ease-in-out focus:outline-none"
                    }
                  >
                    See More
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
