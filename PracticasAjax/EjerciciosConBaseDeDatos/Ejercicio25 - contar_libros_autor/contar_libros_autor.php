<?php
require '../db.php';

$autor = isset($_GET['autor']) ? $_GET['autor'] : '';

try {
    $stmt = $conexion->prepare("SELECT COUNT(*) AS total FROM libros WHERE autor LIKE ?");
    $stmt->execute(["%$autor%"]);
    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($resultado);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
