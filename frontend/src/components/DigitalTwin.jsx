import { useEffect, useState } from "react";

export default function DigitalTwin({ state }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!state) return;

    fetch(`http://127.0.0.1:8000/future-climate/${state}`)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, [state]);

  if (!data) return null;

  return (
    <div className="mt-6 grid grid-cols-2 gap-6 text-white">
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="font-bold">Present Climate</h2>
        <p>Temperature: {data.current_temp}°C</p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="font-bold">Future Digital Twin</h2>
        <p>2050 Temp: {data["2050_temp"]}°C</p>
        <p>2100 Temp: {data["2100_temp"]}°C</p>
        <p>Drought Risk: {data.drought}</p>
        <p>Flood Risk: {data.flood}</p>
      </div>
    </div>
  );
}