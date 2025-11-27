const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

/**
* @swagger
* tags:
*   name: User
*   description: API managing Users
* /user/register:
*   post:
*     summary: Create a new user
*     tags: [User]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               userName:
*                 type: string
*               userFirstName:
*                 type: string
*               userLogin:
*                 type: string
*               userPassword:
*                 type: string
*               userRole:
*                 type: string
*               userPhoneNumber:
*                 type: string
*     responses:
*       '200':
*         description: OK
*         content:
*           'application/json':
*             schema:
*               type: object
*               properties:
*                 id:
*                   type:string
* /user/login:
*   post:
*     summary: login a user
*     tags: [User]
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
*     responses:
*       '200':
*         description: OK
*         content:
*           'application/json':
*             schema:
*               type: object
*               properties:
*                 registeruser:
*                   $ref: '#/components/schemas/RegisterUser'
* components:
*   schemas:
*     RegisterUser:
*       type: object
*       required:
*         - userNameRR
*       properties:
*         userNameRR:
*           type: string
*     LoginUser:
*       type: object
*       required:
*         - userNameRON
*       properties:
*         userNameRON:
*           type: string
*/

router.post("/register", userController.signupUser);
router.post("/login", userController.loginUser);
router.get("user:id", userController.loginUser);

//router.post('/signup', signup);
//router.post('/signup/user', signupUser);
//router.post('/login', login);

router.get('/user/:id', userController.loginUser);
module.exports = router;




//res.json([{ id: '1', name: 'John Doe' }, { id: '2', name: 'Jane Doe'}]);

// Appsmith /
/*
https://aws.amazon.com/marketplace/pp/prodview-ncouicgslpim4

::: Odoo logistics implementation

Appsmith enables you to quickly build, deploy and share applications 
with end-users for running critical business operations. You can connect to any database

https://www.roundthecode.com/dotnet-tutorials/integrating-signalr-with-react-typescript-and-asp-net-core

https://hackernoon.com/react-native-signalr-net-core-with-dotnetify-f919083170d4

// https://dotnetify.net/

// https://www.npmjs.com/~dsuryd

// https://learn.microsoft.com/en-us/aspnet/core/signalr/javascript-client?view=aspnetcore-9.0&source=recommendations&tabs=visual-studio

// https://www.abrahamberg.com/blog/aspnet-signalr-and-react/

https://dsuryd.github.io/dotNetify/realtime-postgres/

https://www.codingandbeyond.com/2023/10/28/using-signalr-with-react/

https://medium.com/swlh/learn-how-to-deploy-a-react-native-chat-client-against-a-signalr-hub-on-asp-net-core-for-linux-1b73af1cb2be

*/

/*

How to request a refund
For overpayments: You can email IRCC.FINRefunds-RemboursementsFIN.IRCC@CIC.GC.CA with your information,
 including your name, address, receipt number, and the reason for the refund request.
For other cases: If you believe you are eligible for a refund under the service guarantee or another
 circumstance, you may need to submit a request through the IRCC webform, according to CIC News and Canada.ca. 
*/
 
// https://www.international.gc.ca/world-monde/funding-financement/grants-contributions-subventions-contributions.aspx?lang=fra
// https://www.securitepublique.gc.ca/cnt/cntrng-crm/crrctns/ntnl-vlntry-rgnztns/trms-cndtns-fr.aspx