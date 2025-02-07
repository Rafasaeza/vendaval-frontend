// app/components/EventList.js
// app/components/EventList.js
'use client'
import { useRouter } from 'next/navigation'; // Cambiar a useRouter de next/navigation

export default function EventList({ events = [] }) {
  const router = useRouter(); // Usamos useRouter para redirigir

  const handleRedirect = (eventId) => {
    router.push(`/eventos/${eventId}`); // Redirige al evento con el ID correspondiente
  };

  return (
    <ul>
      {events.map(event => (
        <li key={event._id}>
          <h2>{event.nombre}</h2>
          <p>Organizador: {event.organizador}</p>
          <button onClick={() => handleRedirect(event._id)}>Ver detalles</button>
        </li>
      ))}
    </ul>
  );
}
