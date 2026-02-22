import { useEffect, useState } from "react";

export default function App() {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/weather")
      .then((res) => res.json())
      .then((data) => setWeather(data));
  }, []);

  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-3xl mb-5">Climate AI Dashboard 🌍</h1>

      {weather.map((city, i) => (
        <div key={i} className="bg-gray-800 p-4 mb-3 rounded">
          <h2>{city.city}</h2>
          <p>Temp: {city.temperature} °C</p>
          <p>Humidity: {city.humidity}%</p>
          <p>{city.weather}</p>
        </div>
      ))}
    </div>
  );
}