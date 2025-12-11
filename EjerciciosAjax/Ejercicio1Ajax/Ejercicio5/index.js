////////////////////////////////////////////////////////////////////
// Cuando el documento esté cargado llamamos a la función inicio().
////////////////////////////////////////////////////////////////////
window.addEventListener("load", inicio, false);

function inicio(){
	/*creamos evento en el boton*/
	document.getElementById("enviar").addEventListener("click",iniciar,false);
}


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
		// Limpiamos el contenido a mostrar por si se pulsa el botón enviar por segunda vez.
		document.getElementById("resultados").innerHTML="";
		
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
	if (this.readyState==4 && this.status == 200)
	{
		// Almacenamos el fichero XML en la variable datos.
		var datos=this.responseXML;
		
		// Tenemos que recorrer el fichero XML empleando los métodos del DOM
		// Array que contiene todos las ASIGNATURA del fichero XML
		asignatura= datos.documentElement.getElementsByTagName("ASIGNATURA");
		
		// En la variable salida compondremos el código HTML de la tabla a imprimir.
		//salida="<table border='1'><tr><th>Nombre</th><th>Curso</th><th>Numero Horas</th><th>Profesor</th></tr>";
		
        
        /*Recogemos los checkbox del formulario*/
        var mostrar = document.getElementById("form");
        var prueba=new Array;
        
        
        /*En la variable salida  compondremos el codigo HTML de la tabla a imprimir*/
        var salida="<table border='1'><tr>";
        
        
        /*comprobamos si los checkbox estan marcados, si lo estan, concatenamos su valor a salida2
        asi creamos la primera fila con los nombres de los campos que queremos ver*/
        for(var i=0; i<mostrar.length; i++){
            var a = document.getElementById(mostrar[i]);
           
            if(mostrar[i].checked){
                prueba.push(mostrar[i].value);
                salida+="<td>"+mostrar[i].value+"</td>";
            }
        }
        salida+="</tr>";
            
                // Hacemos un bucle para recorrer todos los elementos ASIGNATURA.
                for (i=0;i<asignatura.length;i++)
                {
                    salida+="<tr>";
                    
                    if(prueba.indexOf("NOMBRE") != -1){
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
                    }

                    if(prueba.indexOf("CURSO") != -1){
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
                    }
                
                    
                   if(prueba.indexOf("HORAS") != -1){
                        // Para cada ASIGNATURA leemos las horas
                        titulos=asignatura[i].getElementsByTagName("HORAS");
                        try	// Intentamos imprimir el contenido de ese elemento
                            {
                            salida+="<td>" + titulos[0].firstChild.nodeValue + "</td>";
                            }
                        catch (er)	// En el caso de que no tenga contenido ese elemento, imprimimos un espacio en blanco
                            {
                            salida+="<td>&nbsp;</td>";
                            }
                   }
                    
                  if(prueba.indexOf("PROFESOR") != -1){
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
                  }
                    
                  salida+="</tr>";
                }
             
        if(prueba.length==0){
            salida="Debes marcar alguna opción para ver los datos";
        }
        
        
		// Cuando ya no hay más ASIGNATURA cerramos la tabla.
		salida+="</table>";
		
		// Desactivamos el indicador AJAX cuando termina la petición
		document.getElementById("indicador").innerHTML="";
		
		// Imprimimos la tabla dentro del contenedor resultados.
		document.getElementById("resultados").innerHTML=salida;
	}
}
