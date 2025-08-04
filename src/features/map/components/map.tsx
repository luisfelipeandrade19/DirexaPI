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

// Ícone do ônibus
const busIcon = new L.DivIcon({
  className: "bus-icon",
  html: '<div style="background-color: #e11d48; width: 24px; height: 24px; border-radius: 4px; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">🚌</div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
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
    name: "Parada Correios",
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
  // NOVO: Props para posição do ônibus
  busPosition?: { lat: number; lng: number } | null;
}

function Map({ checkIns = [], busPosition = null }: MapProps) {
  const [userPosition, setUserPosition] = useState<LatLng | null>(null);
  const [currentStop, setCurrentStop] = useState<BusStop | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-5.179671654506646, -40.669630109201194]);
  
  // NOVO: Estado para paradas visitadas
  const [visitedStops, setVisitedStops] = useState<number[]>([]);
  
  // NOVO: Estado para posição do ônibus no formato LatLng
  const [busLatLng, setBusLatLng] = useState<LatLng | null>(null);

  // NOVO: Converter posição do ônibus para LatLng
  useEffect(() => {
    if (busPosition) {
      setBusLatLng(new L.LatLng(busPosition.lat, busPosition.lng));
    } else {
      setBusLatLng(null);
    }
  }, [busPosition]);

  // ATUALIZADO: Callback melhorado para entrada nas paradas
  const handleBusStopEnter = (stop: BusStop, type: 'user_enter' | 'bus_arrived' = 'user_enter') => {
    if (type === 'bus_arrived') {
      // Ônibus chegou na parada
      if (!visitedStops.includes(stop.id)) {
        setVisitedStops(prev => [...prev, stop.id]);
        setCurrentStop(stop);
        
        // Opcional: notificação ou som
        console.log(`Ônibus chegou na parada: ${stop.name}`);
        
        // Remover o alert e substituir por um toast ou notificação menos intrusiva
        // alert(`Ônibus chegou na parada: ${stop.name}`);
      }
    } else {
      // Usuário entrou na parada
      if (currentStop?.id !== stop.id) {
        setCurrentStop(stop);
        console.log(`Usuário entrou na parada: ${stop.name}`);
      }
    }
  };

  useEffect(() => {
    if (userPosition) {
      setMapCenter([userPosition.lat, userPosition.lng]);
    }
  }, [userPosition]);

  const validCheckIns = checkIns.filter(
    (checkIn) =>
      checkIn.id &&
      typeof checkIn.lat === "number" &&
      typeof checkIn.lng === "number" &&
      checkIn.timestamp
  );

  return (
    <div style={{ position: 'relative' }}>
      {/* NOVO: Painel de informações */}
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
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Status do Ônibus</h4>
        <div style={{ fontSize: '12px', marginBottom: '5px' }}>
          <strong>Paradas visitadas:</strong> {visitedStops.length}/{busStops.length}
        </div>
        {currentStop && (
          <div style={{ fontSize: '12px', color: '#10b981' }}>
            <strong>Parada atual:</strong> {currentStop.name}
          </div>
        )}
        
        {/* Legenda das cores */}
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
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <LocationMarker onPositionChange={setUserPosition} />

        {/* ATUALIZADO: BusStopLayer com novas props */}
        <BusStopLayer
          busStops={busStops}
          userPosition={userPosition}
          busPosition={busLatLng} // NOVO: posição do ônibus
          visitedStops={visitedStops} // NOVO: paradas visitadas
          onBusStopEnter={handleBusStopEnter}
        />

        {/* NOVO: Marker do ônibus */}
        {busPosition && (
          <Marker
            position={[busPosition.lat, busPosition.lng]}
            icon={busIcon}
          >
            <Popup>
              <div>
                <strong>Ônibus</strong><br/>
                Lat: {busPosition.lat.toFixed(6)}<br/>
                Lng: {busPosition.lng.toFixed(6)}<br/>
                Paradas visitadas: {visitedStops.length}
              </div>
            </Popup>
          </Marker>
        )}

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