# Ricardo Gelats Web App 🍦

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

Una aplicación web moderna, ultra-rápida y administrable para **Ricardo Gelats**, la heladería artesanal icónica de Castellón. Construida con React, Vite y Tailwind CSS, y sincronizada en tiempo real con Firebase.

## 🚀 Características Principales

- **Dashboard de Administración Protegido (`/admin`)**: Sistema de gestión de inventario en tiempo real (CRUD) protegido por Firebase Authentication.
- **Sincronización en Tiempo Real**: Catálogos de helados y menús de cafetería que se actualizan instantáneamente en la vista pública al editarse desde el panel.
- **Diseño UI/UX "Pro Max"**: Estética "Glassmorphism" y temática *Crema y Chocolate*, con soporte responsivo, micro-interacciones táctiles y animaciones accesibles.
- **Rendimiento Vercel Best Practices**: 
  - *Code Splitting* por rutas mediante `React.lazy()`
  - Carga diferida nativa de imágenes (`loading="lazy"`)
  - Virtualización estática de listas CSS (`content-visibility`)
  - Ausencia de *Cascading Updates* (Eliminación estricta de `useEffect` innecesarios).
- **SEO y Accesibilidad (A11y)**: Navegación tabular con indicadores visuales focales personalizados y metas preparadas para el indexado de motores de búsqueda.

## 🛠️ Stack Tecnológico

- **Core**: React 18, React Router v6
- **Build Tool**: Vite
- **Estilos**: Tailwind CSS 3
- **Base de Datos & Auth**: Firebase (Firestore & Firebase Auth)
- **Despliegue Recomendado**: Vercel / Netlify / Firebase Hosting

## 💻 Instalación Local

1. Clona el repositorio:
   ```bash
   git clone <tu-repositorio-url>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz con tus credenciales de Firebase:
   ```env
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre `http://localhost:5173` en tu navegador.

## 📂 Estructura del Proyecto

```text
src/
├── assets/        # Recursos estáticos
├── components/    # Componentes modulares (admin, layout, UI)
├── constants/     # Datos estáticos (Alergenos, Locales)
├── hooks/         # Lógica reutilizable abstracta (Firebase, Auth)
├── pages/         # Vistas de React Router
└── index.css      # Utilidades globales y Tailwind base
```

## 🏗️ Comandos Útiles

- `npm run dev` - Levanta el servidor local con *Hot Module Replacement* (HMR).
- `npm run build` - Compila la aplicación optimizada y minificada en la carpeta `dist/` lista para producción.
- `npm run preview` - Previsualiza localmente la carpeta `dist/`.

## 🎨 Créditos y Diseño

Diseñada y desarrollada por **Francisco De Manna**.
