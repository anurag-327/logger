"use client";
import Header from "@/components/Home/Header";
import Showcase from "@/components/Playground/ShowCase";

import Sidebar from "@/components/Playground/Sidebar";
import { List, X } from "@phosphor-icons/react";
const Layout = ({ children }) => {
  function toggleSidebar() {
    document.getElementById("sidebar-playground").classList.toggle("hidden");
    document.getElementById("list").classList.toggle("hidden");
    document.getElementById("x").classList.toggle("hidden");
  }
  return (
    <div className="w-full bg-white no-scrollbar">
      <Header />
      <div className="relative w-full min-h-screen overflow-hidden ">
        <div className="fixed right-0 z-50 flex justify-end w-full p-2 mt-14 md:hidden">
          <button
            className="p-3 bg-gray-100 border rounded-md"
            onClick={toggleSidebar}
          >
            <List id="list" size={25} />
            <X id="x" className="hidden" size={25} />
          </button>
        </div>
        <div className="relative flex w-full min-h-screen mt-0 overflow-hidden md:mt-14 ">
          <Sidebar />
          {children}
          <Showcase />
        </div>
      </div>
    </div>
  );
};

export default Layout;
