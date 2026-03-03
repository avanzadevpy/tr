# Propuesta Técnica: Okara ATS
## Solución al Desafío a.1 - Búsqueda de Perfiles

Este documento detalla la justificación, arquitectura y beneficios de la plataforma **Okara ATS**, diseñada específicamente para resolver las ineficiencias de los procesos basados en Excel y transformar la experiencia de reclutamiento.

---

### 1. Diagnóstico del Problema (El "Por Qué")
Operar con Excel genera silos de información, falta de visibilidad en tiempo real y riesgo de errores humanos (como citar a un candidato dos veces para la misma etapa). **Okara ATS** migra este caos hacia una arquitectura **API-First** que centraliza la data y estandariza el workflow.

### 2. Justificación de la Herramienta
La solución prototipada se basa en cuatro pilares alineados al desafío:

*   **Workflow Claro (Tablero Kanban):** Sustituye las filas de Excel por una interfaz visual donde cada candidato "viaja" por las etapas. Esto elimina la ambigüedad sobre en qué estado se encuentra cada proceso.
*   **Experiencia del Candidato (Portal Público/Notificaciones):** Un formulario optimizado para móviles y un sistema de feedback constante.
*   **Prevención de Duplicados:** Validación a nivel de base de datos (Unique Key en Email) que impide que un candidato se postule dos veces erróneamente, alertando al usuario en tiempo real.
*   **Trazabilidad Total (Bitácora Automática):** Cada movimiento en el tablero genera un registro inmutable con fecha y hora, permitiendo auditorías de proceso y cálculo de KPIs de eficiencia.

### 3. Propuesta de Valor para el Candidato (Automatización)
Para mejorar drásticamente la experiencia del candidato, se puede implementar la integración de **Notificaciones Automáticas Activas**:
 
  Implementar un **Webhook de Notificación**. Al mover una tarjeta de "Nuevo" a "Entrevista", el sistema dispara automáticamente un correo (o mensaje de WhatsApp vía API) confirmando el avance. Esto elimina la "incertidumbre del candidato" y posiciona a la empresa como tecnológicamente avanzada.

### 4. stack Tecnológico e Integraciones
*   **Backend:** PHP 8 (Puro) + MySQL 8. Elegido por su alto rendimiento, facilidad de despliegue y compatibilidad universal.
*   **Frontend:** React 18 + Vite. Ofrece una SPA (Single Page Application) rápida y moderna que se siente como una aplicación de escritorio.
*   **Estética:** Tailwind CSS v4 con colores corporativos (Okara Purple), garantizando una marca consistente.

**Integraciones posibles:**
*   **Calendly/Google Calendar:** Para agendar la entrevista técnica automáticamente al mover el candidato.
*   **SendGrid/Mailtrap:** Para la gestión de correos electrónicos transaccionales.
*   **Slack/Teams:** Notificaciones al equipo de búsqueda cuando llega un perfil "High Potential".
*   **IA:**  Analisis de CVs y recomendaciones de candidatos.

---

### 5. Resumen del Prototipo (Demo)
El prototipo actual ya cuenta con:
1.  **Portal de Postulación:** Validado contra duplicados.
2.  **Tablero Kanban:** Con funcionalidad Drag & Drop para gestión de workflow.
3.  **Dashboard de Métricas:** Visualización de tiempos promedio por etapa y volumen de candidatos.
4.  **Bitácora de Trazabilidad:** Registro automático de todas las acciones.

---
**Conclusión:** Okara ATS no es solo una base de datos; es un motor de eficiencia que transforma un proceso administrativo en una ventaja competitiva de talento.
