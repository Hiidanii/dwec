document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("boton").addEventListener("click", function() {
        let nombre = document.getElementById("nombre").value;
        let email = document.getElementById("email").value;

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "formulario.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById("mensaje").innerText = xhr.responseText;
            }
        };

        xhr.send("nombre=" + encodeURIComponent(nombre) + "&email=" + encodeURIComponent(email));
    });
});