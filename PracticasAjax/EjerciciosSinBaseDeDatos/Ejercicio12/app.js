document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("boton").addEventListener("click", function() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "usuario_json.php", true);

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                let usuario = JSON.parse(xhr.responseText);
                document.getElementById("mensaje").innerText =
                    `Nombre: ${usuario.nombre}, Edad: ${usuario.edad}, Email: ${usuario.email}`;
            }
        };

        xhr.send();
    });
});
