import { useStore } from "@/store/useStore";
import Image from "next/image";
import React from "react";
import Projects from "./Projects";

const Dashboard = ({ setOverlay, error, loading }) => {
  const { projects } = useStore();
  return (
    <div className="w-[96%] sm:max-w-6xl border shadow-md mx-auto rounded-lg mt-10 bg-white h-fit">
      {projects ? (
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
