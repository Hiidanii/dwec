<?php
	// Cabecera para indicar que vamos a enviar datos JSON y que no haga caché de los datos.
	//header('Content-Type: application/json');
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	
/* 	Utilizar el fichero dbcreacion.sql incluído en la carpeta para crear la base de datos, usuario y tabla en tu servidor MySQL.
	Si fuera necesario modifica los datos de la configuración y adáptalos a tu entorno de trabajo. */
	
	// Configuración BASE DE DATOS MYSQL
	$servidor = "localhost";
	$basedatos = "ajax";
	$usuario = "ajax";	
	$password = "dbpass";
	$charset = 'utf8mb4';
    $dsn = "mysql:host=$servidor;dbname=$basedatos;charset=$charset";
	#$dsn = "mysql:host=$servidor;dbname=$basedatos";

	$msg=""; //variable donde guardar el mensaje a devolver al cliente

	// Recogemos los datos enviados.
	$tit=$_POST['titulo'];
	$aut=$_POST['autor'];
	$edit=$_POST['editorial'];
	$publi=$_POST['publicacion'];
	$prec=$_POST['precio'];
	
	$error=null;
	try {
        $conexion = new PDO($dsn, $usuario, $password);
	    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //para habilitar las excepciones en PDO
		$sql="INSERT into `libros` (`titulo`, `autor`, `editorial`, `ano_publi`, `precio`) 
			VALUES ( '$tit', '$aut', '$edit', '$publi', '$prec')";
        $sentencia = $conexion->prepare($sql);
        $resultados = $sentencia->execute();			
	} catch(PDOException $ex) {
		$error = $ex->getMessage(); 
		echo 'Error conectando con la BBDD. '.$ex->getMessage(); 
		exit;
	}

	if ($error == null)
		$msg="Datos insertados satisfactoriamente";

	echo $msg;
?>
