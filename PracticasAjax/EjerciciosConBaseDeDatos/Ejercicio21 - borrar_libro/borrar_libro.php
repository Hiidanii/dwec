<?php
require '../db.php';

$id = isset($_POST['id']) ? (int)$_POST['id'] : 0;

try {
    $stmt = $conexion->prepare("DELETE FROM libros WHERE id = ?");
    $stmt->execute([$id]);

    if($stmt->rowCount() > 0) {
        echo "Libro eliminado correctamente.";
    } else {
        echo "No se encontró ningún libro con ID $id.";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
