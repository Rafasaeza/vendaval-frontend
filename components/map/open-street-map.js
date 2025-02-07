"use client";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";


export default function OpenStreetMap({ coordinates, newCoordinate, position}) {

  const zoom = 8; // Nivel de zoom
  return (
    <div style={{ height: "50vh", width: "100%", position: "relative" }}>
      <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Marcadores de coordenadas desde la base de datos */}
        {coordinates && coordinates.length > 0 && (
        coordinates.map((coord, index) => (
          <Marker key={index} position={[coord.lat, coord.lon]}>
            <Popup>
              Coordenada {index + 1}: {coord.lat}, {coord.lon}
            </Popup>
          </Marker>
        ))
      )}

        {/* Nuevo marcador basado en la coordenada añadida */}
        {newCoordinate && (
          <Marker position={[newCoordinate.lat, newCoordinate.lon]}>
            <Popup>
              Nueva coordenada: {newCoordinate.lat}, {newCoordinate.lon}
            </Popup>
          </Marker>
        )}
      </MapContainer>
      </div>
  );
}
