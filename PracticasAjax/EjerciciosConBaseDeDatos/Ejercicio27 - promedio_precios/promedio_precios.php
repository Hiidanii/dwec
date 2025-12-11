<?php
require '../db.php';

try {
    $stmt = $conexion->query("SELECT AVG(precio) AS promedio FROM libros");
    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

    if($resultado) {
        echo json_encode($resultado);
    } else {
        echo json_encode(["error" => "No hay libros en la base de datos"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
