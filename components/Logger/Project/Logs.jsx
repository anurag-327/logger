import React from "react";
import History from "./History";

function Logs({ logs, setLogs }) {
  console.log(logs);
  return (
    <div className="sm:px-8 px-2 sm:shadow-md bg-white  mx-auto  border-none sm:border rounded-none sm:rounded-xl border-gray-300 overflow-hidden py-8 w-[100%] sm:max-w-5xl mt-10  justify-center items-start flex-col gap-3">
      <History logs={logs} />
    </div>
  );
}

export default Logs;
