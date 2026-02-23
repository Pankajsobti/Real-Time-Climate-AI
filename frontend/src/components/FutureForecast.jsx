import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function FutureForecast({ state }) {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (!state) return;

    fetch(`http://127.0.0.1:8000/forecast/${state}`)
      .then((res) => res.json())
      .then((d) => {
        if (d && d.forecast) {
          setForecast(d.forecast);
        }
      });
  }, [state]);

  if (!forecast || forecast.length === 0) {
    return <div className="text-white">Loading forecast...</div>;
  }

  const data = {
    labels: ["Day1", "Day2", "Day3", "Day4", "Day5", "Day6", "Day7"],
    datasets: [
      {
        label: "Real Temperature Forecast",
        data: forecast,
        borderColor: "#ff4d4f",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="mt-6">
      <h2 className="text-white font-bold">7-Day Real Forecast</h2>
      <Line data={data} key={state} />
    </div>
  );
}