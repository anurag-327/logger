"use client";
import { useStore } from "@/store/useStore";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
const Navigator = () => {
  const { user } = useStore();
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <a
        className="flex items-center justify-center gap-2 px-4 py-1 text-sm text-white bg-black rounded-full w-fit"
        href={user ? "/projects" : "/login"}
      >
        Configure your app
      </a>
      <a
        className="flex items-center justify-center gap-2 px-4 py-1 text-sm border border-green-500 rounded-full w-fit"
        href="/playground"
      >
        Playground
        <ArrowRight size={20} />
      </a>
    </div>
  );
};

export default Navigator;
