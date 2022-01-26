const stations = require("../models/Station");
const express = require("express");
const router = express.Router();

//-> (DAVE) using view - render this at base route and draw the page
//RENDER DEFAULT HTML VIEW
router.get("/", (req, res) => {
  //For Map Page
  res.render("map");
});

//API DATA REQUESTS
router.get("/api/stations/all", async (req, res, next) => {
  try {
    const result = await stations.getAllStations();
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

//-> (DAVE) added station to the route as it was only pointing to owners which is an attribute of a station

router.get("/api/stations/owners", async (req, res, next) => {
  try {
    const result = await stations.getUniqueOwners();
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.get("/api/stations/randomStation", async (req, res, next) => {
  try {
    const result = await stations.getRandomStation();
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.get("/api/stations/visible", async (req, res, next) => {
  try {
    const coordinates = { botLat: req.query.botLat, botLng: req.query.botLng, topLat: req.query.topLat, topLng: req.query.topLng };
    const result = await stations.getVisibleStations(coordinates);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.get("/api/stations/stats", async (req, res, next) => {
  try {
    const result = await stations.getStats();
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
