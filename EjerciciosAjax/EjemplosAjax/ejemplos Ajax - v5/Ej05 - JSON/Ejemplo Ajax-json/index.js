window.addEventListener("load",function(){

    document.getElementById('btnCarga').addEventListener("click", function() {
        miXHR = new XMLHttpRequest;

        //Si existe el objeto  miXHR
        miXHR.open('GET', 'ciclos.json', true); //Abrimos la url, true=ASINCRONA 
            
        // En cada cambio de estado(readyState) se llamará a la función estadoPeticion
        miXHR.onreadystatechange = estadoPeticion;
        
        // Hacemos la petición al servidor. Como parámetro: null ya que los datos van por GET
        miXHR.send(null);


    });
});


/////////////////////////////////////////////////////////
// Función estadoPeticion: será llamada a cada cambio de estado de la petición AJAX
// cuando la respuesta del servidor es 200(fichero encontrado) y el estado de
// la solicitud es 4, accedemos a la propiedad responseText
/////////////////////////////////////////////////////////
function estadoPeticion()
{
	if (this.readyState == 4 && this.status == 200)
	{
		// Los datos JSON los recibiremos como texto en la propiedad this.responseText
		// Con la función JSON.parse evaluaremos ese resultado para convertir a objetos y variables el string que estamos recibiendo en JSON.
		// Asignamos a la variable resultados la evaluación de responseText
		// Al hacer parse nos devuelve un objeto.
		var resultados = JSON.parse(this.responseText);
		
		texto = "<ul>";
		
        // Hacemos un bucle para recorrer los datos del objeto literal recibido y mostrar su contenido.
        // Cuidado con este bucle que no tenemos un array, sino solo un objeto.
		for (var i in resultados){
			texto+="<li>"+ i + " - "+ resultados[i] + "</li>";
		}
	
		// Imprimimos el resultado en el contenedor resultados.
		document.getElementById("ciclos").innerHTML=texto;
	}
}