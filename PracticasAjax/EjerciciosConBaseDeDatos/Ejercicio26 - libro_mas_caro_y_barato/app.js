document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("boton").addEventListener("click", function() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "libro_mas_caro_y_barato.php", true);

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                let mensaje = document.getElementById("mensaje");
                let respuesta = JSON.parse(xhr.responseText);

                if(respuesta.error) {
                    mensaje.innerText = respuesta.error;
                } else {
                    let libroCaro = respuesta.caro;
                    let libroBarato = respuesta.barato;
                    mensaje.innerText = `Libro más caro: ${libroCaro.titulo} - ${libroCaro.autor} (${libroCaro.ano}) - ${libroCaro.editorial} - $${libroCaro.precio}\n` +
                                        `Libro más barato: ${libroBarato.titulo} - ${libroBarato.autor} (${libroBarato.ano}) - ${libroBarato.editorial} - $${libroBarato.precio}`;
                }
            }
        }

        xhr.send();
    });
});
