<?php
// api/estado.php
require_once "config/cors.php";
require_once "config/db.php";
require_once "models/Postulacion.php";
require_once "models/Bitacora.php";

$database = new Database();
$db = $database->getConnection();

$postulacionModel = new Postulacion($db);
$bitacoraModel = new Bitacora($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->postulacion_id) && !empty($data->nuevo_estado)) {
    try {
        if ($postulacionModel->actualizarEstado($data->postulacion_id, $data->nuevo_estado)) {
            // Registrar cambio en bitácora
            $labels = [
                'nuevo' => 'Nuevo',
                'entrevista_tecnica' => 'Entrevista Técnica',
                'oferta' => 'Oferta',
                'contratado' => 'Contratado',
                'rechazado' => 'Rechazado'
            ];
            $estadoLabel = $labels[$data->nuevo_estado] ?? $data->nuevo_estado;
            $bitacoraModel->registrar($data->postulacion_id, "Movido a " . $estadoLabel);

            http_response_code(200);
            echo json_encode(["message" => "Estado actualizado correctamente."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Error al actualizar el estado."]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["message" => "Error del servidor: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Datos incompletos."]);
}
?>
