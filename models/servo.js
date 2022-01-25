const database = 'servo';

const getPetrolStations = (coordinatesObject) => {
    let sql = `SELECT * FROM petrolStations WHERE latitude BETWEEN ${coordinatesObject.topLat} AND ${coordinatesObject.botLat} AND BETWEEN ${coordinatesObject.topLong} AND ${coordinatesObject.botLong}`
    console.log(sql);
}

// Need to export getpetrolstations