<?php
// api/models/Bitacora.php

class Bitacora {
    private $conn;
    private $table_name = "bitacora";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function registrar($postulacion_id, $accion) {
        $query = "INSERT INTO " . $this->table_name . " (postulacion_id, accion_realizada) VALUES (?, ?)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$postulacion_id, $accion]);
    }

    public function obtenerPorPostulacion($postulacion_id) {
        $query = "SELECT accion_realizada, created_at FROM " . $this->table_name . " WHERE postulacion_id = ? ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$postulacion_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
