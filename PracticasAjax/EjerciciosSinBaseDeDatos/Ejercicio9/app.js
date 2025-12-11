document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('boton').addEventListener('click', function() {
        let opcion = document.getElementById('opcion').value;

        let xhr = new XMLHttpRequest();
        xhr.open("GET", "opcion.php?opcion=" + encodeURIComponent(opcion), true);

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById("mensaje").innerText = xhr.responseText;
            }
        };

        xhr.send();
    });
});
