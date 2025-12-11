<?php
require '../db.php'; // Archivo de conexión a la base de datos

try {
    $stmt = $conexion->query("SELECT * FROM libros");
    $libros = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($libros);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
