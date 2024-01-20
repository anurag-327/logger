import React from "react";

const Redirect = () => {
  return (
    <div class="gradient text-black min-h-screen flex items-center">
      <div class="container mx-auto p-4 flex flex-wrap items-center">
        <div class="w-full md:w-7/12 text-center md:text-left p-4">
          <div class="text-6xl font-medium">405</div>
          <div class="text-xl md:text-3xl font-medium mb-4">
            You must be logged in to access this page.
          </div>

          <a
            href="/login"
            class="border bg-blue-500 text-white rounded-md border-white px-4 py-2"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Redirect;
