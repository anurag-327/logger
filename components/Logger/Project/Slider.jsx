import { X } from "@phosphor-icons/react/dist/ssr";
import { ChartLine, IdentificationBadge, Notebook } from "phosphor-react";
import React from "react";

const Slider = ({ section, setSection }) => {
  function toggleSlider() {
    document.getElementById("slider").classList.toggle("hidden");
  }
  return (
    <div
      id="slider"
      className="w-[80%] lg:w-[350px] z-10 p-4  hidden lg:block  absolute lg:static  min-h-screen bg-gray-100 lg:bg-white"
    >
      <div className="flex flex-col items-start justify-start gap-2 ">
        <button
          onClick={() => setSection("logs")}
          className={`${
            section == "logs" && "bg-gray-200"
          } flex w-full  gap-1 p-3 rounded-md hover:bg-gray-100`}
        >
          <Notebook size={25} />
          Logs
        </button>
        <button
          onClick={() => setSection("stats")}
          className={`${
            section == "stats" && "bg-gray-200"
          } flex w-full  gap-1 p-3 rounded-md hover:bg-gray-100`}
        >
          <ChartLine size={25} />
          Stats
        </button>
        <button
          onClick={() => setSection("credentials")}
          className={`${
            section == "credentials" && "bg-gray-200"
          } flex w-full  gap-1 p-3 rounded-md hover:bg-gray-100`}
        >
          <IdentificationBadge size={25} />
          Credentials
        </button>
      </div>
    </div>
  );
};

export default Slider;
