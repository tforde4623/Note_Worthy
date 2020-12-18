const fs = require('fs');
const data = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

// maybe fix empty list issue

module.exports = app => {
  // GET api routes
  app.get('/api/notes', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    fs.readFile('./db/db.json', (err, content) => {
      res.json(JSON.parse(content));
    })
  });

  // POST api routes
  app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, content) => {
      res.json(JSON.parse(content));
      const json = JSON.parse(content);
      req.body.id = uuidv4();
      json.push(req.body);
      // // write file with new data
      fs.writeFile('./db/db.json', JSON.stringify(json), (err) => { if (err) console.log(err);});
    });
  });

  // DELETE api routes
  app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', (err, content) => {
      const newData = JSON.parse(content)
        .filter(obj => obj.id !== req.params.id);
      // write new data back to file
      res.json(JSON.parse(content));
      console.log(newData);
      fs.writeFile('./db/db.json', JSON.stringify(newData), () => (err) => { if (err) console.log(err);})
    });
  });
};