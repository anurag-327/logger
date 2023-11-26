import { useStore } from "@/store/useStore";
import Image from "next/image";
import React from "react";

const Dashboard = ({ setOverlay }) => {
  const { projects } = useStore;
  console.log(projects);
  return (
    <div className="w-[96%] sm:max-w-6xl border shadow-md mx-auto rounded-lg mt-10 bg-white h-fit">
      {projects ? (
        <div></div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full px-4 py-8">
          <h3 className="text-xl font-[400]">
            You don't have any projects yet!
          </h3>
          <Image
            src="/illustration.jpg"
            alt="no projects"
            width={350}
            height={350}
          />
          <button
            onClick={() => setOverlay(true)}
            className="px-3 py-2 text-white bg-black rounded-md h-fit"
          >
            Create new Project
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
