document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("boton").addEventListener("click", function() {
        // Crear el objeto XMLHttpRequest
        let xhr = new XMLHttpRequest();

        // Configurar la solicitud
        xhr.open("GET", "listar_libros.php", true);

        // Definir la función de respuesta
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                // Procesar la respuesta
                let lista = document.getElementById("lista");
                // Limpiar la lista antes de agregar nuevos elementos
                lista.innerHTML = "";
                // Parsear la respuesta JSON
                let libros = JSON.parse(xhr.responseText);

                // Manejar posibles errores en la respuesta
                if(libros.error) {
                    lista.innerHTML = "<li>Error: " + libros.error + "</li>";
                    return;
                }

                // Recorrer los libros y agregarlos a la lista
                libros.forEach(libro => {
                    let li = document.createElement("li");
                    li.innerText = `${libro.titulo} - ${libro.autor} (${libro.ano}) - ${libro.editorial} - $${libro.precio}`;
                    lista.appendChild(li);
                });
            }
        };

        xhr.send();
    });
});
