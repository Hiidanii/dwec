document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("boton").addEventListener("click", function() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "saludo_json.php", true);

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                document.getElementById("mensaje").innerText =
                    `Hora: ${data.hora}, Saludo: ${data.saludo}`;
            }
        };

        xhr.send();
    });
});
