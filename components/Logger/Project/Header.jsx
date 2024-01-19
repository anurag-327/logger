import { List, X } from "@phosphor-icons/react";
import React from "react";

const Header = ({ credentials }) => {
  function toggleSlider() {
    document.getElementById("slider").classList.toggle("hidden");
    document.getElementById("X").classList.toggle("hidden");
    document.getElementById("list").classList.toggle("hidden");
  }
  return (
    <div className="flex flex-row items-center justify-center w-full px-8 text-center bg-white h-28 sm:gap-0 sm:justify-center sm:items-center sm:flex-row ">
      <h3 className="text-4xl font-bold text-green-600">{credentials.name}</h3>
      <div className="flex justify-end w-full rounded-md lg:hidden ">
        <button
          onClick={toggleSlider}
          className="p-1 border rounded-md cursor-pointer"
        >
          <X id="X" className="hidden lg:hidden" size={25} />
          <List id="list" className="lg:hidden" size={25} />
        </button>
      </div>
    </div>
  );
};

export default Header;
