
const express = require('express');
const router = express.Router();
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
*         - username
*       properties:
*         username:
*           type: string
*/
router.get('/user', (req, res) => {
	res.status('200').json({ "username": "test" });
});
/**
* @openapi
* '/user':
*   post:
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
*         - username

*       properties:
*         username:
*           type: string

*/ 
router.post('/user', (req, res ) => {
	router.post('/signup', signup);
});

module.exports = router;






// //res.json([{ id: '1', name: 'John Doe' }, { id: '2', name: 'Jane Doe' }]);