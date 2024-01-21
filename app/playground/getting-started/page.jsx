"use client";
import Playground from "@/components/Playground/Playground";
const page = () => {
  return (
    <div className=" md:ml-[300px] md:w-[calc(100%-340px)] w-[100%] bg-white ">
      <div className="xl:w-[80%]  px-4">
        <Playground />
      </div>
    </div>
  );
};

export default page;
