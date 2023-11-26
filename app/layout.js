"use client";
import Loader from "@/components/UI/loader";
import "./globals.css";
import { Inter, Poppins, Montserrat } from "next/font/google";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";
import Router from "next/router";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/config";
import { useSearchParams } from "next/navigation";
const font = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
});

export default function RootLayout({ children }) {
  const { user, setUser, globalLoading, setGlobalLoading, setProjects } =
    useStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callback_url = searchParams.get("callback_url") || null;
  useEffect(() => {
    try {
      (async function () {
        const loggedinUser = await supabase.auth.getUser();
        setUser(loggedinUser.data.user);
        if (loggedinUser.data.user) {
          const { data, error } = await supabase
            .from("projects")
            .select()
            .order("updated_at", { ascending: true });
          if (data) setProjects(data);
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
        {globalLoading ? <Loader /> : children}
      </body>
    </html>
  );
}
