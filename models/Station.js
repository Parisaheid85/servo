//pool is a global variable so should be accessible here

//Helper Functions
function dbQuery(sql) {
  const result = pool.query(sql);
  return result;
}

//Model Functions
const getVisibleStations = async function (mapBounds) {
  try {
    let sql = `SELECT * FROM petrolStations 
            WHERE (latitude BETWEEN ${mapBounds.botLat} AND ${mapBounds.topLat}) 
            AND (longitude BETWEEN ${mapBounds.botLng} AND ${mapBounds.topLng});`;
    return dbQuery(sql);
  } catch (error) {
    throw error;
  }
};

const getAllStations = async function () {
  try {
    let sql = "SELECT * FROM petrolStations;";
    return dbQuery(sql);
  } catch (error) {
    throw error;
  }
};

const getUniqueOwners = async function () {
  try {
    let sql = `SELECT DISTINCT owner FROM petrolStations;`;
    return dbQuery(sql);
  } catch (error) {
    throw error;
  }
};

//BUG - this should only grab a random station from the area you can see in the map - i was looking at sydney and it was showing a Perth spotlight petrol station. Also i think this should be renamed to getSpotlight so it rteads in the controller stations.getSpotlight()

//HOW about we go fancy! and grab the spotlight station in the mapBounds from google places and show photos, opening hours, etc?
const getRandomStation = async function () {
  try {
    let sql = "SELECT * FROM petrolStations ORDER BY random() LIMIT 1";
    return dbQuery(sql);
  } catch (error) {
    throw error;
  }
};

const getStats = async function () {
  try {
    let sql = "SELECT owner, count(*) FROM petrolStations GROUP BY owner ORDER BY count DESC;";
    return dbQuery(sql);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllStations,
  getVisibleStations,
  getUniqueOwners,
  getRandomStation,
  getStats,
};
