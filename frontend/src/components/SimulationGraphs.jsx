import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function SimulationGraphs({ history }) {
  return (
    <div className="bg-white/10 p-6 rounded-xl">
      <h2 className="text-cyan-300 mb-4">
        Simulation Trends (Temp, AQI, Risk etc.)
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line dataKey="temp" />
          <Line dataKey="humidity" />
          <Line dataKey="aqi" />
          <Line dataKey="rainfall" />
          <Line dataKey="urban" />
          <Line dataKey="risk" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}