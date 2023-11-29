import React from "react";

const Header = ({ setOverlay }) => {
  return (
    <div className="flex flex-col justify-center w-full h-40 gap-2 px-4 bg-white sm:gap-0 sm:justify-between sm:items-center sm:flex-row sm:px-40">
      <h3 className="text-lg font-bold sm:text-2xl">My Projects</h3>
      <button
        onClick={() => setOverlay(true)}
        className="px-3 py-2 text-sm text-white bg-black border border-gray-400 rounded-md sm:text-black sm:bg-white w-fi bg- sm:text-base h-fit"
      >
        Add Project
      </button>
    </div>
  );
};

export default Header;
