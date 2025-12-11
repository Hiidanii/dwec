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
    };

    const comunidadSelect = document.getElementById('comunidad');
    const provinciaSelect = document.getElementById('provincia');
    const tarjetaTiempo = document.getElementById('tarjeta-tiempo');

    // Rellenar el select de comunidades autónomas
    comunidadSelect.innerHTML = '<option value="">Seleccione una comunidad</option>';
    for (let comunidad in comunidades) {
        let option = document.createElement('option');
        option.value = comunidad;
        option.textContent = comunidad;
        comunidadSelect.appendChild(option);
    }

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
            let card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}</h3>
                <p>Temperatura: ${pronostico.main.temp} °C</p>
                <p>Clima: ${pronostico.weather[0].description}</p>
                <p>Humedad: ${pronostico.main.humidity}%</p>
                <p>Viento: ${pronostico.wind.speed} m/s</p>
            `;
            tarjetaTiempo.appendChild(card);
        }
    }   
});