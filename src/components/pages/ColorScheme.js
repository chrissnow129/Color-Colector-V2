import React, { useState, useEffect, useRef } from "react";
import Nav from "../components/Nav";

export default function ColorScheme(props) {
  const [scheme, setScheme] = useState({
    baseURL: "https://www.thecolorapi.com/scheme?",
    option: "rgb=",
    rgb: "",
    mode: `&mode=triad`,
    searchURL: "",
  });

  const [schemeIn, updtscheme] = useState({});
  const [schemeLst, setschemeLst] = useState([]);

  const schemeRef = useRef(null);

  const getScheme = async () => {
    if (scheme.searchURL) {
      try {
        const response = await fetch(scheme.searchURL);
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
  }, [scheme]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setScheme({
      ...scheme,
      searchURL: scheme.baseURL + scheme.option + scheme.rgb + scheme.mode,
    });
  };

  const handleChange = (evt) => {
    setScheme({ ...scheme, rgb: evt.target.value });
  };

  const darky = () => {
		props.setDark(!props.dark);
	  };

  return (
    <div
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
        {props.dark ? (
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
        <Nav />
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
            value={scheme.rgb}
            ref={schemeRef}
          />
          <input
            className="w-32 ml-20 mt-14 border-2 border-gray-300 rounded-bl-2xl h-9 rounded-tr-2xl text-white bg-transparent hover:shadow-xl hover:transition duration-300 ease-in-out"
            type="submit"
            value="Get this Color"
          />
        </form>
      </div>
      <div class="flex flex-col gap-14 my-5">
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
