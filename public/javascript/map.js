let map;

function myLocation(pos) {
  var currentLocation = pos.coords;
  map.setCenter({ lat: currentLocation.latitude, lng: currentLocation.longitude });
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.856125088797576, lng: 151.2154039883525 },
    zoom: 13,
    disableDefaultUI: false,
  });
  navigator.geolocation.getCurrentPosition(myLocation);
  map.setOptions({ minZoom: 11, maxZoom: 13 });
  map.addListener("idle", getPetrolStations);
  map.addListener("zoom_changed", getPetrolStations);
  getStats();
}

function getVisibleMapCoordinates() {
  return map.getBounds();
}

function getPetrolStations() {
  let mapBoundaries = getVisibleMapCoordinates();
  let coordinatesObject = {
    topLat: mapBoundaries.getNorthEast().lat(),
    topLng: mapBoundaries.getNorthEast().lng(),
    botLat: mapBoundaries.getSouthWest().lat(),
    botLng: mapBoundaries.getSouthWest().lng(),
  };
  axios
    .get(
      `http://localhost:8080/api/stations/visible?botLat=${coordinatesObject.botLat}&botLng=${coordinatesObject.botLng}&topLat=${coordinatesObject.topLat}&topLng=${coordinatesObject.topLng}`
    )
    .then((res) => {
      addMarkers(res.data);
    });
}

function addMarkers(locations) {
  //Loop through the results array and place a marker for each set of coordinates.

  const infowindow = new google.maps.InfoWindow();
  for (let i = 0; i < locations.length; i++) {
    const latLng = new google.maps.LatLng(locations[i].latitude, locations[i].longitude);
    const marker = new google.maps.Marker({
      position: latLng,
      label: locations[i].owner[0],
      map: map,
    });
    let content = marker.addListener("click", () => {
      infowindow.setContent(
        `<h1>${locations[i].owner} </h1>
        <h2> ${locations[i].name}</h2>`
      );
      infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    });
  }
}

function getStats() {
  axios
    .get("/api/stations/stats")
    .then((res) => {
      let results = res.data; // express middleware ALWAYS comes out as res.data
      let ul = document.getElementById("ownerStats");
      let totalByOwner = 0;
      for (i = 0; i < results.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = `${results[i].owner} - ${results[i].count}`;
        if (`${results[i].count}` !== "1") {
          ul.appendChild(li);
          totalByOwner += Number(results[i].count);
        }
      }
      const totalStations = results.map((result) => Number(result.count)).reduce((total, nextNum) => total + nextNum);
      document.getElementById("totalStations").innerHTML = `Total Stations: ${totalStations}`;
    })
    .catch((err) => console.log("uh oh"));
  getSpotlight();
}

function getSpotlight() {
  axios.get("/api/stations/randomStation").then((res) => {
    let results = res.data;
    let spotLink = document.getElementById("spotlightLink");
    let spotOwner = document.getElementById("spotOwner");
    spotLink.innerHTML = `${results[0].name}`;
    spotOwner.innerHTML = `${results[0].owner}`;
  });
}

// // Get map bound values from viewport on change (maybe radius from map centre)
// // Pass results into function to make markers
// // Marker function should clear existing markers, add new
