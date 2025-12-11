<?php
date_default_timezone_set('Europe/Madrid'); // Ajustar zona horaria si es necesario
$hora = date("H");
$saludo = "";

if($hora < 12) {
    $saludo = "Buenos días";
} elseif($hora < 20) {
    $saludo = "Buenas tardes";
} else {
    $saludo = "Buenas noches";
}

$respuesta = [
    "hora" => date("H:i:s"),
    "saludo" => $saludo
];

echo json_encode($respuesta);
?>
