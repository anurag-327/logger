import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const Pagination = ({ next, prev }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-4 py-8 md:px-8">
        <a
          href={prev}
          className="px-2 py-1 text-lg text-gray-700 transition-all duration-500 rounded-md group text-start hover:text-black"
        >
          <CaretLeft
            className="inline-block transition-all duration-500 group-hover:mr-2"
            size={20}
          />
          Prev{" "}
        </a>
        <a
          href={next}
          className="px-2 py-1 text-lg text-gray-700 transition-all duration-500 rounded-md group text-start hover:text-black"
        >
          Next{" "}
          <CaretRight
            className="inline-block transition-all duration-500 group-hover:ml-2"
            size={20}
          />
        </a>
      </div>
      <div className="flex justify-end px-8">
        <a href="/" className="text-blue-500 underline text-end">
          Home
        </a>
      </div>
    </div>
  );
};

export default Pagination;
