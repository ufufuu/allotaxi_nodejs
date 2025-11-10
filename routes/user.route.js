const express = require('express');
const router = express.Router();

const { signupUser 
	}= require('../controllers/
/**
* @openapi
* '/user':
*   post:
*     summary: Create a new user
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               userName:
*                 type: string
*               userPassword:
*                 type: string
*
*     responses:
*       '200':
*         description: OK
*         content:
*           'application/json':
*             schema:
*               type: object
*               properties:
*                 user:
*                   $ref: '#/components/schemas/UserAccount'
*/

router.post('/user', (req, res ) => {
	router.post('/user', signupUser);
});

/**
* @openapi
* '/user':
*   get:
*     description: my hosted api docs
*     responses:
*       '200':
*         description: OK
*         content:
*           'application/json':
*             schema:
*               type: object
*               properties:
*                 user:
*                   $ref: '#/components/schemas/UserAccount'
* components:
*   schemas:
*     UserAccount:
*       type: object
*       required:
*         - userName
*       properties:
*         userName:
*           type: string
*		
*/
router.get('/user', (req, res) => {
	res.status('200').json({ "userName": "test" });
});



module.exports = router;

// //res.json([{ id: '1', name: 'John Doe' }, { id: '2', name: 'Jane Doe' }]);