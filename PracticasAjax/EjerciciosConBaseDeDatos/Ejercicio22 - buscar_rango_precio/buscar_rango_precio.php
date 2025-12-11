<?php
require '../db.php';

$min = isset($_GET['min']) ? (float)$_GET['min'] : 0;
$max = isset($_GET['max']) ? (float)$_GET['max'] : 0;

try {
    $stmt = $conexion->prepare("SELECT * FROM libros WHERE precio BETWEEN ? AND ?");
    $stmt->execute([$min, $max]);
    $libros = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if($libros) {
        echo json_encode($libros);
    } else {
        echo json_encode(["error" => "No se encontraron libros en ese rango de precio"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
