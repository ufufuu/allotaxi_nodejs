// swagger.js

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
	definition:{
		openapi: '3.0.0',
		info: {
        title: 'alloEscrow API',
        version: '1.0.0',
        description: 'alloEscrow APi',
      }
	},
	servers:[
		{
			url: 'http://localhost',
			description: 'Development Server'
		}
	],
	apis:[
		'./routes/*.js',
		'./routes/user.route.js'
	]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;