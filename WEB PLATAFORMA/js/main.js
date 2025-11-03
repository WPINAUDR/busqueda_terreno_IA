// Crear el mapa centrado (por ejemplo, Lima)
var map = L.map('map').setView([-12.0464, -77.0428], 15);

// Definir las capas base (fondos de mapa)
var calles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
});

var satelite = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.google.com/earth/">Google Earth imagery</a>'
});

var hibrido = L.tileLayer('https://mt1.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.google.com/earth/">Google Maps Hybrid</a>'
});

var terreno = L.tileLayer('https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.google.com/earth/">Google Terrain</a>'
});

// Agregar una capa base inicial (por ejemplo, híbrido)
hibrido.addTo(map);

// Crear un objeto para el control de capas base
var baseMaps = {
    "Calles": calles,
    "Satélite": satelite,
    "Híbrido": hibrido,
    "Terreno": terreno
};

// Agregar control para cambiar entre mapas
L.control.layers(baseMaps).addTo(map);
// Cargar tus polígonos desde GeoJSON
fetch('data/GeoJSON_poligono_partida.geojson')
    .then(res => res.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: 'blue',
                weight: 2,
                fillOpacity: 0.3
            },
            onEachFeature: function (feature, layer) {
                // Muestra información de atributos al hacer clic
                let props = feature.properties;
                let info = `<b>Partida:</b> ${props.Partida || 'N/A'}<br>
                    <b>Área:</b> ${props.area_m2?.toFixed(2) || '---'} m²`;
                layer.bindPopup(info);
            }
        }).addTo(map);
    });
