// Haetaan kamerakuvien data annetusta URL-osoitteesta
fetch('https://tie.digitraffic.fi/api/weathercam/v1/stations/C04613/data')
    .then(function(response) {
        return response.json();
    })
    .then(function(responseJson) {
        naytaKuvat(responseJson); 
    })
    .catch(function (error) {
        document.getElementById("kuvat").innerHTML = 
        "<p>Tietoa ei pystytä hakemaan: </p>" + error; 
    });

// Funktio kuvien näyttämiseksi
function naytaKuvat(data) {
    var teksti = "<h1>Autolla Tampereelle</h1>";
    teksti += "<p>Minkälainen keli siellä on?</p>";
// Jos data.presets ei ole määritelty, käytetään tyhjää taulukkoa
    let kamerat = data.presets || []; 

    // Käydään läpi kamerat ja lisätään kuvat ja niiden tiedot
    for (var i = 0; i < kamerat.length; i++) {
        // Kuvausaika
        teksti += "<p>" + kamerat[i].measuredTime + "</p>"; 
        // Kuva
        teksti += "<img src='https://tie.digitraffic.fi/api/weathercam/v1/stations/C04507/presets/" + 
        kamerat[i].id + "/image' alt='Liikennekameran kuva' onerror=\"this.onerror=null; this.src='fallback-image-url.jpg';\" />"; 
    }

    // Jos kameroita ei ole, niin tämä viesti tulee näkyviin
    teksti += kamerat.length === 0 ? "<p>Ei kameratietoja saatavilla.</p>" : "";


    document.getElementById("kuvat").innerHTML = teksti;
}
