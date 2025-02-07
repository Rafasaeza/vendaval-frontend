'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateEventForm({ organizador }) {
  const [nombre, setNombre] = useState('');
  const [lugar, setLugar] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [imagenFile, setImagenFile] = useState(null);
  const [imagenUrl, setImagenUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Función para obtener las coordenadas a partir de la dirección
  const getCoordinates = async (place) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: place,
          format: 'json',
          limit: 1,
        }
      });

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setLat(lat);
        setLon(lon);
      } else {
        setMessage('No se pudieron obtener las coordenadas del lugar.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error al obtener las coordenadas.');
    }
  };

  // Efecto para obtener las coordenadas cuando se cambia el lugar
  useEffect(() => {
    if (lugar) {
      getCoordinates(lugar);
    }
  }, [lugar]);

  // Función para manejar la carga de la imagen y subirla a Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImagenFile(file);

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/image-upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.data.url) {
          setImagenUrl(response.data.url);
        } else {
          setMessage('Hubo un error al subir la imagen.');
        }
      } catch (error) {
        console.error(error);
        setMessage('Error al subir la imagen.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (!nombre || !lugar || !timestamp || !lat || !lon || !imagenUrl) {
      setMessage('Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const newEvent = {
        nombre,
        lugar,
        timestamp,
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        organizador,
        imagen: imagenUrl,
      };

      // Realizar la solicitud POST al backend
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/eventos`,
        newEvent,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Verificar si la respuesta fue exitosa
      if (response.status === 200) {
        setMessage('Evento creado correctamente!');
      } else {
        setMessage('Hubo un problema al crear el evento.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Hubo un error al conectar con el backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Crear Evento</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Lugar:</label>
          <input
            type="text"
            value={lugar}
            onChange={(e) => setLugar(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Timestamp:</label>
          <input
            type="datetime-local"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Imagen (Archivo):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={styles.input}
          />
        </div>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Creando...' : 'Crear Evento'}
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

// Estilos en objeto de JS
const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    outline: 'none',
    width: '100%',
  },
  button: {
    padding: '12px',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  message: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '1rem',
    color: '#e74c3c',
  },
};
