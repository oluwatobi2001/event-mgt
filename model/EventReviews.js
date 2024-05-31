const mongoose = require("mongoose");

const EventReviewsSchema  = mongoose.Schema({
    eventId:  {
type: String, required: true
    },
    review : {
        type: String, required: true
    },
    reviewer: {
        type: String, required: true
    }

})

module.exports = mongoose.model("eventReviews", EventReviewsSchema)