"use client";

import { useState, useEffect } from "react";
import Wrapper from "./global/wrapper";

export default function MyArticles({ userEmail }) {
  const [articulos, setArticulos] = useState([]);
  const [pujasMaximas, setPujasMaximas] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /** 🔹 Obtener los artículos del usuario */
  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/articulos/?vendedor=${userEmail}`);
        if (!res.ok) throw new Error("No se encontraron artículos");

        const data = await res.json();
        setArticulos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) fetchArticulos();
  }, [userEmail]);

  /** 🔹 Obtener las pujas máximas para cada artículo */
  useEffect(() => {
    const fetchPujasMaximas = async () => {
      const nuevasPujas = {};
      await Promise.all(
        articulos.map(async (articulo) => {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/pujas/max/${articulo._id}`);
            if (!res.ok) throw new Error("Error al obtener puja máxima");

            const data = await res.json();
            nuevasPujas[articulo._id] = data;
          } catch {
            nuevasPujas[articulo._id] = { cantidad: 0, comprador: null };
          }
        })
      );
      setPujasMaximas(nuevasPujas);
    };

    if (articulos.length > 0) fetchPujasMaximas();
  }, [articulos]);

  /** 🔹 Adjudicar un artículo al mejor postor */
  const handleAdjudicar = async (articuloId) => {
    const mejorPuja = pujasMaximas[articuloId];

    if (!mejorPuja.comprador) {
      alert("No hay pujas para este artículo");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/articulos/adjudicar/${articuloId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comprador: mejorPuja.comprador }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail);
      }

      alert("Artículo adjudicado con éxito");
    } catch {
      alert("Error al adjudicar el artículo");
    }
  };

  return (
    <Wrapper>
      <h2 className="text-xl font-semibold">Mis Artículos</h2>

      {/* 🔹 Mostrar mensaje de carga */}
      {loading && <p className="text-gray-500">Cargando artículos...</p>}

      {/* 🔹 Mostrar errores si existen */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 🔹 Lista de artículos */}
      {!loading && !error && (
        <div className="mt-4">
          {articulos.length > 0 ? (
            <ul className="space-y-2">
              {articulos.map((articulo) => (
                <li key={articulo._id} className="p-3 border rounded">
                  <p className="font-semibold">{articulo.descripcion}</p>
                  <p>Precio de salida: ${articulo.precio_salida}</p>

                  <p>
                    Última puja: ${pujasMaximas[articulo._id]?.cantidad || 0}
                    {pujasMaximas[articulo._id]?.comprador ? ` (Comprador: ${pujasMaximas[articulo._id]?.comprador})` : " (Sin pujas)"}
                  </p>

                  {/* 🔹 Botón de adjudicar solo si no hay comprador */}
                  {articulo.comprador == null && (
                    <button
                      onClick={() => handleAdjudicar(articulo._id)}
                      className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 mt-2"
                    >
                      Adjudicar
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No tienes artículos en subasta.</p>
          )}
        </div>
      )}
    </Wrapper>
  );
}
