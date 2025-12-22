const router = require("express").Router();
const bookingController = require("../controllers/bookingController");
const { adminAuth } = require("../middlewares/auth");

router.post("/", bookingController.rideBook);
router.put("/:id/accept", bookingController.miseajourBooking);
router.delete("/:id/delete", bookingController.deleteBooking);

//router.get("/booking:id", authCaptain, driverController.captainProfile);

module.exports = router;