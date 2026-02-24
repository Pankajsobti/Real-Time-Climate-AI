import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

export default function TemperatureChart({ state }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/weather/${state}`);

    ws.onmessage = (event) => {
      const d = JSON.parse(event.data);

      // live streaming data ko array me add karo
      setData(prev => [
        ...prev.slice(-10), // last 10 points
        { time: new Date().toLocaleTimeString(), value: d.temperature }
      ]);
    };

    return () => ws.close();
  }, [state]);

  return (
    <div className="glass p-4 rounded-2xl">
      <h3>🌡 Temperature Trend</h3>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="time"
            label={{ value: "Time", position: "insideBottom" }}
          />

          <YAxis
            label={{
              value: "Temperature (°C)",
              angle: -90,
              position: "insideLeft"
            }}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#00eaff"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}