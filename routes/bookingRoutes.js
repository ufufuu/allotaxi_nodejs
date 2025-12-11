const express = require("express");
const router = require("express").Router();
const bookingController = require("../controllers/bookingController");
const { adminAuth } = require("../middlewares/auth")
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
 *         bookingReference:
 *           type: string
 *           description: The auto-generated id of the booking
 *         bookingTitle:
 *           type: string
 *           description: The title of your booking
 *         bookingContactInfo:
 *           type: string
 *           description: The booking author
 *         originAdress:
 *           type: boolean
 *           description: Whether you have finished reading the booking
 *         destinationAdress:
 *           type: boolean
 *           description: Whether you have finished reading the booking
 *         bookingCreatedAt:
 *           type: string
 *           format: date
 *           description: The date the booking was added
 *         bookingEta:
 *           type: boolean
 *           description: Whether you have finished reading the booking
 *         specialInstructions:
 *           type: boolean
 *           description: Whether you have finished reading the booking
 *       example:
 *         originAdress: " Aeroport Lome Tokoin"
 *         destinationAdress: "Carrefour Edem"
 *         contactInfo: " 99-98-90-90"
 *         specialInstructions: "Je suis a la porte deja"
 *         rider: "joe7"
 */
/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API managing Bookings 
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     description: Post request that requires authorization
 *     security:
 *       - BearerAuth: []
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
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *       500:
 *         description: Some server error
 *
 */
router.post("/", bookingController.createBooking);
/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API managing Bookings 
 * /bookings/id:
 *   get:
 *     summary: Get a single booking
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
router.get("/", bookingController.getBookings);
/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API managing Bookings 
 * /bookings:
 *   get:
 *     summary: Get multi booking
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
router.get("/:id", bookingController.getBooking);
/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API managing Bookings 
 * /bookings/id/accept:
 *   post:
 *     summary: Accept a booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: booking Accepted
 *         content:
 *           application/json:
 *       500:
 *         description: Some server error
 *
 */
router.post("/:id/accept", bookingController.miseajourBooking);
router.post("/:id/deny", bookingController.updateBooking);
router.post("/:id/cancel", bookingController.cancelBooking);
  
//router.get("/booking:id", authCaptain, driverController.captainProfile);

module.exports = router;

// https://blog.logrocket.com/documenting-express-js-api-swagger/