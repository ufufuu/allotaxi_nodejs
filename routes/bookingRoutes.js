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
 *           type: object
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
 *         origin: " Aeroport Lome Tokoin "
 *         originLat: "55.87"
 *         originLng: "4.20"
 *         destination: "Carrefour Edem Agoe Dalime "
 *         destinationLat: "null"
 *         destinationLng: "null"
 *         contactInfo: "99.98.90.90"
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
router.post("/", bookingController.rideBook);
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
 *             type: object
 *             properties:
 *               bookingId:
 *                 type: string
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
 * /bookings/{id}/accept:
 *   put:
 *     summary: Accept a booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driverId:
 *                 type: string
 *               response:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: booking Accepted
 *         content:
 *           application/json:
 *       500:
 *         description: Some server error
 *
 */
router.put("/:id/accept", bookingController.miseajourBooking);

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API managing Bookings 
 * /bookings/{id}/deny:
 *   put:
 *     summary: Deny Booking by Driver
 *     tags: [Bookings]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driverId:
 *                 type: string
 *               response:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: booking Accepted
 *         content:
 *           application/json:
 *       500:
 *         description: Some server error
 *
 */
router.post("/:id/deny", bookingController.updateBooking);

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API managing Bookings 
 * /bookings/{id}/delete:
 *   delete:
 *     summary: Delete or Cancel Booking by Client
 *     tags: [Bookings]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingId:
 *                 type: string
 *     responses:
 *       200:
 *         description: booking Accepted
 *         content:
 *           application/json:
 *       500:
 *         description: Some server error
 *
 */
router.delete("/:id/delete", bookingController.deleteBooking);
//router.get("/booking:id", authCaptain, driverController.captainProfile);

module.exports = router;