document.addEventListener('DOMContentLoaded', () => {
    const indicador = document.getElementById('indicador');
    const resultados = document.getElementById('resultados');

    function showLoading(msg = 'Procesando...') {
        indicador.textContent = msg;
    }
    function clearLoading() {
        indicador.textContent = '';
    }

    // Insertar libro
    const btnInsertar = document.getElementById('insertar');
    btnInsertar.addEventListener('click', () => {
        const titulo = document.getElementById('titulo').value.trim();
        const autor = document.getElementById('autor').value.trim();
        const editorial = document.getElementById('editorial').value.trim();
        const ano_publi = document.getElementById('ano_publi').value.trim();
        const precio = document.getElementById('precio').value.trim();

        if (!titulo || !autor || !editorial || !ano_publi || !precio) {
            indicador.textContent = 'Rellena todos los campos.';
            return;
        }

        // insertadatos.php espera el campo 'publicacion' para el año
        const body = new URLSearchParams();
        body.append('titulo', titulo);
        body.append('autor', autor);
        body.append('editorial', editorial);
        body.append('publicacion', ano_publi);
        body.append('precio', precio);

        showLoading('Insertando...');

        fetch('insertadatos.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: body.toString()
        })
        .then(resp => resp.text())
        .then(text => {
            clearLoading();
            resultados.innerHTML = '';
            indicador.textContent = text || 'Respuesta del servidor recibida.';
            // opcional: limpiar formulario
            document.getElementById('titulo').value = '';
            document.getElementById('autor').value = '';
            document.getElementById('editorial').value = '';
            document.getElementById('ano_publi').value = '';
            document.getElementById('precio').value = '';
        })
        .catch(err => {
            clearLoading();
            indicador.textContent = 'Error en la petición: ' + err;
        });
    });

    // Consultar libros
    const btnConsultar = document.getElementById('consultar');
    btnConsultar.addEventListener('click', () => {
        const campo = document.getElementById('campo').value;
        const valor = document.getElementById('valor').value.trim();

        if (!valor) {
            indicador.textContent = 'Introduce un valor para consultar (usa % para comodines).';
            return;
        }

        // enviadatos.php espera 'campo' y 'dato'
        const body = new URLSearchParams();
        body.append('campo', campo);
        body.append('dato', valor);

        showLoading('Consultando...');

        fetch('enviadatos.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            body: body.toString()
        })
        .then(resp => {
            const ct = resp.headers.get('content-type') || '';
            if (ct.includes('application/json')) return resp.json();
            return resp.text().then(t => { throw new Error('Respuesta inesperada: ' + t); });
        })
        .then(json => {
            clearLoading();
            resultados.innerHTML = '';

            // Si el PHP devolviera un objeto con Error
            if (!Array.isArray(json)) {
                if (json && json.Error) {
                    resultados.textContent = json.Error;
                    return;
                }
                resultados.textContent = 'Respuesta JSON inesperada.';
                return;
            }

            if (json.length === 0) {
                resultados.textContent = 'No hay coincidencias.';
                return;
            }

            // Construir tabla con resultados
            const table = document.createElement('table');
            table.border = '1';
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            const cols = Object.keys(json[0]);
            cols.forEach(c => {
                const th = document.createElement('th');
                th.textContent = c;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            json.forEach(row => {
                const tr = document.createElement('tr');
                cols.forEach(c => {
                    const td = document.createElement('td');
                    td.textContent = row[c];
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
            resultados.appendChild(table);
        })
        .catch(err => {
            clearLoading();
            indicador.textContent = 'Error en la consulta: ' + err.message;
        });
    });
});