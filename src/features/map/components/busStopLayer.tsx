import { Circle, useMap } from "react-leaflet";
import type { BusStopLayerProps } from '../types';
import { useEffect, useCallback } from "react";

function BusStopLayer({ busStops, userPosition, onBusStopEnter }: BusStopLayerProps) {
  const map = useMap();

  const checkBusStopProximity = useCallback(() => {
    if (!userPosition) return;

    busStops.forEach((stop) => {
      const distance = map.distance(userPosition, [stop.lat, stop.lng]);
      if (distance <= stop.radius) {
        onBusStopEnter(stop);
      }
    });
  }, [userPosition, busStops, onBusStopEnter, map]);

  useEffect(() => {
    checkBusStopProximity();
  }, [checkBusStopProximity]);

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
            click: () => onBusStopEnter(stop)
          }}
        />
      ))}
    </>
  );
}

export default BusStopLayer;