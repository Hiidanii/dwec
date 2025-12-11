<?php
$numeros_str = $_POST['numeros'] ?? '';
$numeros = array_map('intval', explode(',', $numeros_str)); // Convertir a array de enteros
$pares = array_filter($numeros, fn($n) => $n % 2 === 0);     // Filtrar pares
echo json_encode(array_values($pares));                     // Devolver como JSON
?>
