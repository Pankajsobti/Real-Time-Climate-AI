import { useState } from "react";
import TemperatureChart from "./TemperatureChart";
import HumidityChart from "./HumidityChart";
import WindChart from "./WindChart";
import AQIChart from "./AQIChart";
import RainChart from "./RainChart";
import DigitalTwin from "./DigitalTwin";
import "./dash.css";
import StateMap from "./StateMap";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ selectedState }) {
  const [tab, setTab] = useState("weather");

  // 🔥 ADD THIS (important)
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">

      {/* LEFT SIDE */}
      <div className="left-panel">

        <div className="tabs">
          <button onClick={() => setTab("weather")}>Weather</button>
          <button onClick={() => setTab("env")}>Environment</button>

          {/* 🔥 AI now opens new page */}
          <button onClick={() => navigate("/ai")}>AI</button>

          <button onClick={() => setTab("twin")}>Digital Twin</button>
        </div>

        {tab === "weather" && (
          <>
            <TemperatureChart state={selectedState} />
            <HumidityChart state={selectedState} />
            <WindChart state={selectedState} />
          </>
        )}

        {tab === "env" && (
          <>
            <AQIChart state={selectedState} />
            <RainChart state={selectedState} />
          </>
        )}

        {tab === "twin" && (
          <DigitalTwin state={selectedState} />
        )}
      </div>

      {/* SMALL MAP */}
      <div className="right-panel">
        <StateMap state={selectedState} />
      </div>

    </div>
  );
}