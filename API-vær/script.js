// Helper: Convert degrees → compass direction (e.g., 286 → WNW)
function degToCompass(deg) {
    const directions = ["N","NNE","NE","ENE","E","ESE","SE","SSE",
                        "S","SSW","SW","WSW","W","WNW","NW","NNW"];
    return directions[Math.round(deg / 22.5) % 16];
}

// OSLO
function showOslo() {
    document.getElementById("Oslo").classList.remove("hidden");
    document.getElementById("Trondheim").classList.add("hidden");
    hentVærOslo();
}


const API_URL = "https://api.met.no/weatherapi";

async function hentVærOslo() {
    const response = await fetch(API_URL + "/locationforecast/2.0/compact?lat=60&lon=11");
    const data = await response.json();
    writeToHTML(data);
}

hentVærOslo();

function writeToHTML(data) {
    const d = data.properties.timeseries[0].data.instant.details;

    document.getElementById("vær").innerHTML = `${d.air_temperature} °C`;
    document.getElementById("luft").innerHTML = `${d.air_pressure_at_sea_level} hPa`;
    document.getElementById("Sky").innerHTML = `${d.cloud_area_fraction}%`;
    document.getElementById("humidity").innerHTML = `${d.relative_humidity}%`;
    document.getElementById("wind_speed").innerHTML = `${d.wind_speed} m/s`;

    const windDir = degToCompass(d.wind_from_direction);
    document.getElementById("wind_dir").innerHTML = `${windDir} (${d.wind_from_direction}°)`;
}


//TRONDHEIM
async function hentVærTrondheim() {
    const response = await fetch(API_URL + "/locationforecast/2.0/compact?lat=63&lon=10");
    const data = await response.json();
    writeToHTMLT(data);
}

hentVærTrondheim();

function writeToHTMLT(data) {
    const d = data.properties.timeseries[0].data.instant.details;

    document.getElementById("værT").innerHTML = `${d.air_temperature} °C`;
    document.getElementById("luftT").innerHTML = `${d.air_pressure_at_sea_level} hPa`;
    document.getElementById("SkyT").innerHTML = `${d.cloud_area_fraction}%`;
    document.getElementById("humidityT").innerHTML = `${d.relative_humidity}%`;
    document.getElementById("wind_speedT").innerHTML = `${d.wind_speed} m/s`;

    const windDir = degToCompass(d.wind_from_direction);
    document.getElementById("wind_dirT").innerHTML = `${windDir} (${d.wind_from_direction}°)`;
}

function showTrondheim() {
    document.getElementById("Trondheim").classList.remove("hidden");
    document.getElementById("Oslo").classList.add("hidden");
    hentVærTrondheim();
}