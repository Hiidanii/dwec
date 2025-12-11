document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("peticion").addEventListener("click", function() {
        // Crear el objeto XMLHttpRequest
        let xhr = new XMLHttpRequest();

        // Configurar la solicitud GET
        xhr.open("GET", "mensaje.php", true);

        // Evento que se ejecuta cuando la solicitud cambia de estado
        xhr.onreadystatechange = function() {
            // Verificar si la solicitud se completó y fue exitosa
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Actualizar el contenido del div con la respuesta del servidor
                document.getElementById("mensaje").innerHTML = xhr.responseText;
            }
        };

        // Enviar la solicitud
        xhr.send();
    });
});