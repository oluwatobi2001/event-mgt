const router = require('express').Router();
const {checkVerification, checkIsAdmin} = require("../Middleware/Authentication")

const {upgradeUser, DeleteReview, createEvent, upDateEventDetails, removeEvent} = require("../controllers/Admin")

router.post("/new-event", checkIsAdmin, createEvent);
router.delete("/delete-user/:id", checkIsAdmin,);
router.put("/update-event/:id", checkIsAdmin, upDateEventDetails);
router.delete("/:id/remove", checkIsAdmin, removeEvent);
router.get("/delete-review/:id", checkIsAdmin, DeleteReview );

router.put("/update-user/:id", checkIsAdmin, upgradeUser);
module.exports = router
