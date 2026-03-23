# Ricardo Gelats Web App 🍦

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

> ⚠️ **Nota de Arquitectura:** Este proyecto **no es una *Landing Page* estática HTML**. Se trata de una **Single Page Application (SPA) Full-Stack** con su propio **Sistema de Gestión de Contenido (CMS) a medida**.

Una aplicación web robusta, modular y ultra-rápida construida para **Ricardo Gelats**, la heladería artesanal icónica de Castellón. Desarrollada puramente en React, permite a los administradores del negocio gobernar su catálogo sin depender de un técnico.

## 🚀 Por qué esto es una Web App (Características Núcleo)

- **Panel de Administración Privado (`/admin`)**: La joya de la corona de la aplicación es su propio CMS. Protegido rigurosamente mediante las reglas de **Firebase Authentication**, los dueños pueden realizar operaciones completas **CRUD** (Añadir, Editar, Ocultar o Eliminar) sobre helados, alérgenos y cafetería.
- **Motor en Tiempo Real (Firestore)**: El menú visible para el público no es estático. Todo el DOM está suscrito a la base de datos vía WebSockets (`onSnapshot`). Si el gerente agota un producto desde su móvil, la pantalla del cliente se actualiza **al instante sin recargar**.
- **Ingeniería de Rendimiento (Vercel Best Practices)**:
  - *Code Splitting* asincrónico por rutas mediante `React.lazy()` (El código pesado del admin jamás se envía al cliente normal).
  - Virtualización de listas con CSS (`content-visibility`) capaz de sostener catálogos centenarios en pantalla sin dropear *frames*.
  - Eliminación estricta de *Cascading Updates* mediante abstracción síncrona en los formularios de edición.
- **Sistema de Diseño Mobile-First**: Estética moderna estilo "Glassmorphism" construida mediante TailwindCSS, con micro-interacciones táctiles personalizadas y accesibilidad total de navegación por teclado (A11y).

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
