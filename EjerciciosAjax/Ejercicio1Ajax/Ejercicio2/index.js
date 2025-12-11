////////////////////////////////////////////////////////////////////
// Cuando el documento esté cargado llamamos a la función iniciar().
////////////////////////////////////////////////////////////////////
window.addEventListener("load", inicio, false);

function inicio(){
	/*creamos evento en el boton*/
	document.getElementById("enviar").addEventListener("click",iniciar,false);

}

/////////////////////////////////////////////////////////


function iniciar()
{

	// Creamos un objeto XHR.
	miXHR = new XMLHttpRequest;
	
	// Cargamos los datos XML de forma asíncrona.
	// En este caso ponemos una página PHP que nos devuelve datos en formato XML
	// pero podríamos poner también el nombre de un fichero XML directamente: catalogos.xml
	// Se adjunta ejemplo de fichero XML.

	/*recogemos los valores de los elementos del formulario por su id*/
	var campo = document.getElementById("campo").value;
	var valor = document.getElementById("valor").value;

	/*cremaos un string con los datos que vamos a mandar como url*/
	var pagina = "datosjson.php?campo="+campo+"&valor="+valor;

	/*llamamos a la funcion cargarAsync pasando el string que hemos preparado como url*/
	cargarAsync(pagina);
	//cargarAsync("datosjson.php");
}

/////////////////////////////////////////////////////////
// Función cargarAsync: carga el contenido de la url
// usando una petición AJAX de forma ASINCRONA.
/////////////////////////////////////////////////////////
function cargarAsync(url) 
{ 
	if (miXHR) {	
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
function estadoPeticion()
{
	if (this.readyState==4 && this.status == 200) {
		// Los datos JSON los recibiremos como texto en la propiedad this.responseText
		var resultados = JSON.parse(this.responseText);
		//var resultados = eval( '(' +this.responseText+')');

		if ( resultados.length == 0)
			texto = "No se han obtenido datos.";
	 	else {
			texto = "<table border=1><tr><th>Nombre Centro</th><th>Localidad</th><th>Provincia</th><th>Telefono</th><th>Fecha Visita</th><th>Numero Visitantes</th></tr>";
			// Hacemos un bucle para recorrer todos los objetos literales recibidos en el array resultados y mostrar su contenido.
			for (var i=0; i < resultados.length; i++) {
				objeto = resultados[i];
				texto+="<tr><td>"+objeto.nombrecentro+"</td><td>"+objeto.localidad+"</td><td>"+objeto.provincia+"</td><td>"+objeto.telefono+"</td><td>"+objeto.fechavisita+"</td><td>"+objeto.numvisitantes+"</td></tr>";
			}
		}	
	
		// Desactivamos el indicador AJAX cuando termina la petición
		document.getElementById("indicador").innerHTML="";
		
		// Imprimimos la tabla dentro del contenedor resultados.
		document.getElementById("resultados").innerHTML=texto;
	}
}
