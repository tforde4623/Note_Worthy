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

// GET routes
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.get('/notes', (req, res) => {
  res.sendFile('./public/notes.html', { root: __dirname });
});

// GET api routes
app.get('/api/notes', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
});

// POST api routes
app.post('/api/notes', (req, res) => {
  let data = {};
  fs.readFile('./db/db.json', (err, content) => {
    const json = JSON.parse(content) || [];
    data = req.body;
    // let json = JSON.parse(content);
    json.push(data);
    // // write file with new data
    fs.writeFile('./db/db.json', JSON.stringify(json), () => console.log('Wrote to file!'));
    res.send(data); // return new data
  });
});

// DELETE api routes
app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  fs.readFile('./db/db.json', (err, content) => {
    const newData = JSON.parse(content)
      .filter(obj => obj.id !== req.params.id);
    // write new data back to file
    console.log(newData);
    fs.writeFile('./db/db.json', JSON.stringify(newData), () => console.log(`Note ${req.params.id} deleted.`))
  });
});

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
