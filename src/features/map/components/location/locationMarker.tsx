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
  const [accuracy, setAccuracy] = useState<number>(0);

  const map = useMapEvents({
  });

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,  // Força uso do GPS quando disponível
      timeout: 5000,            // Tempo mais curto para resposta
      maximumAge: 0             // Sem cache - sempre posição fresca
    };

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const newPos = new L.LatLng(
          pos.coords.latitude, 
          pos.coords.longitude
        );
        
        setPosition(newPos);
        setAccuracy(pos.coords.accuracy);
        onPositionChange?.(newPos);
        
        // Movimento mais preciso sem animação
        map.setView(newPos, 18, { 
          animate: true,
          duration: 0.5
        });
      },
      (err) => {
        console.error("Erro GPS:", err);
      },
      options
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [map, onPositionChange]);

  if (!position) return null;

  return (
    <> 
      <Marker position={position} icon={defaultIcon}>
        <Popup>
          <div style={{ minWidth: '120px' }}>
            <strong>Posição atual</strong><br />
            Precisão: ~{Math.round(accuracy)}m
          </div>
        </Popup>
      </Marker>
    </>
  );
}