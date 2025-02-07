"use client";
import MapCaller from "@/components/map/mapCaller";
import { useSearchParams } from "next/navigation";// Importar el hook de enrutamiento
import { useEffect, useState } from "react";


export default function MapaDestinos() {
  const searchParams = useSearchParams(); // Obtienes los parámetros de la URL
  const [coordinates,setCoordinates] = useState([]); // Almacena las coordenadas de los destinos
  const lat = searchParams.get('lat'); // Obtienes lat desde la URL
  const lon = searchParams.get('lon'); // Obtienes lon desde la URL
  const city = searchParams.get("city"); // Obtienes la ciudad desde la URL
  // Verificar si las coordenadas están presentes y son válidas
  if (!lat || !lon || !city) {
    return <div>Cargando...</div>; // O puedes mostrar un spinner de carga
  }

  const fetchTrayectos = async (city) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/api/v1/trayectos?origen=${city}`); // Ajusta la URL de tu backend
      const data = await response.json();
  
      return data || []; // Asegúrate de que `data.trayectos` contiene los trayectos
    } catch (error) {
      console.error("Error al obtener los trayectos:", error);
      return [];
    }
  };
  const fetchCoordinates = async (destino) => {
    try {
      const response =await fetch(
        `https://nominatim.openstreetmap.org/search?city=${destino}&format=json`
      ); // Ajusta la URL de tu backend
      const data = await response.json();
      console.log("Coordenadas del destino:",data[0]);
      if (data && data.length > 0) {
        setCoordinates((prev) => 
          [...prev,
          {
            "lat": parseFloat(data[0].lat),
            "lon": parseFloat(data[0].lon)
          }]
        ); // Acumula las coordenadas en el estado
      }
    } catch (error) {
      console.error(`Error al obtener coordenadas para destino ${destino}:`, error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtén los trayectos desde la ciudad de origen
        const trayectos = await fetchTrayectos(city);
  
        // Itera sobre los destinos y llama a fetchCoordinates para cada uno
        trayectos.forEach((trayecto) => {
          if(trayecto.plazas > 0){
          fetchCoordinates(trayecto.destino);
          } // Cambia 'destino' según la estructura del trayecto
        });
      } catch (error) {
        console.error("Error al obtener trayectos y coordenadas:", error);
      }
    };
  
    if (city) {
      setCoordinates([]); // Reinicia el estado de coordenadas cuando cambia la ciudad
      fetchData();
    }
  }, [city]);
  
  // Convertir las coordenadas de la URL a números flotantes
  const position = [parseFloat(lat), parseFloat(lon)];

  // Si alguna de las coordenadas no es un número válido, mostrar un mensaje de error
  if (isNaN(position[0]) || isNaN(position[1])) {
    return <div>Coordenadas no válidas.</div>;
  }

  const zoom = 13; // Nivel de zoom

  return (
    <MapCaller coordinates={coordinates} position={position} />
  );
}