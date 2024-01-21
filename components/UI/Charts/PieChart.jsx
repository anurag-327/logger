"use client";
import Chart from "chart.js/auto";
import { Line, Bar, Pie } from "react-chartjs-2";
function PieChart({ data }) {
  const labels = Object.keys(data);
  const options = {
    labels: labels,
    datasets: [
      {
        label: "Geography",
        borderColor: ["#003f5c", "#006d7d", "#ffdb64", "#009a7d", "#88c168"],
        backgroundColor: [
          "#003f5c",
          "#006d7d",
          "#ffdb64",
          "#009a7d",
          "#88c168",
        ],
        data: Object.values(data),
        barThickness: 20,
      },
    ],
  };
  return (
    <div className="w-[100%] sm:w-[80%] p-4 mx-auto">
      <div className="mx-auto w-80">
        <Pie data={options} />
      </div>
    </div>
  );
}

export default PieChart;
