document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("boton").addEventListener("click", function() {
        let celsius = document.getElementById("celsius").value;

        // Crear el objeto XMLHttpRequest
        let xhr = new XMLHttpRequest();

        // Configurar la solicitud
        xhr.open("POST", "convertir_temp.php", true);

        // Configurar la cabecera para enviar datos de formulario
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // Definir la función de respuesta
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById("mensaje").innerText = celsius + "°C = " + xhr.responseText + "°F";
            }
        };

        xhr.send("c=" + encodeURIComponent(celsius));
    });
});
