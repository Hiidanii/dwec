document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("boton").addEventListener("click", function() {
        let nombre = document.getElementById("nombre").value;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "saludo_get.php?nombre=" + encodeURIComponent(nombre), true);

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById("mensaje").innerText = xhr.responseText;
            }
        };

        xhr.send();
    });
});
