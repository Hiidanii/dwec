<?php
require '../db.php';

$ano_min = isset($_GET['ano_min']) ? (int)$_GET['ano_min'] : 0;
$ano_max = isset($_GET['ano_max']) ? (int)$_GET['ano_max'] : 9999;
$precio_min = isset($_GET['precio_min']) ? (float)$_GET['precio_min'] : 0;
$precio_max = isset($_GET['precio_max']) ? (float)$_GET['precio_max'] : 9999;

try {
    $stmt = $conexion->prepare("SELECT * FROM libros WHERE ano BETWEEN ? AND ? AND precio BETWEEN ? AND ?");
    $stmt->execute([$ano_min, $ano_max, $precio_min, $precio_max]);
    $libros = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if($libros) {
        echo json_encode($libros);
    } else {
        echo json_encode(["error" => "No se encontraron libros en ese rango de año y precio"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
