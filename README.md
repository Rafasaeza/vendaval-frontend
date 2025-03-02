# Frontend de Vendaval - Subasta de Artículos

Este proyecto es el frontend de la plataforma **Vendaval**, una aplicación de subastas en línea donde los usuarios pueden listar artículos para subasta y realizar pujas en tiempo real. 

## Tecnologías Utilizadas
- **Framework:** Next.js (React)
- **Estilos:** Tailwind CSS
- **Almacenamiento de Imágenes:** Cloudinary
- **Autenticación:** NextAuth.js

## Demo en Producción
Puedes acceder al frontend desplegado en el siguiente enlace:  
[Vendaval Frontend](https://vendaval-frontend.vercel.app/)

## Instalación y Ejecución en Local
Sigue estos pasos para ejecutar el frontend en tu entorno local:

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Rafasaeza/vendaval-frontend.git
cd vendaval-frontend
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto y define las siguientes variables:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:13000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=tu_upload_preset
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_secreto
```
Reemplaza los valores según la configuración de tu backend y Cloudinary.

### 4. Ejecutar el Servidor de Desarrollo
```bash
npm run dev
```
El frontend estará disponible en: [http://localhost:3000](http://localhost:3000)

## Subida de Imágenes con Cloudinary
Vendaval utiliza **Cloudinary** para la gestión de imágenes. Al subir una imagen, esta se almacena en la nube y se obtiene un URL para su uso en la plataforma.

## Contribución
Si deseas contribuir al proyecto, puedes clonar el repositorio y enviar tus mejoras mediante Pull Requests.

**Autor:** [Rafael Sáez Arana]  
**Repositorio:** [https://github.com/Rafasaeza/vendaval-frontend]
