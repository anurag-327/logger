import { useStore } from "@/store/useStore";
import Image from "next/image";
import React from "react";
import Projects from "./Projects";

const Dashboard = ({ setOverlay, error, loading }) => {
  const { projects } = useStore();
  return (
    <div className="w-[96%] sm:max-w-6xl border shadow-md mx-auto rounded-lg mt-10 bg-white h-fit">
      {loading ? (
        <div className="flex flex-col items-center animate-pulse  w-full px-4 py-8 min-h-[400px]">
          <div className="flex flex-col flex-wrap w-full gap-4 mx-auto mt-10 sm:w-fit sm:flex-row">
            <div className="flex w-full  flex-col sm:w-[300px] overflow-hidden gap-2  shadow-gray-300 hover:shadow-lg shadow-sm border transition duration-150 items-start p-3  rounded-md">
              <span className="font-[500] bg-gray-100 rounded-md"></span>
              <span className="flex w-full h-6 gap-2 text-sm bg-gray-100 rounded-md"></span>
              <span className="flex w-full h-6 gap-2 overflow-hidden text-sm bg-gray-100 rounded-md"></span>
              <p className="h-6 px-2 py-2 text-sm underline bg-gray-100 rounded-md"></p>
            </div>
          </div>
        </div>
      ) : projects.length > 0 ? (
        <div>
          <Projects error={error} loading={loading} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full px-4 py-8">
          <h3 className="text-xl font-[400]">
            You don't have any projects yet!
          </h3>
          <Image
            src="/illustration.jpg"
            alt="no projects"
            width={300}
            height={300}
          />
          <button
            onClick={() => setOverlay(true)}
            className="px-3 py-2 text-sm text-white bg-black rounded-md h-fit"
          >
            Create new Project
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
