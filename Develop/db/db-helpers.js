const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');




const retrieveFile =  util.promisify(fs.readFile);
const writeFile =  util.promisify(fs.writeFile);
const editFile = util.promisify(fs.appendFile);

//class for the functionality of the GET and POST requests
class DbHelpers {
    read(){
    return retrieveFile('./db/db.json', 'utf8')
    }

    write(note){
        return writeFile('./db/db.json', JSON.stringify(note))
    }

    // delete(note){
    //     return editFile('.db/db.json', JSON.stringify(note))
    // }

    getNotes(){
        return this.read().then(notes => {
    
            try {
               return JSON.parse(notes)
            } catch (error) {
                console.error(error);
            }
           
        })
    } 

    addNote(note) {
        const {title, text} = note;
        
       
        const newNote = {
         title, 
         text,
         note_id : uuidv4()
        };
   
        return this.getNotes()
            .then(notes => {
                notes.push(newNote);
                return this.write(notes)
            }) 
           
        }

        
}



module.exports =  new DbHelpers();


