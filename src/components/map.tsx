import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import { useEffect, useState } from "react";

function Map() {
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div id="myMap">
      {coords && (
        <MapContainer
          center={[coords.latitude, coords.longitude]}
          zoom={16}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution=''
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[coords.latitude, coords.longitude]}>
            <Popup>O onibus está aqui!</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default Map;
