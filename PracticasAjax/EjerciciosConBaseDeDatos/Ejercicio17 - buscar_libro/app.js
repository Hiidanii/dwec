document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("boton").addEventListener("click", function() {
        let id = document.getElementById("idLibro").value;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "buscar_libro.php?id=" + encodeURIComponent(id), true);

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                let mensaje = document.getElementById("mensaje");
                let libro = JSON.parse(xhr.responseText);

                if(libro.error) {
                    mensaje.innerText = libro.error;
                } else {
                    mensaje.innerText = `${libro.titulo} - ${libro.autor} (${libro.ano}) - ${libro.editorial} - $${libro.precio}`;
                }
            }
        };

        xhr.send();
    });
});
