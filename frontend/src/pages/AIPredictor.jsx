import { useState } from "react";
import { motion } from "framer-motion";

function AIPredictor() {
  const [input, setInput] = useState({
    temperature: 30,
    humidity: 50,
    aqi: 120,
    rainfall: 10,
    population: 5,
    urban: 60,
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const predict = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/ai-predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.log("AI error", err);
    }
  };

  return (
    <div className="p-10 min-h-screen bg-black text-white">
      <h1 className="text-3xl mb-6">🤖 AI Climate Simulator</h1>

      <div className="grid grid-cols-2 gap-6">
        {Object.keys(input).map((key) => (
          <div key={key}>
            <label>{key}</label>
            <input
              type="range"
              min="0"
              max="100"
              name={key}
              value={input[key]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <button
        onClick={predict}
        className="bg-blue-500 px-6 py-3 mt-6 rounded-xl"
      >
        Predict Risk
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-6 bg-gray-900 rounded-xl"
        >
          <h2>Flood Risk: {result.flood}</h2>
          <h2>Heat Risk: {result.heat}</h2>
          <h2>Crop Loss: {result.crop}</h2>
        </motion.div>
      )}
    </div>
  );
}

export default AIPredictor;