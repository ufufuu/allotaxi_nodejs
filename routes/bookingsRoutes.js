/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the booking
 *         title:
 *           type: string
 *           description: The title of your booking
 *         author:
 *           type: string
 *           description: The booking author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the booking
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the booking was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

const express = require("express");
const router = require("express").Router();
const driverController = require("../controllers/driverController");

router.post("/register",
    driverController.registerDriver
);

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API managing Bookings 
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: The created booking.
 *         content:
 *           application/json:
 *       500:
 *         description: Some server error
 *
 */
router.post("/login", 
    driverController.loginDriver
);
/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API managing Bookings 
 * /bookings:
 *   get:
 *     summary: Get a booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: The created booking.
 *         content:
 *           application/json:
 *       500:
 *         description: Some server error
 *
 */
router.get("/profile", authCaptain, driverController.captainProfile);

/*
router.post("/verify-account", 
	driverController.verifyEmail);

router.post("/update", 
    driverController.updateCaptainProfile
);



router.get("/logout", authCaptain, driverController.logoutCaptain);

router.post("reset-Password",
    driverController.resetPassword
);
*/

module.exports = router;

// https://blog.logrocket.com/documenting-express-js-api-swagger/