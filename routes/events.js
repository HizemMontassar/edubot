var express = require('express');
var router = express.Router();
const Event = require('../models/Events');

//delete event
router.delete('/deleteEvent/:id', (req, res, next)=>{

    Event.findByIdAndRemove(req.params.id, (err, data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    });


});

//add event
router.post('/adduser',async function(req,res,next)
{
		const {idUser , startingDate,endingDate ,eventType, eventName, description} = req.body
	
	try {
		const response = await Event.create({
			idUser , startingDate,endingDate ,eventType, eventName, description
		})
////////////////		
		console.log('Event created successfully: ', response)
        res.json({data: response});
        
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'user already exist !' })
		}
		throw error
	}
	
	res.json({ status: 'ok'})
})


//display events 
router.get('/displayEvents', async (req, res, next)=>{

    let events = await Event.find();
    res.json(events);

});

//update events
router.post('/updateEvent/:id', (req, res, next)=>{
    const id = req.params.id;
    Event.findByIdAndUpdate(id, req.body, (err, data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    });
});

router.get('/testevent', (req, res, next)=>{

    res.write('test test');
    res.end();
});

module.exports = router;