<?php
// api/dashboard.php
require_once "config/cors.php";
require_once "config/db.php";

$database = new Database();
$db = $database->getConnection();

try {
    // 1. Candidatos por etapa
    $query_counts = "SELECT estado, COUNT(*) as total FROM postulaciones GROUP BY estado";
    $stmt_counts = $db->prepare($query_counts);
    $stmt_counts->execute();
    $counts = $stmt_counts->fetchAll(PDO::FETCH_ASSOC);

    // Mapear counts a un formato más fácil para el frontend
    $stats_counts = [
        'nuevo' => 0,
        'entrevista_tecnica' => 0,
        'oferta' => 0,
        'contratado' => 0,
        'rechazado' => 0
    ];
    foreach ($counts as $c) {
        $stats_counts[$c['estado']] = (int)$c['total'];
    }

    // 2. Tiempo promedio por etapa (Lógica simplificada basada en bitácora)
    // Obtenemos todos los logs ordenados por postulación y fecha
    $query_logs = "SELECT postulacion_id, accion_realizada, created_at 
                   FROM bitacora 
                   ORDER BY postulacion_id, created_at ASC";
    $stmt_logs = $db->prepare($query_logs);
    $stmt_logs->execute();
    $logs = $stmt_logs->fetchAll(PDO::FETCH_ASSOC);

    $durations = [
        'nuevo' => [],
        'entrevista_tecnica' => [],
        'oferta' => []
    ];

    $labels_to_state = [
        'Postulación recibida' => 'nuevo',
        'Movido a Entrevista Técnica' => 'entrevista_tecnica',
        'Movido a Oferta' => 'oferta',
        'Movido a Contratado' => 'contratado',
        'Movido a Rechazado' => 'rechazado'
    ];

    $last_log = null;
    foreach ($logs as $log) {
        if ($last_log && $last_log['postulacion_id'] == $log['postulacion_id']) {
            $start = strtotime($last_log['created_at']);
            $end = strtotime($log['created_at']);
            $diff_hours = ($end - $start) / 3600; // Tiempo en horas

            $state = $labels_to_state[$last_log['accion_realizada']] ?? null;
            if ($state && isset($durations[$state])) {
                $durations[$state][] = $diff_hours;
            }
        }
        $last_log = $log;
    }

    $avg_times = [];
    foreach ($durations as $state => $times) {
        $avg_times[$state] = count($times) > 0 ? round(array_sum($times) / count($times), 1) : 0;
    }

    // 3. Total de postulaciones
    $query_total = "SELECT COUNT(*) as total FROM postulaciones";
    $stmt_total = $db->prepare($query_total);
    $stmt_total->execute();
    $total_apps = (int)$stmt_total->fetch(PDO::FETCH_ASSOC)['total'];

    echo json_encode([
        "counts" => $stats_counts,
        "avg_times" => $avg_times,
        "total" => $total_apps
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error del servidor: " . $e->getMessage()]);
}
?>
