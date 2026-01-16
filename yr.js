function degToCompass(deg){ //Denne funksjonen tar vindretning i grader (0–360°) og gjør det om til en kompassretning som N, S, Ø, V osv.
    const directions = ["N","NNØ","NØ","ØNØ","Ø","ØSØ","SØ","SSØ",
                        "S","SSV","SV","VSV","V","VNV","NV","NNV"]

    return directions[Math.round(deg / 22.5) % 16];
}

//OSLO
function showOslo(){ //Viser HTML-elementet med vær for Oslo. Skjuler vær for Trondheim. Henter nye værdata for Oslo
    document.getElementById("Oslo").classList.remove("hidden"); 
    document.getElementById("Trondheim").classList.add("hidden"); 
    hentVærOslo();
}


const apiurl = "https://api.met.no/weatherapi" //Grunnadressen du sender forespørsler til.

async function hentVærOslo(){  //en async funksjon er en funksjon som kan vente på at noe skal skje før den fortsetter.
    const response = await fetch(apiurl + "/locationforecast/2.0/compact?lat=60&lon=11") //Du ber MET API om værdata for et bestemt sted med fetch()
    const data = await response.json(); //Du venter på at svaret skal komme og konverterer det til JSON-format
    ikon = data.properties.timeseries[0].data.next_1_hours.summary.symbol_code //Henter ut ikon-koden fra dataene
    writeToHtmlO(data) //Sender dataene videre til writeToHtmlO() som oppdaterer nettsiden
}
hentVærOslo()

//writeToHtml()
function writeToHtmlO(data){
    const d = data.properties.timeseries[0].data.instant.details; //Du henter ut detaljene fra JSON-objektet

    document.getElementById("vær").innerHTML = `${d.air_temperature} °C`; //Du henter ut temperatur, vind, skydekke osv. og viser det i HTML:
    document.getElementById("luft").innerHTML = `${d.air_pressure_at_sea_level} hPa`;
    document.getElementById("Sky").innerHTML = `${d.cloud_area_fraction} %`;
    document.getElementById("humidity").innerHTML = `${d.relative_humidity} %`;
    document.getElementById("wind_speed").innerHTML = `${d.wind_speed} m/s`;

    const windDir = degToCompass(d.wind_from_direction); //Konverterer vindretning fra grader til kompassretning
    document.getElementById("wind_dir").innerHTML = `${windDir} (${d.wind_from_direction}°)`; //Viser både kompassretning og grader
        const sym = document.getElementById("symbolO"); // henter symbol div
        sym.innerHTML = "";   // fjerner tidligere ikon
 
        const img = document.createElement("img"); // legger til riktig ikon i img element
        img.src = `static/weather/svg/${ikon}.svg`; 
        sym.appendChild(img);
 
}


//TRONDHEIM
async function hentVærTrondheim(){
    const response = await fetch(apiurl + "/locationforecast/2.0/compact?lat=63&lon=10")
    const data = await response.json();
    ikon = data.properties.timeseries[0].data.next_1_hours.summary.symbol_code

    writeToHtmlT(data)
}

hentVærTrondheim();

function writeToHtmlT(data){
    const d = data.properties.timeseries[0].data.instant.details;

    document.getElementById("værT").innerHTML = `${d.air_temperature} °C`;
    document.getElementById("luftT").innerHTML = `${d.air_pressure_at_sea_level} hPa`;
    document.getElementById("SkyT").innerHTML = `${d.cloud_area_fraction} %`;
    document.getElementById("humidityT").innerHTML = `${d.relative_humidity} %`;
    document.getElementById("wind_speedT").innerHTML = `${d.wind_speed} m/s`;

    const windDir = degToCompass(d.wind_from_direction);
    document.getElementById("wind_dirT").innerHTML = `${windDir} (${d.wind_from_direction} °)`;
            const sym = document.getElementById("symbolT");
        sym.innerHTML = "";
 
        const img = document.createElement("img");
        img.src = `static/weather/svg/${ikon}.svg`;
        sym.appendChild(img);
}

function showTrondheim(){ 
    document.getElementById("Trondheim").classList.remove("hidden");
    document.getElementById("Oslo").classList.add("hidden");
    hentVærTrondheim();
}