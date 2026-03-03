<?php
// api/vacantes.php
require_once "config/cors.php";
require_once "config/db.php";

$database = new Database();
$db = $database->getConnection();

try {
    $query = "SELECT id, titulo FROM vacantes WHERE estado = 'abierta'";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $vacantes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    http_response_code(200);
    echo json_encode($vacantes);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error del servidor: " . $e->getMessage()]);
}
?>
