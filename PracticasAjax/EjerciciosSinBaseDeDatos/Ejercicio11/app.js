document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("boton").addEventListener("click", function() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "numeros_json.php", true);

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                // Parsear JSON recibido
                let numeros = JSON.parse(xhr.responseText);
                document.getElementById("mensaje").innerText = "Números: " + numeros.join(", ");
            }
        };

        xhr.send();
    });
});