<?php
	// Cabecera para indicar que vamos a enviar datos JSON y que no haga caché de los datos.
	header('Content-Type: application/json');
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

	//Notificar todos los errores de PHP
	error_reporting(E_ALL);
	ini_set('display_errors', '1');
	
/* 	Utilizar el fichero dbcreacion.sql incluído en la carpeta para crear la base de datos, usuario y tabla en tu servidor MySQL.
	Si fuera necesario modifica los datos de la configuración y adáptalos a tu entorno de trabajo. */
	
	// Configuración BASE DE DATOS MYSQL
	$servidor = "localhost";
	$basedatos = "ajax";
	$usuario = "ajax";	
	$password = "dbpass";
	
	// Recogemos los datos enviados.
	$nomcen=$_GET['nombre'];
	$locali=$_GET['local'];
	$provin=$_GET['prov'];
	$telefo=$_GET['tfno'];
	$fechav=$_GET['fech'];
	$numvis=$_GET['numv'];
	
	// Creamos la conexión al servidor.
	$conexion = new mysqli($servidor, $usuario, $password, $basedatos);
	mysqli_set_charset($conexion,"utf8"); //necesario para que codifique bien los datos de la BBDD y funcione correctamente json_encode más adelante.
	
	if ($conexion->connect_errno) {
		echo "Fallo al conectar con la BBDD: (" . $conexion->connect_errno . ") " . $conexion->connect_error;
	}
		
	// Añadimos los datos pasados por el formulario.

	$sql="insert into `centros` (`nombrecentro`, `localidad`, `provincia`, `telefono`, `fechavisita`, `numvisitantes`) VALUES
( '$nomcen', '$locali', '$provin', '$telefo', '$fechav', '$numvis')";

	$datos=array();
	if ($resultados= $conexion->query($sql)){
		// Consulta SQL para obtener los datos de los centros.
		$sql="select * from centros ";
		$resultados = $conexion->query($sql);

		foreach($resultados as $res){
			array_push($datos,$res);
		}
	}else{
		$datos["error"]="Error al realizar la inserción.";
	}
	

	//print_r($datos);
	echo json_encode($datos); // función de PHP que convierte a formato JSON el array.
?>
