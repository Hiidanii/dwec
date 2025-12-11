<?php
	//Versión 20200111 probada con php7.2
	// Cabecera para indicar que vamos a enviar datos JSON y que no haga caché de los datos.
	header("Content-Type: application/json; charset=UTF-8");
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	
/* 	Utilizar el fichero dbcreacion_ajax.sql incluído en la carpeta para crear la base de datos, usuario y tabla en tu servidor MySQL.
	Si fuera necesario modifica los datos de la configuración y adáptalos a tu entorno de trabajo. */
	
	// Configuración BASE DE DATOS MYSQL
	//$servidor = "db";  //si se usa contenedores con docker-compose, se debe poner el nombre del servicio de BBDD config en compose
	$servidor = "localhost";
	$basedatos = "ajax";
	$usuario = "ajax";	
	$password = "dbpass";

	// Creamos la conexión al servidor.
	$conexion = new mysqli($servidor, $usuario, $password, $basedatos);
	mysqli_set_charset($conexion,"utf8"); //necesario para que codifique bien los datos de la BBDD y funcione correctamente json_encode más adelante.

	if ($conexion->connect_errno) {
		echo "Fallo al conectar a MySQL: (" . $conexion->connect_errno . ") " . $conexion->connect_error;
	}
	
	// Consulta SQL para obtener los datos de los centros.
	$sql="select * from centros order by nombrecentro";
	if ($resultado = $conexion->query($sql)) {
		$datos = array();

		while ( $fila = $resultado->fetch_assoc() )	{
			// Almacenamos en un array  cada una de las filas que vamos leyendo del recordset.
			$datos[]=$fila;
		}
	}
	/* liberar el conjunto de resultados */
	$resultado->free();

	// Como resultado se puede enviar algo similar a:
	/*
	[ {"id":"3","nombrecentro":"IES San Clemente","localidad":"Santiago de Compostela","provincia":"A Coruña" ,"telefono":"981580496","fechavisita":"2010-11-26", "numvisitantes":"60"} , {"id":"10","nombrecentro":"IES As Fontiñas","localidad" : ..... } ]
	
	// Empleando la siguiente instrucción:
	echo json_encode($datos);
	
	*/

	echo json_encode($datos); // función de PHP que convierte a formato JSON el array.
	
	/* cerrar la conexión */
	$conexion->close();
?>