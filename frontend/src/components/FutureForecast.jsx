import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function FutureForecast({ state }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!state) return;

    fetch(`http://127.0.0.1:8000/predict/${state}`)
      .then((res) => res.json())
      .then((d) => setData(d.forecast));
  }, [state]);

  if (!state) return null;

  return (
    <div className="mt-6 text-white">
      <h2 className="mb-2">7-Day AI Forecast</h2>

      <LineChart width={500} height={250} data={data}>
        <CartesianGrid stroke="#555" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#ff4444"
        />
      </LineChart>
    </div>
  );
}
