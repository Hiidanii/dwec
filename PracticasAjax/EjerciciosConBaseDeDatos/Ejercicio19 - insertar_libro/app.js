document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("boton").addEventListener("click", function() {
        // Recopilar datos del formulario
        let titulo = document.getElementById("titulo").value;
        let autor = document.getElementById("autor").value;
        let editorial = document.getElementById("editorial").value;
        let ano = document.getElementById("ano").value;
        let precio = document.getElementById("precio").value;

        // Crear y configurar la solicitud AJAX
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "insertar_libro.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // Manejar la respuesta del servidor
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById("mensaje").innerText = xhr.responseText;
            }
        };

        // Enviar los datos del formulario
        xhr.send(
            "titulo=" + encodeURIComponent(titulo) +
            "&autor=" + encodeURIComponent(autor) +
            "&editorial=" + encodeURIComponent(editorial) +
            "&ano=" + encodeURIComponent(ano) +
            "&precio=" + encodeURIComponent(precio)
        );
    });
});
