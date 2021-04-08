import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";

export default function ColorShow(props) {
  const [colorSh, setColorSh] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/colorcol/${props.match.params.id}`);
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
      const response = await fetch(`/api/colorcol/${props.match.params.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
    } catch (error) {
      console.error(error);
    } finally {
      window.location.assign("/saved");
    }
  };

  return (
    <>
      <Nav />
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
              style={{
                borderColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`,
              }}
              className={
                props.dark
                  ? "flex flex-col justify-center w-1/3 h-1/3 border-4 bg-white bg-opacity-20 rounded-xl shadow-md text-white"
                  : "flex flex-col justify-center w-1/3 h-1/3 border-4 bg-black bg-opacity-30 rounded-xl shadow-md text-white"
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
              <img
                className="m-auto rounded-3xl hover:shadow-xl hover:transition duration-300 ease-in-out"
                src={color.image}
                alt=""
              />
              <button
                className={
                  props.dark
                    ? "m-auto mt-2 w-36 h-9 rounded-tl-2xl rounded-br-2xl text-white bg-transparent border-2 hover:shadow-xl hover:transition duration-300 ease-in-out outline-none"
                    : "m-auto mt-2 w-36 h-9 rounded-tl-2xl rounded-br-2xl text-gray-800 bg-transparent border-2 hover:shadow-xl hover:transition duration-300 ease-in-out outline-none"
                }
                style={{ borderColor: `${color.hex}` }}
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
