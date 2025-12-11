////////////////////////////////////////////////////////////////////
// Cuando el documento esté cargado llamamos a la función iniciar().
////////////////////////////////////////////////////////////////////
window.addEventListener("load",iniciar);
/////////////////////////////////////////////////////////

function iniciar()
{
	// Creamos un objeto XHR.
	miXHR = new XMLHttpRequest;
	
	// Cargamos el fichero fecha.php de forma asíncrona.
	cargarAsync("fecha.php");
}

/////////////////////////////////////////////////////////
// Función cargarAsync: carga el contenido de la url
// usando una petición AJAX de forma ASINCRONA.
/////////////////////////////////////////////////////////
function cargarAsync(url) 
{ 
	if (miXHR) 
	{	
		alert("Comenzamos la petición AJAX");

		//Si existe el objeto  miXHR
		miXHR.open('GET', url, true); //Abrimos la url, true=ASINCRONA 
		
		// En cada cambio de estado(readyState) se llamará a la función estadoPeticion
		miXHR.onreadystatechange = estadoPeticion;
	
		// Hacemos la petición al servidor. Como parámetro: null ya que los datos van por GET
		miXHR.send(null);
	}
}


function crearParrafo(cadena){
	let parrafo = document.createElement("p");
	let texto = document.createTextNode(cadena);
	parrafo.appendChild(texto);
	document.getElementById('estado').appendChild(parrafo);
}

/////////////////////////////////////////////////////////
// Función estadoPeticion: será llamada en cada cambio de estado de la petición.
// Cuando el estado de la petición(readyState) ==4 quiere decir que la petición ha terminado.
// Tendremos que comprobar cómo terminó(status): == 200 encontrado, == 404 no encontrado, etc.
// A partir de ese momento podremos acceder al resultado en responseText o responseXML
/////////////////////////////////////////////////////////

function textoDIV(nodo, texto)
{
	//var nodo = document.getElementById(idObjeto); 
	while (nodo.firstChild)
		nodo.removeChild(nodo.firstChild); // Eliminamos todos los hijos de ese objeto.
	// Cuando ya no tenga hijos, agregamos un hijo con el texto que recibe la funci�n.
	nodo.appendChild(document.createTextNode(texto)); 
}

function estadoPeticion()
{
	switch(this.readyState) // Evaluamos el estado de la petición AJAX
	{ 	// Vamos mostrando el valor actual de readyState en cada llamada.
		case 0:
			crearParrafo("0 - Sin iniciar.");
			break;
		case 1: 
			crearParrafo("1 - Conexión establecida.");
			break;
		case 2: 
			crearParrafo("2 - Cargando.");
			break;
		case 3: 
			crearParrafo("3 - Interactivo.");
			break;
		case 4: 
			crearParrafo("4 - Completado.");
			if (this.status == 200)	// Si el servidor ha devuelto un OK
			{
				// Escribimos la respuesta recibida de la petición AJAX en el objeto DIV
				textoDIV(document.getElementById("resultados"), this.responseText);
				alert("Terminó la petición AJAX");
			}
			break;
	} 
}