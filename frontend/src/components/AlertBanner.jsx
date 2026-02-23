import { useEffect, useState } from "react";

export default function AlertBanner({ state }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!state) return;

    fetch(`http://127.0.0.1:8000/alerts/${state}`)
      .then((res) => res.json())
      .then((d) => setAlerts(d.alerts));
  }, [state]);

  if (!alerts.length) return null;

  return (
    <div className="bg-red-600 text-white p-3 mt-4 rounded">
      {alerts.map((a, i) => (
        <p key={i}>{a}</p>
      ))}
    </div>
  );
}