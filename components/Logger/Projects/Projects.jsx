import React from "react";
import Card from "./Card";
import { Globe, Link, LinkSimpleHorizontal } from "phosphor-react";

import { useStore } from "@/store/useStore";

const Projects = ({ error, loading }) => {
  const { projects } = useStore();
  return (
    <>
      {error ? (
        <div>Error fetching data</div>
      ) : loading ? (
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
      ) : (
        <div className="flex flex-col items-center  w-full px-4 py-8 min-h-[400px]">
          <h3 className="text-xl font-[500]">My Projects</h3>
          <div className="flex flex-col flex-wrap w-full gap-4 mx-auto mt-10 sm:w-fit sm:flex-row">
            {projects.map((item) => (
              <Card key={item.id} project={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
