<?php
$opcion = $_GET['opcion'] ?? '';

switch($opcion) {
    case '1':
        echo "Elegiste la opción 1";
        break;
    case '2':
        echo "Elegiste la opción 2";
        break;
    default:
        echo "Opción no válida";
        break;
}
?>
