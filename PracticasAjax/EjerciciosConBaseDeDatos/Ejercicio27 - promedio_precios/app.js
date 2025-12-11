document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("boton").addEventListener("click", function() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "promedio_precios.php", true);

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                let mensaje = document.getElementById("mensaje");

                if(data.error) {
                    mensaje.innerText = data.error;
                } else {
                    mensaje.innerText = `Precio promedio de los libros: $${parseFloat(data.promedio).toFixed(2)}`;
                }
            }
        };

        xhr.send();
    });
});
