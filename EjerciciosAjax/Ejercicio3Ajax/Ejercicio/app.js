document.addEventListener("DOMContentLoaded", function() {
    // Clave de API para OpenWeatherMap
    const API_KEY = 'cc8763c36951c92f70753bfe04619379';

    // Mapa de comunidades autónomas a sus provincias.
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

    // Nodos DOM raíz
    const tarjetaTiempo = document.getElementById('tarjeta-tiempo'); // contenedor para las tarjetas del tiempo
    const menuCont = document.getElementById('menu-comunidades'); // contenedor del menú de comunidades

    // Construye el menú de comunidades (un botón por comunidad con una sublista de provincias).
    // Cada elemento de provincia añade un listener que dispara la petición del tiempo.
    function buildMenu(map) {
        if (!menuCont) return;
        menuCont.innerHTML = '';
        const ul = document.createElement('ul');
        ul.className = 'lista-menu';

        Object.keys(map).forEach(comunidad => {
            const li = document.createElement('li');
            li.className = 'item-comunidad';

            const title = document.createElement('button');
            title.type = 'button';
            title.className = 'boton-comunidad';
            title.textContent = comunidad;

            const sub = document.createElement('ul');
            sub.className = 'sublista';

            // Crea un elemento de lista por cada provincia y le añade el click para pedir datos
            map[comunidad].forEach(prov => {
                const pli = document.createElement('li');
                pli.className = 'item-provincia';
                pli.dataset.province = prov;
                pli.textContent = prov;
                pli.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const provincia = this.dataset.province;
                    // Solicita el tiempo para la provincia clicada
                    fetchWeatherForProvince(provincia);
                    // Retroalimentación visual: marcar la provincia activa
                    document.querySelectorAll('.item-provincia.activa').forEach(n => n.classList.remove('activa'));
                    this.classList.add('activa');
                });
                sub.appendChild(pli);
            });

            // Hacer clic en el botón de comunidad alterna la visibilidad de su sublista
            title.addEventListener('click', function(e) {
                e.stopPropagation();
                li.classList.toggle('abierta');
            });

            li.appendChild(title);
            li.appendChild(sub);
            ul.appendChild(li);
        });

        menuCont.appendChild(ul);

        // Cierra cualquier sublista abierta al hacer clic fuera del menú
        document.addEventListener('click', function() {
            document.querySelectorAll('.item-comunidad.abierta').forEach(n => n.classList.remove('abierta'));
        });
    }

    // Solicita el pronóstico para una provincia y muestra un skeleton mientras espera.
    function fetchWeatherForProvince(provincia) {
        if (!provincia) return;
        // Limpia el contenido anterior y muestra marcadores de carga (skeleton)
        tarjetaTiempo.innerHTML = '';
        const skeleton = document.createElement('div');
        skeleton.className = 'esqueleto-lista';
        for (let s = 0; s < 3; s++) {
            const sc = document.createElement('div'); sc.className = 'esqueleto-tarjeta'; skeleton.appendChild(sc);
        }
        tarjetaTiempo.appendChild(skeleton);

        // Construye la URL del endpoint 5-day/3-hour de OpenWeatherMap para la provincia seleccionada
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(provincia)},ES&appid=${API_KEY}&units=metric&lang=es`;
        
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        mostrarTiempo(data);
                    } catch (e) {
                        tarjetaTiempo.innerHTML = `<p class="error">Error al procesar la respuesta: ${e.message}</p>`;
                        console.error('Error parseando JSON:', e);
                    }
                } else {
                    tarjetaTiempo.innerHTML = `<p class="error">Error al obtener los datos del tiempo: ${xhr.status} ${xhr.statusText}</p>`;
                    console.error('XHR error:', xhr.status, xhr.statusText, xhr.responseText);
                }
            }
        };
        xhr.send();
    }

    // Renderiza la respuesta de la API en tarjetas visuales.
    // La API devuelve pronósticos cada 3 horas; aquí seleccionamos cada 8º elemento (~24h) para generar tarjetas diarias.
    function mostrarTiempo(data) {
        tarjetaTiempo.innerHTML = ''; // limpiar skeleton o contenido previo

        if (data.cod !== "200") {
            // Error devuelto por la API (p. ej. ciudad no encontrada)
            tarjetaTiempo.innerHTML = `<p>Error al obtener los datos del tiempo: ${data.message}</p>`;
            return;
        }

        // Itera la lista eligiendo una entrada por día (aprox.)
        for (let i = 0; i < data.list.length; i += 8) {
            let pronostico = data.list[i];
            let fecha = new Date(pronostico.dt * 1000);

            // Acceso defensivo al array weather
            const weather = pronostico.weather && pronostico.weather[0] ? pronostico.weather[0] : {description: '', icon: '', main: ''};
            const iconCode = weather.icon;
            const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : '';

            // Mapea una clase de condición simplificada a partir de weather.main para propósitos de estilo.
            // Esto es intencionalmente simple; usar weather.id daría un mapeo más preciso si se requiere.
            const mainCond = weather.main ? weather.main.toLowerCase() : '';
            let condClass = 'unknown';
            if (mainCond.includes('clear')) condClass = 'clear';
            else if (mainCond.includes('rain') || mainCond.includes('drizzle')) condClass = 'rain';
            else if (mainCond.includes('cloud')) condClass = 'clouds';
            else if (mainCond.includes('snow')) condClass = 'snow';
            else if (mainCond.includes('thunder')) condClass = 'storm';

            const feels = pronostico.main && pronostico.main.feels_like ? Math.round(pronostico.main.feels_like) : null;

            // Construye el HTML de la tarjeta. Contenido a la izquierda, icono a la derecha (estilado en CSS).
            let card = document.createElement('div');
            card.className = `tarjeta-item ${condClass}`;
            card.innerHTML = `
                <div class="contenido">
                    <div class="cabecera-tarjeta">
                        <div>
                            <h3>${diaSemana(fecha)} (${fecha.toLocaleDateString()})</h3>
                            <h4 style="text-transform: capitalize;">${fecha.toLocaleTimeString()} - ${weather.description || ''}</h4>
                        </div>
                    </div>
                    <div class="cuerpo-tarjeta">
                        <div class="temp-grande">${Math.round(pronostico.main.temp)}°C ${feels ? `<small class="sensacion">Sensación ${feels}°C</small>` : ''}</div>
                        <div class="datos">
                            <span>💧 ${pronostico.main.humidity}%</span>
                            <span>·</span>
                            <span>🌬️ ${pronostico.wind.speed} m/s</span>
                        </div>
                    </div>
                </div>
                ${iconUrl ? `<img src="${iconUrl}" alt="${weather.description}" class="icono-tiempo">` : ''}
            `;
            tarjetaTiempo.appendChild(card);
        }
    }
    
    // Función para obtener el nombre del día de la semana
    function diaSemana(fecha) {
        const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return dias[fecha.getDay()];
    }

    // Construir menú al inicio
    buildMenu(comunidades);
});