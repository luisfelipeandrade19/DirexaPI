import type { LatLng } from "leaflet";
import type { Dispatch, SetStateAction } from "react";

export interface LocationMarkerProps {
  onPositionChange?: Dispatch<SetStateAction<LatLng | null>>;
}