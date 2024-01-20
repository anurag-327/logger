import React, { useState } from "react";
import { segregateData, countByDays } from "@/helper/index";
import Chart from "chart.js/auto";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  IdentificationBadge,
  SealQuestion,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
const Stats = ({ logs, credentials }) => {
  const stats = segregateData(logs, credentials);

  return (
    <div className=" md:px-0 bg-white  mx-auto  overflow-hidden w-[98%] md:ml-4 mt-4  justify-center items-start flex-col gap-6">
      <div className="w-full px-4 py-8 bg-gray-100 border-t-2 border-l-2 border-r-2">
        <h2 className="text-2xl font-[400] "># Stats & Insights</h2>
      </div>
      <div className="relative flex flex-col gap-1 pl-4 mt-6">
        <h2 className="text-lg font-[450]">Total Visitors</h2>
        <div className="flex items-center justify-center gap-4 p-2 bg-orange-200 rounded-md w-fit">
          <span className="flex items-center justify-center gap-1">
            <UsersThree size={25} />
            Total visitors :
          </span>
          <span>{stats.totalVisitors}</span>
        </div>
      </div>

      <div className="relative flex flex-col pl-4 mt-6">
        <h2 className="text-lg font-[450]">Unique Visitors</h2>
        <div className="flex items-center justify-center gap-4 p-2 mt-1 bg-blue-200 rounded-md w-fit">
          <span className="flex items-center justify-center gap-1">
            <IdentificationBadge size={25} />
            Unique visitors :
          </span>
          <span>{stats.uniqueVisitors}</span>
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-10">
        <ChartByVisits
          totalVisitors={stats.totalVisitors}
          uniqueVisitors={stats.uniqueVisitors}
        />
        <ChartByDate logs={logs} />
        <ChartByCity data={stats.logsCountByCity} />
        <ChartByCountry data={stats.logsCountByCountry} />
        {/* <ResetCount credentials={credentials} /> */}
      </div>
    </div>
  );
};

export default Stats;
function ChartByVisits({ totalVisitors, uniqueVisitors }) {
  const labels = ["Total Visitors", "Unique Visitors"];
  const options = {
    labels: labels,
    datasets: [
      {
        label: "Visitors",
        borderColor: ["#003f5c", "#ffa600"],
        backgroundColor: ["#003f5c", "#ffa600"],
        data: [totalVisitors, uniqueVisitors],
      },
    ],
  };
  return (
    <div className="w-[100%] sm:w-[80%] p-4 rounded-md border mx-auto">
      <h2 className="my-6 text-2xl font-[450] text-center">Visitors</h2>
      <div className=" w-[80%] mx-auto sm:w-[50%]">
        <Pie data={options} />
      </div>
      <div className="flex flex-col gap-2 mt-4 text-xs">
        <span>
          <mark>Total Visitors:</mark> Overall count of visits to a website,
          including repeat visits.
        </span>
        <span>
          <mark>Unique Visitors:</mark> Count of distinct individuals who
          visited a website, regardless of the number of visits.
        </span>
      </div>
    </div>
  );
}
function ChartByCity({ data }) {
  const labels = Object.keys(data);
  const options = {
    labels: labels,
    datasets: [
      {
        label: "Visitors by city",
        borderColor: ["#003f5c", "#006d7d", "#009a7d", "#88c168", "#ffdb64"],
        backgroundColor: [
          "#003f5c",
          "#006d7d",
          "#009a7d",
          "#88c168",
          "#ffdb64",
        ],
        data: Object.values(data),
      },
    ],
  };
  return (
    <div className="w-[100%] sm:w-[80%] p-4 rounded-md border mx-auto">
      <h2 className="my-6 text-2xl font-[450] text-center">Visitors by city</h2>
      <div className=" w-[80%] mx-auto md:w-[50%]">
        <Pie data={options} />
      </div>
    </div>
  );
}

function ChartByCountry({ data }) {
  const labels = Object.keys(data);
  const options = {
    labels: labels,
    datasets: [
      {
        label: "Visitors by country",
        borderColor: ["#003f5c", "#006d7d", "#009a7d", "#88c168", "#ffdb64"],
        backgroundColor: [
          "#003f5c",
          "#006d7d",
          "#009a7d",
          "#88c168",
          "#ffdb64",
        ],
        data: Object.values(data),
      },
    ],
  };
  return (
    <div className="w-[100%] sm:w-[80%] p-4 rounded-md border mx-auto">
      <h2 className="my-6 text-2xl font-[450] text-center">
        Visitors by country
      </h2>
      <div className=" w-[80%] mx-auto md:w-[50%]">
        <Pie data={options} />
      </div>
    </div>
  );
}
function ChartByDate({ logs }) {
  const [selectedDays, setSelectedDays] = useState(7);
  const logsCountByDate = countByDays(logs, selectedDays);
  const labels = Object.keys(logsCountByDate).reverse();
  const options = {
    labels: labels,
    datasets: [
      {
        label: "Visitors by date",
        backgroundColor: [
          "#007D9C",
          "#244D70",
          "#D123B3",
          "#F7E018",
          "#fff",
          "#FE452A",
        ],
        borderColor: "rgb(255, 99, 132)",
        data: Object.values(logsCountByDate).reverse(),
      },
    ],
  };

  return (
    <div className="w-[100%] sm:w-[80%] p-4 rounded-md border mx-auto">
      <div className="flex justify-between">
        <h2 className=" text-2xl font-[450] text-center">Daily Visitors</h2>
        <select
          className="px-2 border rounded-md outline-none resize-none"
          value={selectedDays}
          onChange={(e) => setSelectedDays(Number(e.target.value))}
        >
          <option value={7}>last 7 days</option>
          <option value={14}>last 14 days</option>
          <option value={21}>last 21 days</option>
          <option value={30}>last 1 Month</option>
        </select>
      </div>
      <Line data={options} />
    </div>
  );
}

function ResetCount({ credentials }) {
  return <button className="p-1 bg-red-300 rounded-md">Reset Count</button>;
}
