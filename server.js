const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3301;

// middleware
app.use("/public", express.static(path.join(__dirname, 'public'))); //test this and the added /public/ to linked files in html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/api_routes')(app);
require('./routes/html_routes.js')(app)

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
