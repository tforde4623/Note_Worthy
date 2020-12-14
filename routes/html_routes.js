module.exports = app => {
  // API GET REQUESTS
  app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
  });
  
  app.get('/notes', (req, res) => {
    res.sendFile('./public/notes.html', { root: __dirname });
  });
};