import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./css/map.css";
import { useEffect, useState } from "react";
import { LatLng } from "leaflet";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const checkInIcon = new L.DivIcon({
  className: 'check-in-icon',
  html: '<div style="background-color: red; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white"></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

interface MapProps {
  checkIns: Array<{
    id: number;
    lat: number;
    lng: number;
    timestamp: string;
  }>;
}

function LocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 15);
    },
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={defaultIcon}>
      <Popup>Sua localização atual</Popup>
    </Marker>
  );
}

function Map({ checkIns = [] }: MapProps) {
  // Verifica se os check-ins têm a estrutura correta
  const validCheckIns = checkIns.filter(checkIn => 
    checkIn.id && 
    typeof checkIn.lat === 'number' && 
    typeof checkIn.lng === 'number' &&
    checkIn.timestamp
  );

  return (
    <MapContainer
      id="myMap"
      center={[-5.1783, -40.6776]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      <LocationMarker />
      
      {validCheckIns.map((checkIn) => (
        <Marker
          key={checkIn.id}
          position={[checkIn.lat, checkIn.lng]}
          icon={checkInIcon}
        >
          <Popup>
            Check-in #{checkIn.id}<br/>
            Feito em: {new Date(checkIn.timestamp).toLocaleString()}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;