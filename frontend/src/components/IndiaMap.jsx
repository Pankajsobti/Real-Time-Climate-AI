import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import indiaData from "../data/indiaStates.json";


const IndiaMap = ({ onStateSelect }) => {
  const [selected, setSelected] = useState(null);
  const [riskData, setRiskData] = useState({});

  // 🔥 Fetch AI risk for states
  useEffect(() => {
    const states = [
      "Delhi",
      "Maharashtra",
      "Tamil Nadu",
      "Kerala",
      "Karnataka",
      "Gujarat",
      "West Bengal",
      "Uttar Pradesh",
    ];

    states.forEach((s) => {
      fetch(`http://127.0.0.1:8000/risk/${s}`)
        .then((res) => res.json())
        .then((d) => {
          setRiskData((prev) => ({
            ...prev,
            [s]: d.risk_level,
          }));
        });
    });
  }, []);

  // 🔥 Heatmap color logic
  const style = (feature) => {
    const state = feature.properties.NAME_1;
    const risk = riskData[state];

    let fill = "#1f2937";

    if (risk === "High") fill = "#ff4444";
    else if (risk === "Moderate") fill = "#ffaa00";
    else if (risk === "Low") fill = "#00ff88";

    // selected highlight
    if (selected === state) fill = "#00ffcc";

    return {
      fillColor: fill,
      weight: 1,
      color: "#00ffcc",
      fillOpacity: 0.6,
    };
  };

  // 🔥 Hover + click
  const onEachFeature = (feature, layer) => {
    const state = feature.properties.NAME_1;

    layer.on({
      mouseover: () => {
        layer.setStyle({ fillOpacity: 0.9 });
      },
      mouseout: () => {
        layer.setStyle(style(feature));
      },
      click: () => {
        setSelected(state);
        onStateSelect(state);
      },
    });

    layer.bindTooltip(state);
  };

  return (
    <MapContainer
      center={[22.5937, 78.9629]}
      zoom={5}
      style={{ height: "500px", width: "100%" }}
      zoomControl={false}
      dragging={true}
      scrollWheelZoom={false}
      doubleClickZoom={false}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

      <GeoJSON
        data={indiaData}
        style={style}
        onEachFeature={onEachFeature}
      />
      
    </MapContainer>

  );
};

export default IndiaMap;