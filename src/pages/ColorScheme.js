import React, { useState, useEffect, useRef } from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Dark from '../components/DarkSwitch'
import Nav from "../components/Nav";

export default function ColorScheme(props) {
  const [scheme, setScheme] = useState();
  const [schemeId, setSchemeId] = useState()
  const [schemeIn, updtscheme] = useState({});
  const [schemeLst, setschemeLst] = useState([]);

  const schemeRef = useRef(null);

  const getScheme = async () => {
    if (scheme) {
      try {
        const response = await fetch(`https://www.thecolorapi.com/scheme?rgb=${scheme}&mode=triad`);
        const data = await response.json();
        await updtscheme(data);
        await setschemeLst([...schemeLst, data]);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getScheme();
  }, [schemeId]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setSchemeId(scheme);
  };

  const handleChange = (evt) => {
    setScheme(evt.target.value);
  };

  const darky = () => {
    props.setDark(!props.dark);
  };

  return (
    <div
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
      className="h-screen overflow-auto bg-fixed"
    >
      <header>
        <h1
          id="schemetitle"
          className={
            props.dark
              ? "relative left-0 top-36 text-6xl font-extralight text-center text-white"
              : "relative left-0 top-36 text-6xl font-extralight text-center text-gray-700"
          }
        >
          Color Scheme Creator
        </h1>
        <Dark dark={props.dark} setDark={props.setDark} />
        <Nav />
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
      </header>
      <div
        style={{ left: "27rem" }}
        className={
          props.dark
            ? "rounded-xl shadow-lg bg-white bg-opacity-20 absolute w-1/4 h-32 h-10 top-1/4"
            : "rounded-xl shadow-lg bg-black bg-opacity-30 absolute w-1/4 h-32 h-10 top-1/4"
        }
      >
        <form onSubmit={handleSubmit}>
          <input
            style={
              props.dark
                ? { boxShadow: "1px 1px 5px 0px rgba(0,0,0,0.125)inset" }
                : { boxShadow: "1px 1px 5px 0px rgba(0,0,0,0.2)inset" }
            }
            className="bg-transparent w-28 relative left-6 top-10 ml-16 rounded-lg h-7 placeholder-opacity-20"
            type="text"
            placeholder="RGB Value"
            onChange={handleChange}
            value={scheme}
            ref={schemeRef}
          />
          <input
            className="w-32 ml-20 mt-14 border-2 border-gray-300 rounded-bl-2xl h-9 rounded-tr-2xl text-white bg-transparent hover:shadow-xl hover:transition duration-300 ease-in-out"
            type="submit"
            value="Get this Color"
          />
        </form>
      </div>
      <div className="flex flex-col gap-14 my-5">
        {schemeLst.map((scheme2) => {
          return (
            <div
              style={{ width: "45rem", height: "15rem", top: "26rem" }}
              className="relative left-52 bg-white bg-opacity-25 rounded-2xl shadow-lg"
            >
              <div className="flex flex-row justify-around pt-4 text-white font-semibold text-xl">
                <h1>{scheme2.colors[0].name.value}</h1>
                <h1>{scheme2.colors[1].name.value}</h1>
                <h1>{scheme2.colors[2].name.value}</h1>
                <h1>{scheme2.colors[3].name.value}</h1>
              </div>
              <div className="flex flex-row justify-around pt-1 text-white font-light text-md">
                <h1>
                  RGB: {scheme2.colors[0].rgb.r}, {scheme2.colors[0].rgb.g},{" "}
                  {scheme2.colors[0].rgb.b}
                </h1>
                <h1>
                  RGB: {scheme2.colors[1].rgb.r}, {scheme2.colors[1].rgb.g},{" "}
                  {scheme2.colors[1].rgb.b}
                </h1>
                <h1>
                  RGB: {scheme2.colors[2].rgb.r}, {scheme2.colors[2].rgb.g},{" "}
                  {scheme2.colors[2].rgb.b}
                </h1>
                <h1>
                  RGB: {scheme2.colors[3].rgb.r}, {scheme2.colors[3].rgb.g},{" "}
                  {scheme2.colors[3].rgb.b}
                </h1>
              </div>
              <div className="flex flex-row justify-around pt-1 text-white font-light text-md">
                <h1>Hex: {scheme2.colors[0].hex.value}</h1>
                <h1>Hex: {scheme2.colors[1].hex.value}</h1>
                <h1>Hex: {scheme2.colors[2].hex.value}</h1>
                <h1>Hex: {scheme2.colors[3].hex.value}</h1>
              </div>
              <div className="flex flex-row pt-2 justify-around">
                <img
                  className="rounded-3xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
                  src={scheme2.colors[0].image.bare}
                  alt=""
                />
                <img
                  className="rounded-3xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
                  src={scheme2.colors[1].image.bare}
                  alt=""
                />
                <img
                  className="rounded-3xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
                  src={scheme2.colors[2].image.bare}
                  alt=""
                />
                <img
                  className="rounded-3xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
                  src={scheme2.colors[3].image.bare}
                  alt=""
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
