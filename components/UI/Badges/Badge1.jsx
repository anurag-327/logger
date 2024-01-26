"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useStore } from "@/store/useStore";
const Badge1 = () => {
  const { visitors, setVisitors, globalLoading, setGlobalLoading } = useStore();
  useEffect(() => {
    try {
      setVisitors(fetchVisitors());
    } catch (error) {
    } finally {
      setGlobalLoading(false);
    }
  }, []);
  return (
    <button
      title="Powered By Logger"
      className="absolute sm:fixed  h-9 flex items-center  justify-center overflow-hidden overlay top-[4.2rem] sm:top-20  sm:right-0"
    >
      <div className="flex items-center justify-center h-full gap-2 px-2 text-sm text-white rounded-l-sm bg-zinc-700">
        <Image
          className="rounded-full"
          src="/logo2.png"
          width={20}
          height={20}
          alt="logo"
        />
        <span className="flex items-center justify-center ">Visitors</span>
      </div>
      <span className="flex items-center justify-center h-full px-2 text-sm text-white bg-green-600 min-w-[40px] rounded-r-sm sm:rounded-none">
        {visitors}
      </span>
    </button>
  );
};

export default Badge1;
async function fetchVisitors() {
  const body = {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      clientSecret: process.env.NEXT_PUBLIC_LOGGER_CLIENTSECRET,
      applicationId: process.env.NEXT_PUBLIC_LOGGER_APPLICATIONID,
    }),
  };
  const res = await fetch(
    "https://logger-mocha-six.vercel.app/api/logger/v1",
    body
  );
  const json = await res.json();
  if (res.status === 200) return json || 0;
  else return 0;
}
