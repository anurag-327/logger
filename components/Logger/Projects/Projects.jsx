import React from "react";
import Card from "./Card";
import { useStore } from "@/store/useStore";

const Projects = ({ error }) => {
  const { projects } = useStore();
  return (
    <>
      {error ? (
        <div>Error fetching data</div>
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
