import type { LatLng } from 'leaflet'; 

export interface BusStop {
  id: number;
  name: string;
  lat: number;
  lng: number;
  radius: number;
}

export interface BusStopLayerProps {
  busStops: BusStop[];
  userPosition: LatLng | null;
  onBusStopEnter: (stop: BusStop, type: 'user_enter') => void;
}