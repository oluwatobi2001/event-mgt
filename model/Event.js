const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const EventSchema = new Schema({
EventName : {
    type: String,
    required : true
}
,
EventDesc: {
    type: String,
    required: true
},
maxParticipants: {
type: Number, 
required: true
},
EventDate : {
type: Date,
default: new Date()
},
venue: {
type: String,
required : true
},
IsAvailable : {
    type: Boolean,
    default : true
},
charges: {
type: Number
},
participants: [
    {type: Schema.Types.ObjectId, 
     ref: 'User'}
    ],

})

EventSchema.pre('findOneAndUpdate', async function (next) {
    try {
        const update = this.getUpdate();
        const filter = this.getQuery();
        
        const event = await this.model.findOne(filter);

        if (!event) {
            return next(new Error('Event not found'));
        }

        if ((update.$set?.participants?.length || event.participants.length) > event.maxParticipants) {
            return next(new Error('Participants limit exceeded'));
        }

        next();
    } catch (error) {
        next(error);
    }
});




module.exports = mongoose.model("Event", EventSchema)