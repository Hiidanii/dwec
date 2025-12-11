<?php
require '../db.php';
$id = isset($_POST['id']) ? (int)$_POST['id'] : 0;

try {
    $stmt = $conexion->prepare("DELETE FROM libros WHERE id=?");
    $stmt->execute([$id]);
    echo $stmt->rowCount() > 0 ? "Libro eliminado correctamente." : "No se encontró el libro.";
} catch(PDOException $e) {
    echo "Error: ".$e->getMessage();
}
?>
