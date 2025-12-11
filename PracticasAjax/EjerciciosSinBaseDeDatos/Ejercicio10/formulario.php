<?php
$nombre = $_POST['nombre'] ?? '';
$email = $_POST['email'] ?? '';

echo "Nombre: " . htmlspecialchars($nombre) . ", Email: " . htmlspecialchars($email);
?>
