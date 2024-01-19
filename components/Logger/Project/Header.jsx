import React from "react";

const Header = ({ credentials }) => {
  return (
    <div className="flex flex-col justify-center w-full h-40 text-center bg-white sm:gap-0 sm:justify-center sm:items-center sm:flex-row ">
      <h3 className="text-4xl font-bold text-green-600">{credentials.name}</h3>
    </div>
  );
};

export default Header;
