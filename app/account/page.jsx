"use client";
import ResetPassword from "@/components/Account/ResetPassword";
import UserDashboard from "@/components/Account/UserDashboard";

import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const { user } = useStore();
  const router = useRouter();

  useEffect(() => {}, [user]);
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen overflow-hidden bg-gray-100">
      <UserDashboard />
      <ResetPassword />
    </div>
  );
};

export default page;
