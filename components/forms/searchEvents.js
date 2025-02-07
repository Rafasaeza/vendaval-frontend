// app/components/SearchEvents.js
'use client'
import { useState } from 'react';
import axios from 'axios';

export default function DireccionForm({ setEvents, setLoading, setError, setPosition }) {
  const [address, setAddress] = useState('');

  // Función para manejar la búsqueda de eventos cercanos
  const handleSearch = async () => {
    if (!address) return;

    setLoading(true);
    setError('');
    
    try {
      // Paso 1: Obtener coordenadas usando OpenStreetMap (Nominatim)
      const geocodeResponse = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: address,
          format: 'json',
          limit: 1,
        },
      });

      // Verificar si hay resultados
      if (geocodeResponse.data.length === 0) {
        setError('No se encontraron coordenadas para esta dirección.');
        setLoading(false);
        return;
      }

      const { lat, lon } = geocodeResponse.data[0];
      setPosition([lat,lon])
      console.log("Lat:", lat, "Lon", lon)
      // Paso 2: Obtener eventos cercanos
      const eventsResponse = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/eventos`, {
        params: {
          lat,
          lon,
        },
      });
      setEvents(eventsResponse.data); // Asume que la respuesta tiene una propiedad 'events'
    } catch (err) {
      setError('Error al obtener eventos o geocodificación.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Buscar Eventos Cercanos</h1>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Ingrese una dirección"
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.button}>Buscar</button>
    </div>
  );
}

// Estilos básicos
const styles = {
  input: {
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    outline: 'none',
    width: '300px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};
