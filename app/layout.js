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
import { CaretUp, ChartBar, Globe, User, Users } from "phosphor-react";
import Footer from "@/components/UI/Footer";
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

  const router = useRouter();
  const searchParams = useSearchParams();
  const callback_url = searchParams.get("callback_url") || null;
  useEffect(() => {
    try {
      (async function () {
        const loggedinUser = await supabase.auth.getUser();
        setUser(loggedinUser.data.user);
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
            {children}
            {!globalLoading && <Footer />}
          </>
        )}
      </body>
    </html>
  );
}
