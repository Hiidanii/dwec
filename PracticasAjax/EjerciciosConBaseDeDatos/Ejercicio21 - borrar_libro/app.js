document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("boton").addEventListener("click", function() {
        let id = document.getElementById("id").value;

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "borrar_libro.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById("mensaje").innerText = xhr.responseText;
            }
        };

        xhr.send("id=" + encodeURIComponent(id));
    });
});
