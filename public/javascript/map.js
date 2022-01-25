let map;

function myLocation(pos) {
  var currentLocation = pos.coords;
  map.setCenter({lat: currentLocation.latitude, lng: currentLocation.longitude})
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: -33.856125088797576, lng: 151.2154039883525},
    zoom: 13,
  });
  navigator.geolocation.getCurrentPosition(myLocation);
  map.setOptions({ minZoom: 11, maxZoom: 13 });
  map.addListener('idle', addMarkers);
  map.addListener('zoom_changed', addMarkers);
}


function getVisibleMapCoordinates() {
  return map.getBounds();
}

function addMarkers() {
  let mapBoundaries = getVisibleMapCoordinates();
  let coordinatesObject = {
    topLat: mapBoundaries.getNorthEast().lat(),
    topLng: mapBoundaries.getNorthEast().lng(),
    botLat: mapBoundaries.getSouthWest().lat(),
    botLng: mapBoundaries.getSouthWest().lng()
  }
  axios.get(`http://localhost:8080/api/stations/nearest?botLat=${coordinatesObject.botLat}&botLng=${coordinatesObject.botLng}&topLat=${coordinatesObject.topLat}&topLng=${coordinatesObject.topLng}`)
    .then(res => {
      results = res.data
      console.log(results)
      // Loop through the results array and place a marker for each set of coordinates.
      for (let i = 0; i < results.length; i++) {
        const latLng = new google.maps.LatLng(results[i].latitude, results[i].longitude);
        new google.maps.Marker({
          position: latLng,
          map: map,
        });
      }
    })
}

// Get map bound values from viewport on change (maybe radius from map centre)
// Pass results into function to make markers
// Marker function should clear existing markers, add new
