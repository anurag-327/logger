import React from "react";

const Header = ({ setOverlay }) => {
  return (
    <div className="flex items-center justify-between w-full h-40 px-4 bg-white sm:px-20">
      <h3 className="text-base sm:text-2xl">My Projects</h3>
      <button
        onClick={() => setOverlay(true)}
        className="px-3 py-2 text-sm text-white bg-black rounded-md sm:text-base h-fit"
      >
        Add Project
      </button>
    </div>
  );
};

export default Header;
