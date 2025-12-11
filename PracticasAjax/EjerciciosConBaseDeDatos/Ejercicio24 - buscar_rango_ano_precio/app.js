document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("boton").addEventListener("click", function() {
        let ano_min = document.getElementById("ano_min").value;
        let ano_max = document.getElementById("ano_max").value;
        let precio_min = document.getElementById("precio_min").value;
        let precio_max = document.getElementById("precio_max").value;

        let xhr = new XMLHttpRequest();
        xhr.open(
            "GET",
            `buscar_rango_ano_precio.php?ano_min=${encodeURIComponent(ano_min)}&ano_max=${encodeURIComponent(ano_max)}&precio_min=${encodeURIComponent(precio_min)}&precio_max=${encodeURIComponent(precio_max)}`,
            true
        );

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                let lista = document.getElementById("lista");
                lista.innerHTML = "";
                let libros = JSON.parse(xhr.responseText);

                if(libros.error) {
                    lista.innerHTML = "<li>" + libros.error + "</li>";
                    return;
                }

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
