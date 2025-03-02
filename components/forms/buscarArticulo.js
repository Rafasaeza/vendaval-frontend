'use client';

import { useState, useEffect } from 'react';
import Wrapper from '@/components/global/wrapper';
export default function BuscarArticulo({ userEmail }) {
  const [query, setQuery] = useState('');
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ultimasPujas, setUltimasPujas] = useState({});
  const [cantidades, setCantidades] = useState({});
  const [errorPuja, setErrorPuja] = useState({});

  useEffect(() => {
    const fetchPujas = async () => {
      const nuevasPujas = {};
      for (const articulo of articulos) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/pujas/${articulo._id}`);
          if (!res.ok) throw new Error('No se encontraron pujas');
          const data = await res.json();
          nuevasPujas[articulo._id] = data.length > 0 ? data[data.length - 1].cantidad : 0;
        } catch {
          nuevasPujas[articulo._id] = 0;
        }
      }
      setUltimasPujas(nuevasPujas);
    };

    if (articulos.length > 0) {
      fetchPujas();
    }
  }, [articulos]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/articulos/?query=${query}`);
      if (!res.ok) throw new Error('No se encontraron artículos');
      
      const data = await res.json();
      setArticulos(data);
    } catch (err) {
      setArticulos([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePuja = async (articuloId) => {
    try {
      setErrorPuja({}); // Resetear errores previos
      const cantidad = parseInt(cantidades[articuloId], 10);
  
      if (isNaN(cantidad)) {
        setErrorPuja({ ...errorPuja, [articuloId]: "Ingrese una cantidad válida" });
        return;
      }
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/pujas/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articulo_id: articuloId,
          comprador: userEmail,
          timestamp: new Date().toISOString(),
          cantidad,
        }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        setErrorPuja({ ...errorPuja, [articuloId]: errorData.detail });
        return;
      }
  
      alert("Puja realizada con éxito");
    } catch (err) {
      setErrorPuja({ ...errorPuja, [articuloId]: "No se pudo realizar la puja" });
    }
  };

  return (
    
    <Wrapper>
      <form onSubmit={handleSearch} className="space-y-2">
        <label className="block text-sm font-medium">Buscar artículo</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4">
        {articulos.length > 0 ? (
          <ul className="space-y-2">
            {articulos.map((articulo) => {
              const ultimaPuja = ultimasPujas[articulo._id] || 0;
              const cantidadIngresada = parseInt(cantidades[articulo._id], 10) || '';

              return (
                <li key={articulo._id} className="p-2 border rounded">
                  <p className="font-semibold">{articulo.descripcion}</p>
                  <p>Precio de salida: ${articulo.precio_salida}</p>
                  <p>Última puja: ${ultimaPuja}</p>

                  <div className="flex space-x-2 mt-2">
                    {articulo.imagenes.map((img, index) => (
                      <img key={index} src={img} alt="Imagen" className="w-16 h-16 object-cover rounded" />
                    ))}
                  </div>

                  {/* Mostrar el formulario solo si el artículo NO tiene comprador */}
                  {articulo.comprador == null && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handlePuja(articulo._id);
                      }}
                      className="mt-2"
                    >
                      <input
                        type="number"
                        value={cantidadIngresada}
                        onChange={(e) => {
                          const valor = parseInt(e.target.value, 10);
                          if (!isNaN(valor) && valor > ultimaPuja) {
                            setCantidades({ ...cantidades, [articulo._id]: valor });
                          }
                        }}
                        min={ultimaPuja + 1}
                        placeholder={ultimaPuja + 1}
                        className="w-full p-2 border rounded"
                        required
                      />
                      {errorPuja[articulo._id] && <p className="text-red-500">{errorPuja[articulo._id]}</p>}
                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 mt-2"
                        disabled={isNaN(cantidadIngresada) || cantidadIngresada <= ultimaPuja}
                      >
                        Pujar
                      </button>
                    </form>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          !loading && !error && <p>No hay artículos que coincidan con la búsqueda.</p>
        )}
      </div>
    </Wrapper>
  );
}
