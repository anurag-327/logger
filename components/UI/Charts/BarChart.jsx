"use client";
import Chart from "chart.js/auto";
import { Line, Bar, Pie } from "react-chartjs-2";
function BarChart({ totalVisitors, uniqueVisitors }) {
  const labels = ["Total Visitors", "Unique Visitors"];
  const options = {
    labels: labels,
    datasets: [
      {
        label: "visitors",
        borderColor: ["#003f5c", "#ffa600"],
        backgroundColor: ["#003f5c", "#ffa600"],
        data: [totalVisitors, uniqueVisitors],
        barThickness: 20,
      },
    ],
  };
  return (
    <div className="w-[100%] sm:w-[80%] p-4 mx-auto">
      <div className="mx-auto w-80">
        <Bar data={options} />
      </div>
      <div className="flex flex-col gap-2 mt-6 text-xs">
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

export default BarChart;
