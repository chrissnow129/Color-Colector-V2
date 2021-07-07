import React from "react";
import { Switch } from "@headlessui/react";

export default function Dark(props) {
  return (
    <div>
      {props.dark ? (
        <Switch
          checked={props.dark}
          onChange={props.setDark}
          id="light"
          className="bg-white w-14 h-14 absolute top-[0.8rem] right-[5.5rem] rounded-full shadow-md focus:outline-none"
          style={{ backgroundColor: "rgba(255,247,231,0.5)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 mx-auto w-6 absolute left-4 bottom-4 transform hover:rotate-180 transition duration-500"
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
        </Switch>
      ) : (
        <Switch
          checked={props.dark}
          onChange={props.setDark}
          id="dark"
          className="bg-gray-700 bg-opacity-50 absolute top-[0.8rem] right-[5.5rem] w-14 h-14 py-2 rounded-full shadow-lg focus:outline-none"
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
        </Switch>
      )}
    </div>
  );
}
