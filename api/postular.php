<?php
// api/postular.php
require_once "config/cors.php";
require_once "config/db.php";
require_once "models/Candidato.php";
require_once "models/Postulacion.php";
require_once "models/Bitacora.php";

$database = new Database();
$db = $database->getConnection();

$candidatoModel = new Candidato($db);
$postulacionModel = new Postulacion($db);
$bitacoraModel = new Bitacora($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->nombre) && !empty($data->email) && !empty($data->vacante_id)) {
    try {
        // Verificar si el email existe
        if ($candidatoModel->emailExists($data->email)) {
            http_response_code(409);
            echo json_encode(["message" => "Ya estás participando en este proceso."]);
            exit();
        }

        // Crear candidato
        $candidato_id = $candidatoModel->crear($data->nombre, $data->email, $data->telefono ?? '', $data->cv_url ?? '');

        if ($candidato_id) {
            // Crear postulación
            $postulacion_id = $postulacionModel->crear($candidato_id, $data->vacante_id);
            
            if ($postulacion_id) {
                // Registrar en bitácora
                $bitacoraModel->registrar($postulacion_id, "Postulación recibida");
                
                http_response_code(201);
                echo json_encode(["message" => "Postulación enviada con éxito.", "id" => $postulacion_id]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Error al crear la postulación."]);
            }
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Error al registrar el candidato."]);
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
