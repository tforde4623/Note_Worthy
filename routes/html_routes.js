const path = require('path');

module.exports = app => {
  // API GET REQUESTS
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  app.get('*', (req, res) => {
    res.status(404);
    res.sendFile(path.join(__dirname, "../public/404.html"));
  });
};