<?php
require '../db.php';

$autor = isset($_GET['autor']) ? $_GET['autor'] : '';

try {
    $stmt = $conexion->prepare("SELECT * FROM libros WHERE autor LIKE ?");
    $stmt->execute(["%$autor%"]);
    $libros = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if($libros) {
        echo json_encode($libros);
    } else {
        echo json_encode(["error" => "No se encontraron libros para el autor especificado"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
