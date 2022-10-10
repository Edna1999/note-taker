const hr = require ("express").Router();
const path = require('path');

//GET request for the notes HTML page
hr.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '../public/pages/notes.html'))
);

//Wildcard GET request for the main HTML page
hr.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, '../public/pages/index.html'))
);
  
    

module.exports = hr;