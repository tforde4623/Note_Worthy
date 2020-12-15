const fs = require('fs');
const data = require('../db/db.json');

module.exports = app => {
  // GET api routes
  app.get('/api/notes', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  });

  // POST api routes
  app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, content) => {
      const json = JSON.parse(content);
      json.push(req.body);
      // // write file with new data
      fs.writeFile('./db/db.json', JSON.stringify(json), () => console.log('Wrote to file!'));
      res.send(json); // return new data
    });
  });

  // DELETE api routes
  app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', (err, content) => {
      const newData = JSON.parse(content)
        .filter(obj => obj.id !== req.params.id);
      // write new data back to file
      console.log(newData);
      fs.writeFile('./db/db.json', JSON.stringify(newData), () => console.log(`Note ${req.params.id} deleted.`))
    });
  });
};