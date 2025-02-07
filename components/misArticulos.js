'use client';

import { useState, useEffect } from 'react';

export default function MisArticulos({ userEmail }) {
  const [articulos, setArticulos] = useState([]);
  const [pujasMaximas, setPujasMaximas] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/articulos/?vendedor=${userEmail}`);
        if (!res.ok) throw new Error("No se encontraron artículos");

        const data = await res.json();
        setArticulos(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchArticulos();
  }, [userEmail]);

  useEffect(() => {
    const fetchPujasMaximas = async () => {
      const nuevasPujas = {};
      for (const articulo of articulos) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/pujas/max/${articulo._id}`);
          if (!res.ok) throw new Error("Error al obtener puja máxima");

          const data = await res.json();
          nuevasPujas[articulo._id] = data;
        } catch {
          nuevasPujas[articulo._id] = { cantidad: 0, comprador: null };
        }
      }
      setPujasMaximas(nuevasPujas);
    };

    if (articulos.length > 0) {
      fetchPujasMaximas();
    }
  }, [articulos]);

  const handleAdjudicar = async (articuloId) => {
    const mejorPuja = pujasMaximas[articuloId];

    if (!mejorPuja.comprador) {
      alert("No hay pujas para este artículo");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/articulos/adjudicar/${articuloId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comprador: mejorPuja.comprador }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail);
      }

      alert("Artículo adjudicado con éxito");
    } catch (err) {
      alert("Error al adjudicar el artículo");
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold">Mis Artículos</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4">
        {articulos.length > 0 ? (
          <ul className="space-y-2">
            {articulos.map((articulo) => (
              <li key={articulo._id} className="p-2 border rounded">
                <p className="font-semibold">{articulo.descripcion}</p>
                <p>Precio de salida: ${articulo.precio_salida}</p>

                <p>
                  Última puja: ${pujasMaximas[articulo._id]?.cantidad || 0} 
                  {pujasMaximas[articulo._id]?.comprador ? ` (Comprador: ${pujasMaximas[articulo._id]?.comprador})` : " (Sin pujas)"}
                </p>

                {/* Mostrar el botón solo si el artículo aún no tiene comprador */}
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
          !error && <p>No tienes artículos en subasta.</p>
        )}
      </div>
    </div>
  );
}
