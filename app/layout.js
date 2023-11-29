"use client";
import Loader from "@/components/UI/Loader";
import "./globals.css";
import { Inter, Poppins, Montserrat } from "next/font/google";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import Router from "next/router";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/config";
import { useSearchParams } from "next/navigation";
import { CaretUp, ChartBar, Globe } from "phosphor-react";
const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
});

export default function RootLayout({ children }) {
  const {
    user,
    setUser,
    setVisitors,
    globalLoading,
    setGlobalLoading,
    visitors,
  } = useStore();
  const [error, setError] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callback_url = searchParams.get("callback_url") || null;
  useEffect(() => {
    // if (window.navigator.onLine == false) {
    //   console.log("offline");
    //   setError(true);
    // } else {
    //   console.log("online");
    //   setError(false);
    // }
    try {
      (async function () {
        const loggedinUser = await supabase.auth.getUser();
        setUser(loggedinUser.data.user);
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
    Router.events.on("routeChangeStart", () => setGlobalLoading(true));
    Router.events.on("routeChangeComplete", () => setGlobalLoading(false));
    Router.events.on("routeChangeError", () => setGlobalLoading(false));
  }, []);
  return (
    <html lang="en">
      <head>
        <title>Logger</title>
      </head>
      <body
        className={
          font.className +
          " bg-gradient-to-r from-blue-50 to-blue-100  via-orange-50"
        }
      >
        {globalLoading ? (
          <Loader />
        ) : error ? (
          <div className="flex flex-col items-center justify-center w-full min-h-screen">
            <div className="flex flex-col items-center gap-6 px-4 text-center">
              <Globe size={80} weight="light" color="#000000" />
              <span className="font-[500] text-xl">
                You aren't connected to a working internet connection
              </span>
              <a
                href="/"
                className="px-2 py-1 border border-green-600 rounded-md"
              >
                Refresh
              </a>
            </div>
          </div>
        ) : (
          <>
            {!globalLoading && (
              <button
                onClick={() => setDropDown(!dropDown)}
                className="absolute z-[100] flex items-center justify-center gap-2 px-4 py-1  bg-black border border-gray-600 rounded-md overlay top-[4.5rem] right-2 sm:right-4"
              >
                <ChartBar size={20} color="#ffffff" weight="fill" />
                <span className="text-white"> {visitors}</span>
                {dropDown && (
                  <div className="absolute z-[100]  justify-center bg-white items-center border flex flex-col top-10 w-[250px] min-h-[180px] right-2 px-4 py-2 rounded-md">
                    <CaretUp
                      className="absolute z-10 -right-1 -top-5 "
                      size={30}
                      color="#808080"
                      weight="fill"
                    />
                    <div className="flex flex-col items-center justify-between">
                      <h2 className="text-lg font-semibold text-black">
                        Total visitors
                      </h2>
                      <ChartBar size={60} color="#000000" weight="fill" />
                      <ul className="flex gap-px">
                        {visitors.map((digit) => (
                          <li className="w-6 h-6 text-white bg-blue-700 rounded-sm">
                            {digit}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-4 text-xs text-black">
                        Powered by logger
                      </span>
                    </div>
                  </div>
                )}
              </button>
            )}
            {children}
          </>
        )}
      </body>
    </html>
  );
}
