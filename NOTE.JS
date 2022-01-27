const PORT = process.env.PORT || 8080;
process.env.OMDB_API_KEY;

// ALL JS THAT SENT TO THE BROWSER TO RUN GOES INSIDE PUBLIC FOLDER
//get '/index.js'
// get '/map.js'
// get '/spotlight.js'
// get '/current_location.js'
app.use(express.static("public"));

//spotlights
app.get("/api/stations/random", (req, res) => {
  res, json({});
});

app.get("/api/info", (req, res) => {
  res.json({ message: "welcome" });
});

app.listen(8080, () => {
  console.log(`Listening on port ${PORT}`);
});

// ALWAYS FOLLOW INSTRUCTIONS
// code readability -
// abstractions
// take small steps towards your goel
// underestand the problems and architecture
// fundementals and basics - reading docs & example code
