"use client";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";
import Router from "next/router";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase/config";
import Header from "@/components/Home/Header";
import Home from "@/components/Home/Home";
import { useSearchParams } from "next/navigation";
export default function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callback_url = searchParams.get("callback_url") || null;
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
  useEffect(() => {
    if (user != null) {
      if (callback_url) router.push(callback_url);
      else router.push("/projects");
    }
  });
  return (
    <main className="flex flex-col items-center min-h-screen px-2 sm:px-6 ">
      <Header />
      <Home />
    </main>
  );
}
