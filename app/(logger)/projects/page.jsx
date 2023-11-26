"use client";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Overlay from "@/components/Logger/Projects/Overlay";
import Header from "@/components/Logger/Projects/Header";
import Dashboard from "@/components/Logger/Projects/Dashboard";

const page = () => {
  const router = useRouter();
  const { user } = useStore();
  const [overlay, setOverlay] = useState(false);
  console.log(user);
  useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);
  return (
    <>
      {overlay ? (
        <Overlay setOverlay={setOverlay} />
      ) : (
        <div className="w-full">
          <Header setOverlay={setOverlay} />
          <Dashboard setOverlay={setOverlay} />
        </div>
      )}
    </>
  );
};

export default page;
