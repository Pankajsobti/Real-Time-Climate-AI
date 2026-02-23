import { useState } from "react";
import IndiaMap from "./components/IndiaMap";
import LiveGraphs from "./components/LiveGraphs";
import FutureForecast from "./components/FutureForecast";
import DigitalTwin from "./components/DigitalTwin";

function App() {
  const [state, setState] = useState("");
  const [weather, setWeather] = useState(null);

  const handleStateSelect = async (selectedState) => {
    setState(selectedState);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/weather/${selectedState}`
      );
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <h1 className="text-3xl text-white text-center mb-4">
        Climate AI Dashboard 🌍
      </h1>

      {/* INDIA MAP */}
      <IndiaMap onStateSelect={handleStateSelect} />
      <LiveGraphs state={state} />
      <FutureForecast state={state} />
      <DigitalTwin state={state} />

      {/* WEATHER PANEL */}
      {weather && (
        <div className="mt-6 bg-gray-800 p-6 rounded-lg text-white grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-bold">
              {weather.state}
            </h2>
            <p>Temperature: {weather.temperature}°C</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind: {weather.wind} m/s</p>
            <p>Condition: {weather.condition}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Risk Intelligence
            </h2>

            {weather.region === "coastal" ? (
              <>
                <p>🌊 Cyclone Risk Monitoring</p>
                <p>🌧 Flood Probability</p>
                <p>⚠ Storm Surge Alerts</p>
              </>
            ) : (
              <>
                <p>🔥 Heatwave Risk</p>
                <p>🌩 Thunderstorm Monitoring</p>
                <p>💧 Drought Analysis</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;