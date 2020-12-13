const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3301;

// middleware to make public a static folder
app.use(express.static('public'));

// GET routes
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.get('/notes', (req, res) => {
  res.sendFile('./public/notes.html', { root: __dirname });
});

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
