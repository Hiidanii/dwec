<?php
require '../db.php';

try {
    $stmt1 = $conexion->query("SELECT * FROM libros ORDER BY precio DESC LIMIT 1");
    $stmt2 = $conexion->query("SELECT * FROM libros ORDER BY precio ASC LIMIT 1");
    $libroCaro = $stmt1->fetch(PDO::FETCH_ASSOC);
    $libroBarato = $stmt2->fetch(PDO::FETCH_ASSOC);

    if($libroCaro && $libroBarato) {
        echo json_encode(["caro" => $libroCaro, "barato" => $libroBarato]);
    } else {
        echo json_encode(["error" => "No hay libros en la base de datos"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
