"use client";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Overlay from "@/components/Logger/Projects/Overlay";
import Header from "@/components/Logger/Projects/Header";
import Dashboard from "@/components/Logger/Projects/Dashboard";
import { supabase } from "@/supabase/config";

const page = () => {
  const router = useRouter();
  const { user, setProjects } = useStore();
  const [overlay, setOverlay] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user == null) router.push("/");
    (async function () {
      if (user != null) {
        const { data, error } = await supabase
          .from("projects")
          .select()
          .order("updated_at", { ascending: true })
          .eq("user_id", user.id);
        if (error) {
          setLoading(false);
          setError(true);
        } else {
          setLoading(false);
          if (data) {
            setProjects(data);
          }
        }
      }
    })();
  }, [user]);
  return (
    <>
      {overlay && <Overlay setOverlay={setOverlay} />}
      <div className="w-full">
        <Header setOverlay={setOverlay} />
        <Dashboard error={error} loading={loading} setOverlay={setOverlay} />
      </div>
    </>
  );
};

export default page;
