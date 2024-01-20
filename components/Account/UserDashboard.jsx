import { useStore } from "@/store/useStore";
import React from "react";

const UserDashboard = () => {
  const { user } = useStore();
  return (
    <div className="w-[100%] sm:w-[450px] p-6  md:mt-0  sm:p-8">
      <h2 className="mb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Account
      </h2>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900">Name</h3>
          <span className="bg-gray-50 border overflow-hidden border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 ">
            {user.user_metadata.name}
          </span>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900">Email</h3>
          <span className="bg-gray-50 overflow-hidden border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 ">
            {user.user_metadata.email}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
