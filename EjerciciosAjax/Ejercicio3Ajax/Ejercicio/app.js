document.addEventListener("DOMContentLoaded", function() {
    // Aplicación para ver el tiempo que hará en las provincias autónomas de España en los proximos 5 días, 
    // donde se eligira la comunidad autónoma y luego la provincia autónoma de la comunidad seleccionada, y se mostrará la información del tiempo en una tarjeta.
    
    // API key de OpenWeatherMap
    const API_KEY = 'cc8763c36951c92f70753bfe04619379';

    // Mapeo de comunidades autónomas a sus provincias
    const comunidades = {
        'Andalucía': ['Sevilla', 'Málaga', 'Cádiz', 'Córdoba', 'Granada', 'Huelva', 'Jaén', 'Almería'],
        'Cataluña': ['Barcelona', 'Girona', 'Lleida', 'Tarragona'],
        'Comunidad de Madrid': ['Madrid'],
        'Comunidad Valenciana': ['Valencia', 'Alicante', 'Castellón'],
        'Galicia': ['A Coruña', 'Lugo', 'Ourense', 'Pontevedra'],
        'País Vasco': ['Bilbao', 'San Sebastián', 'Vitoria-Gasteiz'],
        'Castilla y León': ['Valladolid', 'León', 'Burgos', 'Salamanca', 'Zamora', 'Palencia', 'Segovia', 'Ávila', 'Soria'],
        'Castilla-La Mancha': ['Toledo', 'Ciudad Real', 'Albacete', 'Cuenca', 'Guadalajara'],
        'Aragón': ['Zaragoza', 'Huesca', 'Teruel'],
        'Extremadura': ['Mérida', 'Cáceres'],
        'Islas Canarias': ['Las Palmas', 'Santa Cruz de Tenerife'],
        'Islas Baleares': ['Palma de Mallorca'],
        'La Rioja': ['Logroño'],
        'Navarra': ['Pamplona'],
        'Asturias': ['Oviedo'],
        'Cantabria': ['Santander'],
        'Región de Murcia': ['Murcia']
    };

    const comunidadSelect = document.getElementById('comunidad');
    const provinciaSelect = document.getElementById('provincia');
    const tarjetaTiempo = document.getElementById('tarjeta-tiempo');
    const comunidadDropdown = document.getElementById('comunidad-dropdown');
    const provinciaDropdown = document.getElementById('provincia-dropdown');

    // Rellenar el select de comunidades autónomas
    comunidadSelect.innerHTML = '<option value="">Seleccione una comunidad</option>';
    for (let comunidad in comunidades) {
        let option = document.createElement('option');
        option.value = comunidad;
        option.textContent = comunidad;
        comunidadSelect.appendChild(option);
    }

    // Construir dropdowns visuales sincronizados con los selects
    buildDropdown(comunidadSelect, comunidadDropdown);
    buildDropdown(provinciaSelect, provinciaDropdown);

    // Evento para actualizar las provincias cuando se selecciona una comunidad
    comunidadSelect.addEventListener('change', function() {
        provinciaSelect.innerHTML = '<option value="">Seleccione una provincia</option>';
        let provincias = comunidades[this.value];
        if (provincias) {
            provincias.forEach(function(provincia) {
                let option = document.createElement('option');
                option.value = provincia;
                option.textContent = provincia;
                provinciaSelect.appendChild(option);
            });
            // Reconstruir dropdown de provincias cuando cambie la comunidad
            buildDropdown(provinciaSelect, provinciaDropdown);
        }
    });

    // Evento para obtener y mostrar el tiempo cuando se selecciona una provincia
    provinciaSelect.addEventListener('change', function() {
        let provincia = this.value;
        if (provincia) {
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(provincia)},ES&appid=${API_KEY}&units=metric&lang=es`;
            fetch(url)
                .then(response => {
                    if (!response.ok) throw new Error(response.status + ' ' + response.statusText);
                    return response.json();
                })
                .then(data => mostrarTiempo(data))
                .catch(error => {
                    tarjetaTiempo.innerHTML = `<p class="error">Error al obtener los datos del tiempo: ${error.message}</p>`;
                    console.error('Error al obtener los datos del tiempo:', error);
                });
        }
    });

    // Función para mostrar el tiempo en la tarjeta
    function mostrarTiempo(data) {
        tarjetaTiempo.innerHTML = ''; // Limpiar la tarjeta

        if (data.cod !== "200") {
            tarjetaTiempo.innerHTML = `<p>Error al obtener los datos del tiempo: ${data.message}</p>`;
            return;
        }

        // Mostrar el pronóstico para los próximos 5 días (cada 8 horas)
        for (let i = 0; i < data.list.length; i += 8) {
            let pronostico = data.list[i];
            let fecha = new Date(pronostico.dt * 1000);
            // Obtener código de icono y URL (OpenWeatherMap)
            const iconCode = pronostico.weather && pronostico.weather[0] ? pronostico.weather[0].icon : null;
            const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : '';

            let card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-header">
                    ${iconUrl ? `<img src="${iconUrl}" alt="${pronostico.weather[0].description}" class="weather-icon">` : ''}
                    <div>
                        <h3>${diaSemana(fecha)} (${fecha.toLocaleDateString()})</h3>
                        <h4>${fecha.toLocaleTimeString()}</h4>
                    </div>
                </div>
                <p>Temperatura: ${pronostico.main.temp} °C</p>
                <p style="text-transform: capitalize;">Clima: ${pronostico.weather[0].description}</p>
                <p>Humedad: ${pronostico.main.humidity}%</p>
                <p>Viento: ${pronostico.wind.speed} m/s</p>
            `;
            tarjetaTiempo.appendChild(card);
        }
    }
    
    // Función para obtener el nombre del día de la semana
    function diaSemana(fecha) {
        const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return dias[fecha.getDay()];
    }

    // ===== Dropdown personalizado: construye UI visible y sincroniza con el select escondido =====
    function buildDropdown(selectEl, containerEl) {
        if (!containerEl) return;
        containerEl.innerHTML = '';

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'dropdown-button';
        const selectedOption = selectEl.options[selectEl.selectedIndex];
        button.textContent = selectedOption ? selectedOption.text : 'Seleccione';

        const menu = document.createElement('ul');
        menu.className = 'dropdown-menu';

        Array.from(selectEl.options).forEach(opt => {
            const li = document.createElement('li');
            li.className = 'dropdown-item';
            li.dataset.value = opt.value;
            li.textContent = opt.text;
            if (!opt.value) li.classList.add('placeholder');
            li.addEventListener('click', function(e) {
                e.stopPropagation();
                selectEl.value = this.dataset.value;
                // actualizar texto del botón
                button.textContent = this.textContent;
                // disparar evento change para reutilizar la lógica existente
                selectEl.dispatchEvent(new Event('change'));
                containerEl.classList.remove('open');
            });
            menu.appendChild(li);
        });

        button.addEventListener('click', function(e) {
            e.stopPropagation();
            containerEl.classList.toggle('open');
        });

        // Actualizar botón cuando el select cambie por código
        selectEl.addEventListener('change', function() {
            const opt = selectEl.options[selectEl.selectedIndex];
            button.textContent = opt ? opt.text : 'Seleccione';
        });

        containerEl.appendChild(button);
        containerEl.appendChild(menu);
    }

    // Cerrar dropdowns al hacer clic fuera
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
    });
});