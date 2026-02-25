import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  Sun,
  CloudRain,
  Cloud,
  Wind,
  Droplets,
  Factory,
} from "lucide-react";

export default function AIPredictor() {
  const [inputs, setInputs] = useState({
    temp: 30,
    aqi: 80,
    humidity: 60,
    rainfall: 40,
    urban: 50,
  });

  const [prediction, setPrediction] = useState(null);
  const [history, setHistory] = useState([]);
  const [futureData, setFutureData] = useState([]);

  useEffect(() => {
    fetchPrediction();
    fetchFuture();
  }, [inputs]);

  // 🔥 Risk + explanation API (same as before)
  const fetchPrediction = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/ai_predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();
      setPrediction(data);

      // fallback history
      setHistory((prev) => [
        ...prev.slice(-25),
        {
          time: new Date().toLocaleTimeString(),
          ...inputs,
          risk: data.risk,
        },
      ]);
    } catch {
      console.log("Backend error");
    }
  };

  // 🔥 REAL AI FUTURE
  const fetchFuture = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/future-predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();

      // format for graph
      const formatted = data.forecast.map((temp, i) => ({
        time: `Day ${i + 1}`,
        temp,
        humidity: inputs.humidity,
        aqi: inputs.aqi,
        rainfall: inputs.rainfall,
        urban: inputs.urban,
      }));

      setFutureData(formatted);
    } catch {
      console.log("Future prediction error");
    }
  };

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: Number(value) });
  };

  const iconMap = {
    temp: <Sun size={20} />,
    aqi: <Factory size={20} />,
    humidity: <Droplets size={20} />,
    rainfall: <CloudRain size={20} />,
    urban: <Wind size={20} />,
  };

  const graphData = futureData.length ? futureData : history;

  const SingleGraph = ({ title, dataKey }) => (
    <motion.div
      className="bg-white/10 p-4 rounded-xl backdrop-blur-lg border border-cyan-400/20"
      whileHover={{ scale: 1.02 }}
    >
      <h3 className="text-cyan-300 text-sm mb-2">{title}</h3>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#00ffff"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020b16] via-[#031a2b] to-[#041d2e] text-white p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl text-center text-cyan-400 mb-6 font-bold">
          🔮 Climate AI Dashboard
        </h1>

        {/* INDIVIDUAL GRAPHS */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <SingleGraph title="Temperature Trend (AI Future)" dataKey="temp" />
          <SingleGraph title="Humidity Trend" dataKey="humidity" />
          <SingleGraph title="AQI Trend" dataKey="aqi" />
          <SingleGraph title="Rainfall Trend" dataKey="rainfall" />
          <SingleGraph title="Urbanization Trend" dataKey="urban" />
        </div>

        {/* COMBINED GRAPH */}
        <motion.div className="bg-white/10 p-5 rounded-xl mb-8">
          <h2 className="text-cyan-300 mb-3">
            🌍 Combined Climate & Risk (AI Future 30 Days)
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="temp" stroke="#facc15" />
              <Line dataKey="humidity" stroke="#60a5fa" />
              <Line dataKey="aqi" stroke="#c084fc" />
              <Line dataKey="rainfall" stroke="#22d3ee" />
              <Line dataKey="urban" stroke="#4ade80" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* SLIDERS */}
        <div className="grid md:grid-cols-2 gap-4">
          {Object.keys(inputs).map((key) => (
            <motion.div
              key={key}
              className="bg-white/10 p-4 rounded-xl flex flex-col gap-2"
            >
              <div className="flex justify-between">
                <span className="capitalize">{key}</span>
                {iconMap[key]}
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={inputs[key]}
                onChange={(e) => handleChange(key, e.target.value)}
              />

              <span>{inputs[key]}</span>
            </motion.div>
          ))}
        </div>

        {/* RESULT */}
        {prediction && (
          <div className="mt-6 p-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex justify-between">
            <div>
              <p>Risk: {prediction.risk}</p>
              <p>Future Temp: {prediction.future_temp}</p>
              <p>Flood: {prediction.flood}</p>
            </div>
            <Cloud />
          </div>
        )}

      </div>
    </div>
  );
}