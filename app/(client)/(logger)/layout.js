"use client";
import Header from "@/components/Logger/Header";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/UI/Loader";
import { supabase } from "@/supabase/config";
export default function Layout({ children }) {
  const router = useRouter();
  const { user } = useStore();
  useEffect(() => {
    (async function () {
      const x = await supabase.auth.getSession();
      if (!x.data.session) router.push("/");
    })();
  }, [user]);
  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-r scroll-smooth from-blue-50 to-blue-100 via-orange-50">
      {user ? (
        <>
          <Header />
          {children}
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
}
