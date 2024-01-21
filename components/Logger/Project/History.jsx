import {
  ClockAfternoon,
  ClockCountdown,
  File,
  HourglassSimpleMedium,
  Plus,
  X,
} from "@phosphor-icons/react";
import { Notepad } from "@phosphor-icons/react/dist/ssr";
import { Globe, LineSegments, Path } from "phosphor-react";

import React, { useState } from "react";

const History = ({ logs }) => {
  const [sidebar, setSidebar] = useState();
  const [page, setPage] = useState(1);
  const [capacity, setCapacity] = useState(20);
  function pagehandler(i) {
    if (i >= 1 && i <= Math.ceil(logs.length / capacity) && i != page)
      setPage(i);
  }
  function Sidebar() {
    return (
      <div className="order-2 w-[90%] border-t-2 sm:w-[400px] right-0 bg-gray-100 absolute xl:static  p-2 border-l-2 ">
        {!sidebar ? (
          <div className="flex-col bg-gray-100 items-center justify-center hidden h-[70vh] xl:flex">
            <Notepad size={30} />
            <span>Select a log to view details</span>
          </div>
        ) : (
          <Logdata data={sidebar} setSidebar={setSidebar} />
        )}
      </div>
    );
  }
  return (
    <div className="flex flex-row border-l-2 min-h-[80vh] pb-4  overflow-auto md:overflow-hidden no-scrollbar">
      <Sidebar />
      <div className="flex flex-col justify-between w-full">
        <div>
          <div className="w-full px-4 py-4 bg-gray-100 border-t-2 ">
            <h2 className="text-3xl mt-6 ml-6 font-[450]">Logs</h2>
          </div>
          <div className="px-4 mt-6">
            <table className="w-full overflow-hidden text-sm bg-white divide-gray-200 h-fit">
              <thead className="border-b-2">
                <tr>
                  <th className="px-4 py-2 font-medium text-gray-900 text-start whitespace-nowrap">
                    Time
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-900 text-start whitespace-nowrap">
                    Country
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-900 text-start whitespace-nowrap">
                    Region
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-900 text-start whitespace-nowrap">
                    Path
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-900 text-start whitespace-nowrap">
                    Browser
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-hidden divide-gray-200">
                {logs
                  .slice(page * capacity - capacity, page * capacity)
                  .map((data, index) => (
                    <tr
                      onClick={() => setSidebar(data)}
                      key={data.id}
                      className={`${
                        data === sidebar && "bg-orange-100"
                      } py-4 overflow-hidden cursor-pointer hover:bg-orange-100 shadow-sm`}
                    >
                      <td className="px-4 py-4 overflow-auto text-gray-800 whitespace-pre ">
                        <ClockAfternoon
                          className="inline-block mr-2 text-black"
                          size={22}
                        />
                        {timestamptoDate(data.created_at)}
                      </td>
                      <td className="px-4 py-4 text-gray-800 whitespace-nowrap">
                        <Globe
                          className="inline-block mr-2 text-blue-500"
                          size={22}
                        />
                        {data.country}
                      </td>
                      <td className="px-4 py-4 overflow-hidden text-gray-800 whitespace-nowrap text- no-scrollbar ">
                        {data.region}
                      </td>
                      <td className="px-4 py-4 max-w-[100px] overflow-scroll no-scrollbar text-gray-800 whitespace-nowrap">
                        <File
                          className="inline-block mr-2 text-yellow-500"
                          size={22}
                        />

                        {data.path || "/"}
                      </td>
                      <td className="px-4 py-4 text-gray-800 whitespace-nowrap">
                        {data.userAgent.browser.name || "N/A"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col justify-between w-full gap-2 mt-8 md:flex-row ">
          <div className="flex justify-center w-full gap-2 md:ml-20 ">
            <span
              onClick={() => pagehandler(page - 1)}
              className="px-3 py-1 border rounded-md cursor-pointer"
            >
              Prev
            </span>
            {[...Array(Math.ceil(logs.length / capacity))].map((_, i) => {
              return (
                <span
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`${
                    page == i + 1 && "bg-gray-300"
                  } px-3 py-1 border cursor-pointer rounded-md`}
                >
                  {i + 1}
                </span>
              );
            })}
            <span
              onClick={() => pagehandler(page + 1)}
              className="px-3 py-1 border rounded-md cursor-pointer"
            >
              Next
            </span>
          </div>
          <select
            className="px-2 mx-auto text-sm border rounded-md outline-none resize-none w-fit "
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          >
            <option value={20}>20 entries/page</option>
            <option value={30}>30 entries/page</option>
            <option value={50}>50 entries/page</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default History;

function Logdata({ data, setSidebar }) {
  return (
    <div className="w-full gap-4 px-2 py-4 text-sm whitespace-nowrap">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl  text-gray-500 front-[450] hover:text-black">
          Log Details
        </h2>
        <button onClick={() => setSidebar(null)}>
          <X size={25} />
        </button>
      </div>
      <div className="flex flex-col w-full gap-4 mt-8">
        <div className="flex justify-between gap-4 px-2 py-2 overflow-scroll border-b-2 no-scrollbar">
          <span className="text-gray-500 hover:text-black font-[450]">
            Log Id
          </span>
          <span className="">{data.id}</span>
        </div>
        <div className="flex justify-between gap-4 px-2 py-2 overflow-scroll border-b-2 no-scrollbar">
          <span className="text-gray-500 hover:text-black font-[450]">
            Time
          </span>
          <span className="">{timestamptoDate(data.created_at)}</span>
        </div>
        <div className="flex justify-between gap-4 px-2 py-2 border-b-2 ">
          <span className="text-gray-500 hover:text-black font-[450]">
            Referer
          </span>
          <span className="overflow-auto no-scrollbar">
            {data.referer || "N/A"}
          </span>
        </div>
        <div className="flex justify-between gap-4 px-2 py-2 border-b-2">
          <span className="text-gray-500 hover:text-black font-[450]">
            Path
          </span>
          <span className="overflow-auto no-scrollbar">{data.path || "/"}</span>
        </div>
        <div className="flex justify-between gap-4 px-2 py-2 border-b-2 ">
          <span className="text-gray-500 hover:text-black font-[450]">
            Host
          </span>
          <span className="overflow-auto no-scrollbar">{data.host}</span>
        </div>

        <div className="flex justify-between gap-4 px-2 py-2 border-b-2">
          <span className="text-gray-500 hover:text-black font-[450]">IP</span>
          <span>{data.ip}</span>
        </div>
        <div className="flex justify-between gap-4 px-2 py-2 border-b-2">
          <span className="text-gray-500 hover:text-black font-[450]">
            Country
          </span>
          <span>{data.country}</span>
        </div>
        <div className="flex justify-between gap-4 px-2 py-2 border-b-2">
          <span className="text-gray-500 hover:text-black font-[450]">
            Region
          </span>
          <span>{data.region}</span>
        </div>
        <div className="flex justify-between gap-4 px-2 py-2 border-b-2">
          <span className="text-gray-500 hover:text-black font-[450]">
            City
          </span>
          <span>{data.city}</span>
        </div>
        <div className="flex justify-between gap-4 px-2 py-2 border-b-2">
          <span className="text-gray-500 hover:text-black font-[450]">
            Browser
          </span>
          <span>{data.userAgent.browser.name || "N/A"}</span>
        </div>
        <div className="flex justify-between gap-4 px-2 py-2 border-b-2">
          <span className="text-gray-500 hover:text-black font-[450]">OS</span>
          <span>{data.userAgent.os.name || "N/A"}</span>
        </div>
        <div className="flex justify-between w-full gap-4 py-2 pr-2 ">
          <span className="text-gray-500 px-2  bg-white hover:text-black font-[450]">
            User Agent
          </span>
          <span className="overflow-auto no-scrollbar">{data.ua}</span>
        </div>
      </div>
    </div>
  );
}

function timestamptoDate(timestamp) {
  return new Date(timestamp).toString().replace(/\(.*\)/, "");
}
