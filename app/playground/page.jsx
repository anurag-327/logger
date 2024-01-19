"use client";
import Header from "@/components/Home/Header";
import Playground from "@/components/Playground/Playground";
const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Header />
      <Playground />
    </div>
  );
};

export default Page;
