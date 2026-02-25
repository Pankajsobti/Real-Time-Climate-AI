import { useEffect, useState } from "react";
import TemperatureChart from "./TemperatureChart";
import HumidityChart from "./HumidityChart";
import RainChart from "./RainChart";

export default function Graphs({ selectedState }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/climate/${selectedState}`)
      .then(res => res.json())
      .then(d => setData(d));
  }, [selectedState]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <TemperatureChart data={data.temperature} />
      <HumidityChart data={data.humidity} />
      <RainChart data={data.rainfall} />
    </div>
  );
}