<?php
// api/tablero.php
require_once "config/cors.php";
require_once "config/db.php";
require_once "models/Postulacion.php";

$database = new Database();
$db = $database->getConnection();

$postulacionModel = new Postulacion($db);

try {
    $postulaciones = $postulacionModel->obtenerTablero();
    
    // Organizar por estado para facilitar el Kanban en el frontend
    $tablero = [
        "nuevo" => [],
        "entrevista_tecnica" => [],
        "oferta" => [],
        "contratado" => [],
        "rechazado" => []
    ];

    foreach ($postulaciones as $p) {
        $tablero[$p['estado']][] = $p;
    }

    http_response_code(200);
    echo json_encode($tablero);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error del servidor: " . $e->getMessage()]);
}
?>
