import React, { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const openClose = () => {
    setOpen(!open);
  };

  return (
    <div>
      <input type="checkbox" className="hidden" id="navi-toggle" />
      <label
        htmlFor="navi-toggle"
        id="navigation__button"
        onClick={openClose}
        style={{backgroundColor:'rgb(255,247,231)'}}
        className="h-14 w-14 fixed top-8 right-8 rounded-full shadow-xl"
      >
        <span style={{ marginTop: "5rem" }} id="navigation__icon"></span>
      </label>
      {/* <button onClick={openClose} className='bg-yellow-50 h-14 w-14 fixed top-8 left-8 rounded-full shadow-xl'><span style={{marginLeft:'.65rem', marginTop:'4.9rem'}} className="hover:bg-green-300" id='navigation__icon'></span></button> */}
    <nav className={open ? "bg-white bg-opacity-25 absolute rounded-tr-xl rounded-br-xl shadow-sm px-3 absolute -top-0 h-screen w-72" : 'hidden'}>
      <ul>
        <li class='text-center font-light text-white mt-48 py-2 text-2xl rounded-t-xl rounded-b-md w-full hover:bg-cyan-200'><a href='##'>Home</a></li>
        <li class='text-center font-light text-white my-2 py-2 text-2xl bg-pink-200'><a href='##'>Saved Colors</a></li>
      </ul>
    </nav>
    </div>
  );
}
