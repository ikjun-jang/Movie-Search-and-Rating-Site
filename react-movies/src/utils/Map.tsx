import {
  MapContainer,
  TileLayer,
  useMapEvent,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import coordinateDTO from "./coordinates.models";
import { useState } from "react";

let defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [16, 37],
});

export default function Map(props: mapProps) {
  const [coordinates, setCoordinates] = useState<coordinateDTO[]>(
    props.coordinates
  );
  return (
    <MapContainer
      center={[35.86798437647007, 128.58042398154737]}
      zoom={14}
      style={{ height: props.height }}
    >
      <TileLayer
        attribution="React Movie"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.readOnly ? null : (
        <MapClick
          setCoordinates={(coordinates) => {
            setCoordinates([coordinates]);
            props.handleMapClick(coordinates);
          }}
        />
      )}
      {coordinates.map((coordinate, index) => (
        <Marker
          key={index}
          position={[coordinate.lat, coordinate.lng]}
          icon={defaultIcon}
        >
          {coordinate.name ? <Popup>{coordinate.name}</Popup> : null}
        </Marker>
      ))}
    </MapContainer>
  );
}

interface mapProps {
  height: string;
  coordinates: coordinateDTO[];
  handleMapClick(coordinates: coordinateDTO): void;
  readOnly: boolean;
}

Map.defaultProps = {
  height: "500px",
  handleMapClick: () => {},
  readOnly: false,
};

function MapClick(props: mapClickProps) {
  useMapEvent("click", (eventArgs) => {
    props.setCoordinates({
      lat: eventArgs.latlng.lat,
      lng: eventArgs.latlng.lng,
    });
  });
  return null;
}

interface mapClickProps {
  setCoordinates(coordinates: coordinateDTO): void;
}
