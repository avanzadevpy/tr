// src/services/api.js

const API_BASE = 'http://localhost/coursera/okara/mini-ats/api';

export const postular = async (datos) => {
    try {
        const response = await fetch(`${API_BASE}/postular.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });

        const data = await response.json();

        if (!response.ok) {
            throw { status: response.status, message: data.message };
        }

        return data;
    } catch (error) {
        console.error("Error en postular:", error);
        throw error;
    }
};

export const getTablero = async () => {
    try {
        const response = await fetch(`${API_BASE}/tablero.php`);
        if (!response.ok) throw new Error('Error al obtener el tablero');
        return await response.json();
    } catch (error) {
        console.error("Error en getTablero:", error);
        throw error;
    }
};

export const actualizarEstado = async (postulacion_id, nuevo_estado) => {
    try {
        const response = await fetch(`${API_BASE}/estado.php`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postulacion_id, nuevo_estado }),
        });
        if (!response.ok) throw new Error('Error al actualizar estado');
        return await response.json();
    } catch (error) {
        console.error("Error en actualizarEstado:", error);
        throw error;
    }
};

export const getVacantes = async () => {
    try {
        const response = await fetch(`${API_BASE}/vacantes.php`);
        if (!response.ok) throw new Error('Error al obtener vacantes');
        return await response.json();
    } catch (error) {
        console.error("Error en getVacantes:", error);
        throw error;
    }
};

export const getDashboard = async () => {
    try {
        const response = await fetch(`${API_BASE}/dashboard.php`);
        if (!response.ok) throw new Error('Error al obtener dashboard');
        return await response.json();
    } catch (error) {
        console.error("Error en getDashboard:", error);
        throw error;
    }
};
