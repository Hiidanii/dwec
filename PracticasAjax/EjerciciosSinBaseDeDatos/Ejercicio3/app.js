document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("boton").addEventListener("click", function() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "numero.php", true);

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById("mensaje").innerText = "Número aleatorio: " + xhr.responseText;
            }
        };

        xhr.send();
    });
});
