import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet.heat";

function HeatLayer({ weather }) {
  const map = useMap();

  useEffect(() => {
    if (!weather.length) return;

    const heatPoints = weather.map((city) => [
      city.lat,
      city.lon,
      city.temperature / 40,
    ]);

    const heat = window.L.heatLayer(heatPoints, { radius: 30 });
    heat.addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [weather]);

  return null;
}

export default function App() {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const fetchWeather = () => {
      fetch("http://localhost:8000/weather")
        .then((res) => res.json())
        .then((data) => setWeather(data));
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 10000);
    return () => clearInterval(interval);
  }, []);

  const getColor = (temp) => {
    if (temp > 35) return "red";
    if (temp > 28) return "orange";
    if (temp > 20) return "yellow";
    return "blue";
  };

  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-3xl mb-5">Climate AI Dashboard 🌍</h1>

      <div className="bg-gray-900 p-5 rounded mb-10">
        <h2 className="mb-3 text-xl">India Climate Heatmap</h2>

        <MapContainer center={[22.5, 80]} zoom={5} style={{ height: "400px" }}>
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Heatmap */}
          <HeatLayer weather={weather} />

          {/* Colored markers */}
          {weather.map((city, i) => (
            <CircleMarker
              key={i}
              center={[city.lat, city.lon]}
              radius={10}
              pathOptions={{ color: getColor(city.temperature), fillOpacity: 0.8 }}
            >
              <Popup>
                <strong>{city.city}</strong>
                <br />
                Temp: {city.temperature} °C
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* Chart */}
      <div className="mt-10 bg-gray-900 p-5 rounded">
        <h2 className="mb-3 text-xl">Temperature Trends</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weather}>
            <XAxis dataKey="city" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temperature" stroke="#00ffcc" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}