
const Event = require("../model/Event");
const EventReview = require("../model/EventReviews")
const Joi = require("joi")

const eventSchema = Joi.object({
    EventName: Joi.string().min(3).max(100).required(),
    EventDesc: Joi.string().min(3).max(1000).required(),
    maxParticipants: Joi.number().required(),
    venue: Joi.string().max(14).required(),
    charges:  Joi.number().required(),
    
    
})
const createEvent = async(req, res) => {
    
 const {err, value} = eventSchema.validate(req.body, {abortEarly: false});
 if (err )  {
     res.status(400).json("Check your entry and retry again");
     console.log(err)
 }
    try {
        const {
            EventName, EventDesc, maxParticipants, venue, EventDate, charges

        } = req.body
        const newEvent = await Event.create({EventName, EventDesc, maxParticipants, venue, EventDate, charges});
        console.log(newEvent);
        res.status(200).json("Event successfully created")

    } catch(err) {
        console.log(err)
        res.status(500).json("Event creation unsuccessful. Please try again later.") 
    }
}


const upDateEventDetails = async(req, res) => {
    const event = req.params.id
    const body = req.body;
    try {
        const upgradedEvent = await Event.findById( event );
        await upgradedEvent.set(body)
        
        const completed = await upgradedEvent.save();

        console.log(completed)
        res.status(200).json("Upgrade successful")
    }
catch(err) {
    console.log(err)
    res.status(500).json(err)
}
}
const removeEvent =async(req, res) => {
   
const defaultEvent = req.params.id
const   user = req.user;

try {
    const deleteEvent =  await Event.findByIdAndDelete(defaultEvent);

    const  deleteReviews = await EventReview.findOneAndDelete({eventId: defaultEvent})

    console.log("successfully deleted")
    res.status(200).json("event successfully deleted")
}
catch(err) {
    console.log(err)
    res.status(500).json(err)
}
     

}

const DeleteReview = async(req, res) => {
   const  reviewId  = req.params.id
    const   user = req.user;
    if(!user.isAdmin){
        res.status(400).json("Please you are not authorized to access this page");
    }

  
    try {
const reviewDel = await EventReview.findByIdAndDelete(reviewId)
console.log(reviewDel);
res.status(200).json("User review successfully deleted")
    } catch (err) {
res.status(500).json(err)
    }

}

const upgradeUser =  async(req, res) => {

    const userUp = req.params.id ;
    const   user = req.user;
   
    try {
        const upgradedUser = await User.findByIdAndUpdate(userUp, {$set  : {role: "admin"}});
        console.log(upgradedUser)
        res.status(200).json("Upgrade successful")
    }
catch(err) {
    res.status(500).json(err)
}
}

module.exports = {upgradeUser, DeleteReview, createEvent, upDateEventDetails, removeEvent}