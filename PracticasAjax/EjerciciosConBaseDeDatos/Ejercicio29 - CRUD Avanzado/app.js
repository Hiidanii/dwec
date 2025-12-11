document.addEventListener('DOMContentLoaded', function() {
    const lista = document.getElementById("lista");
    const btnGuardar = document.getElementById("btnGuardar");
    const busqueda = document.getElementById("busqueda");
    const ano_min = document.getElementById("ano_min");
    const ano_max = document.getElementById("ano_max");
    const precio_min = document.getElementById("precio_min");
    const precio_max = document.getElementById("precio_max");
    const orden = document.getElementById("orden");
    const paginacion = document.getElementById("paginacion");

    let paginaActual = 1;

    function escapar(texto){return texto.replace(/'/g,"\\'").replace(/"/g,'\\"');}

    function listarLibros() {
        const pageSize = 10;
        let xhr = new XMLHttpRequest();
        let params = `pagina=${paginaActual}&busqueda=${encodeURIComponent(busqueda.value)}&ano_min=${ano_min.value||0}&ano_max=${ano_max.value||9999}&precio_min=${precio_min.value||0}&precio_max=${precio_max.value||999999}&orden=${orden.value}`;
        xhr.open("GET", "listar_libros.php?" + params, true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState===4 && xhr.status===200){
                lista.innerHTML = "";
                paginacion.innerHTML = "";
                let data;
                try{
                    data = JSON.parse(xhr.responseText);
                }catch(e){
                    lista.innerHTML = "<li>Respuesta inválida del servidor</li>";
                    return;
                }

                if(data.error){ lista.innerHTML = `<li>${data.error}</li>`; return; }

                const libros = data.libros || [];
                const total = parseInt(data.total) || 0;

                if(!libros || libros.length === 0){ lista.innerHTML = "<li>No hay libros que mostrar</li>"; }

                libros.forEach(libro=>{
                    let li=document.createElement("li");
                    li.innerHTML = `
                        <div class="book-info">
                            <div class="book-meta">
                                <span class="book-title">${libro.titulo}</span>
                                <span class="book-sub">${libro.autor} - ${libro.editorial} (${libro.ano}) - $${parseFloat(libro.precio).toFixed(2)}</span>
                            </div>
                        </div>
                        <div class="book-actions">
                            <button class="edit" onclick="editar(${libro.id},'${escapar(libro.titulo)}','${escapar(libro.autor)}','${escapar(libro.editorial)}',${libro.ano},${libro.precio})">Editar</button>
                            <button class="del" onclick="eliminar(${libro.id})">Eliminar</button>
                        </div>
                    `;
                    lista.appendChild(li);
                });

                // Paginación simple
                const totalPages = Math.max(1, Math.ceil(total / pageSize));

                function createPageButton(label, page, disabled){
                    const btn = document.createElement('button');
                    btn.textContent = label;
                    btn.disabled = !!disabled;
                    btn.addEventListener('click', ()=>{ paginaActual = page; listarLibros(); });
                    return btn;
                }

                // Prev
                paginacion.appendChild(createPageButton('‹', Math.max(1, paginaActual-1), paginaActual===1));

                // Page numbers (limit to a small range)
                const range = 3;
                const start = Math.max(1, paginaActual - range);
                const end = Math.min(totalPages, paginaActual + range);
                for(let p = start; p <= end; p++){
                    const btn = createPageButton(p, p, false);
                    if(p === paginaActual){ btn.style.fontWeight = '700'; }
                    paginacion.appendChild(btn);
                }

                // Next
                paginacion.appendChild(createPageButton('›', Math.min(totalPages, paginaActual+1), paginaActual===totalPages));
            }
        };
        xhr.send();
    }

    btnGuardar.addEventListener("click",function(){
        const id = document.getElementById("id").value;
        const titulo = document.getElementById("titulo").value;
        const autor = document.getElementById("autor").value;
        const editorial = document.getElementById("editorial").value;
        const ano = document.getElementById("ano").value;
        const precio = document.getElementById("precio").value;

        if(!titulo||!autor||!editorial||!ano||!precio){alert("Complete todos los campos"); return;}

        const xhr = new XMLHttpRequest();
        const url = id?"actualizar_libro.php":"insertar_libro.php";
        xhr.open("POST",url,true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4 && xhr.status===200){
                alert(xhr.responseText);
                document.getElementById("id").value="";
                document.getElementById("titulo").value="";
                document.getElementById("autor").value="";
                document.getElementById("editorial").value="";
                document.getElementById("ano").value="";
                document.getElementById("precio").value="";
                listarLibros();
            }
        };
        xhr.send(`id=${encodeURIComponent(id)}&titulo=${encodeURIComponent(titulo)}&autor=${encodeURIComponent(autor)}&editorial=${encodeURIComponent(editorial)}&ano=${encodeURIComponent(ano)}&precio=${encodeURIComponent(precio)}`);
    });

    window.editar=function(id,titulo,autor,editorial,ano,precio){
        document.getElementById("id").value=id;
        document.getElementById("titulo").value=titulo;
        document.getElementById("autor").value=autor;
        document.getElementById("editorial").value=editorial;
        document.getElementById("ano").value=ano;
        document.getElementById("precio").value=precio;
    }

    window.eliminar=function(id){
        if(confirm("¿Desea eliminar este libro?")){
            const xhr = new XMLHttpRequest();
            xhr.open("POST","eliminar_libro.php",true);
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhr.onreadystatechange=function(){
                if(xhr.readyState===4 && xhr.status===200){
                    alert(xhr.responseText);
                    listarLibros();
                }
            };
            xhr.send("id="+encodeURIComponent(id));
        }
    }

    busqueda.addEventListener("input", ()=>{paginaActual=1; listarLibros();});
    ano_min.addEventListener("input", ()=>{paginaActual=1; listarLibros();});
    ano_max.addEventListener("input", ()=>{paginaActual=1; listarLibros();});
    precio_min.addEventListener("input", ()=>{paginaActual=1; listarLibros();});
    precio_max.addEventListener("input", ()=>{paginaActual=1; listarLibros();});
    orden.addEventListener("change", ()=>{paginaActual=1; listarLibros();});

    listarLibros();
});
