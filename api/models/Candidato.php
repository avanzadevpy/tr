<?php
// api/models/Candidato.php

class Candidato {
    private $conn;
    private $table_name = "candidatos";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function emailExists($email) {
        $query = "SELECT id FROM " . $this->table_name . " WHERE email = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function crear($nombre, $email, $telefono, $cv_url) {
        $query = "INSERT INTO " . $this->table_name . " (nombre, email, telefono, cv_url) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute([$nombre, $email, $telefono, $cv_url])) {
            return $this->conn->lastInsertId();
        }
        return false;
    }
}
?>
