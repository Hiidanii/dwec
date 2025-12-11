<?php
$nombre = $_GET['nombre'] ?? 'invitado'; // Si no se envía nombre, usar "invitado"
echo "Hola, " . htmlspecialchars($nombre) . "!";
?>
