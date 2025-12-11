document.addEventListener('DOMContentLoaded', function() {
    const lista = document.getElementById("lista");
    const btnGuardar = document.getElementById("btnGuardar");

    // Función para listar libros
    function listarLibros() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "listar_libros.php", true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                lista.innerHTML = "";
                let libros = JSON.parse(xhr.responseText);

                libros.forEach(libro => {
                    let li = document.createElement("li");
                    li.innerHTML = `
                        <div class="book-info">
                            <div class="book-meta">
                                <span class="book-title">${escaparComillas(libro.titulo)}</span>
                                <span class="book-sub">${escaparComillas(libro.autor)} — ${escaparComillas(libro.editorial)} • ${libro.ano}</span>
                            </div>
                        </div>
                        <div class="book-actions">
                            <button class="edit" onclick="editar(${libro.id}, '${escaparComillas(libro.titulo)}', '${escaparComillas(libro.autor)}', '${escaparComillas(libro.editorial)}', ${libro.ano}, ${parseFloat(libro.precio)})" aria-label="Editar ${escaparComillas(libro.titulo)}">Editar</button>
                            <button class="del" onclick="eliminar(${libro.id})" aria-label="Eliminar ${escaparComillas(libro.titulo)}">Eliminar</button>
                        </div>
                    `;
                    lista.appendChild(li);
                });
            }
        };
        xhr.send();
    }

    // Función para escapar comillas en los strings
    function escaparComillas(texto) {
        return texto.replace(/'/g, "\\'").replace(/"/g, '\\"');
    }

    // Insertar o actualizar libro
    btnGuardar.addEventListener("click", function() {
        const id = document.getElementById("id").value;
        const titulo = document.getElementById("titulo").value;
        const autor = document.getElementById("autor").value;
        const editorial = document.getElementById("editorial").value;
        const ano = document.getElementById("ano").value;
        const precio = document.getElementById("precio").value;

        const xhr = new XMLHttpRequest();
        let url = id ? "actualizar_libro.php" : "insertar_libro.php";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                alert(xhr.responseText);
                document.getElementById("id").value = "";
                document.getElementById("titulo").value = "";
                document.getElementById("autor").value = "";
                document.getElementById("editorial").value = "";
                document.getElementById("ano").value = "";
                document.getElementById("precio").value = "";
                listarLibros();
            }
        };

        xhr.send(`id=${encodeURIComponent(id)}&titulo=${encodeURIComponent(titulo)}&autor=${encodeURIComponent(autor)}&editorial=${encodeURIComponent(editorial)}&ano=${encodeURIComponent(ano)}&precio=${encodeURIComponent(precio)}`);
    });

    // Función para eliminar
    window.eliminar = function(id) {
        if(confirm("¿Desea eliminar este libro?")) {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "eliminar_libro.php", true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && xhr.status === 200) {
                    alert(xhr.responseText);
                    listarLibros();
                }
            };
            xhr.send("id=" + encodeURIComponent(id));
        }
    }

    // Función para editar (rellena el formulario)
    window.editar = function(id, titulo, autor, editorial, ano, precio) {
        document.getElementById("id").value = id;
        document.getElementById("titulo").value = titulo;
        document.getElementById("autor").value = autor;
        document.getElementById("editorial").value = editorial;
        document.getElementById("ano").value = ano;
        document.getElementById("precio").value = precio;
    }

    // Listar al cargar
    listarLibros();
});
