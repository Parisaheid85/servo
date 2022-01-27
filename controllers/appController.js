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
router.get("/api/stations/all", (req, res) => {
  const result = stations.getAllStations();
  result.then((dbRes) => {
    res.json(dbRes.rows);
  });
});

//-> (DAVE) added station to the route as it was only pointing to owners which is an attribute of a station

router.get("/api/stations/owners", (req, res) => {
  const result = stations.getUniqueOwners();
  result.then((dbRes) => {
    res.json(dbRes.rows);
  });
});

router.get("/api/stations/randomStation", (req, res) => {
  const result = stations.getRandomStation();
  result.then((dbRes) => {
    res.json(dbRes.rows);
  });
});

router.get("/api/stations/visible", async (req, res, next) => {
  const coordinates = { botLat: req.query.botLat, botLng: req.query.botLng, topLat: req.query.topLat, topLng: req.query.topLng };
  const result = stations.getVisibleStations(coordinates);
  result.then((dbRes) => {
    res.json(dbRes.rows);
  });
});

router.get("/api/stations/stats", async (req, res, next) => {
  const result = stations.getStats();
  result.then((dbRes) => {
    res.json(dbRes.rows);
  });
});

module.exports = router;
