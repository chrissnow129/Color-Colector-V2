import React, { Fragment, useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import api from "../api";

export default function Rgb(props) {
  const [query, updateQuery] = useState();
  const [rgbId, setRgbId] = useState();
  const [rgbLst, setRgbLst] = useState([]);
  const [modal, setModal] = useState(false);

  const rgbRef = useRef(null);
  const completeButtonRef = useRef();

  const closeModal = () => {
    setModal(false);
  };

  const getRgb = async () => {
    if (query) {
      try {
        const response = await fetch(
          `https://www.thecolorapi.com/id?rgb=${query}`
        );
        const data = await response.json();
        await setRgbLst([data]);
        console.log(data);
        setModal(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getRgb();
  }, [rgbId]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setRgbId(query);
  };

  const handleSave = async (newColor) => {
    try {
      setModal(false);
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

  const handleChange = (evt) => {
    updateQuery(evt.target.value);
  };

  return (
    <div key="238">
      <form
        style={
          props.dark
            ? { boxShadow: "1px 1px 5px 0px rgba(0,0,0,0.1)" }
            : { boxShadow: "1px 1px 5px 0px rgba(0,0,0,0.3)" }
        }
        className={
          props.dark
            ? "flex flex-col justify-center my-8 pt-5 mx-auto text-white w-52 h-28 bg-white bg-opacity-30 border-3 border-green-100 rounded-xl"
            : "flex flex-col justify-center my-8 pt-5 mx-auto text-gray-800 w-52 h-28 bg-black bg-opacity-30 border-3 border-green-100 rounded-xl"
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
            className={`${
              props.dark ? "bg-white" : "bg-black"
            } bg-opacity-30 relative left-5 rounded-lg h-7 placeholder-opacity-20 focus:outline-none active:outline-none`}
            type="text"
            placeholder="RGB Value"
            onChange={handleChange}
            value={query}
            ref={rgbRef}
          />
        </div>

        <input
          className={
            props.dark
              ? "w-32 mx-auto mb-8 border-2 border-gray-300 rounded-bl-2xl text-white h-10 rounded-tr-2xl bg-transparent hover:shadow-xl hover:transition duration-300 ease-in-out focus:outline-none"
              : "w-32 mx-auto mb-8 border-2 border-gray-700 rounded-bl-2xl h-10 text-gray-800 rounded-tr-2xl bg-transparent hover:shadow-xl hover:transition duration-300 ease-in-out focus:outline-none"
          }
          type="submit"
          value="Get this Color"
        />
      </form>
      <div className="grid grid-cols-4 ml-7">
        {rgbLst.map((rgb2) => {
          return (
            <div>
              <div>
                <Transition show={modal} as={Fragment}>
                  <Dialog open={modal} onClose={() => setModal(false)}>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Dialog.Overlay className="fixed inset-0 bg-white backdrop-filter backdrop-blur-2xl opacity-40" />
                    </Transition.Child>
                    <span
                      className="inline-block h-screen align-middle"
                      aria-hidden="true"
                    >
                      &#8203;
                    </span>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <div className="bg-[#fcf7e7] bg-opacity-40 backdrop-filter backdrop-blur absolute left-[26rem] top-[23rem] rounded-xl shadow-2xl w-[22rem] h-[15rem]">
                        <Dialog.Title
                          style={{
                            color: `rgba(${rgb2.rgb.r}, ${rgb2.rgb.g}, ${rgb2.rgb.b}`,
                          }}
                          className="text-center text-2xl mt-[1rem] tracking-wide font-semibold"
                        >
                          {rgb2.name.value}
                        </Dialog.Title>
                        <img
                          className="mt-[3px] ml-32 rounded-3xl"
                          src={rgb2.image.bare}
                          alt=""
                        />
                        <Dialog.Description className="text-center py-[3px]">
                          Is this the color you want?
                        </Dialog.Description>
                        <button
                          style={{
                            borderColor: `rgba(${rgb2.rgb.r}, ${rgb2.rgb.g}, ${rgb2.rgb.b}`,
                          }}
                          className="ml-2 mt-2 w-32 h-8 rounded-tl-2xl rounded-br-2xl text-black border-2 hover:shadow-xl hover:transition duration-300 ease-in-out outline-none"
                          onClick={() => handleSave(rgb2)}
                        >
                          Save This Color
                        </button>
                        <button
                          style={{
                            borderColor: `rgba(${rgb2.rgb.r}, ${rgb2.rgb.g}, ${rgb2.rgb.b}`,
                          }}
                          className="ml-20 mt-2 w-32 h-8 rounded-bl-2xl rounded-tr-2xl text-black border-2 hover:shadow-xl hover:transition duration-300 ease-in-out outline-none"
                          onClick={() => setModal(false)}
                        >
                          Nope
                        </button>
                      </div>
                    </Transition.Child>
                  </Dialog>
                </Transition>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
