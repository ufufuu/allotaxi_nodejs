
const express = require('express');
const { signup,
	signupUser,
	login,
	getUser
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/signup/user', signupUser);
router.post('/login', login);

router.get('/user/:id', getUser);

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