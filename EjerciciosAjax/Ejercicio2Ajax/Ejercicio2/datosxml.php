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
<CATALOG>
	<PELICULA>
		<TITULO>El Padrino</TITULO>
		<DIRECTOR>Francis Ford Coppola</DIRECTOR>
		<NACIONALIDAD>USA</NACIONALIDAD>
		<PRODUCTORA>Paramount Pictures</PRODUCTORA>
		<FECHA>1972</FECHA>
	</PELICULA>
	<PELICULA>
		<TITULO>El Padrino II</TITULO>
		<DIRECTOR>Francis Ford Coppola</DIRECTOR>
		<NACIONALIDAD>USA</NACIONALIDAD>
		<PRODUCTORA>Paramount Pictures</PRODUCTORA>
		<FECHA>1974</FECHA>
	</PELICULA>
	<PELICULA>
		<TITULO>Bladde Runner</TITULO>
		<DIRECTOR>Ridley Scott</DIRECTOR>
		<NACIONALIDAD>USA</NACIONALIDAD>
		<PRODUCTORA>Warner Bros.</PRODUCTORA>
		<FECHA>1982</FECHA>
	</PELICULA>
	<PELICULA>
		<TITULO>El Golpe</TITULO>
		<DIRECTOR>George Roy Hill</DIRECTOR>
		<NACIONALIDAD>USA</NACIONALIDAD>
		<PRODUCTORA>Universal Pictures</PRODUCTORA>
		<FECHA>1973</FECHA>
	</PELICULA>
	<PELICULA>
		<TITULO>Los 400 Golpes</TITULO>
		<DIRECTOR>François Truffaut</DIRECTOR>
		<NACIONALIDAD>Francia</NACIONALIDAD>
		<PRODUCTORA>Les Films du Carrosse</PRODUCTORA>
		<FECHA>1959</FECHA>
	</PELICULA>
	<PELICULA>
		<TITULO>La Dolce Vita</TITULO>
		<DIRECTOR>Federico Fellini</DIRECTOR>
		<NACIONALIDAD>Italia</NACIONALIDAD>
		<PRODUCTORA>Riama Film</PRODUCTORA>
		<FECHA>1960</FECHA>
	</PELICULA>
	<PELICULA>
		<TITULO>La vida es Bella</TITULO>
		<DIRECTOR>Roberto Benigni</DIRECTOR>
		<NACIONALIDAD>Italia</NACIONALIDAD>
		<PRODUCTORA>Miramax</PRODUCTORA>
		<FECHA>1997</FECHA>
	</PELICULA>
	<PELICULA>
		<TITULO>El Bosque Animado</TITULO>
		<DIRECTOR>José Luis Cuerda</DIRECTOR>
		<NACIONALIDAD>España</NACIONALIDAD>
		<PRODUCTORA>Classics Films Producción</PRODUCTORA>
		<FECHA>1987</FECHA>
	</PELICULA>
	<PELICULA>
		<TITULO>Los Otros</TITULO>
		<DIRECTOR>Alejandro Amenábar</DIRECTOR>
		<NACIONALIDAD>España</NACIONALIDAD>
		<PRODUCTORA>Sogecine</PRODUCTORA>
		<FECHA>2001</FECHA>
	</PELICULA>
	<PELICULA>
		<TITULO>El Verdugo</TITULO>
		<DIRECTOR>José Luis García Berlanga</DIRECTOR>
		<NACIONALIDAD>España</NACIONALIDAD>
		<PRODUCTORA>Zebra Film</PRODUCTORA>
		<FECHA>1963</FECHA>
	</PELICULA>
</CATALOG>";
echo $ficheroxml;
?>