/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
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
 *   name: Books
 *   description: The books managing API
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *       500:
 *         description: Some server error
 *
 */

router.post("/login", 
    driverController.loginDriver
);
/*
router.post("/verify-account", 
	driverController.verifyEmail);

router.post("/update", 
    driverController.updateCaptainProfile
);

router.get("/profile", authCaptain, driverController.captainProfile);

router.get("/logout", authCaptain, driverController.logoutCaptain);

router.post("reset-Password",
    driverController.resetPassword
);
*/

module.exports = router;

// https://blog.logrocket.com/documenting-express-js-api-swagger/