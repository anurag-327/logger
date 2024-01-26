"use client";
import ResetPassword from "@/components/Account/ResetPassword";
import UserDashboard from "@/components/Account/UserDashboard";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen overflow-hidden bg-gray-100">
      <UserDashboard />
      <ResetPassword />
    </div>
  );
};

export default page;
