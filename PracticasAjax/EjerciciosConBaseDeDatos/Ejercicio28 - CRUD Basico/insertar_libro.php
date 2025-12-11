<?php
require '../db.php';

$titulo = $_POST['titulo'] ?? '';
$autor = $_POST['autor'] ?? '';
$editorial = $_POST['editorial'] ?? '';
$ano = isset($_POST['ano']) ? (int)$_POST['ano'] : 0;
$precio = isset($_POST['precio']) ? (float)$_POST['precio'] : 0;

try {
    $stmt = $conexion->prepare("INSERT INTO libros (titulo, autor, editorial, ano, precio) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$titulo, $autor, $editorial, $ano, $precio]);
    echo "Libro insertado correctamente.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
