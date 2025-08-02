import { useState, useEffect } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import type { LocationMarkerProps } from "./types";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export function LocationMarker({ onPositionChange }: LocationMarkerProps) {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMapEvents({
    click() {
      map.locate(); // Relocaliza ao clicar no mapa
    },
    locationfound(e) {
      setPosition(e.latlng);
      onPositionChange?.(e.latlng);
      map.flyTo(e.latlng, 15);
    },
    locationerror(e) {
      console.error("Erro ao obter localização:", e.message);
    }
  });

  useEffect(() => {
    map.locate({ watch: true }); // Ativa monitoramento contínuo
    return () => {
      map.stopLocate(); // Limpeza ao desmontar
    };
  }, [map]);

  if (!position) return null;

  return (
    <Marker position={position} icon={defaultIcon}>
      <Popup autoClose={false} closeOnClick={false}>
        Sua localização atual
        <br />
        Lat: {position.lat.toFixed(4)}, Lng: {position.lng.toFixed(4)}
      </Popup>
    </Marker>
  );
}