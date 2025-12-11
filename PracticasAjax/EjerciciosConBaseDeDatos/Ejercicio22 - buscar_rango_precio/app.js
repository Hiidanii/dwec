document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("boton").addEventListener("click", function() {
        let min = document.getElementById("min").value;
        let max = document.getElementById("max").value;

        let xhr = new XMLHttpRequest();
        xhr.open("GET", "buscar_rango_precio.php?min=" + encodeURIComponent(min) + "&max=" + encodeURIComponent(max), true);

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
