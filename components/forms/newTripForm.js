"use client"
import { useState } from "react";

export default function FormularioTrayecto() {
  const [trayecto, setTrayecto] = useState({
    origen: "",
    destino: "",
    salida: "",
    plazas: 0,
    vehiculo: {
      marca: "",
      modelo: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Manejar campos del objeto `vehiculo` separadamente
    if (name === "marca" || name === "modelo") {
      setTrayecto((prev) => ({
        ...prev,
        vehiculo: {
          ...prev.vehiculo,
          [name]: value,
        },
      }));
    } else {
      // Manejar campos generales de `trayecto`
      setTrayecto((prev) => ({
        ...prev,
        [name]: name === "plazas" ? parseInt(value) || 0 : value, // Convertir plazas a número
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/api/v1/trayectos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Asegúrate de que el backend espera JSON
        },
        body: JSON.stringify(trayecto), // Convierte el objeto trayecto en un string JSON
      });
  
      if (!response.ok) {
        throw new Error("Error al enviar el trayecto: " + response.statusText);
      }
  
      const data = await response.json(); // Procesa la respuesta del backend
      console.log("Trayecto enviado con éxito:", data);
    } catch (error) {
      console.error("Error al realizar el POST:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#333" }}>
          Formulario de Trayecto
        </h2>

        <div>
          <label htmlFor="origen">Origen:</label>
          <input
            type="text"
            id="origen"
            name="origen"
            value={trayecto.origen}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div>
          <label htmlFor="destino">Destino:</label>
          <input
            type="text"
            id="destino"
            name="destino"
            value={trayecto.destino}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div>
          <label htmlFor="salida">Fecha y hora de salida:</label>
          <input
            type="datetime-local"
            id="salida"
            name="salida"
            value={trayecto.salida}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div>
          <label htmlFor="plazas">Plazas:</label>
          <input
            type="number"
            id="plazas"
            name="plazas"
            value={trayecto.plazas}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div>
          <label htmlFor="marca">Marca del vehículo:</label>
          <input
            type="text"
            id="marca"
            name="marca"
            value={trayecto.vehiculo.marca}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div>
          <label htmlFor="modelo">Modelo del vehículo:</label>
          <input
            type="text"
            id="modelo"
            name="modelo"
            value={trayecto.vehiculo.modelo}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#4caf50",
            color: "white",
            padding: "0.75rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Enviar Trayecto
        </button>
      </form>
    </div>
  );
}
