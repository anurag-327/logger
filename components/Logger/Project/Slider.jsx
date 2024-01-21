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
      className="w-[80%] lg:w-[320px] border-t text-sm z-10 p-4  hidden lg:block lg:hidden  absolute lg:static  min-h-screen bg-gray-100 lg:bg-white"
    >
      <div className="flex flex-col items-start justify-start gap-2 ">
        <button
          onClick={() => setSection("logs")}
          className={`${
            section == "logs" && "bg-gray-200"
          } flex w-full  gap-1 py-2 px-3 rounded-md hover:bg-gray-100`}
        >
          <Notebook size={20} />
          Logs
        </button>
        <button
          onClick={() => setSection("stats")}
          className={`${
            section == "stats" && "bg-gray-200"
          } flex w-full  gap-1 py-2 px-3 rounded-md hover:bg-gray-100`}
        >
          <ChartLine size={20} />
          Stats
        </button>
        <button
          onClick={() => setSection("credentials")}
          className={`${
            section == "credentials" && "bg-gray-200"
          } flex w-full  gap-1 py-2 px-3 rounded-md hover:bg-gray-100`}
        >
          <IdentificationBadge size={20} />
          Credentials
        </button>
        {/* <button
          onClick={() => setSection("delete")}
          className={`${
            section == "delete" && "bg-gray-200"
          } flex w-full  gap-1 py-2 px-3 rounded-md hover:bg-gray-100`}
        >
          <IdentificationBadge size={20} />
          Delete Application
        </button> */}
      </div>
    </div>
  );
};

export default Slider;
