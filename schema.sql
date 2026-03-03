CREATE DATABASE IF NOT EXISTS mini_ats;
USE mini_ats;

-- Tabla de Candidatos
CREATE TABLE IF NOT EXISTS candidatos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    cv_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Vacantes
CREATE TABLE IF NOT EXISTS vacantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    estado ENUM('abierta', 'cerrada') DEFAULT 'abierta'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Postulaciones
CREATE TABLE IF NOT EXISTS postulaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidato_id INT NOT NULL,
    vacante_id INT NOT NULL,
    estado ENUM('nuevo', 'entrevista_tecnica', 'oferta', 'contratado', 'rechazado') DEFAULT 'nuevo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_postulacion_candidato FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE,
    CONSTRAINT fk_postulacion_vacante FOREIGN KEY (vacante_id) REFERENCES vacantes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de Bitácora
CREATE TABLE IF NOT EXISTS bitacora (
    id INT AUTO_INCREMENT PRIMARY KEY,
    postulacion_id INT NOT NULL,
    accion_realizada VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bitacora_postulacion FOREIGN KEY (postulacion_id) REFERENCES postulaciones(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar algunas vacantes de prueba
INSERT INTO vacantes (titulo, estado) VALUES 
('Desarrollador Frontend React', 'abierta'),
('Ingeniero de Backend PHP', 'abierta'),
('QA Automation Engineer', 'abierta');
