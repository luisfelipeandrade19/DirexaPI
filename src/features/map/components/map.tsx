import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./map.css";
import {  useState } from "react";
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
  radius: number; // Raio em metros
  name: string;
}

const busStops: BusStop[] = [
  {
    id: 1,
    lat: -5.184346335998993,
    lng: -40.67220802175326,
    radius: 50,
    name: "Parada Cosmos",
  },
];

interface MapProps {
  checkIns: Array<{
    id: number;
    lat: number;
    lng: number;
    timestamp: string;
  }>;
}

function Map({ checkIns = [] }: MapProps) {
  const [userPosition, setUserPosition] = useState<LatLng | null>(null);
  const [currentStop, setCurrentStop] = useState<BusStop | null>(null);

  const handleBusStopEnter = (stop: BusStop) => {
    if (currentStop?.id !== stop.id) {
      setCurrentStop(stop);
      alert(`Ônibus chegou na parada: ${stop.name}`);
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

      <LocationMarker onPositionChange={setUserPosition} />

      <BusStopLayer
        busStops={busStops}
        userPosition={userPosition}
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
  );
}

export default Map;
