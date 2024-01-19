import React from "react";
import History from "./History";
import { ListBullets } from "phosphor-react";

function Logs({ logs, setLogs }) {
  return (
    <div className=" px-2 pl-0 md:px-0 md:pl-4 bg-white  mx-auto  overflow-hidden w-[98%] md:ml-4 mt-4  justify-center items-start flex-col gap-3">
      {logs.length > 0 ? (
        <History logs={logs} />
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <ListBullets size={80} />
          <span>No logs found</span>
        </div>
      )}
    </div>
  );
}

export default Logs;
