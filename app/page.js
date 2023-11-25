"use client";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";
import Router from "next/router";
import { supabase } from "@/supabase/config";
import Header from "@/components/Home/Header";
import Home from "@/components/Home/Home";
export default function page() {
  const { user, setUser, globalLoading, setGlobalLoading, setProjects } =
    useStore();
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
          setProjects(data);
        }
      })();
    } catch (error) {
      setGlobalLoading(false);
      console.log(error.message);
    }
    Router.events.on("routeChangeStart", () => setGlobalLoading(true));
    Router.events.on("routeChangeComplete", () => setGlobalLoading(false));
    Router.events.on("routeChangeError", () => setGlobalLoading(false));
  }, []);
  return (
    <main className="flex flex-col items-center min-h-screen p-8 sm:p-16">
      <Header />
      <Home />
    </main>
  );
}
