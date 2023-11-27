"use client";
import Dashboard from "@/components/Logger/Project/Dashboard";
import { useStore } from "@/store/useStore";
import { supabase } from "@/supabase/config";
import React, { useEffect, useState } from "react";
const page = ({ params }) => {
  const { user } = useStore();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState();
  const [notfound, setNotfound] = useState(false);
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  useEffect(() => {
    if (user == null) router.push("/");
    (async function () {
      if (user != null) {
        const { data, error } = await supabase
          .from("projects")
          .select()
          .eq("id", params.id[0]);
        if (error) {
          setError(true);
          setErrormsg(error.message);
          setLoading(false);
        } else {
          if (data != null && data.length > 0) {
            setProject(data[0]);
            setLoading(false);
          } else if (data.length == 0) {
            setNotfound(true);
            console.log("No Application Found");
            setLoading(false);
          }
        }
      }
    })();
  }, [user]);
  return (
    <div className="w-full">
      {loading ? (
        <div className="mt-10 ">fetching Data...</div>
      ) : notfound && error == false ? (
        <div className="mt-10 "> Application Not found</div>
      ) : error ? (
        <div className="mt-10 text-red-600">{errormsg}</div>
      ) : (
        <div>
          <Dashboard project={project} />
        </div>
      )}
    </div>
  );
};

export default page;
