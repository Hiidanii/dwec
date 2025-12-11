<?php
require '../db.php';

try {
    $stmt = $conexion->query("SELECT * FROM libros ORDER BY id DESC");
    $libros = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($libros);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
