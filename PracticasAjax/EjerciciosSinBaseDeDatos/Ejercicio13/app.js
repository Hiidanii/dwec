document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("boton").addEventListener("click", function() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "colores_json.php", true);

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                let colores = JSON.parse(xhr.responseText);
                document.getElementById("mensaje").innerText = "Colores: " + colores.join(", ");
            }
        };

        xhr.send();
    });
});
