import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";

export default function RainChart({ state }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/environment/${state}`);

    ws.onmessage = (event) => {
      const d = JSON.parse(event.data);

      setData(prev => [
        ...prev.slice(-15),
        { time: new Date().toLocaleTimeString(), rain: d.rain }
      ]);
    };

    return () => ws.close();
  }, [state]);

  return (
    <div className="glass p-4 rounded-2xl">
      <h3>🌧 Rainfall</h3>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis
            label={{
              value: "Rain (mm)",
              angle: -90,
              position: "insideLeft"
            }}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="rain"
            stroke="#00bfff"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}