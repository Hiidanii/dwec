document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("boton").addEventListener("click", function() {
        let autor = document.getElementById("autor").value;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "buscar_autor.php?autor=" + encodeURIComponent(autor), true);

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
