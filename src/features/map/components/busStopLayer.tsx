import { Circle, useMap } from "react-leaflet";
import { useEffect, useCallback } from "react";

interface BusStop {
  id: number;
  lat: number;
  lng: number;
  radius: number;
  name: string;
}

interface BusStopLayerProps {
  busStops: BusStop[];
  userPosition: L.LatLng | null;
  busPosition?: L.LatLng | null; // NOVO: posição do ônibus
  visitedStops?: number[]; // NOVO: paradas visitadas
  onBusStopEnter: (stop: BusStop, type: 'user_enter' | 'bus_arrived') => void;
}

function BusStopLayer({ 
  busStops, 
  userPosition, 
  busPosition,
  visitedStops = [],
  onBusStopEnter 
}: BusStopLayerProps) {
  const map = useMap();

 
  const checkBusStopProximity = useCallback(() => {
    if (!userPosition) return;
  }, [userPosition]);

  // NOVA: Verificação do ônibus nas paradas
  const checkBusAtStop = useCallback(() => {
    if (!busPosition) return;

    busStops.forEach((stop) => {
      const distance = map.distance(busPosition, [stop.lat, stop.lng]);
      if (distance <= stop.radius) {
        onBusStopEnter(stop, 'bus_arrived');
      }
    });
  }, [busPosition, busStops, onBusStopEnter, map]);

  useEffect(() => {
    checkBusStopProximity();
  }, [checkBusStopProximity]);

  // NOVO: Effect para verificar ônibus
  useEffect(() => {
    checkBusAtStop();
  }, [checkBusAtStop]);

  return (
    <>
     {busStops.map((stop) => (
        <Circle
          key={`bus-stop-${stop.id}`}
          center={[stop.lat, stop.lng]}
          radius={stop.radius}
          pathOptions={{ 
            color: "#3b82f6", 
            fillColor: "#3b82f6",
            fillOpacity: 0.2,
            weight: 2
          }}
          eventHandlers={{
            click: () => onBusStopEnter(stop, "user_enter")
          }}
        />
      ))}

    {busStops.map((stop) => (
        <Circle
          key={`bus-stop-${stop.id}`}
          center={[stop.lat, stop.lng]}
          radius={stop.radius}
          pathOptions={{ 
            color: "#3b82f6", 
            fillColor: "#3b82f6",
            fillOpacity: 0.2,
            weight: 2
          }}
          eventHandlers={{
            click: () => onBusStopEnter(stop, 'user_enter')
          }}
        />
      ))}
      {busStops.map((stop) => {
        const isVisited = visitedStops.includes(stop.id);
        const isBusAtStop = busPosition && 
          map.distance(busPosition, [stop.lat, stop.lng]) <= stop.radius;

        return (
          <Circle
            key={`bus-stop-${stop.id}`}
            center={[stop.lat, stop.lng]}
            radius={stop.radius}
            pathOptions={{ 
              color: isBusAtStop ? "#10b981" : (isVisited ? "#8b5cf6" : "#3b82f6"),
              fillColor: isBusAtStop ? "#10b981" : (isVisited ? "#8b5cf6" : "#3b82f6"),
              fillOpacity: isBusAtStop ? 0.4 : (isVisited ? 0.3 : 0.2),
              weight: isBusAtStop ? 3 : 2
            }}
            eventHandlers={{
              click: () => onBusStopEnter(stop, 'user_enter')
            }}
          />
        );
      })}
    </>
  );
}

export default BusStopLayer;