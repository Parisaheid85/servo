const getPetrolStations = (coordinatesObject) => {
    let sql = `SELECT * FROM petrolStations 
    WHERE (latitude BETWEEN ${coordinatesObject.topLat} AND ${coordinatesObject.botLat}) 
    AND (longitude BETWEEN ${coordinatesObject.botLng} AND ${coordinatesObject.topLng});`
    console.log(sql)
}

module.exports = {
    getPetrolStations
}