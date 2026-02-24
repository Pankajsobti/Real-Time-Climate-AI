import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useRef, useEffect } from "react";
import indiaGeo from "../data/indiaStates.json";

export default function StateMap({ state }) {
  const mapRef = useRef();
  const geoRef = useRef();

  // 🔥 zoom + highlight update
  useEffect(() => {
    if (!state || !geoRef.current) return;

    geoRef.current.eachLayer((layer) => {
      const layerState = layer.feature.properties.NAME_1;

      if (layerState === state) {
        const bounds = layer.getBounds();
        mapRef.current.fitBounds(bounds);

        // highlight update
        layer.setStyle({
          fillColor: "#00ff99",
          fillOpacity: 0.8,
        });
      } else {
        layer.setStyle({
          fillColor: "#1f2937",
          fillOpacity: 0.7,
        });
      }
    });
  }, [state]);

  return (
    <MapContainer
      key={state} // 🔥 VERY IMPORTANT → force re-render
      center={[22.5, 80]}
      zoom={5}
      style={{ height: "400px", width: "100%" }}
      whenCreated={(map) => (mapRef.current = map)}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

      <GeoJSON
        ref={geoRef}
        data={indiaGeo}
        style={() => ({
          color: "#00e5ff",
          weight: 1,
          fillColor: "#1f2937",
          fillOpacity: 0.7,
        })}
      />
    </MapContainer>
  );
}