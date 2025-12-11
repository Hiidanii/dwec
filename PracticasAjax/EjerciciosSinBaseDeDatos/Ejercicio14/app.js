document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("boton").addEventListener("click", function() {
        let numeros = document.getElementById("numeros").value;

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "pares.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                document.getElementById("mensaje").innerHTML = xhr.responseText;
            }
        };

        xhr.send("numeros=" + encodeURIComponent(numeros));
    });
});