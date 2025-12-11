<?php
	// Para que el navegador no haga cache de los datos devueltos por la página PHP.
	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	
	// Leemos el contenido del fichero XML
	// e imprimimos su contenido.
	// Muy importante indicar al navegador que va a recibir contenido XML
	// eso lo hacemos con la siguiente cabecera:
	header("Content-Type: text/xml"); 
	
	$ficheroxml="<?xml version=\"1.0\" encoding=\"utf-8\"?>";
	$ficheroxml.="
	<CURSO>
	<ASIGNATURA>
		<NOMBRE>Desarrollo Web Cliente</NOMBRE>
		<CURSO>2º DAW</CURSO>
		<HORAS>6</HORAS>
		<PROFESOR>Adolfo</PROFESOR>
	</ASIGNATURA>
	<ASIGNATURA>
		<NOMBRE>Diseño Interfaces Web</NOMBRE>
		<CURSO>2º DAW</CURSO>
		<HORAS>6</HORAS>
		<PROFESOR>Adolfo</PROFESOR>
	</ASIGNATURA>
	<ASIGNATURA>
		<NOMBRE>Desarrollo Web Servidor</NOMBRE>
		<CURSO>2º DAW</CURSO>
		<HORAS>8</HORAS>
		<PROFESOR>Enrique</PROFESOR>
	</ASIGNATURA>
	<ASIGNATURA>
		<NOMBRE>Despliegue Aplicaciones Web</NOMBRE>
		<CURSO>2º DAW</CURSO>
		<HORAS>3</HORAS>
		<PROFESOR>Pedro</PROFESOR>
	</ASIGNATURA>
	<ASIGNATURA>
		<NOMBRE>Libre Configuración</NOMBRE>
		<CURSO>2º DAW</CURSO>
		<HORAS>3</HORAS>
		<PROFESOR>Pedro</PROFESOR>
	</ASIGNATURA>
	<ASIGNATURA>
		<NOMBRE>Empresas</NOMBRE>
		<CURSO>2º DAW</CURSO>
		<HORAS>4</HORAS>
		<PROFESOR>Justa</PROFESOR>
	</ASIGNATURA> 
</CURSO>";
echo $ficheroxml;
?>
