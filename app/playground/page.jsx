"use client";
import Header from "@/components/Home/Header";
import Playground from "@/components/UI/Playground";
import Editor from "@monaco-editor/react";
const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Header />
      <Playground />
    </div>
  );
};

export default Page;
