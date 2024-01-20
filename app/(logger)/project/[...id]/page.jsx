"use client";
import Dashboard from "@/components/Logger/Project/Dashboard";
import Logs from "@/components/Logger/Project/Logs";
import Header from "@/components/Logger/Project/Header";
import { useStore } from "@/store/useStore";
import { supabase } from "@/supabase/config";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Slider from "@/components/Logger/Project/Slider";
import Stats from "@/components/Logger/Project/Stats";
const page = ({ params }) => {
  const { user } = useStore();
  const [loading, setLoading] = useState(true);
  const [notfound, setNotfound] = useState(false);
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [section, setSection] = useState("logs");
  const [credentials, setCredentials] = useState();
  const [logs, setLogs] = useState();
  const router = useRouter();
  function displaySection() {
    switch (section) {
      case "logs":
        return logs && <Logs logs={logs} setLogs={setLogs} />;
      case "stats":
        return (
          logs && credentials && <Stats logs={logs} credentials={credentials} />
        );
      case "credentials":
        return (
          credentials && (
            <Dashboard
              credentials={credentials}
              setCredentials={setCredentials}
            />
          )
        );
      default:
        return logs && <Logs logs={logs} setLogs={setLogs} />;
    }
  }
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
            setCredentials(data[0]);
            setLoading(false);
          } else if (data.length == 0) {
            setNotfound(true);
            console.log("No Application Found");
            // setLoading(false);
          }
        }
      }
    })();
    (async function () {
      if (user != null) {
        const { data, error } = await supabase
          .from("logs")
          .select()
          .eq("applicationId", params.id[0])
          .order("created_at", { ascending: false });
        if (error) {
          setError(true);
          setErrormsg(error.message);
          setLoading(false);
        } else {
          if (data != null && data.length >= 0) {
            setLogs(data);
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
        <div className="bg-gray-100">
          {credentials && <Header credentials={credentials} />}
          <div className="flex flex-row ">
            <Slider setSection={setSection} section={section} />
            {displaySection()}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
