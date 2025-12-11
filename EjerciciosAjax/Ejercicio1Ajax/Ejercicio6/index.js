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
    
	cargarAsync("datosjson.php");
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
		// Limpiamos el contenido a mostrar.
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
		var asignatura=JSON.parse(this.responseText);
 
        /*Recogemos los checkbox del formulario*/
        var mostrar = document.getElementById("form");
        
        /*array donde se van a ir guardando los nombre de los datos marcados*/
        var marcados=new Array;
        

            /*En la variable salida  compondremos el codigo HTML de la tabla a imprimir*/
            var salida="<table border='1'><tr>";


            /*comprobamos si los checkbox estan marcados, si lo estan, concatenamos su valor a salida
            asi creamos la primera fila con los nombres de los campos que queremos ver
            Tambien se añade el valor de los datos al array marcados, (para esto en value del formulario pondremos el mismo nombre que los campos que queremos mostrar y tambien que tienen los datos en el fichero datosxml.php)*/
            for(var i=0; i<mostrar.length; i++){
                if(mostrar[i].checked){
                    marcados.push(mostrar[i].value);
                    salida+="<td>"+mostrar[i].value+"</td>";
                }
            }
            
        /*comprobamos que en el array marcados haya algun dato
         - No hay datos se carga en salida un mensaje indicando que se marque algun dato
         - Hay datos, se continua el procresos para obtener los datos
         */
        if(marcados.length==0){
            salida = "Marcar algun dato para mostrar";
        }else{
        
                /*recorremos el array asignaturas, solo la primera dimension, asi estamos recorriendo el bucle tantas veces como asignaturas haya
                Si entramos en los if quiere decir que estan marcadas las opciones, asi que se consulta el dato que corresponda y se concatena a salida
                */
                for (i=0;i<asignatura.length;i++){

                    salida+="<tr>";

                    /*se commarcados que dentro del array marcados existe la palabra nombre, curso, horas y profesor, eso quere decir que esta marcado para mostrar, si lo esta concatenamos los datos en salida para luego mostrarlos*/
                    if(marcados.indexOf("NOMBRE")!=-1){
                        salida+="<td>"+asignatura[i]['NOMBRE']+"</td>";
                    }
                    if(marcados.indexOf("CURSO")!=-1){
                        salida+="<td>"+asignatura[i]['CURSO']+"</td>";
                    }
                    if(marcados.indexOf("HORAS")!=-1){
                        salida+="<td>"+asignatura[i]['HORAS']+"</td>";
                    }
                    if(marcados.indexOf("PROFESOR")!=-1){
                        salida+="<td>"+asignatura[i]['PROFESOR']+"</td>";
                    }
                }
            /*cierre de tr*/
            salida+="</tr>";
            // cierre de la tabla.
            salida+="</table>";
        }
		// Desactivamos el indicador AJAX cuando termina la petición
		document.getElementById("indicador").innerHTML="";
		
		// Imprimimos la tabla dentro del contenedor resultados.
		document.getElementById("resultados").innerHTML=salida;
	}
}
