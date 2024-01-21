import React from "react";
import History from "./History";
import { ListBullets } from "phosphor-react";

function Logs({ logs, setLogs }) {
  return (
    <div className="flex-col items-start justify-center w-full gap-3 p-2 mx-auto mt-4 overflow-hidden bg-white md:p-4 md:ml-4">
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
