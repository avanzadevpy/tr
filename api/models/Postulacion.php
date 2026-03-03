<?php
// api/models/Postulacion.php

class Postulacion {
    private $conn;
    private $table_name = "postulaciones";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function crear($candidato_id, $vacante_id) {
        $query = "INSERT INTO " . $this->table_name . " (candidato_id, vacante_id, estado) VALUES (?, ?, 'nuevo')";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute([$candidato_id, $vacante_id])) {
            return $this->conn->lastInsertId();
        }
        return false;
    }

    public function obtenerTablero() {
        $query = "SELECT p.id, p.estado, p.created_at, 
                         c.nombre as candidato_nombre, c.email as candidato_email, c.cv_url,
                         v.titulo as vacante_titulo
                  FROM " . $this->table_name . " p
                  JOIN candidatos c ON p.candidato_id = c.id
                  JOIN vacantes v ON p.vacante_id = v.id
                  ORDER BY p.created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function actualizarEstado($id, $nuevo_estado) {
        $query = "UPDATE " . $this->table_name . " SET estado = ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$nuevo_estado, $id]);
    }
}
?>
