"use client";
import { List, X } from "@phosphor-icons/react/dist/ssr";
const Button = () => {
  function toggleSidebar() {
    document.getElementById("sidebar-playground").classList.toggle("hidden");
    document.getElementById("list").classList.toggle("hidden");
    document.getElementById("x").classList.toggle("hidden");
  }
  return (
    <div className="fixed right-0 z-50 flex justify-end w-full p-2 mt-14 md:hidden">
      <button
        className="p-3 bg-gray-100 border rounded-md"
        onClick={toggleSidebar}
      >
        <List id="list" size={25} />
        <X id="x" className="hidden" size={25} />
      </button>
    </div>
  );
};

export default Button;
