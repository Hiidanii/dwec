<?php
session_start();

if(!isset($_SESSION['clicks'])) {
    $_SESSION['clicks'] = 0; // Inicializar contador si no existe
}

$_SESSION['clicks']++; // Incrementar contador

echo "Clicks totales: " . $_SESSION['clicks'];
?>
