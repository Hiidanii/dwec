<?php
	// Cabecera para indicar que vamos a enviar datos JSON y que no haga caché de los datos.
	header('Content-type: application/json; charset=utf-8');
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	
/* 	Utilizar el fichero dbcreacion.sql incluído en la carpeta para crear la base de datos, usuario y tabla en tu servidor MySQL.
	Si fuera necesario modifica los datos de la configuración y adáptalos a tu entorno de trabajo. */
	
	// Configuración BASE DE DATOS MYSQL
	$servidor = "127.0.0.1";
	$basedatos = "ajax";
	$usuario = "ajax";	
	$password = "dbpass";
    $charset = 'utf8mb4';
    $dsn = "mysql:host=$servidor;dbname=$basedatos;charset=$charset";	

	$datos=null; //variable donde guardaremos los datos a enviar al cliente

	// Recogemos los datos enviados.
	$columna=$_POST['campo'];
	$valor=$_POST['dato'];

    try {
		$conexion = new PDO($dsn, $usuario, $password);
	    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //para habilitar las excepciones en PDO
        $sql="select * from libros where ".$columna." like '".$valor."'";
        $datos = $conexion->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    } catch(PDOException $ex) {
		echo 'Error conectando con la BBDD. '.$ex->getMessage(); 
		exit;
	}

	if ($datos == null){
		$datos["Error"]="No hay coincidencias";
	}

	echo json_encode($datos); // función de PHP que convierte a formato JSON el array.
?>
