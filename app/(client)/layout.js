"use client";
import Loader from "@/components/UI/Loader";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import Router from "next/router";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/config";
import { useSearchParams } from "next/navigation";
import { CaretUp, ChartBar, Globe, User, Users } from "phosphor-react";
import Footer from "@/components/UI/Footer";

export default function Layout({ children }) {
  const {
    user,
    setUser,
    setVisitors,
    globalLoading,
    setGlobalLoading,
    visitors,
  } = useStore();

  useEffect(() => {
    try {
      (async function () {
        const loggedinUser = await supabase.auth.getUser();
        setUser(loggedinUser.data.user);
      })();
    } catch (error) {
    } finally {
      setGlobalLoading(false);
    }
    Router.events.on("routeChangeStart", () => setGlobalLoading(true));
    Router.events.on("routeChangeComplete", () => setGlobalLoading(false));
    Router.events.on("routeChangeError", () => setGlobalLoading(false));
  }, []);
  return (
    <div className=" bg-gradient-to-r scroll-smooth from-blue-50 to-blue-100 via-orange-50">
      {globalLoading ? (
        <Loader />
      ) : (
        <>
          {children}
          {!globalLoading && <Footer />}
        </>
      )}
    </div>
  );
}
