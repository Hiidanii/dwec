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
	$columna=$_GET['campo'];
	$dato=$_GET['valor'];
	
	// Creamos la conexión al servidor.
	$conexion=new PDO("mysql:host=$servidor;dbname=$basedatos;charset=utf8mb4", $usuario, $password);

	// Consulta SQL para obtener los datos de los centros.
	$conexion->query("SET NAMES 'utf8'");
	$sql="select * from centros where ".$columna." like '".$dato."'";
	$resultados = $conexion->query($sql);

	$datos=array();
	foreach($resultados as $res){
		array_push($datos,$res);
	}

	sleep (2);  //pausa para ver la imagen de carga
	echo json_encode($datos); // función de PHP que convierte a formato JSON el array.
	
?>
