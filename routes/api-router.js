const apiRouter = require('express').Router();
const dbJson = require('../db/db.json');
const fs = require('fs');
const util = require('util');
const DbHelpers = require('../db/db-helpers')

  //POST route for new note
  apiRouter.post('/notes', (req, res) => {
    DbHelpers.addNote(req.body)
    .then(note => res.json(note))
    .catch(err => {
      res.status(500)
      console.log(err)})


  });


// GET route for retrieveing notes
apiRouter.get('/notes', (req, res) => {
    DbHelpers.getNotes()
      .then(notes => {
        return res.json(notes)
      })
      .catch(error => {
        res.status(500);
        console.error(error)
      })

  });

  //GET route for retrieving specific note
  apiRouter.get('/notes/:note_id', (req,res) => {
    DbHelpers.getNotes()
    .then((note) => {
        res.header(note);
      
        const noteId = req.params.note_id;
       
        for (let i = 0; i < note.length; i++) {
        
          const currentNote = note[i];
            
          if (currentNote.note_id === noteId) {
              
            
            return res.status(200).json(currentNote);
          

          } 
    }})
    .catch(error => {
      res.status(500);
      console.error(error)
    })

  })

//  DELETE route for specific note
apiRouter.delete('/notes/:note_id', (req, res) => {
    DbHelpers.deleteNote(req.params.note_id)
    .then(note => {
      return res.json(note)})
    .catch(err => {
      res.status(500)
      console.log(err)})

});




  module.exports = apiRouter;