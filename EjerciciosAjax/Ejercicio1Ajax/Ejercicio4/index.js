////////////////////////////////////////////////////////////////////
// Cuando el documento esté cargado llamamos a la función inicio().
////////////////////////////////////////////////////////////////////
window.addEventListener("load", iniciar, false);


function iniciar()
{
	// Creamos un objeto XHR.
	miXHR = new XMLHttpRequest;
	
	// Cargamos los datos XML de forma asíncrona.
	// En este caso ponemos una página PHP que nos devuelve datos en formato XML
	// pero podríamos poner también el nombre de un fichero XML directamente: catalogos.xml
	// Se adjunta ejemplo de fichero XML.
	cargarAsync("datosxml4.php");
}

/////////////////////////////////////////////////////////
// Función cargarAsync: carga el contenido de la url
// usando una petición AJAX de forma ASINCRONA.
/////////////////////////////////////////////////////////
function cargarAsync(url) 
{ 
	if (miXHR) 
	{	
		// Activamos el indicador Ajax antes de realizar la petición.
		document.getElementById("indicador").innerHTML="<img src='ajax-loader.gif'/>";
		
		//Si existe el objeto  miXHR
		miXHR.open('GET', url, true); //Abrimos la url, true=ASINCRONA 
		
		// En cada cambio de estado(readyState) se llamará a la función estadoPeticion
		miXHR.onreadystatechange = estadoPeticion;
	
		// Hacemos la petición al servidor. Como parámetro: null ya que los datos van por GET
		miXHR.send(null);
	}
}

/////////////////////////////////////////////////////////
// Función estadoPeticion: será llamada a cada cambio de estado de la petición AJAX
// cuando la respuesta del servidor es 200(fichero encontrado) y el estado de
// la solicitud es 4, accedemos a la propiedad responseText
/////////////////////////////////////////////////////////
function estadoPeticion() {
	if (this.readyState==4 && this.status == 200) {
		// Almacenamos el fichero XML en la variable datos.
		var datos=this.responseXML;
		
		// Tenemos que recorrer el fichero XML empleando los métodos del DOM
		// Array que contiene todas las ASIGNATURAS del fichero XML
		asignatura= datos.documentElement.getElementsByTagName("ASIGNATURA");
		
		// En la variable salida compondremos el código HTML de la tabla a imprimir.
		salida="<table border='1'><tr><th>Nombre</th><th>Curso</th><th>Número Horas</th><th>Profesor</th></tr>";
		
		// Hacemos un bucle para recorrer todos los elementos ASIGNATURA.
		for (i=0;i<asignatura.length;i++) {
			
			salida+="<tr>";
			
			// Para cada ASIGNATURA leemos el nombre
			titulos=asignatura[i].getElementsByTagName("NOMBRE");
			
			try	// Intentamos imprimir el contenido de ese elemento
			{
				salida+="<td>" + titulos[0].firstChild.nodeValue + "</td>";
			}
			catch (er)	// En el caso de que no tenga contenido ese elemento, imprimimos un espacio en blanco
			{
				salida+= "<td>&nbsp;</td>";
			}
				
			// Para cada ASIGNATURA leemos el cruso
			titulos=asignatura[i].getElementsByTagName("CURSO");
			try	// Intentamos imprimir el contenido de ese elemento
			{
				salida+="<td>" + titulos[0].firstChild.nodeValue + "</td>";
			}
			catch (er)	// En el caso de que no tenga contenido ese elemento, imprimimos un espacio en blanco
			{
				salida+="<td>&nbsp;</td>";
			}
				
			// Para cada ASIGNATURA leemos las horas
			titulos=asignatura[i].getElementsByTagName("HORAS");
			try	// Intentamos imprimir el contenido de ese elemento
			{
				salida+="<td align='center'>" + titulos[0].firstChild.nodeValue + "</td>";
			}
			catch (er)	// En el caso de que no tenga contenido ese elemento, imprimimos un espacio en blanco
			{
				salida+="<td>&nbsp;</td>";
			}

				// Para cada ASIGNATURA leemos el profesor
			titulos=asignatura[i].getElementsByTagName("PROFESOR");
			try	// Intentamos imprimir el contenido de ese elemento
			{
				salida+="<td>" + titulos[0].firstChild.nodeValue + "</td>";
			}
			catch (er)	// En el caso de que no tenga contenido ese elemento, imprimimos un espacio en blanco
			{
				salida+="<td>&nbsp;</td>";
			}
			
			// Cerramos la fila.			
			salida+="</tr>";
		}
		
		// Cuando ya no hay más ASIGNATURA cerramos la tabla.
		salida+="</table>";
		
		// Desactivamos el indicador AJAX cuando termina la petición
		document.getElementById("indicador").innerHTML="";
		
		// Imprimimos la tabla dentro del contenedor resultados.
		document.getElementById("resultados").innerHTML=salida;
	}
}