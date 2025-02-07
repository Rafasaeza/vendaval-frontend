// app/components/EventDetails.js
'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Usamos useParams para obtener el id de la URL
import axios from 'axios';

export default function EventDetails() {
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();  // Usamos useParams para obtener el id de la URL

  useEffect(() => {
    if (id) {
      const fetchEventDetails = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/eventos/${id}`);
          setEventDetails(response.data); // Asume que la respuesta tiene la información completa del evento
        } catch (err) {
          setError('Error al obtener detalles del evento.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchEventDetails();
    }
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{eventDetails.nombre}</h1>
      <p><strong>Organizador:</strong> {eventDetails.organizador}</p>
      <p><strong>Fecha:</strong> {new Date(eventDetails.timestamp).toLocaleString()}</p>
      <p><strong>Lugar:</strong> {eventDetails.lugar}</p>
      <p><strong>Latitud:</strong> {eventDetails.lat}</p>
      <p><strong>Longitud:</strong> {eventDetails.lon}</p>
      <div>
        <img src={eventDetails.imagen} alt={eventDetails.nombre} style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
    </div>
  );
}

