<?php
require '../db.php';

$id = isset($_POST['id']) ? (int)$_POST['id'] : 0;
$titulo = $_POST['titulo'] ?? '';
$autor = $_POST['autor'] ?? '';
$editorial = $_POST['editorial'] ?? '';
$ano = isset($_POST['ano']) ? (int)$_POST['ano'] : 0;
$precio = isset($_POST['precio']) ? (float)$_POST['precio'] : 0;

try {
    $stmt = $conexion->prepare("UPDATE libros SET titulo=?, autor=?, editorial=?, ano=?, precio=? WHERE id=?");
    $stmt->execute([$titulo,$autor,$editorial,$ano,$precio,$id]);
    echo $stmt->rowCount() > 0 ? "Libro actualizado correctamente." : "No se hicieron cambios.";
} catch(PDOException $e) {
    echo "Error: ".$e->getMessage();
}
?>
