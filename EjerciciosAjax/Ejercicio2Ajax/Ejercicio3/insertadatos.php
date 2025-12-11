<?php
	// Cabecera para indicar que vamos a enviar datos JSON y que no haga caché de los datos.
	header('Content-Type: application/json');
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
	
	// Recogemos los datos enviados.
	$marc=$_POST['marca'];
	$mod=$_POST['modelo'];
	$tComb=$_POST['combustible'];
	$cilin=$_POST['cilindrada'];
	$nPuer=$_POST['numPuertas'];
	

	// Creamos la conexión al servidor.
	try {
		$conexion = new PDO($dsn, $usuario, $password);
	    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //para habilitar las excepciones en PDO
	} catch(PDOException $ex) {
		$error = $ex->getMessage();
		echo 'Error conectando a la BBDD. '.$ex->getMessage(); 

	}


	// Consulta SQL para insertar los datos de los coches.
	$error=null;
	try {
			$conexion = new PDO($dsn, $usuario, $password);
			$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //para habilitar las excepciones en PDO
			//$sql = "INSERT INTO vehiculos (`titulo`, `autor`, `editorial`, `ano_publi`, `precio`) VALUES(:titulo,:autor,:editorial,:ano_publi,:precio)";
			//$sql="INSERT INTO `libros` (`titulo`, `autor`, `editorial`, `ano_publi`, `precio`) 
			//	VALUES ( '$tit', '$aut', '$edit', '$publi', '$prec')";
			$sql="INSERT INTO `vehiculos` (`marca`, `modelo`, `combustible`, `cilindrada`, `numPuertas`) 
				VALUES ('$marc', '$mod', '$tComb', '$cilin', '$nPuer')";	
			$sentencia = $conexion->prepare($sql);
			$resultados = $sentencia->execute();			
	} catch(PDOException $ex) {
			$error = $ex->getMessage(); 
			echo 'Error insertando datos en la BBDD. '.$ex->getMessage(); 
			exit;
	}
	
	if ($error == null)
		$msg="Datos insertados satisfactoriamente";


	//	echo json_encode($datos); // función de PHP que convierte a formato JSON el array.
	echo $msg;


?>
