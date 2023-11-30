"use client";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Home/Header";
import Home from "@/components/Home/Home";
import { useSearchParams } from "next/navigation";
import { CaretUp, ChartBar, Globe, User, Users } from "phosphor-react";
import Image from "next/image";
export default function page() {
  const router = useRouter();
  const [dropDown, setDropDown] = useState(false);
  const searchParams = useSearchParams();
  const callback_url = searchParams.get("callback_url") || null;
  const {
    user,
    setUser,
    visitors,
    setVisitors,
    globalLoading,
    setGlobalLoading,
    setProjects,
  } = useStore();

  useEffect(() => {
    try {
      (async function () {
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
        const res = await fetch("/api/logger", body);
        const json = await res.json();
        if (res.status === 200) {
          var visitors = json || 0;
          const numberString = visitors.toString();
          const digitArray = numberString.split("").map(Number);
          setVisitors(digitArray);
        } else {
          console.log(json);
        }
      })();
      setGlobalLoading(false);
    } catch (error) {
      setGlobalLoading(false);
      console.log(error.message);
    }
  }, []);
  return (
    <main className="flex flex-col items-center min-h-[90vh] px-2 sm:px-6 ">
      {!globalLoading && (
        <button
          onClick={() => setDropDown(!dropDown)}
          className="absolute sm:fixed  h-9 flex items-center  justify-center bg-transparent  overlay top-[4.2rem] sm:top-20  sm:right-0"
        >
          <div className="flex items-center justify-center h-full gap-2 px-2 text-sm text-white rounded-l-md bg-zinc-700">
            <Image
              className="rounded-full"
              src="/logo2.png"
              width={20}
              height={20}
              alt="logo"
            />
            <span className="flex items-center justify-center ">logger</span>
          </div>
          <span className="flex items-center justify-center h-full px-2 text-sm text-white bg-green-600 min-w-[40px] rounded-r-md">
            {visitors}
          </span>
          {dropDown && (
            <div className="absolute z-[100]  justify-center bg-white items-center border flex flex-col top-10 w-[250px] min-h-[180px]  -right-15 sm:right-2 px-4 py-2 rounded-md">
              <CaretUp
                className="absolute z-10 text-white right-20 sm:-right-1 -top-5 "
                size={30}
                weight="fill"
              />
              <div className="flex flex-col items-center justify-between">
                <h2 className="text-lg font-semibold text-black">
                  Total visitors
                </h2>
                <ChartBar size={60} className="text-green-600" weight="fill" />
                <ul className="flex gap-px">
                  {visitors.map((digit) => (
                    <li className="w-6 h-6 text-white bg-blue-500 rounded-sm">
                      {digit}
                    </li>
                  ))}
                </ul>
                <span className="mt-4 text-xs text-black underline">
                  Powered by logger
                </span>
              </div>
            </div>
          )}
        </button>
      )}
      <Header />
      <Home />
    </main>
  );
}
