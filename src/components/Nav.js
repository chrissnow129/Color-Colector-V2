import React, { useState } from "react";
import routes from "../router/routes";
import { Link } from "react-router-dom";

export default function Nav(props) {
  const [open, setOpenss] = useState(false);

  const openClose = () => {
    setOpenss(!open);
  };


  const randKeyNav = Math.floor(Math.random() * 300);

  return (
      <div id="nav" key={randKeyNav}>
        <input type="checkbox" className="hidden" id="navi-toggle" />
        <label
          htmlFor="navi-toggle"
          id="navigation__button"
          onClick={openClose}
          style={{ backgroundColor: "rgb(255,247,231)" }}
          className="h-14 w-14 fixed top-5 right-4 rounded-full shadow-xl bg-opacity-40"
        >
          <span
            style={{ marginTop: "5rem" }}
            className={props.dark ? "bg-black" : "bg-white"}
            id="navigation__icon"
          ></span>
        </label>
        {/* <button onClick={openClose} className='bg-yellow-50 h-14 w-14 fixed top-8 left-8 rounded-full shadow-xl'><span style={{marginLeft:'.65rem', marginTop:'4.9rem'}} className="hover:bg-green-300" id='navigation__icon'></span></button> */}
        <nav
          id="vertical"
          className={
            open
              ? "bg-white overflow-hidden bg-opacity-30 backdrop-filter backdrop-blur-sm backdrop-saturate-50 absolute rounded-tr-3xl rounded-br-3xl shadow-sm py-32 -top-0 h-screen w-72 transition duration-700 ease-in-out"
              : "h-screen overflow-hidden absolute w-72 py-32 -top-0 transition duration-1000 ease-in-out transform -translate-x-72"
          }
        >
          {routes
            .filter((item) => !item.path.includes(":"))
            .map(({ key, path }) => (
              <Link
                class={
                  open
                    ? "flex flex-cols ml-3 font-light text-white my-6 py-2 text-2xl rounded-t-xl rounded-b-md w-full transition duration-700 ease-in-out transform hover:translate-x-14"
                    : "flex flex-cols ml-3 w-full h-screen my-6 py-2 text-2xl"
                }
                key={key}
                to={path}
              >
                {key}
              </Link>
            ))}

          {/* <ul>
        <li class='text-center font-light text-white mt-48 py-2 text-2xl rounded-t-xl rounded-b-md w-full hover:bg-cyan-200'><a href='##'>Home</a></li>
        <li class='text-center font-light text-white my-2 py-2 text-2xl hover:bg-cyan-200'><a href='##'>Saved Colors</a></li>
      </ul> */}
        </nav>
      </div>
  );
}
