const { resolveSoa } = require('dns');
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const data = require('./db/db.json');
const { get } = require('http');

const app = express();
const PORT = process.env.PORT || 3301;

// middleware to make public a static folder
app.use(express.static('public'));
// middleware for accepting posted JSONs
app.use(bodyParser.json());
// using middleware to parse req queries
app.use(bodyParser.urlencoded({ extended: true }));



// Starts the server to begin listening
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
