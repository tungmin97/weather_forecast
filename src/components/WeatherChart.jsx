import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useFetchData } from "../helper/useFetchData";
import Loading from "./Loading";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
  ChartDataLabels
);

export default function WeatherChart({ location, units }) {
  const { forecast, isLoading, isError } = useFetchData(
    "forecast",
    location,
    units
  );

  if (isLoading || isError) return <Loading />;
  const labels = forecast.map((item) => item.day);

  const data = {
    labels,
    datasets: [
      {
        label: "Highest temperature",
        data: forecast.map((item) => item.max),
      },
    ],
  };

  const options = {
    responsive: true,
    borderColor: "#fff",
    backgroundColor: "#fff",
    tension: 0.35,
    scales: {
      y: {
        color: "#fff",
        min: Math.min(...data.datasets[0].data) - 2,
        max: Math.max(...data.datasets[0].data) + 2,
        ticks: { display: false },
      },
      x: {
        ticks: { color: "rgb(156 163 175)" },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: "start",
        align: "end",
        font: {
          weight: "bold",
          size: 15,
        },
        color: "rgb(156 163 175)",
      },
    },
  };

  return (
    <div className="m-4">
      <div className="relative">
        <Line data={data} options={options} className="w-5/6 mt-3" />
      </div>
    </div>
  );
}
