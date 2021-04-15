import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import api from '../api'

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

  const darky = () => {
    props.setDark(!props.dark);
  };

  return (
    <div
      class="h-screen overflow-auto"
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
      <Nav />
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
