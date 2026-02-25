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

  const CustomLegend = ({ payload }) => {
    
    return (
      <div className="custom-legend">
        {payload.map((entry, index) => (
          <span key={index} className="legend-item">
            <span
              className="legend-dot"
              style={{ background: entry.color }}
            ></span>
            {entry.value}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="sim-card">
      <h2 className="sim-title">
        Combined Climate & Risk (AI Future 30 Days)
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />

          {/* 🔥 CUSTOM LEGEND */}
          <Legend content={<CustomLegend />} />

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