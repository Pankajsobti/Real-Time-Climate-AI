import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function LiveGraphs({ state }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!state) return;

    const ws = new WebSocket(
      `ws://127.0.0.1:8000/ws/weather/${state}`
    );

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);

      setData((prev) => {
        const updated = [...prev, newData];
        return updated.slice(-20);
      });
    };

    return () => ws.close();
  }, [state]);

  if (!state) return null;

  return (
    <div className="grid grid-cols-2 gap-6 mt-6 text-white">
      <div>
        <h2 className="mb-2">Temperature</h2>
        <LineChart width={400} height={200} data={data}>
          <CartesianGrid stroke="#555" />
          <XAxis />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#00ffcc"
          />
        </LineChart>
      </div>

      <div>
        <h2 className="mb-2">Humidity</h2>
        <LineChart width={400} height={200} data={data}>
          <CartesianGrid stroke="#555" />
          <XAxis />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#ffcc00"
          />
        </LineChart>
      </div>
    </div>
  );
}