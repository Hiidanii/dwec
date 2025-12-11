<?php
	// Para que el navegador no haga cache de los datos devueltos por la página PHP.
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

	header("Content-Type: application/json; charset=UTF-8");
	
	
/*crear array asociativo, codificarlo y mandarlo*/
    $datos =array(
    	array('NOMBRE' => 'Desarrollo Web Cliente','CURSO' => '2º DAW','HORAS' => '6', 'PROFESOR' => 'Prof 1'),
    	array('NOMBRE' => 'Diseño Interfaces Web','CURSO' => '2º DAW','HORAS' => '6', 'PROFESOR' => 'Prof 2'),
    	array('NOMBRE' => 'Desarrollo Web Servidor','CURSO' => '2º DAW','HORAS' => '8', 'PROFESOR' => 'Prof 3'),
    	array('NOMBRE' => 'Despliegue Aplicaciones Web','CURSO' => '2º DAW','HORAS' => '3', 'PROFESOR' => 'Prof 4'),
    	array('NOMBRE' => 'Libre Configuración','CURSO' => '2º DAW','HORAS' => '3', 'PROFESOR' => 'Prof 5'),
    	array('NOMBRE' => 'Empresas','CURSO' => '2º DAW','HORAS' => '4', 'PROFESOR' => 'Prof 6')
    	);

	sleep (2);  //pausa para ver la imagen de carga
	echo json_encode($datos);
	
?>
