<?php
$servidor = "localhost";
$basedatos = "biblioteca";
$usuario = "ajaxuser";
$password = "ajaxpass";
$charset = "utf8mb4";

$dsn = "mysql:host=$servidor;dbname=$basedatos;charset=$charset";

try {
    $conexion = new PDO($dsn, $usuario, $password);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("ERROR de conexión: " . $e->getMessage());
}
?>
