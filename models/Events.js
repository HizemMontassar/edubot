const mongoose = require('mongoose');


 const events = new mongoose.Schema(
     {
         idUser: { type: String, required: true},
         startingDate: { type: Date, required: true},
         endingDate: { type: Date, required: true},
         eventType: { type: String, enum:['exam','workshop','calendar','course'], required: true},
         eventName: { type: String, required: true},
         description: { type: String, required: true}
        
     },
     {collection: 'events'}
 )

 const model = mongoose.model('events', events);
 module.exports = model;
