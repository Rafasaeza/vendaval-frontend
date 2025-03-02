'use client';

import { useState } from 'react';
import Wrapper from '@/components/global/wrapper';
export default function ArticleForm({ userEmail }) {
  const [descripcion, setDescripcion] = useState('');
  const [precioSalida, setPrecioSalida] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (file) => {
    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/image-upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Image upload failed');

      const data = await res.json();
      setImagenes((prev) => [...prev, data.url]);
    } catch (error) {
      console.error('Image upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const articulo = {
      vendedor: userEmail,
      descripcion,
      precio_salida: parseInt(precioSalida, 10),
      imagenes,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/articulos/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articulo),
      });

      if (!res.ok) throw new Error('Error al publicar el artículo');

      alert('Artículo publicado con éxito');
      setDescripcion('');
      setPrecioSalida('');
      setImagenes([]);
    } catch (error) {
      console.error('Error al publicar el artículo:', error);
      alert('No se pudo publicar el artículo');
    }
  };

  return (
    <Wrapper>
    <form onSubmit={handleSubmit} >
      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Precio de salida</label>
        <input
          type="number"
          value={precioSalida}
          onChange={(e) => setPrecioSalida(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Imágenes</label>
        <input
          type="file"
          onChange={(e) => handleImageUpload(e.target.files[0])}
          disabled={uploadingImage}
          className="block w-full p-2 border rounded"
        />
        <div className="mt-2">
          {imagenes.map((img, index) => (
            <img key={index} src={img} alt="Imagen subida" className="w-24 h-24 object-cover rounded" />
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        disabled={uploadingImage}
      >
        Publicar Artículo
      </button>
    </form>
    </Wrapper>
  );
}
