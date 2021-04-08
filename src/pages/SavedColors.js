import React, { useState, useEffect } from "react";
import Nav from '../components/Nav'
import { Link } from "react-router-dom";

export default function SavedColors(props) {
  const [rgbSaved, setRgbSaved] = useState([]);

  useEffect(() => {
    // Immediately Invoked Function Expression
    (async () => {
      try {
        const response = await fetch("/api/colorcol");
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
      class="h-screen overflow-auto"
      style={{
        background:
          "linear-gradient(58deg, rgba(255,203,242,1) 0%, rgba(255,234,195,1) 50%, rgba(192,253,255,1) 87%)",
      }}
    >
		<Nav/>
      <h1 class='relative left-14 top-28 text-6xl font-extralight text-center text-white'>Saved Colors</h1>
      <div className="grid gap-x-20 grid-cols-4 ml-16 mt-48">
        {rgbSaved.map((rgbb) => {
          return (
            <div>
              <div
                key={rgbb.hex}
                style={{
                  backgroundColor: `rgba(${rgbb.r}, ${rgbb.g}, ${rgbb.b}, 0.3)`,
                }}
                className="flex flex-col justify-center mt-10 w-56 h-60 rounded-xl shadow-md text-white"
              >
                <h1 className="text-center font-semibold text-xl pt-4">{rgbb.name}</h1>
                <h2 className="text-center text-md font-light">
                  RGB: {rgbb.r}, {rgbb.g}, {rgbb.b}
                </h2>
                <h2 className="text-center text-md font-light">HEX: {rgbb.hex}</h2>
                <img
                  className="mx-auto mt-3 rounded-3xl hover:shadow-xl hover:transition duration-300 ease-in-out"
                  src={rgbb.image}
                  alt=''
                />
                <Link to={`/${rgbb._id}`}>
                  <button
                    style={{
                      backgroundColor: `rgba(${rgbb.r}, ${rgbb.g}, ${rgbb.b}, 0.2)`,
                    }}
                    className="flex justify-center my-4 m-auto w-32 rounded-tl-2xl rounded-br-2xl text-white hover:shadow-xl hover:transition duration-300 ease-in-out outline-none"
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
