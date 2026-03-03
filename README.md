# Mini-ATS (Applicant Tracking System) API-First

Este proyecto es un sistema simplificado para el seguimiento de candidatos, construido con un backend de PHP puro y un frontend moderno con React + Vite + Tailwind CSS.

## Estructura del Proyecto

- `/api`: Backend en PHP 8 (Puro).
  - `/api/config`: Conexión PDO y CORS.
  - `/api/models`: Clases con lógica de negocio y acceso a datos.
  - `/api/*.php`: Endpoints RESTful.
- `/src`: Frontend en React 18.
  - `/src/components`: Formulario de postulación y Tablero Kanban (dnd-kit).
  - `/src/services`: Servicio de comunicación con la API.
- `schema.sql`: Script para inicializar la base de datos MySQL 8.

## Requisitos

- PHP 8.0+
- MySQL 8.0+
- Node.js & npm (para el frontend)
- XAMPP / WAMP / Docker con servidor Apache/MySQL.

## Instalación

1. **Base de Datos**: Importa el archivo `schema.sql` en tu servidor MySQL.
   - Crea una base de datos llamada `mini_ats`.
   - Ejecuta el contenido de `schema.sql`.

2. **Backend**:
   - Asegúrate de que la carpeta del proyecto esté en el document root de tu servidor (ej. `htdocs`).
   - Ajusta las credenciales en `api/config/db.php` si es necesario (`root` y password vacío por defecto).

3. **Frontend**:
   - Abre una terminal en la raíz del proyecto.
   - Ejecuta `npm install` para instalar dependencias.
   - Ejecuta `npm run dev` para iniciar el servidor de desarrollo de Vite.

## Uso

- **Portal de Postulación**: Vista para que los candidatos envíen sus datos a vacantes abiertas.
- **Panel de Reclutador**: Tablero Kanban interactivo donde puedes mover candidatos entre estados (Nuevo -> Entrevista -> Oferta -> etc.). Todos los movimientos se registran automáticamente en la bitácora.

---
Desarrollado para fines demostrativos de arquitectura Full-Stack Senior.
