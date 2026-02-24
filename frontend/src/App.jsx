import React, { useState } from "react";
import IndiaMap from "./components/IndiaMap";
import Dashboard from "./components/Dashboard";
import { motion } from "framer-motion";
import {
  WiDaySunny,
  WiHumidity,
  WiStrongWind,
  WiThermometer,
} from "react-icons/wi";

function App() {
  const [weather, setWeather] = useState({
    state: "Delhi",
    temperature: 0,
    humidity: 0,
    wind: 0,
    condition: "Loading",
  });

  const [selectedState, setSelectedState] = useState("Delhi");

  const handleStateSelect = async (state) => {
    setSelectedState(state);

    try {
      const res = await fetch(`http://127.0.0.1:8000/weather/${state}`);
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.log("Weather fetch error", err);
    }
  };

  return (
    <div className="min-h-screen px-6 py-16 bg-gradient-to-br from-[#02121f] to-[#041d2e]">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-lg bg-white/5 p-8 rounded-3xl border border-white/10 shadow-xl"
        >
          <h1 className="text-3xl font-semibold mb-8 text-white flex items-center gap-2">
            🌍 AI Climate Intelligence
          </h1>

          <div className="grid md:grid-cols-4 gap-6">

            {/* TEMP */}
            <motion.div
              whileHover={{ scale: 1.07 }}
              className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-2xl border border-cyan-400/20 shadow-lg text-center"
            >
              <WiThermometer className="text-5xl text-cyan-300 mx-auto mb-2 animate-pulse" />
              <h2 className="text-2xl font-bold text-white">
                {weather.temperature}°C
              </h2>
              <p className="text-gray-300 text-sm">Temperature</p>
            </motion.div>

            {/* HUMIDITY */}
            <motion.div
              whileHover={{ scale: 1.07 }}
              className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-6 rounded-2xl border border-blue-400/20 shadow-lg text-center"
            >
              <WiHumidity className="text-5xl text-blue-300 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-white">
                {weather.humidity}%
              </h2>
              <p className="text-gray-300 text-sm">Humidity</p>
            </motion.div>

            {/* WIND */}
            <motion.div
              whileHover={{ scale: 1.07 }}
              className="bg-gradient-to-br from-green-500/20 to-teal-500/20 p-6 rounded-2xl border border-green-400/20 shadow-lg text-center"
            >
              <WiStrongWind className="text-5xl text-green-300 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-white">
                {weather.wind} m/s
              </h2>
              <p className="text-gray-300 text-sm">Wind Speed</p>
            </motion.div>

            {/* CONDITION */}
            <motion.div
              whileHover={{ scale: 1.07 }}
              className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-6 rounded-2xl border border-yellow-400/20 shadow-lg text-center"
            >
              <WiDaySunny className="text-5xl text-yellow-300 mx-auto mb-2 animate-spin slow-spin" />
              <h2 className="text-xl font-bold text-white">
                {weather.condition}
              </h2>
              <p className="text-gray-300 text-sm">Condition</p>
            </motion.div>

          </div>
        </motion.div>

        {/* BIG MAP */}
        <div className="backdrop-blur-lg bg-white/5 p-6 rounded-3xl border border-white/10 shadow-xl">
          <IndiaMap
            onStateSelect={(state) => {
              handleStateSelect(state);
              setSelectedState(state);
            }}
          />
        </div>

        {/* GRAPHS + SMALL MAP */}
        <div className="backdrop-blur-lg bg-white/5 p-6 rounded-3xl border border-white/10 shadow-xl">
          <Dashboard selectedState={selectedState} />
        </div>

      </div>
    </div>
  );
}

export default App;