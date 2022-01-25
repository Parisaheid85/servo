const getPetrolStations = (coordinatesObject) => {
    let sql = `SELECT * FROM petrolStations 
    WHERE (latitude BETWEEN ${coordinatesObject.botLat} AND ${coordinatesObject.topLat}) 
    AND (longitude BETWEEN ${coordinatesObject.botLng} AND ${coordinatesObject.topLng});`
    return sql
}

module.exports = {
    getPetrolStations
}