document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("boton").addEventListener("click", function() {
        let autor = document.getElementById("autor").value;

        let xhr = new XMLHttpRequest();
        xhr.open("GET", "contar_libros_autor.php?autor=" + encodeURIComponent(autor), true);

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                let mensaje = document.getElementById("mensaje");

                if(data.error) {
                    mensaje.innerText = data.error;
                } else {
                    mensaje.innerText = `Total de libros de ${autor}: ${data.total}`;
                }
            }
        };

        xhr.send();
    });
});
