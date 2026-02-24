import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function RiskChart({ state }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws");

    ws.onmessage = (event) => {
      const d = JSON.parse(event.data);
      setData(d.risk);
    };

    return () => ws.close();
  }, [state]);

  return (
    <div className="glass p-4 rounded-2xl">
      <h3>⚠ Climate Risk Index</h3>
      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line dataKey="value" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}