const User = require("../model/User")
const Event = require("../model/Event")
const EventReview = require("../model/EventReviews")

const viewAllEvents =   async(req, res) => {
try {
const allEvents =  await Event.find();
res.status(200).json(allEvents);

} catch(err) {
    res.status(500).json(err)
}
}
const RegisterEvent =  async(req, res) => {
const user = req.user.id;
const EventId = req.params.id;

 try {
    const eventAvailability = await Event.findById(EventId);
    console.log(eventAvailability)
    if (eventAvailability.isAvailable === false ) {
      res.status(400).json("sorry, event  date has elapsed")  
      return;
    }
    const userIncluded =  await eventAvailability.participants.includes(user);
    if (userIncluded === true) {
        res.status(400).json("You are not allowed to register more than once");
        return;
    }
    const bookEvent  = await Event.findOneAndUpdate( { _id: EventId }, {$push :{ participants: user}})
console.log(bookEvent)
res.status(200).json("Room successfuly booked")
} 
catch(err) {
    console.log(err)
    res.status(500).json("This service cannot be booked, try agaun later")
}

}

const viewSpecificEvent = async(req, res) => {
    const eventID  =  req.params.id;
    try {
        const specificEvent =  await Event.findById(eventID);
        console.log(specificEvent);
        res.status(200).json(specificEvent);

    } catch(err) {
        console.log(err);
        res.status(500).json("Sorry, you cannot access this information now. Kindly try again later")
    }
}
const eventReview =  async(req, res) => {
    const reviewer = req.user.id;
const eventId = req.params.id
    if(!reviewer) {
        res.status(400).json("Error; please login and try again")
    }
const review = req.body.review
    const payload =  {review, eventId, reviewer }

    try {
const users  =  await Event.findById(eventId);
 const confirm =  users.participants.includes(reviewer) 
 if(!confirm) {
     res.status(402).json("You aren't registered to this event")
 }
        const review  =  await EventReview.create(payload);
        console.log(review);
        res.status(200).json("Event review successful")
    
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}
const unRegisterEvent = async(req, res) => {
    const user = req.user.id;
    const eventInfo = req.params.id
    if(!user) {
        res.status(400).json("Error; please login and try again")
    }
    try {
        const eventAvailability = await Event.findById(eventInfo);
        console.log(eventAvailability)
        if (eventAvailability.isAvailable === false ) {
          res.status(400).json("sorry, event  date has elapsed")  
          return;
        }
        const userIncluded =  await eventAvailability.participants.includes(user);
        if (userIncluded === false) {
            res.status(400).json("You are not allowed to access this page");
            return ;
        }
        const bookEvent  = await Event.findOneAndUpdate( { _id: eventInfo}, {$pull :{ participants: user}})
    console.log(bookEvent)
    res.status(200).json("Event successfully unregistered")
    } 
    catch(err) {
        console.log(err)
        res.status(500).json("This service cannot beperformed now, try again later")
    }
}
module.exports = {viewAllEvents, viewSpecificEvent, eventReview, RegisterEvent, unRegisterEvent}