import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import api from '../api'

export default function ColorShow(props) {
  const [colorSh, setColorSh] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(api.url + `/api/colorcol/${props.match.params.id}`);
        const data = await response.json();
        console.log(data);
        setColorSh([data]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleDelete = async (evt) => {
    try {
      const response = await fetch(api.url + `/api/colorcol/${props.match.params.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
    } catch (error) {
      console.error(error);
    } 
  };

  const darky = () => {
    props.setDark(!props.dark);
  };

  return (
    <>
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
      {colorSh.map((color) => {
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
            className="h-screen overflow-hidden"
          >
            <div
              id="show"
              className={
                props.dark
                  ? "flex flex-col justify-center w-1/3 h-1/3 bg-white bg-opacity-20 rounded-xl shadow-md text-white"
                  : "flex flex-col justify-center w-1/3 h-1/3 bg-black bg-opacity-30 rounded-xl shadow-md text-white"
              }
            >
              <h1
                className={
                  props.dark
                    ? "text-center text-xl pt-2 text-white"
                    : "text-center text-xl pt-2 text-gray-800"
                }
              >
                Name: {color.name}
              </h1>
              <h3
                className={
                  props.dark
                    ? "text-center text-md pt-0.5 text-white"
                    : "text-center text-md pt-0.5 text-gray-800"
                }
              >
                HEX Value: {color.hex}
              </h3>
              <h3
                className={
                  props.dark
                    ? "text-center text-md pt-0.5 text-white"
                    : "text-center text-md pt-0.5 text-gray-800"
                }
              >
                RGB Value: {color.r}, {color.g}, {color.b}
              </h3>
              <h3
                className={
                  props.dark
                    ? "text-center text-md pt-0.5 text-white"
                    : "text-center text-md pt-0.5 text-gray-800"
                }
              >
                HSL Value: {color.h}, {color.s}, {color.l}
              </h3>
              {props.dark ? (
                <img
                  className="m-auto rounded-3xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
                  src={color.image}
                  alt=""
                />
              ) : (
                <img
                  style={{
                    boxShadow: `1px 1px 5px 0px rgba(${color.r}, ${color.g}, ${color.b}, 2)`,
                  }}
                  className="m-auto rounded-3xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
                  src={color.image}
                  alt=""
                />
              )}
              <button
                className={
                  props.dark
                    ? "m-auto mt-2 w-36 h-9 rounded-tl-2xl rounded-br-2xl text-white bg-transparent border-2 hover:shadow-xl hover:transition duration-300 ease-in-out outline-none"
                    : "m-auto mt-2 w-36 h-9 rounded-tl-2xl rounded-br-2xl text-gray-800 bg-transparent border-2 hover:shadow-xl hover:transition duration-300 ease-in-out outline-none"
                }
                style={
                  props.dark
                    ? { borderColor: `${color.hex}` }
                    : {
                        borderColor: `${color.hex}`,
                        boxShadow: `1px 1px 5px 0px rgba(${color.r}, ${color.g}, ${color.b}, 2)`,
                      }
                }
                onClick={handleDelete}
              >
                Delete This Color
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
