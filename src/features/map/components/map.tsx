import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./map.css";
import { useEffect, useState } from "react";
import { LatLng } from "leaflet";
import BusStopLayer from "./busStopLayer";
import { LocationMarker } from "./location/locationMarker";

const checkInIcon = new L.DivIcon({
  className: "check-in-icon",
  html: '<div style="background-color: red; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white"></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

interface BusStop {
  id: number;
  lat: number;
  lng: number;
  radius: number;
  name: string;
}

const busStops: BusStop[] = [
  {
    id: 1,
    lat: -5.184346335998993,
    lng: -40.67220802175326,
    radius: 100,
    name: "Parada Cosmos",
  },
  {
    id: 2, 
    lat: -5.176473483746649,
    lng: -40.66503955403928, 
    radius: 100,
    name: "Parada dos Pirulitos",
  },
  {
    id: 3, 
    lat: -5.183437028573732,
    lng: -40.66315600845248, 
    radius: 100,
    name: "Parada da Policlinica",
  },
  {
    id: 4, 
    lat: -5.174086660473039,
    lng: -40.66791156967396, 
    radius: 100,
    name: "Parada Matriz",
  },
  {
    id: 5, 
    lat: -5.182936504400466,
    lng: -40.65606853655914, 
    radius: 100,
    name: "Parada Mercadinho Venancios",
  },
  {
    id: 6, 
    lat: -5.175883684763221,
    lng: -40.65514354261176, 
    radius: 100,
    name: "Parada Sabor da terra",
  },
];

interface MapProps {
  checkIns: Array<{
    id: number;
    lat: number;
    lng: number;
    timestamp: string;
  }>;
  busPosition?: { lat: number; lng: number } | null;
  onStopChange?: (stopId: number) => void;
}

function Map({ checkIns = [], busPosition = null, onStopChange }: MapProps) {
  const [userPosition, setUserPosition] = useState<LatLng | null>(null);
  const [visitedStops, setVisitedStops] = useState<number[]>([]);
  const [busLatLng, setBusLatLng] = useState<LatLng | null>(null);

  useEffect(() => {
    if (busPosition) {
      setBusLatLng(new L.LatLng(busPosition.lat, busPosition.lng));
    } else {
      setBusLatLng(null);
    }
  }, [busPosition]);

  const handleBusStopEnter = (stop: BusStop, type: 'user_enter' | 'bus_arrived') => {
    if (type === 'bus_arrived' && !visitedStops.includes(stop.id)) {
      setVisitedStops(prev => [...prev, stop.id]);
      onStopChange?.(stop.id);
    }
  };

  const validCheckIns = checkIns.filter(
    (checkIn) =>
      checkIn.id &&
      typeof checkIn.lat === "number" &&
      typeof checkIn.lng === "number" &&
      checkIn.timestamp
  );

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '15px',
        borderRadius: '8px',
        zIndex: 1000,
        minWidth: '200px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginTop: '15px', fontSize: '11px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Legenda:</div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', borderRadius: '50%', marginRight: '5px', opacity: 0.6 }}></div>
            Normal
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#8b5cf6', borderRadius: '50%', marginRight: '5px', opacity: 0.6 }}></div>
            Visitada
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%', marginRight: '5px', opacity: 0.6 }}></div>
            Ônibus presente
          </div>
          
        </div>
      </div>

      <MapContainer
        id="myMap"
        center={[-5.179671654506646, -40.669630109201194]} // Coordenadas fixas
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <LocationMarker onPositionChange={setUserPosition} />

        <BusStopLayer
          busStops={busStops}
          userPosition={userPosition}
          busPosition={busLatLng}
          visitedStops={visitedStops}
          onBusStopEnter={handleBusStopEnter}
        />

        {validCheckIns.map((checkIn) => (
          <Marker
            key={checkIn.id}
            position={[checkIn.lat, checkIn.lng]}
            icon={checkInIcon}
          >
            <Popup>
              Check-in #{checkIn.id}
              <br />
              Feito em: {new Date(checkIn.timestamp).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;