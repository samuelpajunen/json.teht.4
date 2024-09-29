// URLit junien aikataulujen hakemiseen
const helsinkiUrl = 'https://rata.digitraffic.fi/api/v1/live-trains/station/HKI?departing_trains=100&include_nonstopping=false';

// Funktio datan hakemiseen
function fetchData(url) {
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            processTrainData(data);
        })
        .catch(function(error) {
            document.getElementById("vastaus").innerHTML = 
            "<p>Tietoa ei pystytä hakemaan</p>" + error;
        });
}

// Funktio junien aikataulujen käsittelemiseen
function processTrainData(data) {
    var teksti = "<div class='juna-info'>";
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].timeTableRows.length; j++) {
            if (data[i].timeTableRows[j].stationShortCode == 'TPE' && data[i].timeTableRows[j].type == 'DEPARTURE') {
                teksti += "<p><strong>Juna nro " + data[i].trainNumber + "</strong></p>";
                teksti += "<p>Junan tyyppi: " + data[i].trainCategory + "</p>";
                teksti += "<p>Lähtee Helsingistä " + data[i].timeTableRows[j].scheduledTime.split('T')[0] + 
                " kello: " + data[i].timeTableRows[j].scheduledTime.split('T')[1].substring(0, 5) + " - Saapuu Tampereelle " +
                data[i].timeTableRows[j].scheduledTime.split('T')[0] + " kello: " + data[i].timeTableRows[j].scheduledTime.split('T')[1].substring(0, 5) + "</p>";
                teksti += "<hr style='border: 1px solid lightgray;'>";
            }
        }
    }
    teksti += "</div>";
    document.getElementById("vastaus").innerHTML += teksti;
}

// Datan hakeminen ja käsittely
fetchData(helsinkiUrl);

