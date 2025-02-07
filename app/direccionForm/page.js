'use client'
import { useState, useEffect } from 'react';
import SearchEvents from '@/components/forms/searchEvents';
import EventList from '@/components/eventList';
import Footer from '@/components/global/footer';
import Nav from '@/components/global/nav';
import MapCaller from '@/components/map/mapCaller';  // Importa tu componente de mapa
import axios from 'axios';


export default function DireccionForm() {
  const [events, setEvents] = useState([]);  // Eventos
  const [loading, setLoading] = useState(false);  // Estado de carga
  const [error, setError] = useState('');  // Mensaje de error
  const [coordinates, setCoordinates] = useState([]);  // Coordenadas de eventos
  const [position, setPosition] = useState(null);  // Coordenadas de la dirección

  // Efecto para actualizar las coordenadas de los eventos cuando se actualizan los eventos
  useEffect(() => {
    if (events.length > 0) {
      const eventCoordinates = events.map(event => ({
        lat: event.lat,
        lon: event.lon
      }));
      setCoordinates(eventCoordinates);
    }
  }, [events]);

  // Efecto para actualizar la posición del mapa cuando cambia la dirección
  useEffect(() => {
    if (position) {
      console.log('Nueva posición:', position);
    }
  }, [position]);  // Dependencia de position para actualizar el mapa

  return (
    <>
      <Nav/>
      <SearchEvents  
        setEvents={setEvents} 
        setLoading={setLoading} 
        setError={setError} 
        setPosition={setPosition}  
      />

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      <EventList events={events} />

      {/* Si tenemos una dirección y sus coordenadas, mostramos el mapa */}
      {position && position.length === 2 && (
        <MapCaller
          coordinates={coordinates}  // Coordenadas de eventos
          position={position}         // Coordenadas de la dirección
        />
      )}

      <Footer/>
    </>
  );
}
