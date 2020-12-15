const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3301;

// middleware to make public a static folder
app.use(express.static('public'));
// middleware for accepting posted JSONs
app.use(bodyParser.json());
// using middleware to parse req queries
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/api_routes')(app);
require('./routes/html_routes.js')(app)

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
