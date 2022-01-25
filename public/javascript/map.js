let map;


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 13,
  });
  map.addListener('dragend', getMapBounds)
  map.addListener('zoom_changed', getMapBounds)
  addMarkers()
  getStats()
}


function getMapBounds() {
  // get lat long by box or radius
  let mapBoundaries = getVisibleMapCoordinates();
  let coordinatesObject = {
    topLat: mapBoundaries.getNorthEast().lat(),
    topLng: mapBoundaries.getNorthEast().lng(),
    botLat: mapBoundaries.getSouthWest().lat(),
    botLng: mapBoundaries.getSouthWest().lng()
  }
  fetch('http://localhost:8080/api/stations/nearest', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(coordinatesObject),
    method: "POST",
  })
    .then(res => {
      return res.json()
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log("RIP", err)
    });
}

function getVisibleMapCoordinates() {
  return map.getBounds();
}

function addMarkers(petrolStations) {
  console.log(petrolStations)
  axios.get('/api/stations/all')
    .then(res => {
      results = res.data
      console.log(results)

      // Loop through the results array and place a marker for each
      // set of coordinates.

      for (let i = 0; i < results.length; i++) {
        const latLng = new google.maps.LatLng(results[i].latitude, results[i].longitude);

        new google.maps.Marker({
          position: latLng,
          map: map,
        });
      }
    })
}
// eventListeners - dragend zoom_changed DONE BB
// Get map bound values from viewport on change (maybe radius from map centre)
// Query map bounds lat /long to db
// Pass results into function to make markers
// Marker function should clear existing markers, add new


function getStats() {

  axios.get('/api/stations/stats')
    .then(res => {
      let results = res.data // express middleware ALWAYS comes out as res.data
      let ul = document.getElementById('ownerStats');
      let total = 0;
      for(i=0; i<results.length; i++) {
          let li = document.createElement('li');
          li.innerHTML = `${results[i].owner} - ${results[i].count}`;
          if (`${results[i].count}` !== "1") {
            ul.appendChild(li);
            total+= Number(results[i].count)
          }
      }
      document.getElementById('stationTotal').innerHTML = total;
  })
}