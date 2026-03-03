-- Limpiar datos previos usando DELETE para activar el ON DELETE CASCADE definido en el schema
DELETE FROM candidatos;
-- Al borrar candidatos, se borrarán postulaciones y bitácora automáticamente por el CASCADE
ALTER TABLE candidatos AUTO_INCREMENT = 1;
ALTER TABLE postulaciones AUTO_INCREMENT = 1;
ALTER TABLE bitacora AUTO_INCREMENT = 1;

-- 1. Insertar Candidatos
INSERT INTO candidatos (id, nombre, email, telefono, cv_url, created_at) VALUES 
(1, 'Juan Pérez', 'juan.perez@example.com', '555-0101', 'https://drive.google.com/cv-juan', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(2, 'María García', 'm.garcia@test.com', '555-0202', 'https://drive.google.com/cv-maria', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(3, 'Carlos López', 'clopez@dev.com', '555-0303', 'https://drive.google.com/cv-carlos', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(4, 'Ana Martínez', 'ana.mtz@work.com', '555-0404', 'https://drive.google.com/cv-ana', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(5, 'Roberto Sánchez', 'rsanchez@it.com', '555-0505', 'https://drive.google.com/cv-roberto', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(6, 'Laura Torres', 'l.torres@service.com', '555-0606', 'https://drive.google.com/cv-laura', NOW());

-- 2. Insertar Postulaciones con diferentes estados
-- (Asumiendo que las vacantes 1, 2 y 3 existen por el schema original)

-- Juan Pérez -> Contratado (Vacante 1)
INSERT INTO postulaciones (id, candidato_id, vacante_id, estado, created_at) VALUES 
(1, 1, 1, 'contratado', DATE_SUB(NOW(), INTERVAL 5 DAY));

-- María García -> Entrevista Técnica (Vacante 2)
INSERT INTO postulaciones (id, candidato_id, vacante_id, estado, created_at) VALUES 
(2, 2, 2, 'entrevista_tecnica', DATE_SUB(NOW(), INTERVAL 4 DAY));

-- Carlos López -> Oferta (Vacante 1)
INSERT INTO postulaciones (id, candidato_id, vacante_id, estado, created_at) VALUES 
(3, 3, 1, 'oferta', DATE_SUB(NOW(), INTERVAL 3 DAY));

-- Ana Martínez -> Nuevo (Vacante 3)
INSERT INTO postulaciones (id, candidato_id, vacante_id, estado, created_at) VALUES 
(4, 4, 3, 'nuevo', DATE_SUB(NOW(), INTERVAL 2 DAY));

-- Roberto Sánchez -> Rechazado (Vacante 2)
INSERT INTO postulaciones (id, candidato_id, vacante_id, estado, created_at) VALUES 
(5, 5, 2, 'rechazado', DATE_SUB(NOW(), INTERVAL 1 DAY));

-- Laura Torres -> Nuevo (Vacante 1)
INSERT INTO postulaciones (id, candidato_id, vacante_id, estado, created_at) VALUES 
(6, 6, 1, 'nuevo', NOW());

-- 3. Insertar Bitácora para simular tiempos y trazabilidad

-- Log para Juan Pérez (Simulando proceso completo)
INSERT INTO bitacora (postulacion_id, accion_realizada, created_at) VALUES 
(1, 'Postulación recibida', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(1, 'Movido a Entrevista Técnica', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(1, 'Movido a Oferta', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(1, 'Movido a Contratado', DATE_SUB(NOW(), INTERVAL 1 DAY));

-- Log para María García
INSERT INTO bitacora (postulacion_id, accion_realizada, created_at) VALUES 
(2, 'Postulación recibida', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(2, 'Movido a Entrevista Técnica', DATE_SUB(NOW(), INTERVAL 2 DAY));

-- Log para Carlos López
INSERT INTO bitacora (postulacion_id, accion_realizada, created_at) VALUES 
(3, 'Postulación recibida', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(3, 'Movido a Entrevista Técnica', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(3, 'Movido a Oferta', DATE_SUB(NOW(), INTERVAL 1 DAY));

-- Log para Ana Martínez
INSERT INTO bitacora (postulacion_id, accion_realizada, created_at) VALUES 
(4, 'Postulación recibida', DATE_SUB(NOW(), INTERVAL 2 DAY));

-- Log para Roberto Sánchez
INSERT INTO bitacora (postulacion_id, accion_realizada, created_at) VALUES 
(5, 'Postulación recibida', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(5, 'Movido a Rechazado', NOW());

-- Log para Laura Torres
INSERT INTO bitacora (postulacion_id, accion_realizada, created_at) VALUES 
(6, 'Postulación recibida', NOW());
