import React, { useState, useEffect } from "react";
import Dark from '../components/DarkSwitch'
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
      <Dark dark={props.dark} setDark={props.setDark} />
      {colorSh.map((color) => {
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
            className="h-screen overflow-hidden"
          >
            <div
              id="show"
              className={
                props.dark
                  ? "flex flex-col justify-center w-[33rem] h-1/3 bg-white bg-opacity-20 rounded-xl shadow-md text-white"
                  : "flex flex-col justify-center w-[33rem] h-1/3 bg-black bg-opacity-30 rounded-xl shadow-md text-white"
              }
            >
              <h1
                className={
                  props.dark
                    ? "text-center text-3xl font-extrabold pt-2 pb-2 text-green"
                    : "text-center text-3xl font-extrabold pt-2 pb-2 text-gray-800"
                }
              >
                {color.name}
              </h1>
              <h3
                className={
                  props.dark
                    ? "relative right-[10.8rem] text-lg font-semibold text-center text-md pt-0.5 text-white"
                    : "relative right-[10.8rem] text-lg font-semibold text-center text-md pt-0.5 text-gray-800"
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
                HSL Value: {color.h}, {color.s}, {color.l}
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
              {props.dark ? (
                <img
                  className="relative left-[25rem] bottom-[8.3rem] rounded-tr-xl rounded-br-xl w-32 h-[10rem] hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
                  src={color.image}
                  alt=""
                />
              ) : (
                <img
                  style={{
                    boxShadow: `1px 1px 5px 0px rgba(${color.r}, ${color.g}, ${color.b}, 2)`,
                  }}
                  className="relative left-[25rem] bottom-[8.3rem] rounded-tr-xl rounded-br-xl w-32 h-[18rem] hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out"
                  src={color.image}
                  alt=""
                />
              )}
              <button
                className={
                  props.dark
                    ? "relative left-[8rem] mt-3 w-36 h-9 rounded-tl-2xl rounded-br-2xl text-white bg-transparent border-2 hover:shadow-xl hover:transition duration-300 ease-in-out outline-none"
                    : "relative left-[8rem] mt-3 w-36 h-9 rounded-tl-2xl rounded-br-2xl text-gray-800 bg-transparent border-2 hover:shadow-xl hover:transition duration-300 ease-in-out outline-none"
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
