import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

export default function HumidityChart({ state }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/weather/${state}`);

    ws.onmessage = (event) => {
      const d = JSON.parse(event.data);

      setData(prev => [
        ...prev.slice(-10),
        { time: new Date().toLocaleTimeString(), value: d.humidity }
      ]);
    };

    return () => ws.close();
  }, [state]);

  return (
    <div className="glass p-4 rounded-2xl">
      <h3>💧 Humidity</h3>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis
            label={{
              value: "Humidity (%)",
              angle: -90,
              position: "insideLeft"
            }}
          />

          <Tooltip />

          <Line dataKey="value" stroke="#4fc3f7" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}