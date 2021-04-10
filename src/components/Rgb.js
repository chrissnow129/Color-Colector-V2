import React, { useState, useEffect, useRef } from "react";

export default function Rgb(props) {
  const [query, updateQuery] = useState({
    baseURL: "https://www.thecolorapi.com/id?",
    option: "rgb=",
    rgb: "",
    searchURL: "",
  });
  const [rgbIn, updtRgb] = useState({});

  const [rgbLst, setRgbLst] = useState([]);

  const rgbRef = useRef(null);
  // const b = useRef(null);
  // const g = useRef(null);

  const getRgb = async () => {
    if (query.searchURL) {
      try {
        const response = await fetch(query.searchURL);
        const data = await response.json();
        await updtRgb(data);
        await setRgbLst([...rgbLst, data]);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getRgb();
  }, [query]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    updateQuery({
      ...query,
      searchURL: query.baseURL + query.option + query.rgb,
    });
  };

  const handleSave = async (newColor) => {
    try {
      const response = await fetch("/api/colorcol", {
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
    } finally {
      window.location.assign("/saved");
    }
  };

  const handleChange = (evt) => {
    updateQuery({ ...query, rgb: evt.target.value });
  };

  return (
    <div key="2389398">
      <form
        style={
          props.dark
            ? { boxShadow: "1px 1px 5px 0px rgba(0,0,0,0.1)" }
            : { boxShadow: "1px 1px 5px 0px rgba(0,0,0,0.3)" }
        }
        className={
          props.dark
            ? "flex flex-col justify-center my-8 pt-5 mx-auto text-white w-52 h-28 bg-white bg-opacity-20 border-3 border-green-100 rounded-xl"
            : "flex flex-col justify-center my-8 pt-5 mx-auto text-gray-800 w-52 h-28 bg-black bg-opacity-20 border-3 border-green-100 rounded-xl"
        }
        onSubmit={handleSubmit}
      >
        <div className="my-3">
          <input
            style={
              props.dark
                ? { boxShadow: "1px 1px 5px 0px rgba(0,0,0,0.125)inset" }
                : { boxShadow: "1px 1px 5px 0px rgba(0,0,0,0.3)inset" }
            }
            className="bg-transparent relative left-5 rounded-lg h-7 placeholder-opacity-20"
            type="text"
            placeholder="RGB Value"
            onChange={handleChange}
            value={query.rgb}
            ref={rgbRef}
          />
        </div>

        <input
          className={
            props.dark
              ? "w-32 mx-auto mb-8 border-2 border-gray-300 rounded-bl-2xl text-white h-10 rounded-tr-2xl bg-transparent hover:shadow-xl hover:transition duration-300 ease-in-out"
              : "w-32 mx-auto mb-8 border-2 border-gray-700 rounded-bl-2xl h-10 text-gray-800 rounded-tr-2xl bg-transparent hover:shadow-xl hover:transition duration-300 ease-in-out"
          }
          type="submit"
          value="Get this Color"
        />
      </form>
      <div className="grid grid-cols-4 ml-7">
        {rgbLst.map((rgb2) => {
          return (
            <div>
              <div
                key={rgb2.hex}
                style={{
                  backgroundColor: `rgba(${rgb2.rgb.r}, ${rgb2.rgb.g}, ${rgb2.rgb.b}, 0.3)`,
                }}
                className="flex flex-col justify-center relative mb-6 w-48 h-48 rounded-xl shadow-md"
              >
                <h1 className="text-center font-semibold text-xl py-2 text-white">
                  {rgb2.name.value}
                </h1>
                <img
                  className="m-auto rounded-3xl hover:shadow-2xl transform hover:-translate-y-2 hover:transition duration-300 ease-in-out"
                  src={rgb2.image.bare}
                  alt=""
                />
                <button
                  style={{
                    backgroundColor: `rgba(${rgb2.rgb.r}, ${rgb2.rgb.g}, ${rgb2.rgb.b}, 0.2)`,
                  }}
                  className="m-auto my-3 w-32 h-9 rounded-tl-2xl rounded-br-2xl text-white font-extralight text-sm hover:shadow-xl hover:transition duration-300 ease-in-out outline-none"
                  onClick={() => handleSave(rgb2)}
                >
                  Save This Color
                </button>
              </div>
            </div>
          );
        })}
        {/* {for(color in rgbIn){
						console.log(rgbIn)
					}} */}
      </div>
    </div>
  );
}
