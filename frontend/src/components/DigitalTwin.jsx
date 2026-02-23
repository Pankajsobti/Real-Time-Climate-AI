import { useEffect, useState } from "react";

export default function DigitalTwin({ state }) {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (!state) return;

    fetch(`http://127.0.0.1:8000/predict/${state}`)
      .then((res) => res.json())
      .then((d) => setForecast(d.forecast));
  }, [state]);

  if (!state) return null;

  const avgTemp =
    forecast.reduce((a, b) => a + b.temperature, 0) /
    (forecast.length || 1);

  const risk =
    avgTemp > 30
      ? "🔥 Heatwave Risk"
      : "🌧 Moderate Climate";

  return (
    <div className="mt-6 grid grid-cols-2 gap-6 text-white">
      {/* PRESENT */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-lg font-bold">Present Reality</h2>
        <p>Live monitoring of selected region.</p>
      </div>

      {/* FUTURE */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-lg font-bold">Digital Twin</h2>
        <p>AI Simulation</p>
        <p className="mt-2">{risk}</p>
      </div>
    </div>
  );
}