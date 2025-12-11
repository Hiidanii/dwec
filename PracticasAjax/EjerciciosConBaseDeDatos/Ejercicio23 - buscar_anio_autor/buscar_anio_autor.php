<?php
require '../db.php';

$ano = isset($_GET['ano']) ? (int)$_GET['ano'] : 0;
$autor = isset($_GET['autor']) ? $_GET['autor'] : '';

try {
    $stmt = $conexion->prepare("SELECT * FROM libros WHERE ano = ? AND autor LIKE ?");
    $stmt->execute([$ano, "%$autor%"]);
    $libros = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if($libros) {
        echo json_encode($libros);
    } else {
        echo json_encode(["error" => "No se encontraron libros para ese año y autor"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
