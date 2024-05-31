const router = require('express').Router();
const User = require("../model/User");
const {UserRouteVerification} = require("../Middleware/Authentication")

const {viewAllEvents, viewSpecificEvent, eventReview, unRegisterEvent, RegisterEvent} = require("../controllers/User")



router.put("/:id/add-review",  UserRouteVerification, eventReview );
router.put("/:id/check-out", UserRouteVerification, unRegisterEvent);
router.put("/:id/book-event", UserRouteVerification, RegisterEvent );

router.get("/events/:id", UserRouteVerification, viewSpecificEvent );
router.get("/all-events", UserRouteVerification, viewAllEvents)

module.exports = router ;