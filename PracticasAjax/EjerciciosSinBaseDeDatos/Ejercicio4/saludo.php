<?php
$hora = date("H"); // Hora actual en formato 24h
if($hora < 12) {
    echo "Buenos días";
} elseif($hora < 20) {
    echo "Buenas tardes";
} else {
    echo "Buenas noches";
}
?>
