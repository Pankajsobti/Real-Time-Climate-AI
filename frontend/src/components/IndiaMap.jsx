import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import indiaData from "../data/indiaStates.json";

const IndiaMap = ({ onStateSelect }) => {
  const [selected, setSelected] = useState(null);

  const style = (feature) => ({
    fillColor:
      selected === feature.properties.NAME_1 ? "#00ffcc" : "#1f2937",
    weight: 1,
    color: "#00ffcc",
    fillOpacity: 0.6,
  });

  const onEachFeature = (feature, layer) => {
    const state = feature.properties.NAME_1;

    layer.on({
      mouseover: () => {
        layer.setStyle({
          fillOpacity: 0.9,
        });
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
      {/* OPTIONAL background */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      <GeoJSON
        data={indiaData}
        style={style}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  );
};

export default IndiaMap;