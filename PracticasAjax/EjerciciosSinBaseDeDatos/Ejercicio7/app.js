document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("boton").addEventListener("click", function() {
        let num1 = document.getElementById("num1").value;
        let num2 = document.getElementById("num2").value;
        
        // Crear el objeto XMLHttpRequest
        let xhr = new XMLHttpRequest();
        
        // Configurar la solicitud GET con los parámetros
        xhr.open("GET", "suma.php?a=" + encodeURIComponent(num1) + "&b=" + encodeURIComponent(num2), true);

        // Definir la función de respuesta
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    document.getElementById("mensaje").innerText = "Resultado: " + xhr.responseText;
                } else {
                    document.getElementById("mensaje").innerText = "Error en la solicitud.";
                }
            }
        };

        // Enviar la solicitud
        xhr.send();
    });
});
