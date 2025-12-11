document.addEventListener("DOMContentLoaded", function(){
    // Cambia aquí por tu API key de OpenWeatherMap
    const API_KEY = 'cc8763c36951c92f70753bfe04619379';
    // Usamos el endpoint "weather" que devuelve temp_min y temp_max
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Seville,ES&units=metric&lang=es&appid=${API_KEY}`;

    function showError(msg){
        document.getElementById('error').textContent = msg;
        document.getElementById('temps').textContent = '';
        document.getElementById('icon').innerHTML = '';
    }

    // Realizamos la petición AJAX con Fetch API
    fetch(url)
    .then(resp => {
        if(!resp.ok) throw new Error('Respuesta de red no OK: ' + resp.status);
        return resp.json();
    })
    .then(data => {
        // data.main.temp ,data.main.temp_min, data.main.temp_max
        const temp = data.main.temp;
        const min = data.main.temp_min;
        const max = data.main.temp_max;
        const description = data.weather && data.weather[0] ? data.weather[0].description : '';
        const icon = data.weather && data.weather[0] ? data.weather[0].icon : '';
        document.getElementById('temps').innerHTML =
            `<div style="margin-bottom:8px">Temperatura actual: <strong>${temp.toFixed(1)}°C</strong></div>
            <div>Temperatura máx: <strong>${max.toFixed(1)}°C</strong></div>
            <div>Temperatura min: <strong>${min.toFixed(1)}°C</strong></div>
            <div style="margin-top:8px;text-transform:capitalize;">${description}</div>`;
        if(icon){
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            document.getElementById('icon').innerHTML = `<img src="${iconUrl}" alt="${description}">`;
        }
    })
    .catch(err => {
        console.error(err);
        showError('No se pudieron obtener los datos. Comprueba la API key y la conexión.');
    });
});