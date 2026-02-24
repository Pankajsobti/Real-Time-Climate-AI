import { useEffect, useState } from "react";
import TemperatureChart from "./TemperatureChart";

export default function Graphs({ selectedState }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/climate/${selectedState}`)
      .then(res => res.json())
      .then(d => {
        setData(d.temperature);
      });
  }, [selectedState]);

  return (
    <div>
      <TemperatureChart data={data} />
    </div>
  );
}