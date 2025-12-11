<?php
header("Content-Type: application/json; charset=UTF-8");

//$objeto = json_decode($_GET["objeto"],false);
$objeto = json_decode($_POST["objeto"],false);
//$objeto = json_decode('{"tabla":"alumnos","valor":111}');
$servidor = "localhost";
$usuario = "ajax";
$password = "dbpass";
$bbdd = "ajax";

//Crear la conexión
$conexion = new mysqli($servidor, $usuario, $password, $bbdd);
mysqli_set_charset($conexion,"utf8");

//Comprobamos la conexión
if ($conexion ->connect_error){
    die("Error en la conexion: "+$conexion->connect_error);
}else{
    //Conexión correcta
    
    //Creamos la consulta SQL
    $sql = "SELECT idAlumno, alumno, puntuacion FROM $objeto->tabla WHERE puntuacion >= $objeto->valor";
    
    if ($resultado = $conexion->query($sql)) {
		$datos = array();

		while ( $fila = $resultado->fetch_assoc() )	{
			// Almacenamos en un array  cada una de las filas que vamos leyendo del recordset.
			$datos[]=$fila;
		}
	}
	/* liberar el conjunto de resultados */
	$resultado->free();
    
    echo json_encode($datos);
}
/* cerrar la conexión */
$conexion->close();

?>